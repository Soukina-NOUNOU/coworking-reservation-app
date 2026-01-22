"use server";

import { createReservationController, updateReservationController } from "../controller/reservationController";
import { revalidatePath } from "next/cache";
import { cancelReservation } from "@/controller/reservationController";

export async function cancelReservationAction(reservationId: string) {
  try {
    await cancelReservation(reservationId);
    
    // Revalidate for refreshing the reservations page
    revalidatePath("/reservations");
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erreur inconnue" 
    };
  }
}

export async function createReservationAction(formData: { spaceId: string; start: string; end: string }) {
  const spaceId = formData.spaceId;
  const start = new Date(formData.start);
  const end = new Date(formData.end);

  return await createReservationController(spaceId, start, end);
}

export async function updateReservationAction(formData: { reservationId: string; start: string; end: string }) {
  const reservationId = formData.reservationId;
  const start = new Date(formData.start);
  const end = new Date(formData.end);

  return await updateReservationController(reservationId, start, end);
}
