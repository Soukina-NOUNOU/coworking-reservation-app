"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface ReservationCardProps {
  reservation: {
    id: string;
    spaceName: string;
    start: string;
    end: string;
  };
  onCancel: (reservationId: string) => void;
}

export default function ReservationCard(props: Readonly<ReservationCardProps>) {
    const { reservation, onCancel } = props;
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
        <Typography variant="h6">{reservation.spaceName}</Typography>

        <Typography variant="body2" color="text.secondary">
          Début : {new Date(reservation.start).toLocaleString("fr-FR")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Fin : {new Date(reservation.end).toLocaleString("fr-FR")}
        </Typography>
      </Box>

      <Button
        variant="outlined"
        color="error"
        onClick={() => onCancel(reservation.id)}
      >
        Annuler
      </Button>
    </Box>
  );
}
