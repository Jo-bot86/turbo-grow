import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <nav className="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
                <Link to="/dashboard" className="text-xl font-semibold">
                    🌿 Anbauplaner
                </Link>

                <div className="flex items-center gap-4">
                    {user && <span className="text-sm">{user.username}</span>}
                    {user && (
                        <button
                            onClick={logout}
                            className="bg-white text-emerald-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>

            <main className="flex-grow p-6">{children}</main>
        </div>
    );
}
