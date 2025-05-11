<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers(){
        $user = User::all();
        return response()->json($user);
    }

    public function saveUser(RegisterRequest $request){
         User::create($request->all());
         return response()->json([
            'message' => 'User created successfully',
         ]);
}
    public function destroy($userId)
    {
        User::destroy($userId);
        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }

    public function updateUser($userId, UpdateUserRequest $request)
    {
        $user = User::find($userId);
        $user->update($request->all());
        return response()->json([
            'message' => 'User updated successfully',
        ]);
    }
}
