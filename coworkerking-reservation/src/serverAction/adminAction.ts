import { getUsersCount } from "@/model/user";
import { getSpacesCount } from "@/model/space";
import { getReservationsCount, getTotalRevenue } from "@/model/reservation";

export interface AdminStats {
  totalUsers: number;
  totalSpaces: number;
  totalReservations: number;
  totalRevenue: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const [
      totalUsers,
      totalSpaces,
      totalReservations,
      totalRevenue
    ] = await Promise.all([
      getUsersCount(),
      getSpacesCount(),
      getReservationsCount(),
      getTotalRevenue()
    ]);

    return {
      totalUsers,
      totalSpaces,
      totalReservations,
      totalRevenue: Math.round(totalRevenue * 100) / 100 // Round to 2 decimal places
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
}