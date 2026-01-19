"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulation API
    setTimeout(() => {
      if (email === "test@test.com" && password === "Password123") {
        router.push("/");
        toast.success("Connexion réussie !");
      } else {
        setError("Identifiants incorrects");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Connexion
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Mot de passe"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </Box>
      </Container>
    </>
  );
}
