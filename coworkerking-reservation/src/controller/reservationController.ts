import { getCurrentUser } from "./userController";
import { createReservation, findConflictingReservation, getReservationsByUserId, getReservationsBySpaceId, deleteReservation, getReservationById, updateReservation } from "@/model/reservation";
import { NotFoundError, ForbiddenError, ValidationError } from "@/lib/errors";

export async function createReservationController(spaceId: string, start: Date, end: Date) {
  const user = await getCurrentUser();

  const conflict = await findConflictingReservation(spaceId, start, end);
  if (conflict) {
    throw new ValidationError("Time slot unavailable");
  }

  return createReservation({
    userId: user.id,
    spaceId,
    start,
    end,
  });
}

export async function updateReservationController(reservationId: string, start: Date, end: Date) {
  const user = await getCurrentUser();

  // Check if the reservation belongs to the user
  const reservation = await getReservationById(reservationId);
  if (!reservation) {
    throw new NotFoundError("Reservation not found");
  }
  if (reservation.userId !== user.id) {
    throw new ForbiddenError("Access denied to this reservation");
  }

  // Check if the reservation is in the future (cannot modify past reservations)
  if (new Date(reservation.start) <= new Date()) {
    throw new ValidationError("Cannot modify past reservations");
  }

  // Check for conflicts (excluding the current reservation)
  const conflict = await findConflictingReservation(reservation.spaceId, start, end, reservationId);
  if (conflict) {
    throw new ValidationError("Time slot unavailable");
  }

  return updateReservation(reservationId, { start, end });
}

export async function getUserReservations() {
  const user = await getCurrentUser();
  return getReservationsByUserId(user.id);
}

export async function getSpaceAvailabilities(spaceId: string, fromDate?: Date) {
  return getReservationsBySpaceId(spaceId, fromDate);
}

export async function cancelReservation(reservationId: string) {
  const user = await getCurrentUser();

  // Check if the reservation belongs to the user
  const reservation = await getReservationById(reservationId);
  if (!reservation) {
    throw new NotFoundError("Reservation not found");
  }
  if (reservation.userId !== user.id) {
    throw new ForbiddenError("Access denied to this reservation");
  }

  // Check if the reservation is in the future (cannot cancel past reservations)
  if (new Date(reservation.start) <= new Date()) {
    throw new ValidationError("Cannot cancel past reservations");
  }

  return deleteReservation(reservationId);
}
