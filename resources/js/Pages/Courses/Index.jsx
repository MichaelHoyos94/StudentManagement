import DashboardLayout from "@/Layouts/DashboardLayout";
import { usePage, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function Courses() {
    const { t, i18n } = useTranslation();
    const { courses, search: initialSearch, sort, direction, flash } = usePage().props;
    const [search, setSearch] = useState(initialSearch || '');
    const [msg, setMsg] = useState(flash.success || '');
    const handlePageChange = (url) => {
        if (url) router.visit(url);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('courses', { search }, {
            preserveState: true,
            replace: true,
        });
    };
    const handleSort = (field) => {
        const newDirection = (sort === field && direction === 'asc') ? 'desc' : 'asc';
        router.get('courses',
            {
                search,
                sort: field,
                direction: newDirection
            },
            {
                preserveState: true,
                replace: true,
            });
    };

    const renderSortArrow = (field) => {
        if (sort === field) return null;
        return direction === 'asc' ? '↑' : '↓';
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this course?')) {
            router.visit(route('courses.delete', id), {
                method: 'delete',
            });
        }
    };

    setTimeout(() => setMsg(null), 3000);
    return (
        <DashboardLayout>
            <main className="flex-1 p-6">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Courses page</h1>
                    <p className="text-sm text-gray-500">Welcome to courses page</p>
                </header>
                <form onSubmit={handleSearch}>
                    <input type="text"
                        placeholder="Math ..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                <div>
                    <button className="button p-4 rounded"><a href={route('courses.create')}>Create Course</a></button>
                </div>
                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <table>
                        <thead className="min-w-full table-auto">
                            <tr>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('id')}># {renderSortArrow('id')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('title')}>Title {renderSortArrow('title')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('description')}>Description {renderSortArrow('description')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('teacher')}>Teacher {renderSortArrow('teacher')}</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.data.map((course, index) => (
                                <tr key={course.id}>
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{course.title}</td>
                                    <td className="p-2">{course.description}</td>
                                    <td className="p-2">{course.teacher?.name || 'No Teacher Assigned'}</td>
                                    <td>
                                        <Link href={route('courses.edit', course.id)} className="inline-block px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Edit</Link>
                                        <button
                                            className="inline-block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                            onClick={() => handleDelete(course.id)}>
                                            Delete
                                        </button>
                                        <Link href={route('course.view', course.id)}>Details</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {courses.links.map((link, idx) => (
                            <button
                                key={idx}
                                onClick={() => handlePageChange(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-1 rounded`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}