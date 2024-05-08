<?php

use Illuminate\Support\Facades\Route;

Route::view('/client/{path?}', 'client');
Route::view('/hall/{path?}', 'client');
Route::view('/payment/{path?}', 'client');
Route::view('/ticket/{path?}', 'client');
Route::get('/', function () {
    return redirect('/client');
});

Auth::routes([
    Route::middleware('auth:sanctum')->get('/admin', function () {
        return view('admin');
    }),
]);
