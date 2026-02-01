import { useForm } from "@inertiajs/react";

export default function Register() {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-800 text-center mb-2">
                    Inicio de sesión
                </h1>
                <p className="text-sm text-slate-500 text-center mb-6">
                    Ingresa tus credenciales para acceder a tu cuenta
                </p>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Correo institucional
                        </label>
                        <input
                            type="email"
                            placeholder="usuario@universidad.edu"
                            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400"
                            value={data.email}
                            required
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <div className='text-sm text-red-600 mt-1'>{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400"
                            value={data.password}
                            required
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-slate-700 text-white py-2 rounded-md hover:bg-slate-800 transition"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <p className="text-xs text-slate-500 text-center mt-6">
                    © {new Date().getFullYear()} Plataforma Académica
                </p>
            </div>
        </div>
    );
}