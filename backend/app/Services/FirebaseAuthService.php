<?php

namespace App\Services;

use Kreait\Firebase\Contract\Auth;

class FirebaseAuthService
{
    protected $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    public function verifyIdToken(string $idToken)
    {
        \Log::info('Verifying Firebase Token...');
        try {
            // Increase leeway to account for significant clock skew (e.g., 5 minutes)
            $leewayInSeconds = 300; 
            $verifiedIdToken = $this->auth->verifyIdToken($idToken, false, $leewayInSeconds);
            \Log::info('Token Verified Successfully for UID: ' . $verifiedIdToken->claims()->get('sub'));
            return $verifiedIdToken->claims()->get('sub');
        } catch (\Exception $e) {
            \Log::error('Firebase Token Verification Failed: ' . $e->getMessage());
            throw $e; // Rethrow to be caught by the controller
        }
    }
}
