"use client";

import { ReservationWithSpace } from "@/types";
import { Calendar, MapPin, Clock, Trash2 } from "lucide-react";

interface ReservationCardProps {
  reservation: ReservationWithSpace;
  onCancel: (reservationId: string) => void;
}

export default function ReservationCard({ reservation, onCancel }: ReservationCardProps) {
  const isPast = new Date(reservation.start) < new Date();
  const startDate = new Date(reservation.start);
  const endDate = new Date(reservation.end);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="card mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          {/* Reservation Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {reservation.space.name}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                isPast 
                  ? 'bg-gray-100 text-gray-600' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {isPast ? 'Terminée' : 'À venir'}
              </span>
            </div>

            {/* Date and Time */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">{formatDate(startDate)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>De {formatTime(startDate)} à {formatTime(endDate)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{reservation.space.type.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Price Info */}
            <div className="text-sm text-gray-500">
              Tarif : {reservation.space.pricePerHour} € / heure
            </div>
          </div>

          {/* Action Button */}
          <div className="ml-6">
            {!isPast && (
              <button
                onClick={() => onCancel(reservation.id)}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4" />
                <span>Annuler</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}