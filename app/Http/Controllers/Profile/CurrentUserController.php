<?php

namespace App\Http\Controllers\Profile;

use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CurrentUserController extends Controller
{
    /**
     * Delete the current user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Contracts\Auth\StatefulGuard  $auth
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, StatefulGuard $auth)
    {
        $request->validate([
            'password' => 'required|string|password',
        ]);

        $request->user()->delete();

        $auth->logout();

        return Inertia::location(url('/'));
    }
}
