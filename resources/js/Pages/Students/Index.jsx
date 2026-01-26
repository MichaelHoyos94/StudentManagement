import DashboardLayout from "@/Layouts/DashboardLayout";
import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function Students() {

    const { t, i18n } = useTranslation();
    const { students, search: initialSearch, sort, direction } = usePage().props;

    const [search, setSearch] = useState(initialSearch || '');

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

    return (
        <DashboardLayout>
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
                            </tr>
                        </thead>
                        <tbody>
                            {students.data.map((sudent, index) => (
                                <tr>
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{sudent.name}</td>
                                    <td className="p-2">{sudent.email}</td>
                                    <td className="p-2">{sudent.gender}</td>
                                    <td className="p-2">{sudent.score}</td>
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
