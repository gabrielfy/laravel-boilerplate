<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\LocaleController;

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

Route::get('lang/{lang}', [LocaleController::class, 'store'])->name('locale.store');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/**
 * Private routes
 */
Route::middleware(['auth', 'verified'])->group(function() {
    /**
     * App Routes
     */
    Route::prefix('u')->group(function() {
        includeRouteFiles(__DIR__.'/app/');
    });

    /**
     * Admin Routes
     */
    Route::prefix('a')->name('admin.')->group(function() {
        includeRouteFiles(__DIR__.'/admin/');
    });
});
