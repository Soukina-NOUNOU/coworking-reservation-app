"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Space } from "@/types";

interface SpaceCardProps {
  space: Space;
}

export default function SpaceCard({ space }: SpaceCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="160"
        image={space.thumbnail || "/placeholder-space.jpg"}
        alt={space.name}
      />

      <CardContent>
        <Typography variant="h6">{space.name}</Typography>

        <Typography variant="body2" color="text.secondary">
          Type : {space.type.replace('_', ' ')}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Capacité : {space.capacity} personnes
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          {space.pricePerHour} € / heure
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            size="small"
            component={Link}
            href={`/spaces/${space.id}`}
          >
            Voir détails
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
