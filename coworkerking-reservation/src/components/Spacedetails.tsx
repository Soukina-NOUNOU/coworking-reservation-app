"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Space } from "@/app/spaces/page";

export default function SpaceDetails(props: Readonly<{space: Space & {description: string; equipments: string[]}}>) {
  const { space } = props;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {space.name}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {space.description}
      </Typography>

      <Typography variant="h6">Équipements</Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
        {space.equipments.map((eq, index) => (
          <Chip key={index} label={eq} />
        ))}
      </Box>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Prix
      </Typography>
      <Typography variant="body1">{space.pricePerHour} € / heure</Typography>

      <Link href={`/spaces/${space.id}/availabilities`} passHref>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
        >
          Voir les disponibilités
        </Button>
      </Link>
    </Box>
  );
}
