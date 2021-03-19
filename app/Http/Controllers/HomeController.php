<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a home view.
     *
     * @return \Illuminate\Contracts\Support\Renderable|string
     */
    public function index()
    {
        return Inertia::render('Home');
    }
}
