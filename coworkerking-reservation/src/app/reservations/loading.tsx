import { Loader2 } from "lucide-react";

export default function ReservationsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-600" />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Chargement des réservations...
        </h2>
        <p className="mt-2 text-gray-600">
          Récupération de vos réservations en cours et passées.
        </p>
      </div>
    </div>
  );
}