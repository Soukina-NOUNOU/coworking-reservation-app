"use client";

import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import ReservationCard from "@/components/ReservationCard";

interface Reservation {
  id: string;
  spaceId: string;
  spaceName: string;
  start: string;
  end: string;
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API Simulation : TODO: reservations fetching
  useEffect(() => {
    setTimeout(() => {
      const fakeReservations = [
        {
          id: "1",
          spaceId: "A1",
          spaceName: "Salle de réunion A",
          start: "2026-01-20T09:00:00",
          end: "2026-01-20T10:00:00",
        },
        {
          id: "2",
          spaceId: "B2",
          spaceName: "Bureau individuel",
          start: "2026-01-22T14:00:00",
          end: "2026-01-22T16:00:00",
        },
      ];

      // eroor simulation
      // setError("Erreur lors du chargement des réservations.");
      setReservations(fakeReservations);
      setLoading(false);
    }, 1200);
  }, []);

  // Handle cancel reservation
  const handleCancel = (id: string) => {
    setLoading(true);

    setTimeout(() => {
      // API Simulation 
      const updated = reservations.filter((r) => r.id !== id);
      setReservations(updated);
      setLoading(false);

      toast.success("Réservation annulée !");
    }, 800);
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Mes réservations
        </Typography>
        {loading && (
          <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
        )}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && reservations.length === 0 && (
          <Alert severity="info">Vous n’avez aucune réservation.</Alert>
        )}
    
        {!loading && !error && reservations.length > 0 && (
          <>
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCancel={handleCancel}
              />
            ))}
          </>
        )}
      </Container>
    </>
  );
}
