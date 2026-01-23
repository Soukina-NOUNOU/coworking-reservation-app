import { prisma } from "@/lib/prisma";

export async function createReservation(data: {
  userId: string;
  spaceId: string;
  start: Date;
  end: Date;
}) {
  return prisma.reservation.create({ 
    data,
    include: {
      space: true,
      user: true,
    },
  });
}

export async function findConflictingReservation(spaceId: string, start: Date, end: Date, excludeReservationId?: string) {
  return prisma.reservation.findFirst({
    where: {
      spaceId,
      start: { lt: end },
      end: { gt: start },
      ...(excludeReservationId && { id: { not: excludeReservationId } }),
    },
  });
}

export async function getReservationsByUserId(userId: string) {
  return prisma.reservation.findMany({
    where: { userId },
    include: {
      space: true,
    },
    orderBy: { start: 'desc' },
  });
}

export async function getReservationsBySpaceId(spaceId: string, fromDate?: Date) {
  return prisma.reservation.findMany({
    where: {
      spaceId,
      ...(fromDate && { start: { gte: fromDate } }),
    },
    orderBy: { start: 'asc' },
  });
}

export async function deleteReservation(id: string) {
  return prisma.reservation.delete({
    where: { id },
  });
}

export async function getReservationById(id: string) {
  return prisma.reservation.findUnique({
    where: { id },
    include: {
      space: true,
      user: true,
    },
  });
}

export async function updateReservation(id: string, data: { start: Date; end: Date }) {
  return prisma.reservation.update({
    where: { id },
    data,
    include: {
      space: true,
      user: true,
    },
  });
}

export async function getReservationsCount() {
  return await prisma.reservation.count();
}


export async function getTotalRevenue() {
  const reservations = await prisma.reservation.findMany({
    include: {
      space: true,
    },
  });
  
  return reservations.reduce((total, reservation) => {
    const hours = (reservation.end.getTime() - reservation.start.getTime()) / (1000 * 60 * 60);
    return total + (hours * reservation.space.pricePerHour);
  }, 0);
}
