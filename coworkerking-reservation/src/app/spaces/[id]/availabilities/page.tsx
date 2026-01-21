"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import Navbar from "@/components/Navbar";
import AvailabilitySlot from "@/components/AvailabilitySlot";
import { Loader, Calendar, AlertCircle, Info } from "lucide-react";

export default function AvailabilitiesPage() {
  const { id } = useParams();

  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAvailabilities = () => {
    setLoading(true);
    setError("");

    // API Simulation 
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
      ];

      // error simulation
      // setError("Erreur lors du chargement des disponibilités.");
      setSlots(fakeSlots as typeof slots);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchAvailabilities();
  }, [date]);

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
          Disponibilités
        </h1>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choisir une date
          </label>
          <div className="relative">
            <input
              type="date"
              value={date}
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="ml-3">
                <p className="text-blue-800">Aucun créneau disponible pour cette date.</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && slots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map((slot, index) => (
              <div key={index}>
                <AvailabilitySlot slot={slot} spaceId={id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
