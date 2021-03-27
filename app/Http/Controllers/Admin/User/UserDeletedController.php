<?php


namespace App\Http\Controllers\Admin\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use App\Exceptions\GeneralException;
use App\Models\User;
use App\Http\Resources\User\UserCollection;
use Inertia\Inertia;

class UserDeletedController extends Controller
{
    /**
     * @var UserRepository
     */
    protected UserRepository $userRepository;

    /**
     *
     * @param UserRepository $userRepository
     * @return void
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Where to redirect users after action.
     *
     * @return string
     */
    public function redirectPath()
    {
        return route('admin.users.index');
    }

    /**
     * Display a listing of the resource deleted.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Support\Renderable|string
     */
    public function deleted(Request $request)
    {
        $this->authorize(['permanently delete user', 'restore user']);

        return Inertia::render('Admin/Users/Deleted', [
            'users' => new UserCollection(
                $this->userRepository
                    ->search($request->only('search'))
                    ->onlyTrashed()
                    ->paginate()
            )
        ]);
    }

    /**
     * Permanently delete a user
     *
     * @param  string  $uuid
     * @return \Illuminate\Http\Response
     * @throws GeneralException
     */
    public function permanentlyDelete(string $uuid)
    {
        $this->authorize('permanently delete user');

        $user = User::onlyTrashed()->uuid($uuid)->firstOrFail();

        $this->userRepository->permanentlyDelete($user);

        return redirect($this->redirectPath())
            ->withFlashSuccess(__('The user was permanently deleted.'));
    }

    /**
     * Restore user delete
     *
     * @param  string  $uuid
     * @return \Illuminate\Http\Response
     * @throws GeneralException
     */
    public function restore(string $uuid)
    {
        $this->authorize('restore user');

        $user = User::onlyTrashed()->uuid($uuid)->firstOrFail();

        $this->userRepository->restore($user);

        return redirect($this->redirectPath())
            ->withFlashSuccess(__('The user was successfully restored.'));
    }
}
