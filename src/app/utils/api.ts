import axios from "axios";

export async function fetchGames(params: any) {
  const response = await axios.get("https://api.remailer.eu/games/list.php/", {
    params,
  });
  console.log(response.data);
  return response.data;
}
