<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sortField = $request->input('sort', 'id');
        $sortDirection = $request->input('direction', 'asc');
        $students = Student::query()->when($search, function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%');
        })->orderBy($sortField, $sortDirection)->paginate(3)->withQueryString();
        return inertia('Students/Index', [
            'students' => $students,
            'search' => $search,
            'sort' => $sortField,
            'direction' => $sortDirection,
        ]);
    }

    public function create()
    {
        return inertia('Students/Create');
    }

    public function store(Request $request)
    {
        $student = new Student();
        $student->name = $request->input('name');
        $student->email = $request->input('email');
        $student->gender = $request->input('gender');
        $student->score = $request->input('score');
        $student->save();
        return redirect()->route('students.list');
    }

    public function withData($page, $lang = 'en')
    {
        return inertia('Students/Index', [
            'name' => 'John Doe',
            'age' => 20,
            'course' => 'Computer Science',
            'page' => $page,
            'lang' => $lang
        ]);
    }
}
