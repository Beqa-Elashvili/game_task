export async function fetchGames(params: Record<string, any>) {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      urlParams.set(key, value.join(","));
    } else {
      urlParams.set(key, value);
    }
  });
  const URL = process.env.DATABASE_URL;

  const url = `${URL}/games?${urlParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}
