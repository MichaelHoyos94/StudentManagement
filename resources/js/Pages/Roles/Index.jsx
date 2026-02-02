import DashboardLayout from "@/Layouts/DashboardLayout";
import { usePage, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function Roles() {
    const { roles, search: initialSearch, sort, direction, flash } = usePage().props;
    const [msg, setMsg] = useState(flash.success || '')

    setTimeout(() => setMsg(null), 3000);
    return (
        <DashboardLayout>
            <main className="flex-1 p-6">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Courses page</h1>
                    <p className="text-sm text-gray-500">Welcome to courses page</p>
                </header>
                <Link
                    className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    href={route('roles.create')}
                >
                    Create Role
                </Link>
                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <table>
                        <thead className="min-w-full table-auto">
                            <tr>
                                <th className="p-2 cursor-pointer"> # </th>
                                <th className="p-2 cursor-pointer">Role</th>
                                <th className="p-2 cursor-pointer">Description</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role, index) => (
                                <tr key={role.id}>
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{role.name}</td>
                                    <td className="p-2">
                                        <Link
                                            className="text-blue-500 hover:text-blue-700"
                                            href={route('roles.addPermissionToRole', role.id)}
                                        >
                                            Add Permission
                                        </Link>
                                    </td>
                                    <td className="p-2">
                                        <Link
                                            className="inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                            href={route('roles.addUsersToRole', role.id)}
                                        >
                                            Assign Users
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </DashboardLayout>
    );
}
