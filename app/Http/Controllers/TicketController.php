<?php

namespace App\Http\Controllers;

use App\Models\Cinema;
use App\Models\Movie;
use App\Models\Seat;
use App\Models\Session;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Ticket::all();
    }

    /**
     * @param {number-number-number}$id
     * @return false|string
     */
    public function findOne($id)
    {
        $ids = explode('-', $id);
        $data = [];
        foreach ($ids as $id) {
            $item = Ticket::find($id);
            $item['session'] = Session::find($item['sessionId']);
            $item['seat'] = Seat::find($item['seatId']);
            $item['movie'] = Movie::find($item['session']['movieId']);
            $item['cinema'] = Cinema::find($item['session']['cinemaId']);
            $data[] = $item;
        }
        return json_encode($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Ticket::create([
            'sessionId' => $request['sessionId'],
            'seatId' => $request['seatId'],
            'QR' => $request['QR'],
            'price' => $request['price'],
        ]);
    }

    public function update(Request $request, Ticket $id)
    {
        Ticket::find($id)->first()->update($request->all());
        return Ticket::find($id)->first();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
