import axios from 'axios';

const API_KEY = '0d7cfe0a2ae040d8bc250cbae21eafc8';
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = async () => {
  const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}`);
  return response.data.results;
};
