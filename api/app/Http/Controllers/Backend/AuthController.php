<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    /**
     * the guard which is specified for the model
     * and uses in the current auth implementation
     *
     * @var \Tymon\JWTAuth\JWTGuard
     */
    protected $guard;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $guardName = config('auth.defaults.admin_guard');
        $defaultClaims = config('jwt.default_claims');

        $this->guard = Auth::guard($guardName);
        $this->guard->factory()->setDefaultClaims($defaultClaims);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        $token = $this->guard->attempt($credentials);

        if (!$token) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => __('auth.[LOGIN] UNAUTHORIZED'),
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $user = [];
        $authUser = Auth::user();

        if ($authUser) {
            $user = [
                'id' => $authUser->id,
                'name' => $authUser->username,
                'email' => $authUser->email,
                'role' => 'admin',
                'isAdmin' => true,
            ];
        }

        $tokenData = [
            'accessToken' => $token,
            'accessTokenExp' => $this->guard->factory()->getTTL() * 60,
            'refreshToken' => '',
            'refreshTokenExp' => 0,
        ];

        return response()->json([
            'user' => $user,
            'token' => $tokenData,
        ]);
    }
}
