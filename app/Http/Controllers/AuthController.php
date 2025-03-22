<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){
        $data=$request->validate([
            'username'=>'required',
            'password'=>'required',
        ]);

        $user=User::where('username',$data['username'])->first();

        if(!$user||!Hash::check($data['password'],$user->password)){
            return [
              'message'=>'wrong password or Username'
            ];
        }

        $token=$user->createToken($user->username)->plainTextToken;

       $user=[
           'user' =>$user,
           'token' =>$token
       ];

        return response()->json(['message' => 'User logged in successfully', 'user' => $user], 200);
    }

    public function getLoginCode(){
        return User::pluck('code')->first();
    }
}
