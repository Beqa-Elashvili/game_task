import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  const { search } = new URL(request.url);
  const backendUrl = `${BACKEND_URL}/games${search}`;

  try {
    const res = await fetch(backendUrl, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from backend:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
