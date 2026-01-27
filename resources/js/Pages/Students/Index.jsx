import DashboardLayout from "@/Layouts/DashboardLayout";
import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Link } from "@inertiajs/react";

export default function Students() {

    const { t, i18n } = useTranslation();
    const { students, search: initialSearch, sort, direction, flash } = usePage().props;

    const [search, setSearch] = useState(initialSearch || '');
    const [msg, setMsg] = useState(flash.success || '');

    const handlePageChange = (url) => {
        if (url) router.visit(url);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('students', { search }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSort = (field) => {
        const newDirection = (sort === field && direction === 'asc') ? 'desc' : 'asc';
        router.get('students',
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
        if (confirm('Are you sure you want to delete this student?')) {
            router.visit(route('students.delete', id), {
                method: 'delete',
            });
        }
    };

    setTimeout(() => setMsg(null), 3000);

    return (
        <DashboardLayout>
            {msg && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{msg}</span>
                </div>
            )}
            <main className="flex-1 p-6">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{t('Students Page')}</h1>
                    <p className="text-sm text-gray-500">{t('Welcome to students page')}</p>
                </header>
                <form onSubmit={handleSearch}>
                    <input type="text"
                        placeholder="John Doe ..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                <div>
                    <button className="button p-4 rounded"><a href={route('students.create')}>Create Student</a></button>
                </div>
                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <table>
                        <thead className="min-w-full table-auto">
                            <tr>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('id')}># {renderSortArrow('id')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>Name {renderSortArrow('name')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('email')}>Email {renderSortArrow('email')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('gender')}>Gender {renderSortArrow('gender')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('score')}>Score {renderSortArrow('score')}</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.data.map((student, index) => (
                                <tr>
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{student.name}</td>
                                    <td className="p-2">{student.email}</td>
                                    <td className="p-2">{student.gender}</td>
                                    <td className="p-2">{student.score}</td>
                                    <td>
                                        <Link href={route('students.edit', student.id)} className="inline-block px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Edit</Link>
                                    </td>
                                    <button
                                        className="inline-block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        onClick={() => handleDelete(student.id)}>
                                        Delete
                                    </button>
                                    <Link href={route('student.view', student.id)}>Details</Link>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {students.links.map((link, idx) => (
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
    )
}
