import { Link } from "react-router";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white">
                <h1 className="text-2xl font-bold text-green-700">🌱 Anbauplaner</h1>
                <div className="flex gap-4">
                    <Link
                        to="/login"
                        className="px-4 py-2 text-green-700 border border-green-700 rounded-xl hover:bg-green-700 hover:text-white transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition"
                    >
                        Registrieren
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex flex-col items-center text-center mt-20 px-6">
                <h2 className="text-4xl font-bold text-green-800 mb-4">
                    Dein digitaler Gartenhelfer
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mb-8">
                    Plane dein Gemüsebeet, behalte den Überblick über deine Pflanzen und
                    erhalte wertvolle Tipps für eine reiche Ernte – alles an einem Ort.
                </p>
                <Link
                    to="/register"
                    className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition"
                >
                    Jetzt starten
                </Link>
            </main>

            {/* Feature Grid */}
            <section className="grid md:grid-cols-3 gap-8 px-8 mt-24 max-w-6xl mx-auto">
                {[
                    {
                        title: "🌿 Anbauplanung",
                        text: "Behalte stets im Blick, was du wann und wo anbaust.",
                    },
                    {
                        title: "📅 Saisonkalender",
                        text: "Erhalte Hinweise zum besten Pflanz- und Erntezeitpunkt.",
                    },
                    {
                        title: "🪴 Beete & Pflanzenverwaltung",
                        text: "Verwalte deine Beete digital – einfach und übersichtlich.",
                    },
                ].map((f) => (
                    <div
                        key={f.title}
                        className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold text-green-700 mb-2">
                            {f.title}
                        </h3>
                        <p className="text-gray-600">{f.text}</p>
                    </div>
                ))}
            </section>

            {/* Footer */}
            <footer className="mt-20 py-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Anbauplaner – Entwickelt mit 🌱 & ❤️
            </footer>
        </div>
    );
}
