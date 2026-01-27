import React from "react";
import { Link, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function ViewStudent() {
    const { student } = usePage().props;
    return (
        <DashboardLayout>
            <main>
                <header>
                    <h1>Student Details</h1>
                    <Link
                        href={route('students.list')}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Back to Students List ◄
                    </Link>
                </header>
                <div className="bg-white shadow rounded p-6 flex flex-col md:flex-grow gap-6">
                    <div className="flex-shrink-0">
                        {student.image_url ? (<img src={student.image_url} alt={student.name} className="w-32 h-32 rounded-full"/>) : (<div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full text-gray-500">No Image</div>  )}
                    </div>
                    <div className="flex-1 space-y-3">
                        <div>
                            <strong className="text-gray-600">Name:</strong>
                            <span className="ml-2">{student.name}</span>
                        </div>
                        <div>
                            <strong className="text-gray-600">Email:</strong>
                            <span className="ml-2">{student.email}</span>
                        </div>
                        <div>
                            <strong className="text-gray-600">Gender:</strong>
                            <span className="ml-2">{student.gender}</span>
                        </div>
                        <div>
                            <strong className="text-gray-600">Score:</strong>
                            <span className="ml-2">{student.score}</span>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
