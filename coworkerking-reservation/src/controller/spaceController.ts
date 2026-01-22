import { getAllSpaces, createSpace, getSpaceById, getSpaceWithReservations, getSpaceTypes } from "@/model/space";
import { getCurrentUser } from "./userController";
import { Prisma } from "@prisma/client";

export async function listSpaces() {
  return getAllSpaces();
}

export async function getSpace(id: string) {
  
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid space ID provided');
  }
  
  return getSpaceById(id);
}

export async function getSpaceDetails(id: string) {
  return getSpaceWithReservations(id);
}

export async function adminCreateSpace(data: Prisma.SpaceCreateInput) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return createSpace(data);
}

export async function getTypes() {
  return getSpaceTypes();
}
