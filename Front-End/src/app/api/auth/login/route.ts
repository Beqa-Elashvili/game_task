import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

interface TUser {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const data: TUser = await request.json();

    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: result.error || "Login failed" },
        { status: res.status }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Login error:", error.message);
    return NextResponse.json(
      { error: "Failed to login user" },
      { status: 500 }
    );
  }
}
