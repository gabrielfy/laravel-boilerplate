<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a dashboard view.
     *
     * @return \Illuminate\Contracts\Support\Renderable|string
     */
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }
}
