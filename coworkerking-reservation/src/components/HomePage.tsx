import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Navbar from "../components/Navbar";
import Link from "next/link";


export default function HomePage() {
  return (
    <>
      <Navbar />

      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h3" gutterBottom>
            Bienvenue sur Coworking App
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            Réservez facilement un espace de coworking en quelques clics.
          </Typography>

          <Link href="/spaces" passHref>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 4 }}
            >
              Voir les espaces disponibles
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
