<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Models\Location;


class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::orderBy('id', 'desc')->get();
        
        return Inertia::render('Location/Index')
            ->with('locations', $locations);
    }



    /*     public function addlocation()
        {
            $locations = Location::all()->sortBy("id");
            ;
            return Inertia::render('Location/Add')
                ->with('locations', $locations);

        } */

    public function delete($id)
    {
        $location = Location::find($id);

        if ($location) {
            $location->delete();
            return back()->with('success', 'Location delested successfully');
        }

        return back()->with('error', 'Location not found');
    }

    public function store(Request $request): RedirectResponse
    {

        $validatedData = $request->validate([
            'name' => 'required|string',

        ]);


        $location = Location::create($validatedData);



        session()->flash('message', 'Location successfully added.');

        // 处理完逻辑后进行重定向
        return redirect('/location');


    }



}
