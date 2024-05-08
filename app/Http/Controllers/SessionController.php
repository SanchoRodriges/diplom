<?php

namespace App\Http\Controllers;

use App\Models\Cinema;
use App\Models\Movie;
use App\Models\Session;
use App\Models\Ticket;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $session = Session::all();
        return json_encode($session);
    }

    public function findOne($id) {
        $session = Session::find($id);
        $session['cinema'] = Cinema::find($session['cinemaId']);
        $session['movie'] = Movie::find($session['movieId']);
        $tickets = Ticket::all()->where('sessionId', $id);
        $ticketsIds = [];
        foreach ($tickets as $ticket) {
            $ticketsIds[] = $ticket['seatId'];
        }
        $tickets = $ticketsIds;

        $session['tickets'] = $tickets;
        return json_encode($session);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'cinemaId' => '',
            'movieId' => '',
            'avatar' => '',
            'timeStart' => '',
            'timeEnd' => '',
        ]);
        return Session::create($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Session $id)
    {
        return Session::find($id)
            ->first()
            ->update($request->all())
            ->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Session $id)
    {
        Session::find($id)->first()->delete();
        $test = Session::find($id);
        return response($test ?? 'OK', 200);
    }
}
