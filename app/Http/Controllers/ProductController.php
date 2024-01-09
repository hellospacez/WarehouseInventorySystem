<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Http\RedirectResponse; // Add this line

class ProductController extends Controller
{
    //
    public function index()
    {


        $products = Product::orderBy('name', 'asc')->get();
        return Inertia::render('Product/Index')
            ->with('products', $products);



    }

    /*    public function addproduct()
       {
           
          
         
           return Inertia::render('Product/Add');



       } */

    public function store(Request $request): RedirectResponse // Update this line
    {

        $validatedData = $request->validate([
            'name' => 'required|string',
            'SKU' => 'required|string',


        ]);


        $product = product::create($validatedData);



        session()->flash('message', 'Product successfully added.');

        // 处理完逻辑后进行重定向
        return redirect('/product');


    }


    public function delete($id)
    {
        $product = Product::find($id);

        if ($product) {
            $product->delete();
            return back()->with('success', 'Product delested successfully');
        }

        return back()->with('error', 'Product not found');
    }
}







/* 
     return Inertia::render('Product/Index', [

            'products' => product::orderBy('created_at', 'desc')->take(2)->get()

            //$products = product::orderBy('created_at', 'desc')->take(2)->get()



        ]);


    return Inertia::render('Contacts/Index', [
        'filters' => Request::all('search', 'trashed'),
        'contacts' => Auth::user()->account->contacts()
            ->with('organization')
            ->orderByName()
            ->filter(Request::only('search', 'trashed'))
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($contact) => [
                'id' => $contact->id,
                'name' => $contact->name,
                'phone' => $contact->phone,
                'city' => $contact->city,
                'deleted_at' => $contact->deleted_at,
                'organization' => $contact->organization ? $contact->organization->only('name') : null,
            ]),
    ]); 
    */
