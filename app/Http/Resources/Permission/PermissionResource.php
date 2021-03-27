<?php

namespace App\Http\Resources\Permission;

use Illuminate\Http\Resources\Json\JsonResource;

class PermissionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'group' => $this->group,
            'uuid' => $this->uuid,
            'guard_name' => $this->guard_name,
            'name' => $this->name,
        ];
    }
}
