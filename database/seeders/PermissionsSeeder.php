<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'view students',
            'create students',
            'edit students',
            'delete students',
            'view teachers',
            'create teachers',
            'edit teachers',
            'delete teachers',
            'view courses',
            'create courses',
            'edit courses',
            'delete courses',
            'create roles',
            'edit roles',
            'delete roles',
            'view roles',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}
