"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Navbar from "@/components/Navbar";
import SpaceDetails from "@/components/Spacedetails";
import SpaceGallery from "@/components/SpaceGallery";
import { Space } from "@/app/spaces/page";

export default function SpaceDetailPage() {
  const { id } = useParams();
  const [space, setSpace] = useState<Space & {description: string; equipments: string[]; photos: string[]} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // API Simulation 
    setTimeout(() => {
      const fakeSpace = {
        id,
        name: "Salle de réunion A",
        description:
          "Une salle moderne équipée d’un écran, d’un tableau blanc et d’une connexion Wi-Fi haut débit.",
        type: "meeting-room",
        capacity: 6,
        pricePerHour: 15,
        equipments: ["Wi-Fi", "Écran", "Climatisation", "Café"],
        photos: [
          "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1",
          "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
        ],
      };

      // error simulation
      // setError("Erreur lors du chargement des détails de l'espace.");
      setSpace(fakeSpace as typeof space);
      setLoading(false);
    }, 1200);
  }, [id]);

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 6 }}>
        {loading && (
          <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && space && (
          <>
            <SpaceGallery photos={space.photos} />
            <SpaceDetails space={space} />
          </>
        )}
      </Container>
    </>
  );
}
