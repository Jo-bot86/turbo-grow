import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { SIDEBAR_SECTIONS } from "./sidebar.config";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

   
    return (
        <>
            <aside
                className={`bg-white border-r border-gray-200 w-64 p-5 flex-shrink-0 fixed md:static h-full md:h-auto z-50 transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="flex justify-between items-center mb-8 md:hidden">
                    <h2 className="text-lg font-semibold text-gray-800">Menü</h2>
                    <button onClick={() => setSidebarOpen(false)}>
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                {SIDEBAR_SECTIONS.map((section) => (
                    <div key={section.title} className="mb-6">
                        <h3 className="uppercase text-gray-400 text-xs mb-3 font-semibold tracking-wide">
                            {section.title}
                        </h3>
                        <ul className="space-y-1">
                            {section.links.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all 
                                        ${
                                            location.pathname === link.path
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </aside>

            {/* Mobile toggle */}
            <button
                className="md:hidden fixed top-20 left-4 bg-emerald-700 text-white p-2 rounded-lg shadow-lg z-50"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <Menu className="h-5 w-5" />
            </button>
        </>
    );
}
