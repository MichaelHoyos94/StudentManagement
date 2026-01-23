import DashboardLayout from "@/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function Students() {
    const { t, i18n } = useTranslation();
    const { course } = usePage().props;
    return (
        <DashboardLayout>
            <main className="flex-1 p-6">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{t('Students Page')}</h1>
                    <p className="text-sm text-gray-500">{t('Welcome to students page')}</p>
                </header>
                <section className="space-y-4">
                    <div className="bg-white p-6 rounded shadow">
                        <p className=" text-gray-700">{t('Here you can manage student data')}</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow text-sm text-gray-600">
                        <p><strong>{t('Name')}:</strong></p>
                        <p><strong>{t('Last Name')}:</strong></p>
                        <p><strong>{t('Course')}:</strong> {t(course)}</p>
                    </div>
                </section>
            </main>
        </DashboardLayout>
    )
}
