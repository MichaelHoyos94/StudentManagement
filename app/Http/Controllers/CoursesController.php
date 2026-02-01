<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sortField = $request->input('sort', 'id');
        $sortDirection = $request->input('direction', 'asc');
        $courses = Course::with('teacher:id,name')
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            })->orderBy($sortField, $sortDirection)->paginate(3)->withQueryString();
        return inertia('Courses/Index', [
            'courses' => $courses,
            'search' => $search,
            'sort' => $sortField,
            'direction' => $sortDirection,
        ]);
    }
}
