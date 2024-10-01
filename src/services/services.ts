import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'process.env.BASE_URL';
const API_KEY = 'process.env.API_KEY';

export const fetchGames = async () => {
  const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}`);
  return response.data.results;
};
