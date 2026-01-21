"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";
import { getCurrentUser } from "@/controller/userController";

const prisma = new PrismaClient();

export async function deleteAccountAction() {
  const client = await clerkClient();
  const user = await currentUser();
  if (!user) return;

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  // If the user does not exist in the database, throw an error
  if (!existingUser) return;

  // Delete all reservations associated with the user
  await prisma.reservation.deleteMany({ 
    where: { userId: existingUser?.id }, 
  });
  // Delete from the database
  await prisma.user.delete({
    where: { clerkId: user.id },
  });

  // Delete the user from Clerk
  await client.users.deleteUser(user.id);


}

export async function getCurrentUserAction() {
  return await getCurrentUser();
}

