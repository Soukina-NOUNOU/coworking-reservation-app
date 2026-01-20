import { getUserByClerkId } from "@/model/user";
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  return getUserByClerkId(clerkUser.id);
}
