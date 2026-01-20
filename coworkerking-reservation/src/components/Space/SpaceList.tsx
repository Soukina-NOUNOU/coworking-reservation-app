"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import SpaceCard from "@/components/SpaceCard";
import Navbar from "@/components/Navbar";
import { Space } from "@/types";

interface SpaceListProps {
  spaces: Space[];
}

export default function SpaceList({ spaces }: SpaceListProps) {
  return (
    <>
      <Navbar />

      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Espaces disponibles
        </Typography>

        {spaces.length === 0 && (
          <Alert severity="info">Aucun espace disponible pour le moment.</Alert>
        )}

        {spaces.length > 0 && (
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
