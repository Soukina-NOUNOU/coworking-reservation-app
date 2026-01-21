"use server";

import { createReservationController } from "../controller/reservationController";

export async function createReservationAction(formData: { spaceId: string; start: string; end: string }) {
  const spaceId = formData.spaceId;
  const start = new Date(formData.start);
  const end = new Date(formData.end);

  return await createReservationController(spaceId, start, end);

}
