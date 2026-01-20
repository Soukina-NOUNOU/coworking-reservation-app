import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Navbar from "@/components/Navbar";
import ReservationsList from "@/components/ReservationsList";
import { getUserReservations } from "@/controller/reservationController";

export default async function ReservationsPage() {

  const reservations = await getUserReservations();

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Mes réservations
        </Typography>

        {reservations.length === 0 ? (
          <Alert severity="info">Vous n'avez aucune réservation.</Alert>
        ) : (
          <ReservationsList reservations={reservations} />
        )}
      </Container>
    </>
  );
}