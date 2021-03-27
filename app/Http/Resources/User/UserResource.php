<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Role\RoleResource;

class UserResource extends JsonResource
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
            'uuid' => $this->uuid,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'profile_photo_url' => $this->profile_photo_url,
            'two_factor_enabled' => $this->two_factor_enabled,
            'is_active' => $this->is_active,
            'last_login_ip' => $this->last_login_ip,
            'last_login_at' => $this->last_login_at,
            'is_verified' => $this->is_verified,
            'provider' => $this->provider,
            'roles' => $this->roles->pluck('name'),
            'permissions' => $this->permissions->pluck('name'),
        ];
    }
}
