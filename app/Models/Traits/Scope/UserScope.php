<?php

namespace App\Models\Traits\Scope;

trait UserScope
{
    /**
     * @param  mixed $query
     * @return mixed
     */
    public function scopeOnlyDeactivated($query)
    {
        return $query->whereActive(false);
    }

    /**
     * @param  mixed $query
     * @return mixed
     */
    public function scopeOnlyActive($query)
    {
        return $query->whereActive(true);
    }
}
