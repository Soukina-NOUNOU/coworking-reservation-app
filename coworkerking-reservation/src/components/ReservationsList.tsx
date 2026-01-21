"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import ReservationCard from "@/components/ReservationCard";
import { ReservationWithSpace } from "@/types";
import { cancelReservationAction } from "@/actions/reservations";

interface ReservationsListProps {
  reservations: ReservationWithSpace[];
}

export default function ReservationsList({ reservations: initialReservations }: ReservationsListProps) {
  const [reservations, setReservations] = useState(initialReservations);
  const [loading, setLoading] = useState(false);

  // Handle cancel reservation
  const handleCancel = async (id: string) => {
    setLoading(true);

    try {
      const result = await cancelReservationAction(id);
      
      if (result.success) {
        const updated = reservations.filter((r) => r.id !== id);
        setReservations(updated);
        toast.success("Réservation annulée !");
      } else {
        toast.error(result.error || "Erreur lors de l'annulation");
      }
    } catch (error) {
      toast.error("Erreur lors de l'annulation de la réservation");
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader className="h-6 w-6 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <>
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onCancel={handleCancel}
        />
      ))}
    </>
  );
}