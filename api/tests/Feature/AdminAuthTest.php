<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;

use App\Models\Admin;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * admin user instance
     *
     * @var App\Models\Admin
     */
    private $adminUser = null;

    /**
     * path to admin login based on named route
     *
     * @var string
     */
    private $adminLoginUrl = '';

    const ADMIN_USER_PASSWORD = 'password';

    public function setUp(): void
    {
        parent::setUp();

        $this->adminUser = factory(Admin::class)->create([
            'password' => self::ADMIN_USER_PASSWORD,
        ]);

        $this->adminLoginUrl = route('api.v1.auth.login');
    }

    /** @test */
    public function it_should_log_admin_in()
    {
        $response = $this->post($this->adminLoginUrl, [
            'email' => $this->adminUser->email,
            'password' => self::ADMIN_USER_PASSWORD,
        ]);

        $response->assertStatus(Response::HTTP_OK);

        $response->assertJsonStructure([
            'token' => ['accessToken', 'accessTokenExp'],
        ]);
    }

    /** @test */
    public function it_should_not_log_admin_in_because_of_wrong_password()
    {
        $response = $this->post($this->adminLoginUrl, [
            'email' => $this->adminUser->email,
            'password' => self::ADMIN_USER_PASSWORD . '-wrong',
        ]);

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    /** @test */
    public function it_should_not_log_admin_in_because_of_wrong_email()
    {
        $response = $this->post($this->adminLoginUrl, [
            'email' => $this->adminUser->email . '-wrong',
            'password' => self::ADMIN_USER_PASSWORD,
        ]);

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    /** @test */
    public function it_should_fails_if_already_logged_in()
    {
        $response = $this->post($this->adminLoginUrl, [
            'email' => $this->adminUser->email,
            'password' => self::ADMIN_USER_PASSWORD,
        ]);

        $content = $response->getContent();
        $content = json_decode($content);

        // send request as an authorized user
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $content->token->accessToken,
        ])->post($this->adminLoginUrl, [
            'email' => $this->adminUser->email,
            'password' => self::ADMIN_USER_PASSWORD,
        ]);

        $response->assertStatus(Response::HTTP_BAD_REQUEST);
    }
}
