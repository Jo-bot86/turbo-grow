import { useAuth } from "../context/AuthContext";

export const DashboardPage = () => {
    const { user, logout } = useAuth();

    console.log(user)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                <h1 className="text-3xl font-semibold text-emerald-700 mb-4">
                    Willkommen, {user?.username}! 🌿
                </h1>
                <p className="text-gray-600 mb-6">
                    Du bist eingeloggt mit <strong>{user?.emailAddress}</strong>
                </p>
                <button
                    onClick={logout}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition duration-200"
                >
                    Abmelden
                </button>
            </div>
        </div>
    );
};
