import { getCurrentUser } from "./userController";
import { createReservation, findConflictingReservation, getReservationsByUserId, getReservationsBySpaceId, deleteReservation, getReservationById, updateReservation } from "@/model/reservation";

export async function createReservationController(spaceId: string, start: Date, end: Date) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const conflict = await findConflictingReservation(spaceId, start, end);
  if (conflict) throw new Error("Time slot unavailable");

  return createReservation({
    userId: user.id,
    spaceId,
    start,
    end,
  });
}

export async function updateReservationController(reservationId: string, start: Date, end: Date) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // Check if the reservation belongs to the user
  const reservation = await getReservationById(reservationId);
  if (!reservation) throw new Error("Reservation not found");
  if (reservation.userId !== user.id) throw new Error("Forbidden");

  // Check if the reservation is in the future (cannot modify past reservations)
  if (new Date(reservation.start) <= new Date()) {
    throw new Error("Cannot modify past reservations");
  }

  // Check for conflicts (excluding the current reservation)
  const conflict = await findConflictingReservation(reservation.spaceId, start, end, reservationId);
  if (conflict) throw new Error("Time slot unavailable");

  return updateReservation(reservationId, { start, end });
}

export async function getUserReservations() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  return getReservationsByUserId(user.id);
}

export async function getSpaceAvailabilities(spaceId: string, fromDate?: Date) {
  return getReservationsBySpaceId(spaceId, fromDate);
}

export async function cancelReservation(reservationId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // Check if the reservation belongs to the user
  const reservation = await getReservationById(reservationId);
  if (!reservation) throw new Error("Reservation not found");
  if (reservation.userId !== user.id) throw new Error("Forbidden");

  // Check if the reservation is in the future (cannot cancel past reservations)
  if (new Date(reservation.start) <= new Date()) {
    throw new Error("Cannot cancel past reservations");
  }

  return deleteReservation(reservationId);
}
