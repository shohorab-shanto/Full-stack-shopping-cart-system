<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\FirebaseAuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function store(Request $request, FirebaseAuthService $firebaseAuthService)
    {
        try {
            $idToken = $request->bearerToken();

            if (!$idToken) {
                return response()->json(['message' => 'Unauthorized: No token provided'], 401);
            }

            $firebaseUid = $firebaseAuthService->verifyIdToken($idToken);

            if (!$firebaseUid) {
                // If it's null, check if there's a logged error in the logs
                return response()->json([
                    'message' => 'Unauthorized: Invalid token. Please check backend logs for details.',
                    'hint' => 'Ensure server time is synced and credentials match the project.'
                ], 401);
            }

            $user = User::firstOrCreate(
                ['firebase_uid' => $firebaseUid],
                [
                    'name' => $request->input('name') ?? 'User',
                    'email' => $request->input('email'),
                    'avatar' => $request->input('avatar'),
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'User authenticated successfully',
                'data' => $user,
            ]);
        } catch (\Exception $e) {
            \Log::error('Authentication error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Authentication failed: ' . $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }
    }
}
