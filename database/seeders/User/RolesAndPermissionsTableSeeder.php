<?php

namespace Database\Seeders\User;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolesAndPermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            // General permission
            ['group' => 'general', 'name' => 'access admin'],

            // Permissions user
            ['group' => 'users', 'name' => 'view users'],
            ['group' => 'users', 'name' => 'create users'],
            ['group' => 'users', 'name' => 'update users'],
            ['group' => 'users', 'name' => 'delete users'],
            ['group' => 'users', 'name' => 'restore users'],
            ['group' => 'users', 'name' => 'permanently delete users'],
            ['group' => 'users', 'name' => 'change password users'],
            ['group' => 'users', 'name' => 'deactivate users'],
            ['group' => 'users', 'name' => 'reactivate users'],
            ['group' => 'users', 'name' => 'confirm email verification users'],
            ['group' => 'users', 'name' => 'unconfirm email verification users'],
            ['group' => 'users', 'name' => 'resend email verification users'],
            ['group' => 'users', 'name' => 'clear session users'],
            ['group' => 'users', 'name' => 'impersonate users'],

            // Permission role
            ['group' => 'roles', 'name' => 'create roles'],
            ['group' => 'roles', 'name' => 'update roles'],
            ['group' => 'roles', 'name' => 'delete roles'],
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'guard_name' => 'web',
                'name' => $permission['name'],
                'group' => $permission['group'],
            ]);
        }

        // Create roles
        foreach (config('boilerplate.auth.role') as $key => $name) {
            Role::create([
                'guard_name' => 'web',
                'name' => $name,
            ]);
        }

        // Associate permissions with roles
        $admin = Role::findByName(config('boilerplate.auth.role.admin'));

        $admin->givePermissionTo(Permission::all());
    }
}
