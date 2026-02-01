<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $studentsMonthly = Student::selectRaw('Month(created_at) as month, count(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('total', 'month');

        $teachersMonthly = Teacher::selectRaw('Month(created_at) as month, count(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('total', 'month');
        
        $coursesMonthly = Course::selectRaw('Month(created_at) as month, count(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('total', 'month');

        $months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        $chartData = [];

        for ($month=1; $month <= 12; $month++) {
            $chartData[] = [
                'name' => $months[$month-1],
                'Students' => $studentsMonthly->get($month, 0),
                'Teachers' => $teachersMonthly->get($month, 0),
                'Courses' => $coursesMonthly->get($month, 0),
            ];
        }

        return inertia('Dashboard', [
            'students' => Student::count(),
            'teachers' => Teacher::count(),
            'courses' => Course::count(),
            'chartData' => $chartData,
        ]);
    }
}
