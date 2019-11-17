<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class JwtGuest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => __('auth.[LOGIN] ALREADY_LOGGED_IN'),
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        return $next($request);
    }
}
