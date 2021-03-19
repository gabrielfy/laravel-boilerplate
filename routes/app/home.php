<?php

use App\Http\Controllers\HomeController;

Route::get('home', [HomeController::class, 'index'])->name('home');

