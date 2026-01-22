import { Home } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function AdminUnauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-md w-full mx-auto text-center space-y-8 p-8">
        <div className="space-y-6">
          <div className="mb-8">
           <img
            src="/unauthorized.jpg"
            alt="Unauthorized Access"
            className="max-w-xs mx-auto object-contain"
          />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900">Accès Administrateur</h1>
            <h2 className="text-xl font-semibold text-gray-800">
              Droits insuffisants
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Seuls les administrateurs peuvent accéder à cette section. 
              Veuillez vous rapprocher d'un administrateur.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <BackButton />
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}