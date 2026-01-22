import { getAllSpaces, createSpace, getSpaceById, getSpaceWithReservations, getSpaceTypes } from "@/model/space";
import { getCurrentUser } from "./userController";
import { Prisma } from "@prisma/client";
import { NotFoundError, ForbiddenError } from "@/lib/errors";

export async function listSpaces() {
  return getAllSpaces();
}

export async function getSpace(id: string) {
  if (!id || typeof id !== 'string') {
    throw new NotFoundError('Invalid space ID provided');
  }
  
  const space = await getSpaceById(id);
  if (!space) {
    throw new NotFoundError('Space not found');
  }
  
  return space;
}

export async function getSpaceDetails(id: string) {
  if (!id || typeof id !== 'string') {
    throw new NotFoundError('Invalid space ID provided');
  }
  
  const space = await getSpaceWithReservations(id);
  if (!space) {
    throw new NotFoundError('Space not found');
  }
  
  return space;
}

export async function adminCreateSpace(data: Prisma.SpaceCreateInput) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new ForbiddenError("Admin access required");
  }

  return createSpace(data);
}

export async function getTypes() {
  return getSpaceTypes();
}
