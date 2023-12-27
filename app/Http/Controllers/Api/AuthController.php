<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $req)
    {
        $credentials = $req->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Invalid Email or Password'
            ], 422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }
    public function register(RegisterRequest $req)
    {
        $data = $req->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
    public function logout(Request $req)
    {
        /** @var User $user */
        $user = $req->user();
        $user->currentAccessToken()->delete();
        return response('', status: 204);
    }
}
