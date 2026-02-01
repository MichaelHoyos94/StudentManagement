import DashboardLayout from "@/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function Dashboard() {
    const { students, teachers, courses, chartData } = usePage().props;
    console.log(chartData);
    return (
        <DashboardLayout>
            <main className="p-6 space-y-10">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">📈 Dashboard Overview</h1>
                { /* Page Title */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 text-blue-800 border border-blue-2 shadow-md rounded-lg p-6 mb-4 gap-">
                        <span className="text-sm font-medium uppercase text-gray-600">Students</span>
                        <span className="text-3xl font-bold">{students}</span>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-50 text-green-800 border border-green-2 shadow-md rounded-lg p-6 mb-4 gap-">
                        <span className="text-sm font-medium uppercase text-gray-600">Teachers</span>
                        <span className="text-3xl font-bold">{teachers}</span>
                    </div>
                    <div className="bg-gradient-to-br from-red-100 to-red-50 text-red-800 border border-red-2 shadow-md rounded-lg p-6 mb-4 gap-4">
                        <span className="text-sm font-medium uppercase text-gray-600">Courses</span>
                        <span className="text-3xl font-bold">{courses}</span>
                    </div>
                </section>
                { /* Bar Chart */}
                <section className="bg-white border rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Activity (Students & Teachers)</h2>
                    <div className="w-full h-120">

                        <BarChart
                            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                            responsive
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 0,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis width="auto" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Students" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
                            <Bar dataKey="Teachers" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} />
                            <Bar dataKey="Courses" fill="#ffc658" activeBar={{ fill: 'cyan', stroke: 'red' }} radius={[10, 10, 0, 0]} />
                        </BarChart>

                    </div>
                </section>
            </main>
        </DashboardLayout>
    );
}