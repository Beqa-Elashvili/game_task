import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });

    response.cookies.set("token", "", {
      path: "/",
      expires: new Date(0), 
    });

    return response;
  } catch (error: any) {
    console.error("Logout error:", error.message);
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
