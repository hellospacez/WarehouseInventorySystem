<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Location;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index()
    {
        
        $stocks = Stock::orderBy('location_id', 'asc')->get();
        $products = Product::orderBy('id', 'asc')->get();
        $locations = Location::orderBy('id', 'asc')->get();
        // ...

        return Inertia::render('Stock/Index')
        ->with('stocks', $stocks)
        ->with('products', $products)
        ->with('locations', $locations)
        ;
    }

}
