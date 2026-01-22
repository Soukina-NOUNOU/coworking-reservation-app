import { getUserByClerkId } from "@/model/user";
import { currentUser } from "@clerk/nextjs/server";
import { AuthError } from "@/lib/errors";

export async function getCurrentUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new AuthError("User not authenticated");
  }

  const user = await getUserByClerkId(clerkUser.id);
  if (!user) {
    throw new AuthError("User not found in database");
  }

  return user;
}

export async function getCurrentUserOptional() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return null;
    }

    const user = await getUserByClerkId(clerkUser.id);
    return user || null;
  } catch (error) {
    console.log('Error in getCurrentUserOptional:', error);
    return null;
  }
}

export async function getCurrentUserWithRetry(maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const clerkUser = await currentUser();
      if (!clerkUser) {
        throw new AuthError("User not authenticated");
      }

      const user = await getUserByClerkId(clerkUser.id);
      if (!user) {
        if (attempt < maxRetries) {
          console.log(`User not found in database, attempt ${attempt}/${maxRetries}, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw new AuthError("User not found in database");
      }

      return user;
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      console.log(`Authentication attempt ${attempt}/${maxRetries} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new AuthError("Max retry attempts reached");
}
