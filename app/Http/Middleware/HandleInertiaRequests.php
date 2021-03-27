<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'appName' => appName(),
            'appLang' => app()->getLocale(),
            'auth' => function () use ($request) {
                if (! $request->user()) {
                    return;
                }
                // two_factor_enabled
                return array_merge(
                    $request->user()->only(
                        // 'uuid',
                        'is_active',
                        'first_name',
                        'last_name',
                        'email',
                        'profile_photo_url',
                        'profile_photo_path',
                        'two_factor_enabled'
                    ),
                    [
                        // ...
                    ]
                );
            },
            'status' => session('status') ?? '',
            'flash' => [
                'error' => $request->session()->get('flash_error'),
                'success' => $request->session()->get('flash_success'),
            ]
        ]);
    }
}
