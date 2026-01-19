import Navbar from "../../components/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Typography variant="h4">Connexion</Typography>
        {/* Form implementation to be added */}
      </Container>
    </>
  );
}
