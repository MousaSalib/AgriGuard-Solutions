import { DOMAIN } from "@/utils/constants";
import { User } from "@prisma/client";

// Get User Profile
export async function getUserProfile(
  userId: string,
  token: string
): Promise<User> {
  const response = await fetch(`${DOMAIN}/api/users/profile/${userId}`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
}

// Delete User Profile
export async function deleteUserProfile(userId: string, token: string) {
  try {
    const response = await fetch(`${DOMAIN}/api/users/profile/${userId}`, {
      method: "DELETE",
      headers: {
        Cookie: `jwtToken=${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete user profile");
    }
    return response.json();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}
