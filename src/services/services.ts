import axios from 'axios';

export const fetchGames = async () => {
  const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}`);
  return response.data.results;
};
