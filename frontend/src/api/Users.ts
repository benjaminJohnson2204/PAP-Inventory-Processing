import { APIResult, get, handleAPIError } from "@/api/requests";

export interface User {
  _id: string;
  uid: string;
  role: string;
}

export interface DisplayUser {
  _id: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export const createAuthHeader = (firebaseToken: string) => ({
  Authorization: `Bearer ${firebaseToken}`,
});

export const getWhoAmI = async (firebaseToken: string): Promise<APIResult<User>> => {
  try {
    const response = await get("/api/user/whoami", createAuthHeader(firebaseToken));
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
};

export const getAllUsers = async (firebaseToken: string): Promise<APIResult<DisplayUser[]>> => {
  try {
    const response = await get("/api/user", createAuthHeader(firebaseToken));
    const json = (await response.json()) as DisplayUser[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
};
