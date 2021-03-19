<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Permission as SpatiePermission;
use App\Models\Traits\HasUuid;

class Permission extends SpatiePermission
{
    use HasFactory, HasUuid;
}
