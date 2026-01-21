"use client";

import { Params } from "next/dist/server/request/params";
import Link from "next/link";
import { Clock } from "lucide-react";

interface AvailabilitySlotProps {
  slot: {
    start: string;
    end: string;
  };
  spaceId: Params["id"];
}

export default function AvailabilitySlot(props: Readonly<AvailabilitySlotProps>) {
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

      {/* TODO: Implement reservation page later */}
       <Link href={`/reservation/confirm?spaceId=${props.spaceId}&start=${props.slot.start}&end=${props.slot.end}`} className="btn-primary text-sm px-4 py-2">
        Réserver
      </Link>
    </div>
  );
}
