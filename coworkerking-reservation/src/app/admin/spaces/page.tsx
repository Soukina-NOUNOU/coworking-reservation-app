import AdminUnauthorized from "@/app/admin/unauthorized/page";
import AdminStats from "@/components/AdminStats";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/controller/userController";
import { getAdminStats } from "@/serverAction/adminAction";
import Link from "next/link";

export default async function AdminSpacesPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return (
        <AdminUnauthorized />
    );
  }

  const stats = await getAdminStats();

  return (
    <>
      <Navbar/>
      <div className="max-w-7xl mx-auto mt-16 p-8">
        {/* Instructions */}
        <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded mb-8">
          <h3 className="font-semibold text-primary-800 mb-2">Instructions</h3>
          <ul className="text-sm text-primary-700 space-y-1">
            <li>• Pour <strong>modifier</strong> ou <strong>supprimer</strong> un espace, rendez-vous sur la page de l'espace en question</li>
            <li>• Les boutons d'administration apparaîtront automatiquement en haut de la page</li>
            <li>• Seuls les administrateurs peuvent voir et utiliser ces fonctionnalités</li>
          </ul>
        </div>

        {/* Navigation buttons */}
        <div className="mb-8 flex flex-wrap gap-4 items-center">
          <Link
            href="/spaces"
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          >
            ← Voir tous les espaces
          </Link>
          
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold">Espaces Administrateur</h1>
          </div>

          <Link
            href="/admin/spaces/create"
            className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition font-medium"
          >
            + Créer un nouvel espace
          </Link>
        </div>

        {/* Statistics */}
        <AdminStats {...stats} />
      </div>
    </>
  );
}
