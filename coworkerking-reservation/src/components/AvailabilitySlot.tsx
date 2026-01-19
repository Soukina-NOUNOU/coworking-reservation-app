"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Params } from "next/dist/server/request/params";
import Link from "next/link";

interface AvailabilitySlotProps {
  slot: {
    start: string;
    end: string;
  };
  spaceId: Params["id"];
}

export default function AvailabilitySlot(props: Readonly<AvailabilitySlotProps>) {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>
        {new Date(props.slot.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} 
        {" - "}
        {new Date(props.slot.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </Typography>

      {/* TODO: Implement reservation page later */}
       <Link href={`/reservation/confirm?spaceId=${props.spaceId}&start=${props.slot.start}&end=${props.slot.end}`} passHref> 
        <Button
          variant="contained"
          size="small"
        >
          Réserver
        </Button>
      </Link>
    </Box>
  );
}
