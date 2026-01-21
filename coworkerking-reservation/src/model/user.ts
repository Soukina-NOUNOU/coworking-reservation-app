import { PrismaClient } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function getUserByClerkId(clerkId: string) {
  // First try to find the user in our database
  let user = await prisma.user.findUnique({
    where: { clerkId },
  });

  // If user doesn't exist in our database, create them from Clerk data
  if (!user) {
    try {
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(clerkId);
      
      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          firstname: clerkUser.firstName || '',
          lastname: clerkUser.lastName || '',
        },
      });
      
      console.log('Created missing user in database:', user.email);
    } catch (error) {
      console.error('Error creating user from Clerk data:', error);
      return null;
    }
  }

  return user;
}
