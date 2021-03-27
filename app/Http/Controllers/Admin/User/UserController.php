<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\User\UpdateUserRequest;
use App\Http\Requests\Admin\User\StoreUserRequest;
use App\Http\Requests\Admin\User\DestroyUserRequest;
use App\Repositories\Admin\PermissionRepository;
use App\Repositories\Admin\RoleRepository;
use App\Repositories\UserRepository;
use App\Exceptions\GeneralException;
use App\Models\User;
use Inertia\Inertia;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\Role\RoleCollection;
use App\Http\Resources\Permission\PermissionCollection;

class UserController extends Controller
{
    /**
     * @var UserRepository
     */
    protected UserRepository $userRepository;

    /**
     * @var RoleRepository
     */
    protected RoleRepository $roleRepository;

    /**
     * @var PermissionRepository
     */
    protected PermissionRepository $permissionRepository;

    /**
     * @param UserRepository $userRepository
     * @param RoleRepository $roleRepository
     * @param PermissionRepository $permissionRepository
     * @return void
     */
    public function __construct(
        UserRepository $userRepository,
        RoleRepository $roleRepository,
        PermissionRepository $permissionRepository
    )
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Where to redirect users after action.
     *
     * @return string
     */
    private function redirectPath()
    {
        return route('admin.users.index');
    }

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Support\Renderable|string
     * @throws Exception
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(Request $request)
    {
        $this->authorize(['create user', 'update user', 'view user', 'delete user']);

        return Inertia::render('Admin/Users', [
            'users' => new UserCollection(
                $this->userRepository
                    ->search($request->only('search'))
                    ->paginate()
            )
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function create()
    {
        $this->authorize('create user');

        return Inertia::render('Admin/Users/Create', [
            'permissions' => (
                new PermissionCollection($this->permissionRepository->orderBy('group')->get())
            )->groupBy('group'),
            'roles' => new RoleCollection($this->roleRepository->orderBy('name')->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreUserRequest $request
     * @return \Illuminate\Http\Response
     * @throws GeneralException
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(StoreUserRequest $request)
    {
        $this->authorize('create user');

        $this->userRepository->store($request->validated());

        return redirect($this->redirectPath())
            ->withFlashSuccess(__('The user was successfully created.'));
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Contracts\Support\Renderable
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show(User $user)
    {
        $this->authorize('view user');

        return Inertia::render('Admin/Users/Show', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Contracts\Support\Renderable
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function edit(User $user)
    {
        $this->authorize('update user');

        return Inertia::render('Admin/Users/Edit', [
            'user' => new UserResource($user),
            'permissions' => (
                new PermissionCollection($this->permissionRepository->orderBy('group')->get())
            )->groupBy('group'),
            'roles' => new RoleCollection($this->roleRepository->orderBy('name')->get()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param User $user
     * @return \Illuminate\Http\Response
     * @throws GeneralException
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Throwable
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $this->authorize('update user');

        $this->userRepository->update($user, $request->validated());

        return redirect($this->redirectPath())
            ->withFlashSuccess(__('The user was successfully updated.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param DestroyUserRequest $request
     * @param User $user
     * @return \Illuminate\Http\Response
     * @throws GeneralException
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy(DestroyUserRequest $request, User $user)
    {
        $this->authorize('delete user');

        $this->userRepository->delete($user);

        return redirect($this->redirectPath())
            ->withFlashSuccess(__('The user was successfully deleted.'));
    }
}
