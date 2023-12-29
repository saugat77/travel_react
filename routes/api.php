<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DestinationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) { {
            return $request->user();
        }
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/destinations', [DestinationController::class, 'index']);
Route::delete('/destination/delete/{id}', [DestinationController::class, 'delete']);
Route::get('/destination/show/{id}', [DestinationController::class, 'show']);
Route::post('/destination/update/{id}', [DestinationController::class, 'update']);
Route::post('/destination/create', [DestinationController::class, 'create']);
Route::get('/destination/replace/image/{id}', [DestinationController::class, 'imageReplace']);
