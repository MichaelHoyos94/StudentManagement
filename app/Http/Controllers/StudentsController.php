<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function show($id)
    {
        $student = Student::findOrFail($id);
        $student->image_url = $student->image ? asset('storage/' . $student->image) : null;
        return inertia('Students/View', [
            'student' => $student
        ]);
    }

    public function create()
    {
        return inertia('Students/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'gender' => 'required|in:male,female',
            'score' => 'required|numeric|min:0|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $student = new Student();
        $student->name = $request->input('name');
        $student->email = $request->input('email');
        $student->gender = $request->input('gender');
        $student->score = $request->input('score');
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('students', 'public');
            $student->image = $path;
        }
        $student->save();
        return redirect()->route('students.list')->with('success', 'Student created successfully.');
    }

    public function edit($id)
    {
        $student = Student::findOrFail($id);
        return inertia('Students/Edit', [
            'student' => $student
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:students,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $request->input('id'),
            'gender' => 'required|in:male,female',
            'score' => 'required|numeric|min:0|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $student = Student::findOrFail($request->input('id'));
        $student->name = $request->input('name');
        $student->email = $request->input('email');
        $student->gender = $request->input('gender');
        $student->score = $request->input('score');
        if ($request->hasFile('image')) {
            if ($student->image && Storage::disk('public')->exists($student->image)) {
                Storage::disk('public')->delete($student->image);
            }
            $path = $request->file('image')->store('students', 'public');
            $student->image = $path;
        }
        $student->update();
        return redirect()->route('students.list')->with('success', 'Student updated successfully.');
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        if ($student->image && Storage::disk('public')->exists($student->image)) {
            Storage::disk('public')->delete($student->image);
        }
        $student->delete();
        return redirect()->route('students.list')->with('success', 'Student deleted successfully.');
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
