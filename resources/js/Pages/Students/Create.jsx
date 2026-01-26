import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";

export default function CreateStudent() {
    const {data, setData, post} = useForm({
        name: '',
        email: '',
        gender: 'm',
        score: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('students.store'));
    }

    return (
        <DashboardLayout>
            <main className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-9">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Student</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" action="">
                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                type="text"
                                placeholder="Joe doe..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus-ring-blue-500"
                            />
                        </div>
                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                type="email"
                                placeholder="user@example.com..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus-ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Gender</label>
                            <select
                                name="gender"
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Score</label>
                            <input
                                name="score"
                                value={data.score}
                                onChange={(e) => setData('score', e.target.value)}
                                type="number"
                                placeholder="5..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Create Student</button>
                    </form>
                </div>
            </main>
        </DashboardLayout>
    );
}
