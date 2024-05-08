<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $cinemas = app('App\Http\Controllers\CinemaController')->index();
        $sesssions = app('App\Http\Controllers\SessionController')->index();
        return view('admin.index', [
            'cinemas' => $cinemas,
            'sessions' => $sesssions,
        ]);
    }
}
