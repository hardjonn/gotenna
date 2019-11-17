<?php

use Illuminate\Database\Seeder;
use App\Models\Admin;

class AdminsTableSeeder extends Seeder
{
    const ADMIN_USERNAME = 'root';
    const ADMIN_EMAIL = 'admin@gotenna.com';
    const ADMIN_PASSWORD = 'admin';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::create([
            'username' => self::ADMIN_USERNAME,
            'email' => self::ADMIN_EMAIL,
            'password' => self::ADMIN_PASSWORD,
        ]);

        $this->command->info('Admin table seeded!');
    }
}
