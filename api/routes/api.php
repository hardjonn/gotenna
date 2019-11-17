<?php

/**
 * RouteServiceProvider defines default group for api and web routes
 *
 * @see Providers\RouteServiceProvider.php
 */
Route::namespace('Backend')
    ->prefix('v1')
    ->group(function ($router) {
        $guardName = config('auth.defaults.admin_guard');

        Route::post('/auth/login', 'AuthController@login')
            ->middleware("jwt.guest:{$guardName}")
            ->name('api.v1.auth.login');

        Route::middleware("jwt.auth:{$guardName}")->group(function () {
            Route::post('/auth/me', 'AuthController@me')->name(
                'api.v1.auth.me'
            );

            Route::post('/upload', 'ImageController@upload')->name(
                'api.v1.image.upload'
            );
        });

        Route::middleware("jwt.guest:{$guardName}")->group(function () {
            Route::get('/ping', function () {
                return 'PONG';
            });
        });

        Route::group(['prefix' => 'image'], function() {
            Route::get('/list', 'ImageController@list')->name('api.v1.image.list');
            Route::post('/fx', 'ImageController@effects')->name('api.v1.image.effects');
        });

        // Route::post('logout', 'AuthController@logout');
        // Route::post('refresh', 'AuthController@refresh');
        //Route::post('me', 'AuthController@me');
    });
