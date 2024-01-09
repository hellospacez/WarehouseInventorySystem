<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\ProfileController;
use GuzzleHttp\Middleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/location',  [LocationController::class, 'index'])->name('location');
    Route::delete('/location/{id}', [LocationController::class, 'delete']);
    Route::post('/location/add',  [LocationController::class, 'store']);

    Route::get('/product',  [ProductController::class, 'index'])->name('product');
    Route::post('/product/add',  [ProductController::class, 'store']);
    Route::delete('/product/{id}', [ProductController::class, 'delete']);


    Route::get('/order',  [OrderController::class, 'index'])->name('order');
    Route::post('/order/add',  [OrderController::class, 'store']);
    Route::delete('/order/{id}', [OrderController::class, 'delete']);


    Route::get('/stock',  [stockController::class, 'index'])->name('stock');


    
});

























require __DIR__.'/auth.php';
