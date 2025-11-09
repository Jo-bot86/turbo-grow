import { Link } from "react-router";
import type { UserDTO } from "../../api/types/user/userType";

interface NavbarProps{
    user: UserDTO| null;
    logout: () => void
}

export default function Navbar(props: NavbarProps){
    const {user, logout} = props;

    return (
        <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
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
    );
}