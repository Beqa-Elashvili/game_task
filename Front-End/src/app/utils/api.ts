const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function fetchGames(params: Record<string, any>) {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      urlParams.set(key, value.join(","));
    } else {
      urlParams.set(key, value);
    }
  });

  const url = `${URL}/games?${urlParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}

export async function fetchCategoriesData() {
  try {
    const resp = await fetch(`${URL}/categories`);

    return resp.json();
  } catch (error) {
    console.error("Failed to fetch Categories data!", error);
  }
}

export async function fetchProvidersData() {
  try {
    const resp = await fetch(`${URL}/providers`);

    return resp.json();
  } catch (error) {
    console.error("Failed to fetch Categories data!", error);
  }
}
