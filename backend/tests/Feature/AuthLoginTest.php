<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_login_alias_field(): void
    {
        User::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => bcrypt('secret123'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        $response = $this->postJson('/api/auth/login', [
            'login' => 'admin@test.com',
            'password' => 'secret123',
        ]);

        $response->assertOk();
        $response->assertJsonPath('user.email', 'admin@test.com');
        $response->assertJsonPath('user.role', 'admin');
        $this->assertNotEmpty($response->json('token'));
    }
}
