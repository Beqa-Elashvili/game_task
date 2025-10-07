import Cookies from "js-cookie";

export interface TUserRegister {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  personalNumber: string;
}

export async function registerUser(data: TUserRegister) {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Registration failed");
    }
    if (result.token) {
      Cookies.set("token", result.token, {
        expires: 7,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
      });
    }

    return result;
  } catch (error: any) {
    console.error("Registration failed:", error.message);
    throw error;
  }
}

export interface TUserLogin {
  email: string;
  password: string;
}

export async function loginUser(data: TUserLogin) {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.token) {
      Cookies.set("token", result.token, {
        expires: 7,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
      });
    }
    if (!res.ok) {
      throw new Error(result.error || "Login failed");
    }

    return result.user || result;
  } catch (error: any) {
    console.error("Login failed:", error.message);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const res = await fetch("/api/auth/user", {
      method: "GET",
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed to fetch user");
    }

    return result.user || result;
  } catch (error: any) {
    console.error("Fetching current user failed:", error.message);
    throw error;
  }
}
