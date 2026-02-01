import React from "react";

import Sidebar from "@/Components/Sidebar";
import LanguajeSwitcher from "@/Components/LanguajeSwitcher";
import { router } from "@inertiajs/react";

const handleLogOut = (e) => {
    e.preventDefault();
    router.post(route('logout'));
};

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
                <header className="bg-white shadow p-4">
                    topbar
                    <LanguajeSwitcher />
                    <button onClick={handleLogOut} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                        Logout
                    </button>
                </header>
                <section className="p-4">
                    {children}
                </section>
            </main>
        </div>
    );
}
