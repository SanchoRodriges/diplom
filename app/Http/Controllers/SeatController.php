<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSeatRequest;

class SeatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($idCinema)
    {
        $data = Seat::where('cinemaId', $idCinema)->get();
        return json_encode($data);
    }
    public function findOne(Seat $id)
    {
        return json_encode($id);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSeatRequest $request)
    {
        return Seat::create([
            'cinemaId' => $request['cinemaId'],
            'row' => $request['row'],
            'seat' => $request['seat'],
            'status' => $request['status']
        ]);
    }

    public function storeCinema(Request $request)
    {
        foreach ($request->all() as $item) {
            Seat::create([
                'cinemaId' => $item['cinemaId'],
                'row' => $item['row'],
                'seat' => $item['seat'],
                'status' => $item['status']
            ]);
        }
        return Seat::where('cinemaId', $request[0]['cinemaId'])->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Seat $id)
    {
        return Seat::find($id)
            ->first()
            ->update($request->all())
            ->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seat $id)
    {
        return Seat::find($id)
            ->first()
            ->delete();
    }

    public function destroyCinema($id)
    {
        return Seat::where('cinemaId', $id)->delete();
    }
}
