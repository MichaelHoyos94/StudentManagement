<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolPermissionController extends Controller
{
    public function index()
    {
        return Inertia::render('Roles/Index', [
            'roles' => Role::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Roles/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
        ]);

        $rol = Role::create([
            'name' => $request->input('name'),
            'description' => $request->input('description', ''),
        ]);

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    public function AddPermissionToRole($id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        return Inertia::render('Roles/Permission', [
            'role' => $role,
            'allPermissions' => Permission::all(),
        ]);
    }

    public function AssignPermission(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->syncPermissions($request->input('permissions'));
        return redirect()->route('roles.index')->with('success', 'Permissions assigned successfully.');
    }

    public function AddUsersToRole($id)
    {
        return Inertia::render('Roles/Users', [
            'role' => Role::with('users')->findOrFail($id),
            'allUsers' => User::select('id', 'name', 'email', 'user_type')->get(),
        ]);
    }

    public function AssignUsersToRole(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $userIds = $request->input('users', []);

        User::role($role->name)->get()->each(function ($user)use ($role) {
            $user->removeRole($role->name);
        });

        foreach (User::where('id', $userIds)->get() as $user) {
            $user->assignRole($role);
        }
        return redirect()->route('roles.index')->with('success', 'Users assigned to role successfully.');
    }
}
