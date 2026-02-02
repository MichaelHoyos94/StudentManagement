<?php

use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RolPermissionController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\TeachersController;
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

Route::controller(TeachersController::class)->group(function () {
    Route::get('teachers', 'index')->name('teachers.list');
    Route::get('teachers/create', 'create')->name('teachers.create');
    Route::post('teachers', 'store')->name('teachers.store');
    Route::get('teacher/view/{id}', 'show')->name('teacher.view');
    Route::get('teacher/edit/{id}', 'edit')->name('teachers.edit');
    Route::post('teacher/update', 'update')->name('teachers.update');
    Route::delete('teacher/destroy/{id}', 'destroy')->name('teachers.delete');
});

Route::controller(CoursesController::class)->group(function () {
    Route::get('courses', 'index')->name('courses.list');
    Route::get('courses/create', 'create')->name('courses.create');
    Route::post('courses', 'store')->name('courses.store');
    Route::get('course/view/{id}', 'show')->name('course.view');
    Route::get('courses/edit/{id}', 'edit')->name('courses.edit');
    Route::post('courses/update', 'update')->name('courses.update');
    Route::delete('courses/destroy/{id}', 'destroy')->name('courses.delete');
});

Route::prefix('roles')->group(function () {
    Route::get('/', [RolPermissionController::class, 'index'])->name('roles.index');
    Route::get('/create', [RolPermissionController::class, 'create'])->name('roles.create');
    Route::post('/roles', [RolPermissionController::class, 'store'])->name('roles.store');
    Route::get('add-permission-to-role/{id}', [RolPermissionController::class, 'AddPermissionToRole'])->name('roles.addPermissionToRole');
    Route::post('assign-permission/{id}', [RolPermissionController::class, 'AssignPermission'])->name('roles.assignPermission');
    Route::get('add-users-to-role/{id}', [RolPermissionController::class, 'AddUsersToRole'])->name('roles.addUsersToRole');
    Route::post('assign-users-to-role/{id}', [RolPermissionController::class, 'AssignUsersToRole'])->name('roles.assignUsersToRole');
});

require __DIR__.'/auth.php';

Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});
