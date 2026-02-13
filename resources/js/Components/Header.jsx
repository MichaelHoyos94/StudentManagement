import LanguajeSwitcher from "./LanguajeSwitcher";
import { router } from "@inertiajs/react";

export default function Header() {

    const handleLogOut = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        router.get(route('login'));
    };

    return (
        <div className="flex w-full bg-slate-400 p-4">
            <h1 className="text-2xl font-bold text-slate-800">Scholar Platform</h1>
            {/* Login button at end */}
            <div>
                { /* LOGO */}
                <p className="text-2xl">📚</p>
            </div>
            <div className="flex gap-4 ml-auto">
                <LanguajeSwitcher />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" onClick={handleLogin}>
                    Login
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition" onClick={handleLogOut}>
                    logout
                </button>
            </div>
        </div>
    );
};
