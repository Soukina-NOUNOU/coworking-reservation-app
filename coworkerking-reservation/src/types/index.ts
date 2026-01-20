import { Space as PrismaSpace, Reservation as PrismaReservation, User as PrismaUser } from '@prisma/client';

// Types based on Prisma schema for frontend usage
export type Space = PrismaSpace;

export type Reservation = PrismaReservation;

export type User = PrismaUser;

// Types with relations for cases where relations are included
export type SpaceWithReservations = PrismaSpace & {
  reservations: PrismaReservation[];
};

export type ReservationWithSpace = PrismaReservation & {
  space: PrismaSpace;
};

export type ReservationWithSpaceAndUser = PrismaReservation & {
  space: PrismaSpace;
  user: PrismaUser;
};

// Type for availability time slots
export type TimeSlot = {
  start: Date;
  end: Date;
  available: boolean;
  reservationId?: string;
};