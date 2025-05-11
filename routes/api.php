<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('users',[UserController::class,'getUsers']);
Route::post('user',[UserController::class,'saveUser']);
Route::delete('user/{userId}',[UserController::class,'destroy']);
Route::patch('user/{userId}',[UserController::class,'updateUser']);
