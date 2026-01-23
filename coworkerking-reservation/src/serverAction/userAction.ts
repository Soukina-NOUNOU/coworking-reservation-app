"use server";

import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { getCurrentUserWithRetry } from "@/controller/userController";
import { prisma } from "@/lib/prisma";
import { AuthError } from "@/lib/errors";
import { sendDeleteAccountEmail } from "@/lib/email/deleteAccount";

export async function deleteAccountAction() {
  try {
  const client = await clerkClient();
  const user = await currentUser();
  if (!user) return;

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  // If the user does not exist in the database, throw an error
  if (!existingUser) return;
  await sendDeleteAccountEmail(existingUser); // Send account deletion email
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
  } catch (error) {
  console.error("Error deleting account:", error);
  throw error;
  }

}

export async function getCurrentUserAction() {
  try {
    // Try with retry logic for cases where user just signed in
    // and there might be a timing issue with webhook synchronization
    return await getCurrentUserWithRetry(2, 500);
  } catch (error) {
    // During sign-in process with magic links, there might be a timing issue
    // where Clerk hasn't fully synchronized the authentication state yet
    if (error instanceof AuthError) {
      console.log('User not yet fully authenticated after retries, returning null');
      return null;
    }
    
    // Re-throw non-authentication errors
    throw error;
  }
}

