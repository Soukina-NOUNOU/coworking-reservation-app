import { Prisma, SpaceType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
type SpaceCreateInput = Prisma.SpaceCreateInput;

export async function getAllSpaces() {
  return prisma.space.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getSpaceById(id: string) {
  
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid space ID provided');
  }
  
  return prisma.space.findUnique({
    where: { id },
  });
}

export async function getSpaceWithReservations(id: string) {
  return prisma.space.findUnique({
    where: { id },
    include: {
      reservations: {
        orderBy: { start: 'asc' },
        where: {
          start: {
            gte: new Date(), // only future reservations
          },
        },
      },
    },
  });
}

export async function createSpace(data: SpaceCreateInput) {
  return prisma.space.create({ data });
}

export async function getSpaceTypes() {
  // Return the enum values directly from Prisma
  return Object.values(SpaceType);
}