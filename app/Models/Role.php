<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;
use App\Models\Traits\HasUuid;

class Role extends SpatieRole
{
    use HasFactory, HasUuid;
}
