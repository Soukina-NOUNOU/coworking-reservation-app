import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
  });
}
