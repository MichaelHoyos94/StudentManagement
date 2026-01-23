<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentsController extends Controller
{
    public function index()
    {

        return inertia('Students/Index', [
            'course' => 'Computer Science'
        ]);
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
