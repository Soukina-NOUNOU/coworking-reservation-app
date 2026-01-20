"use server";

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