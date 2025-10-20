import {useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router";

export const LoginPage = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [loaded, setLoaded] = useState(true);
    const {login} = useAuth();
    const navigate = useNavigate();


    //const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoaded(false);
            await login({emailAddress, password});
            //await sleep(1500);
            setLoaded(true);
            navigate("/dashboard");
        } catch (err) {
            alert("Login fehlgeschlagen");
            setLoaded(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-emerald-700 mb-6">
                    Willkommen zurück 🌱
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-Mail-Adresse
                        </label>
                        <input
                            id="email"
                            autoComplete="on"
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="dein@mail.de"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Passwort
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!loaded} // optional: deaktiviert während Ladephase
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-emerald-600"
                    >
                        {!loaded && (
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}
                        <span>Einloggen</span>

                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Noch kein Konto?{" "}
                    <a
                        href="/register"
                        className="text-emerald-700 font-medium hover:underline"
                    >
                        Registrieren
                    </a>
                </p>
            </div>
        </div>
    );
};
