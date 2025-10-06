import { NextResponse } from "next/server";

const BACKEND_URL = process.env.DATABASE_URL;

interface TUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  personalNumber: string;
}

export async function POST(request: Request) {
  try {
    const data: TUser = await request.json();

    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: result.error || "Registration failed" },
        { status: res.status }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Registration error:", error.message);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
