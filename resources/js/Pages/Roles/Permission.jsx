import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";


export default function Permission({ role, allPermissions }) {
    const { data, setData, post, processing } = useForm({
        permissions: role.permissions.map(p => p.name) || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('roles.assignPermission', role.id));
    };

    const handleCHeckboxChange = (permissionName) => {
        if (data.permissions.includes(permissionName)) {
            setData('permissions', data.permissions.filter(p => p !== permissionName));
        } else {
            setData('permissions', [...data.permissions, permissionName]);
        }
    };

    return (
        <DashboardLayout>
            <form onSubmit={handleSubmit}>
                {
                    allPermissions.map((permission) => (
                        <label key={permission.id} className="block p-2 border-b">
                            <input
                                type="checkbox"
                                checked={data.permissions.includes(permission.name)}
                                onChange={() => handleCHeckboxChange(permission.name)}
                            />
                            <span className="ml-2">{permission.name}</span>
                        </label>
                    ))
                }
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Assign Permissions</button>
            </form>
        </DashboardLayout>
    );
}
