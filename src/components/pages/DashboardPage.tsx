import Sidebar from "../layout/Sidebar";

export default function DashboardPage() {
    return (
        <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
            <Sidebar />

            <main className="flex-1 p-8 ml-0 transition-all">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Schläge & Beete", desc: "Verwalte deine Beete und Felder" },
                        { title: "Aufgaben", desc: "Organisiere deine Arbeiten effizient" },
                        { title: "Ressourcen", desc: "Verwalte Saatgut und Kulturen" },
                    ].map((card) => (
                        <div
                            key={card.title}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                            <p className="text-sm text-gray-500">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
