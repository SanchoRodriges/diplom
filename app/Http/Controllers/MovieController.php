<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Session;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movies = Movie::all();

        foreach ($movies as $movie) {
            $movie['sessions'] = Session::where('movieId', $movie['id'])->get();
        }

        return json_encode($movies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'string',
            'description' => 'string',
            'length' => 'integer',
            'avatar' => '',
        ]);

        $path = $request->file('avatar')->store('movies', 'public');
        $data['avatar'] = $path;
        return Movie::create($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Movie $movie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $id)
    {
        Movie::find($id)->first()->delete();
        $sessions = Session::all();
        foreach ($sessions as $session) {
            if ($session['movieId'] == $id['id']) {
                $session->delete();
            }
        }
        return json_encode(Session::all());
    }
}
