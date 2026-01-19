"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    

    // Simulation API
    setTimeout(() => {
      if (form.email === "existe@test.com") {
        setError("Cet email est déjà utilisé");
      } else {
        setSuccess(true);
        router.push("/login");
        toast.success("Compte créé avec succès, vous pouvez vous connecter !");
      }
      setLoading(false);
    }, 1000);

    
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Inscription
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Compte créé avec succès !</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            name="firstname"
            label="Prénom"
            fullWidth
            required
            margin="normal"
            value={form.firstname}
            onChange={handleChange}
          />

          <TextField
            name="lastname"
            label="Nom"
            fullWidth
            required
            margin="normal"
            value={form.lastname}
            onChange={handleChange}
          />

          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            name="password"
            label="Mot de passe"
            type="password"
            fullWidth
            required
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Création..." : "Créer un compte"}
          </Button>
        </Box>
      </Container>
    </>
  );
}
