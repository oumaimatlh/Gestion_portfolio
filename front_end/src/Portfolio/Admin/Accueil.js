import React from "react";
import { Link } from "react-router-dom";

const professors = [
  {
    id: 1,
    name: "Dr. Farah El Merabthi",
    grade: "Professeur",
    equipe: "Equipe IA",
    avatar: "https://ui-avatars.com/api/?name=Farah+El+Merabthi",
  },
  {
    id: 2,
    name: "Dr. Yasmine Haddad",
    grade: "Maître de Conférences",
    equipe: "Equipe Réseaux",
    avatar: "https://ui-avatars.com/api/?name=Yasmine+Haddad",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Tableau de Bord Admin</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/admin/Dashboard/Statistique">
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">📊 Statistiques</button>
        </Link>
        <Link to="/admin/Dashboard/Equipe">
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">👥 Gérer les équipes</button>
        </Link>
        <Link to="/admin/Dashboard/Laboratoire">
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">🧪 Laboratoires</button>
        </Link>
        <Link to="/admin/Dashboard/Departement">
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">🏢 Départements</button>
        </Link>
        <Link to="/admin/Dashboard/CreateProf">
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">➕ Créer un compte professeur</button>
        </Link>
        <Link to="/admin/Dashboard/Grade">
          <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">🎓 Gérer les grades</button>
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Professeurs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professors.map((prof) => (
            <div key={prof.id} className="bg-white rounded-2xl shadow-md p-4 text-center">
              <img
                src={prof.avatar}
                alt={prof.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-bold">{prof.name}</h3>
              <p className="text-sm text-gray-600">{prof.grade}</p>
              <p className="text-sm text-gray-500 italic">{prof.equipe}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
