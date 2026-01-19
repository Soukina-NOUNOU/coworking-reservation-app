"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Stack } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
        <Link href="/" passHref>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Coworking App
        </Typography>
        </Link>

        <Box>
          <Link href="/login" passHref>
            <Button color="inherit">
              Connexion
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button color="inherit">
              Inscription
            </Button>
          </Link>
        </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
