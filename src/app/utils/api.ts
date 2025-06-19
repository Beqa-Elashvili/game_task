export async function fetchGames(params: Record<string, any>) {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      urlParams.set(key, value.join(",")); // join arrays with commas
    } else {
      urlParams.set(key, value);
    }
  });

  const url = `https://api.remailer.eu/games/list.php?${urlParams.toString()}`;
  console.log("Final URL:", url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}
