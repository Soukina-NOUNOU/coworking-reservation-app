"use client";

import { Params } from "next/dist/server/request/params";
import { Clock } from "lucide-react";
import { useState } from "react";
import { createReservationAction } from "@/serverAction/reservationAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AvailabilitySlotProps {
  slot: {
    start: string;
    end: string;
  };
  spaceId: Params["id"];
}

export default function AvailabilitySlot(props: Readonly<AvailabilitySlotProps>) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onReserveClick = async () => {
    try {
      setLoading(true);
     
    await createReservationAction({
      spaceId: props.spaceId as string,
      start: props.slot.start,
      end: props.slot.end,
    });
    router.push("/reservations")
    toast.success("Réservation réussie !");
    

    setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 flex justify-between items-center hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-gray-500" />
        <span className="text-gray-800 font-medium">
          {new Date(props.slot.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} 
          {" - "}
          {new Date(props.slot.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
       <button
        onClick={onReserveClick}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        Réserver
      </button>
    </div>
  );
}
