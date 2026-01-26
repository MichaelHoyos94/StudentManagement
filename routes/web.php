<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*Route::inertia('students/{page}', 'Students/Index', [
    'name' => 'John Doe',
    'age' => 20,
    'course' => 'Computer Science'
])->name('students.index');

Route::get('students/{page}/{lang?}', function ($page, $lang = 'en') {
    return Inertia::render('Students/Index', [
        'name' => 'John Doe',
        'age' => 20,
        'course' => 'Computer Science',
        'page' => $page,
        'lang' => $lang,
    ]);
});*/

Route::controller(StudentsController::class)->group(function () {
    Route::get('students', 'index')->name('students.list');
    Route::get('students/create', 'create')->name('students.create');
    Route::post('students', 'store')->name('students.store');
    Route::get('students/data/{page}/{lang?}', 'withData')->name('students.index');
});

Route::inertia('teachers', 'Teachers/Index')->name('teachers.list');

Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});
