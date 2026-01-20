"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReservationWithSpace } from "@/types";

interface ReservationCardProps {
  reservation: ReservationWithSpace;
  onCancel: (reservationId: string) => void;
}

export default function ReservationCard({ reservation, onCancel }: ReservationCardProps) {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 2,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h6">{reservation.space.name}</Typography>

        <Typography variant="body2" color="text.secondary">
          Type : {reservation.space.type.replace('_', ' ')}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Début : {new Date(reservation.start).toLocaleString("fr-FR")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Fin : {new Date(reservation.end).toLocaleString("fr-FR")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Prix : {reservation.space.pricePerHour} € / heure
        </Typography>
      </Box>

      <Button
        variant="outlined"
        color="error"
        onClick={() => onCancel(reservation.id)}
        disabled={new Date(reservation.start) < new Date()} // Desactivation if reservation past
      >
        {new Date(reservation.start) < new Date() ? "Passée" : "Annuler"}
      </Button>
    </Box>
  );
}
