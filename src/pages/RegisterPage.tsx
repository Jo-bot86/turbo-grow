import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export const RegisterPage = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loaded, setLoaded] = useState(true);
    const { register } = useAuth();
    const navigate = useNavigate();

    //const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoaded(false);
        if (password !== confirmPassword) {
            setLoaded(true);
            alert("Die Passwörter stimmen nicht überein!");
            return;
        }
        try {
            //await sleep(5500);
            await register({username, emailAddress, password});
            setLoaded(true);
            navigate("/login")
        } catch {
            setLoaded(true);
            alert("Registrierung fehlgeschlagen");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-emerald-700 mb-6">
                    Konto erstellen 🌿
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Benutzername
                        </label>
                        <input
                            id="username"
                            autoComplete="true"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="z. B. gartenfreund92"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-Mail-Adresse
                        </label>
                        <input
                            id="email"
                            autoComplete="true"
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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Passwort bestätigen
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-emerald-600"
                        disabled={!loaded}
                    >
                        {!loaded &&
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        }
                        Registrieren
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Bereits ein Konto?{" "}
                    <a
                        href="/login"
                        className="text-emerald-700 font-medium hover:underline"
                    >
                        Einloggen
                    </a>
                </p>
            </div>
        </div>
    );
};
