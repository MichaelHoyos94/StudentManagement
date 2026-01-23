import DashboardLayout from "@/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

function Teachers() {
    const { user_global } = usePage().props;
    const { t, i18n } = useTranslation();
    return (
        <main className="flex-1 p-6">
            <header className="mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-800">{t('Teachers Page')}</h1>
                <p className="text-sm text-gray-500">{t('Welcome to teachers page')}</p>
            </header>
            <section className="space-y-4">
                <div className="bg-white p-6 rounded shadow">
                    <p className=" text-gray-700">{t('Here you can manage teacher data')}</p>
                </div>
                <div className="bg-white p-6 rounded shadow text-sm text-gray-600">
                    <p><strong>{t('Name')}: {user_global}</strong></p>
                    <p><strong>{t('Last Name')}:</strong></p>
                </div>
            </section>
        </main>
    );
}

// El diseño persistente no se ve afectado por la navegación entre páginas.
// No se monta y desmonta con cada cambio de página.
Teachers.layout = function (page) {
    return <DashboardLayout>{page}</DashboardLayout>
}

export default Teachers;
