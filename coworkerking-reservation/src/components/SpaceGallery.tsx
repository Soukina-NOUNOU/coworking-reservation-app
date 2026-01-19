"use client";

import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

export default function SpaceGallery({ photos }: { photos: string[] }) {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {photos.map((photo, index) => (
        <Grid key={index}>
          <CardMedia
            component="img"
            height="200"
            image={photo}
            alt={`Photo ${index + 1}`}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
