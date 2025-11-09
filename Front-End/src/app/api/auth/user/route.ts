import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "No token found" }), {
        status: 401,
      });
    }

    const res = await fetch(`${BACKEND_URL}/auth`, {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
      },
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: result.error || "Failed to fetch user" }),
        {
          status: res.status,
        }
      );
    }

    return new Response(JSON.stringify({ user: result.user || result }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: `Internal Server Error ${error}` }),
      {
        status: 500,
      }
    );
  }
}
