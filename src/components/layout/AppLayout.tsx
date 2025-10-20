import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar user={user} logout={logout} />
            <main className="flex-grow p-6">{children}</main>
        </div>
    );
}
