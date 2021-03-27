<?php

namespace App\Repositories\Admin;

use App\Models\Permission;
use App\Repositories\BaseRepository;

class PermissionRepository extends BaseRepository
{
    /*
     * @param Permission $permission
     * @return void
     */
    public function __construct(Permission $permission)
    {
        $this->model = $permission;
    }

    public function byGroup()
    {
        return $this->orderBy('group')->get('*')->groupBy('group');
    }
}
