"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Navbar from "@/components/Navbar";
import AvailabilitySlot from "@/components/AvailabilitySlot";
import { PickerValue } from "@mui/x-date-pickers/internals";

export default function AvailabilitiesPage() {
  const { id } = useParams();

  const [date, setDate] = useState<PickerValue>(dayjs());
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAvailabilities = () => {
    setLoading(true);
    setError("");

    // API Simulation 
    setTimeout(() => {
      const fakeSlots = [
        {
          start: `${date?.format("YYYY-MM-DD")}T09:00:00`,
          end: `${date?.format("YYYY-MM-DD")}T10:00:00`,
        },
        {
          start: `${date?.format("YYYY-MM-DD")}T10:00:00`,
          end: `${date?.format("YYYY-MM-DD")}T11:00:00`,
        },
      ];

      // error simulation
      // setError("Erreur lors du chargement des disponibilités.");
      setSlots(fakeSlots as typeof slots);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchAvailabilities();
  }, [date]);

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Disponibilités
        </Typography>

        <Box sx={{ mb: 4 }}>
          <DatePicker
            label="Choisir une date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </Box>

        {loading && (
          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <CircularProgress />
          </Grid>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && slots.length === 0 && (
          <Alert severity="info">Aucun créneau disponible pour cette date.</Alert>
        )}

        {!loading && !error && slots.length > 0 && (
          <Grid container spacing={2}>
            {slots.map((slot, index) => (
              <Grid key={index}>
                <AvailabilitySlot slot={slot} spaceId={id} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
