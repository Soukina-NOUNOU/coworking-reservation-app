"use client";

import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import SpaceCard from "@/components/SpaceCard";
import Navbar from "@/components/Navbar";
import { Stack } from "@mui/material";

export interface Space {
  id: string;
  name: string;
  type: string;
  capacity: number;
  pricePerHour: number;
  thumbnail: string;
}

export default function SpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // API Simulation 
    setTimeout(() => {
      const fakeData = [
        {
          id: "1",
          name: "Salle de réunion A",
          type: "meeting-room",
          capacity: 6,
          pricePerHour: 15,
          thumbnail:
            "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1",
        },
        {
          id: "2",
          name: "Bureau individuel",
          type: "desk",
          capacity: 1,
          pricePerHour: 8,
          thumbnail:
            "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
        },
      ];

      // error simulation
      // setError("Erreur lors du chargement des espaces.");
      setSpaces(fakeData);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Espaces disponibles
        </Typography>

        {loading && (
            <Stack alignItems="center" sx={{ mt: 4 }}>
                <CircularProgress />
            </Stack>
      
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && spaces.length === 0 && (
          <Alert severity="info">Aucun espace disponible pour le moment.</Alert>
        )}

        {!loading && !error && spaces.length > 0 && (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {spaces.map((space) => (
              <Grid key={space.id}>
                <SpaceCard space={space} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
