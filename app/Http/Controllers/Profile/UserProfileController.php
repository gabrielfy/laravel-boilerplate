<?php

namespace App\Http\Controllers\Profile;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Repositories\BrowserSessionsRepository;

class UserProfileController extends Controller
{
    /**
     * @var BrowserSessionsRepository
     */
    protected $browserSessionsRepository;

    /**
     * @param  BrowserSessionsRepository  $browserSessionsRepository
     * @return void
     */
    public function __construct(BrowserSessionsRepository $browserSessionsRepository)
    {
        $this->browserSessionsRepository = $browserSessionsRepository;
    }

    /**
     * Display a user profile view.
     *
     * @param  Request  $request
     * @return \Illuminate\Contracts\Support\Renderable|string
     */
    public function index(Request $request)
    {
        return Inertia::render('Profile', [
            'sessions' => $this->browserSessionsRepository->getFromRequest($request)
        ]);
    }
}
