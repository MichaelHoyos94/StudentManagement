import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";

export default function CreateRole() {
    const { data, setData, post, errors } = useForm({
        Role: '',
        Descripcion: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    }

    return (
        <DashboardLayout>
            <main className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-9">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Role</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" action="">
                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                type="text"
                                placeholder="Admin..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus-ring-blue-500"
                            />
                            {errors.name && <div className="text-red-600 mt-1">{errors.name}</div>}
                        </div>
                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Description</label>
                            <input
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                type="text"
                                placeholder="What does this role have..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus-ring-blue-500"
                            />
                            {errors.description && <div className="text-red-600 mt-1">{errors.description}</div>}
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Create Role</button>
                    </form>
                </div>
            </main>
        </DashboardLayout>
    );
}
