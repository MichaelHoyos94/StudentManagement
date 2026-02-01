<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeachersController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sortField = $request->input('sort', 'id');
        $sortDirection = $request->input('direction', 'asc');
        $teachers = Teacher::query()->when($search, function( $query, $search) {
            $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
        })->orderBy($sortField, $sortDirection)->paginate(3)->withQueryString();
        return inertia('Teachers/Index', [
            'teachers' => $teachers,
            'search' => $search,
            'sort' => $sortField,
            'direction' => $sortDirection,
        ]);
    }
}
