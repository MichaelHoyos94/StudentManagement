import React from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import LanguajeSwitcher from "@/Components/LanguajeSwitcher";
import { router } from "@inertiajs/react";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col min-h-dvh">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex">
                    <section className="">
                        {children}
                    </section>
                </main>
            </div>
        </div>
    );
}
