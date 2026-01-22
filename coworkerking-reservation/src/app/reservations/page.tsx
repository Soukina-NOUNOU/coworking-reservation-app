import Navbar from "@/components/Navbar";
import ReservationsList from "@/components/ReservationsList";
import { getUserReservations } from "@/controller/reservationController";
import { Info } from "lucide-react";

export default async function ReservationsPage() {

  const reservations = await getUserReservations();

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
          Mes réservations
        </h1>

        {reservations.length === 0 ? (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div className="ml-3">
                <p className="text-primary-800">Vous n'avez aucune réservation.</p>
              </div>
            </div>
          </div>
        ) : (
          <ReservationsList reservations={reservations} />
        )}
      </div>
    </>
  );
}