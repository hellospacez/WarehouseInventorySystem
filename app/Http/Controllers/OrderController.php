<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\Location;
use Illuminate\Http\RedirectResponse; // Add this line

class OrderController extends Controller
{
    public function index()
    {
        
        $orders = Order::orderBy('id', 'desc')->get();
        $products = Product::orderBy('id', 'asc')->get();
        $locations = Location::orderBy('id', 'asc')->get();
        return Inertia::render('Order/Index')
        ->with('orders', $orders)
        ->with('products', $products)
        ->with('locations', $locations)
        ;
    }


    public function delete($id)
    {
        $order = Order::find($id);

        if ($order) {
            $order->delete();
            return back()->with('success', 'Order delested successfully');
        }

        return back()->with('error', 'Order not found');
    }




    public function store(Request $request): RedirectResponse // Update this line
    {

        $validatedData = $request->validate([
            'product_id' => 'required|string',
            'location_id' => 'required|string',
            'qty' => 'required|string',


        ]);


        $order = order::create($validatedData);
        session()->flash('message', 'Order successfully added.');
        // 处理完逻辑后进行重定向
        return redirect('/order');


    }
}
