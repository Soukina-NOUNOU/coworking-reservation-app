"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, Loader } from "lucide-react";

function ConfirmReservationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const spaceId = searchParams.get("spaceId");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = () => {
    setLoading(true);
    setError("");

    // API Simulation 
    setTimeout(() => {
      const success = true; // TODO: replace with real API response

      if (success) {
        toast.success("Réservation confirmée !");
        setLoading(false);

        setTimeout(() => {
          router.push("/reservations");
        }, 1500);
      } else {
        setError("Impossible de confirmer la réservation");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="card p-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">
            Confirmation de réservation
          </h1>

          {!spaceId || !start || !end ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-red-800">
                    Paramètres invalides. Impossible d'afficher la réservation.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Récapitulatif de votre réservation
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <span className="text-sm text-gray-600">Espace :</span>
                      <p className="font-medium text-gray-900">{spaceId}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <span className="text-sm text-gray-600">Début :</span>
                      <p className="font-medium text-gray-900">
                        {new Date(start).toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <span className="text-sm text-gray-600">Fin :</span>
                      <p className="font-medium text-gray-900">
                        {new Date(end).toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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

              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin mr-2" />
                    Confirmation en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Confirmer la réservation
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConfirmReservationPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="card p-8">
              <div className="flex justify-center">
                <Loader className="h-8 w-8 animate-spin text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      }>
        <ConfirmReservationContent />
      </Suspense>
    </>
  );
}
