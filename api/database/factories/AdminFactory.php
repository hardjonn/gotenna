<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Admin::class, function (Faker $faker) {
    return [
        'username' => $faker->username,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => 'secret',
        'remember_token' => Str::random(10),
    ];
});
