<?php

namespace App\Http\Controllers\Profile;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Repositories\BrowserSessionsRepository;
use Exception;

class OtherBrowserSessionsController extends Controller
{
    /**
     * @var BrowserSessionsRepository
     */
    protected $browserSessionsRepository;

    /**
     * @param BrowserSessionsRepository  $browserSessionsRepository
     */
    public function __construct(BrowserSessionsRepository $browserSessionsRepository)
    {
        $this->browserSessionsRepository = $browserSessionsRepository;
    }

    /**
     * Logout from other browser sessions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => 'password',
        ]);

        try {
            $this->browserSessionsRepository->logoutOtherDevices($request);
            $this->browserSessionsRepository->deleteOtherSessionRecords($request);
        } catch (Exception) {
            // TODO: Make handle error
        }

        return back(303);
    }
}
