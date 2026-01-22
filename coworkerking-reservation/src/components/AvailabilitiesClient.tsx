"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import AvailabilitySlot from "@/components/AvailabilitySlot";
import { Loader, Calendar, AlertCircle, Info, Edit } from "lucide-react";

interface Reservation {
  id: string;
  start: Date;
  end: Date;
  userId: string;
}

interface AvailabilitiesClientProps {
  spaceId: string;
  spaceName: string;
  reservations: Reservation[];
}

export default function AvailabilitiesClient({ spaceId, spaceName, reservations }: AvailabilitiesClientProps) {
  const searchParams = useSearchParams();
  const editReservationId = searchParams.get('editReservation');
  
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // minDate for unusable dates in the past
  const minDate = dayjs().format('YYYY-MM-DD');

  const isSlotReserved = (slotStart: string, slotEnd: string) => {
    return reservations.some(reservation => {
      const reservationStart = new Date(reservation.start).getTime();
      const reservationEnd = new Date(reservation.end).getTime();
      const slotStartTime = new Date(slotStart).getTime();
      const slotEndTime = new Date(slotEnd).getTime();

      // Check for overlap
      return (slotStartTime < reservationEnd && slotEndTime > reservationStart);
    });
  };

  const fetchAvailabilities = () => {
    setLoading(true);
    setError("");

    // Hours
    setTimeout(() => {
      const fakeSlots = [
        {
          start: `${date}T09:00:00`,
          end: `${date}T10:00:00`,
        },
        {
          start: `${date}T10:00:00`,
          end: `${date}T11:00:00`,
        },
        {
          start: `${date}T11:00:00`,
          end: `${date}T12:00:00`,
        },
        {
          start: `${date}T13:00:00`,
          end: `${date}T14:00:00`,
        },
        {
          start: `${date}T14:00:00`,
          end: `${date}T15:00:00`,
        },
        {
          start: `${date}T15:00:00`,
          end: `${date}T16:00:00`,
        },
        {
          start: `${date}T16:00:00`,
          end: `${date}T17:00:00`,
        },
      ];

      // Add reservation status to slots
      const slotsWithReservationStatus = fakeSlots.map(slot => ({
        ...slot,
        isReserved: isSlotReserved(slot.start, slot.end),
        editReservationId: editReservationId
      }));

      setSlots(slotsWithReservationStatus);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchAvailabilities();
  }, [date, reservations]);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">
          Disponibilités
        </h1>
        {editReservationId && (
          <div className="ml-4 flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
            <Edit className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Modification pour l'espace : {spaceName.toUpperCase()}</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choisir une date
        </label>
        <div className="relative">
          <input
            type="date"
            value={date}
            min={minDate}
            onChange={(e) => setDate(e.target.value)}
            className="w-full md:w-auto pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 text-primary-600 animate-spin" />
          <span className="ml-3 text-gray-600">Chargement des disponibilités...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="ml-3">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && slots.length === 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
            <div className="ml-3">
              <p className="text-primary-800">Aucun créneau disponible pour cette date.</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && slots.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map((slot, index) => (
            <div key={index}>
              <AvailabilitySlot slot={slot} spaceId={spaceId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}