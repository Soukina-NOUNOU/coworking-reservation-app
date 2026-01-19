"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";

export default function ConfirmReservationPage() {
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
    <>
      <Navbar />

      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Confirmation de réservation
        </Typography>
        {!spaceId || !start || !end ? (
          <Alert severity="error">
            Paramètres invalides. Impossible d’afficher la réservation.
          </Alert>
        ) : (
          <>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Récapitulatif</Typography>

              <Typography>
                <strong>Espace :</strong> {spaceId}
              </Typography>

              <Typography>
                <strong>Début :</strong>{" "}
                {new Date(start).toLocaleString("fr-FR")}
              </Typography>

              <Typography>
                <strong>Fin :</strong> {new Date(end).toLocaleString("fr-FR")}
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 4 }}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Confirmer la réservation"
              )}
            </Button>
          </>
        )}
      </Container>
    </>
  );
}
