<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Jenssegers\Agent\Agent;

class BrowserSessionsRepository
{
    /**
     * Get the current sessions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Support\Collection
     */
    public function getFromRequest(Request $request): Collection
    {
        if (config('session.driver') !== 'database') {
            return collect();
        }

        return $this->formatSessions(
            DB::connection(config('session.connection'))
                ->table(config('session.table', 'sessions'))
                ->where('user_id', $request->user()->getAuthIdentifier())
                ->orderBy('last_activity', 'desc')
                ->get()
        );
    }

    /**
     * @param  Collection  $sessions
     * @return Collection
     */
    protected function formatSessions(Collection $sessions): Collection
    {
        return $sessions->map(function ($session) {
            $agent = $this->createAgent($session);
            return (object) [
                'agent' => [
                    'is_desktop' => $agent->isDesktop(),
                    'platform' => $agent->platform(),
                    'browser' => $agent->browser(),
                ],
                'ip_address' => $session->ip_address,
                'is_current_device' => $session->id === Auth::getSession()->getId(),
                'last_active' => carbon($session->last_activity)->diffForHumans(),
            ];
        });
    }

    /**
     * Create a new agent instance from the given session.
     *
     * @param  mixed  $session
     * @return \Jenssegers\Agent\Agent
     */
    protected function createAgent($session): Agent
    {
        return tap(new Agent, function ($agent) use ($session) {
            $agent->setUserAgent($session->user_agent);
        });
    }

    /**
     * Logout other devices
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function logoutOtherDevices(Request $request): void
    {
        Auth::logoutOtherDevices($request->password);
    }

    /**
     * Delete the other browser session records from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function deleteOtherSessionRecords(Request $request)
    {
        if (config('session.driver') !== 'database') {
            return;
        }

        DB::connection(config('session.connection'))
            ->table(config('session.table', 'sessions'))
            ->where('user_id', $request->user()->getAuthIdentifier())
            ->where('id', '!=', Auth::getSession()->getId())
            ->delete();
    }
}
