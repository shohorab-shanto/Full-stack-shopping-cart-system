<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Auth::user()->cartItems()->with('product')->get();

        return response()->json([
            'success' => true,
            'data' => $cartItems,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity');

        $cartItem = $user->cartItems()->updateOrCreate(
            ['product_id' => $productId],
            ['quantity' => $quantity]
        );

        return response()->json([
            'success' => true,
            'message' => 'Product added to cart',
            'data' => $cartItem->load('product'),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        $cartItem = $user->cartItems()->findOrFail($id);
        $cartItem->update(['quantity' => $request->input('quantity')]);

        return response()->json([
            'success' => true,
            'message' => 'Cart item updated',
            'data' => $cartItem->load('product'),
        ]);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $cartItem = $user->cartItems()->findOrFail($id);
        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart',
        ]);
    }

    public function batchUpdate(Request $request)
    {
        // Change from 'required' to 'present' so that an empty array is accepted
        $request->validate([
            'items' => 'present|array',
            'items.*.product_id' => 'required',
            'items.*.quantity' => 'required|integer|min:0',
        ]);

        $user = Auth::user();
        $items = $request->input('items');
        $validItems = [];
        $receivedProductIds = collect($items)->pluck('product_id')->toArray();

        // Remove items from database that are NOT in the batch update request
        $user->cartItems()->whereNotIn('product_id', $receivedProductIds)->delete();

        foreach ($items as $item) {
            $product = Product::find($item['product_id']);
            
            if (!$product || $item['quantity'] <= 0) {
                $user->cartItems()->where('product_id', $item['product_id'])->delete();
                continue;
            }

            $cartItem = $user->cartItems()->updateOrCreate(
                ['product_id' => $item['product_id']],
                ['quantity' => $item['quantity']]
            );
            
            $validItems[] = $cartItem->load('product');
        }

        return response()->json([
            'success' => true,
            'message' => 'Cart synced successfully',
            'data' => $validItems,
        ]);
    }
}
