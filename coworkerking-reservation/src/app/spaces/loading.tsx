import { Loader2 } from "lucide-react";

export default function SpacesLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Chargement des espaces...
        </h2>
        <p className="mt-2 text-gray-600">
          Récupération des informations sur les espaces disponibles.
        </p>
      </div>
    </div>
  );
}