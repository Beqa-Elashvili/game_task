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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Registration failed");
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Login failed");
    }

    // Save JWT in localStorage (or cookies)
    if (result.token) {
      localStorage.setItem("token", result.token);
    }

    // Optionally return user info from login response
    return result.user || result;
  } catch (error: any) {
    console.error("Login failed:", error.message);
    throw error;
  }
}
