<?php

namespace App\Http\Middleware;

use App\Services\FirebaseAuthService;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class FirebaseAuthMiddleware
{
    protected $firebaseAuthService;

    public function __construct(FirebaseAuthService $firebaseAuthService)
    {
        $this->firebaseAuthService = $firebaseAuthService;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $idToken = $request->bearerToken();

        if (!$idToken) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $firebaseUid = $this->firebaseAuthService->verifyIdToken($idToken);

        if (!$firebaseUid) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('firebase_uid', $firebaseUid)->first();

        if (!$user) {
            // You might want to get more user info from Firebase and create the user
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        Auth::login($user);

        return $next($request);
    }
}
