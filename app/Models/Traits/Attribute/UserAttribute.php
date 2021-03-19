<?php

namespace App\Models\Traits\Attribute;

use Illuminate\Support\Facades\Hash;

trait UserAttribute
{
    /**
     * @param  string  $password
     * @return void
     */
    public function setPasswordAttribute(string $password)
    {
        $this->attributes['password'] = Hash::needsRehash($password) ? Hash::make($password) : $password;
    }

    /**
     * @return string
     */
    public function getNameAttribute()
    {
        return sprintf("%s %s", $this->first_name, $this->last_name);
    }

    /**
     * @return bool
     */
    public function getTwoFactorEnabledAttribute()
    {
        return $this->isEnableTwoFactor();
    }

    /**
     * @return bool
     */
    public function getIsActiveAttribute()
    {
        return $this->isActive();
    }

    /**
     * @return bool
     */
    public function getIsVerifiedAttribute()
    {
        return $this->isVerified();
    }
}
