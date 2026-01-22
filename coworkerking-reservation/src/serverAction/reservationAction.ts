"use server";

import { createReservationController, updateReservationController, cancelReservation } from "../controller/reservationController";
import { revalidatePath } from "next/cache";
import { handleServerActionError } from "@/lib/error-handler";

export async function cancelReservationAction(reservationId: string) {
  try {
    await cancelReservation(reservationId);
    
    // Revalidate for refreshing the reservations page
    revalidatePath("/reservations");
    
    return { success: true };
  } catch (error) {
    handleServerActionError(error);
  }
}

export async function createReservationAction(formData: { spaceId: string; start: string; end: string }) {
  try {
    const spaceId = formData.spaceId;
    const start = new Date(formData.start);
    const end = new Date(formData.end);

    const result = await createReservationController(spaceId, start, end);
    
    // Revalidate relevant paths
    revalidatePath("/reservations");
    revalidatePath(`/spaces/${spaceId}/availabilities`);
    
    return result;
  } catch (error) {
    handleServerActionError(error);
  }
}

export async function updateReservationAction(formData: { reservationId: string; start: string; end: string }) {
  try {
    const reservationId = formData.reservationId;
    const start = new Date(formData.start);
    const end = new Date(formData.end);

    const result = await updateReservationController(reservationId, start, end);
    
    // Revalidate relevant paths
    revalidatePath("/reservations");
    
    return result;
  } catch (error) {
    handleServerActionError(error);
  }
}
