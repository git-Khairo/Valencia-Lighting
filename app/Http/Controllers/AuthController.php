<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function login(LoginRequest $request){

        
        if(!Auth::attempt($request->only('username', 'password'))){
            return response()->json([
                'message' => 'Wrong username or password',
            ], 401);
        }
        
        $user = User::where('username',$request->username)->first();

        $token = $user->createToken($user->username)->plainTextToken;

       $user = [
           'user' =>$user,
           'token' =>$token
       ];

        return response()->json(['message' => 'User logged in successfully', 'user' => $user], 200);
    }

    public function getLoginCode(){
        return User::pluck('code')->first();
    }

    public function checkAuth(Request $request){
        $token = $request->token;
        
        if (!$token) {
            return response()->json(false);
        }
        
        $cleanToken = preg_replace('/^\d+\|/', '', $token);
        
        $hashedToken = hash('sha256', $cleanToken);
    
        $tokenExists = DB::table('personal_access_tokens')
            ->where('token', $hashedToken)
            ->exists();
    
        if ($tokenExists) {
            return response()->json(true);
        }

        return response()->json($request);
    
        return response()->json(false);
    }
}
