<?php

use App\Http\Controllers\DashboardController;
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

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::controller(StudentsController::class)->group(function () {
    Route::get('students', 'index')->name('students.list');
    Route::get('students/create', 'create')->name('students.create');
    Route::post('students', 'store')->name('students.store');
    Route::get('students/data/{page}/{lang?}', 'withData')->name('students.index');
    Route::get('student/edit/{id}', 'edit')->name('students.edit');
    Route::post('student/update', 'update')->name('students.update');
    Route::delete('student/destroy/{id}', 'destroy')->name('students.delete');
    Route::get('student/view/{id}', 'show')->name('student.view');
});

Route::inertia('teachers', 'Teachers/Index')->name('teachers.list');

require __DIR__.'/auth.php';

Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});