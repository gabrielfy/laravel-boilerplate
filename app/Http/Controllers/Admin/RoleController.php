<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Role\StoreRoleRequest;
use App\Http\Requests\Admin\Role\UpdateRoleRequest;
use App\Http\Requests\Admin\Role\DestroyRoleRequest;
use App\Repositories\Admin\PermissionRepository;
use App\Repositories\Admin\RoleRepository;
use App\Exceptions\GeneralException;
use App\Models\Role;
use Inertia\Inertia;
use App\Http\Resources\Role\RoleCollection;
use App\Http\Resources\Role\RoleResource;
use App\Http\Resources\Permission\PermissionCollection;
use App\Http\Resources\Permission\PermissionResource;

class RoleController extends Controller
{

    /**
     * @var RoleRepository $roleRepository
     */
    protected RoleRepository $roleRepository;

    /**
     * @var PermissionRepository $permissionRepository
     */
    protected PermissionRepository $permissionRepository;

    /**
     * RoleController constructor.
     * @param RoleRepository $roleRepository
     * @param PermissionRepository $permissionRepository
     * @retuen void
     */
    public function __construct(RoleRepository $roleRepository, PermissionRepository $permissionRepository)
    {
        $this->roleRepository = $roleRepository;
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Where to redirect users after action.
     *
     * @return string
     */
    public function redirectPath()
    {
        return route('admin.roles.index');
    }

    /**
     * Display a listing of the resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Support\Renderable|string
     */
    public function index(Request $request)
    {
        $this->authorize(['create role', 'update role', 'delete role']);

        return Inertia::render('Admin/Roles', [
            'roles' => new RoleCollection(
                $this->roleRepository
                    ->search($request->only('search'))
                    ->paginate(10)
            )
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function create()
    {
        $this->authorize('create role');

        return Inertia::render('Admin/Roles/Create', [
            'permissions' => (
                new PermissionCollection($this->permissionRepository->orderBy('group')->get())
            )->groupBy('group'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\Admin\Role\StoreRoleRequest $request
     * @return \Illuminate\Http\Response
     * @throws GeneralException
     */
    public function store(StoreRoleRequest $request)
    {
        $this->authorize('create role');

        $this->roleRepository->store($request->validated());

        return redirect($this->redirectPath())
            ->withFlashSuccess(__('The role was successfully created.'));
    }

    /**
     * Display the specified resource.
     *
     * @param  Role  $role
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function show(Role $role)
    {
        //..
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Role  $role
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function edit(Role $role)
    {
        $this->authorize('update role');

        return Inertia::render('Admin/Roles/Edit', [
            'permissions' => (
                new PermissionCollection($this->permissionRepository->orderBy('group')->get())
            )->groupBy('group'),
            'role' => new RoleResource($role)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\Admin\Role\StoreRoleRequest $request
     * @param \App\Modes\Role $role
     * @return \Illuminate\Http\Response
     * @throws GeneralException
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $this->authorize('update role');

        $this->roleRepository->update($role, $request->validated());

        return redirect($this->redirectPath())
            ->withFlashSuccess(__('The role was successfully updated.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Http\Requests\Admin\Role\DestroyRoleRequest $request
     * @param \App\Models\Role $role
     * @return \Illuminate\Http\Response
     * @throws GeneralException
     */
    public function destroy(DestroyRoleRequest $request, Role $role)
    {
        $this->authorize('delete role');

        $this->roleRepository->delete($role);

        return redirect($this->redirectPath())
            ->withFlashSuccess(__('The role was successfully deleted.'));
    }
}
