import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {
    const { url, props } = usePage();
    const permissions = props.permissions;
    const lang = localStorage.getItem('lang') || 'en';
    const baseLinkClasses = "block p-2 rounded transition-colors duration-200";
    const activeClasses = "bg-blue-100 text-blue-700 font-semibold";
    const inactiveClasses = "text-gray-700 hover:bg-gray-100";

    const hasPermission = (permissionName) => permissions.includes(permissionName);

    return (
        <aside className="w-64 bg-gray-100 p-4">
            <ul className="space-y-2">
                {hasPermission('view students') && (
                    <li>
                        <Link href={`/students?lang=${lang}`} className={`${baseLinkClasses} ${url ===`/students?lang=${lang}` ? activeClasses : inactiveClasses}`}>Students</Link>
                    </li>
                )}
                {hasPermission('view teachers') && (
                    <li>
                        <Link href={`/teachers?lang=${lang}`} className={`${baseLinkClasses} ${url ===`/teachers?lang=${lang}` ? activeClasses : inactiveClasses}`}>Teachers</Link>
                    </li>
                )}
                {hasPermission('view courses') && (
                    <li>
                        <Link href={`/courses?lang=${lang}`} className={`${baseLinkClasses} ${url ===`/courses?lang=${lang}` ? activeClasses : inactiveClasses}`}>Courses</Link>
                    </li>
                )}
                {hasPermission('view_roles') && (
                    <li>
                        <Link href={`/roles?lang=${lang}`} className={`${baseLinkClasses} ${url ===`/roles?lang=${lang}` ? activeClasses : inactiveClasses}`}>Roles</Link>
                    </li>
                )}
            </ul>
        </aside>
    );
}
