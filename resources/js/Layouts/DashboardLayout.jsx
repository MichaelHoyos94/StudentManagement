import React from "react";

import Sidebar from "@/Components/Sidebar";
import LanguajeSwitcher from "@/Components/LanguajeSwitcher";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
                <header className="bg-white shadow p-4">
                    topbar
                    <LanguajeSwitcher />
                </header>
                <section className="p-4">
                    {children}
                </section>
            </main>
        </div>
    );
}
