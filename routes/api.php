<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/sessions', [App\Http\Controllers\SessionController::class, 'index']);
//Route::post('/sessions/store', [App\Http\Controllers\SessionController::class, 'store']);

Route::get('/cinemas', [App\Http\Controllers\CinemaController::class, 'index']);
Route::post('/cinemas/store', [App\Http\Controllers\CinemaController::class, 'store']);
Route::put('/cinemas/{id}', [App\Http\Controllers\CinemaController::class, 'update']);
Route::delete('/cinemas/{id}', [App\Http\Controllers\CinemaController::class, 'destroy']);

Route::get('/seats/{idCinema}', [App\Http\Controllers\SeatController::class, 'index']);
Route::get('/seats/one/{id}', [App\Http\Controllers\SeatController::class, 'findOne']);
Route::post('/seats/store/cinema', [App\Http\Controllers\SeatController::class, 'storeCinema']);
Route::post('/seats/store', [App\Http\Controllers\SeatController::class, 'store']);
Route::put('/seats/{id}', [App\Http\Controllers\SeatController::class, 'update']);
Route::delete('/seats/cinema/{id}', [App\Http\Controllers\SeatController::class, 'destroyCinema']);
Route::delete('/seats/{id}', [App\Http\Controllers\SeatController::class, 'destroy']);

Route::get('/movies', [App\Http\Controllers\MovieController::class, 'index']);
Route::post('/movies/store', [App\Http\Controllers\MovieController::class, 'store']);
Route::delete('/movies/{id}', [App\Http\Controllers\MovieController::class, 'destroy']);

Route::get('/sessions', [App\Http\Controllers\SessionController::class, 'index']);
Route::get('/sessions/{id}', [App\Http\Controllers\SessionController::class, 'findOne']);
Route::post('/sessions/store', [App\Http\Controllers\SessionController::class, 'store']);
Route::delete('/sessions/{id}', [App\Http\Controllers\SessionController::class, 'destroy']);

Route::get('/tickets', [App\Http\Controllers\TicketController::class, 'index']);
Route::get('/tickets/{id}', [App\Http\Controllers\TicketController::class, 'findOne']);
Route::post('/tickets/store', [App\Http\Controllers\TicketController::class, 'store']);
Route::put('/tickets/{id}', [App\Http\Controllers\TicketController::class, 'update']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
