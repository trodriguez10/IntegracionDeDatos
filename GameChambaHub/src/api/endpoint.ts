import axios from 'axios';

const BASE_URL = '';

const instance = axios.create({ baseURL: BASE_URL });

export const fetchGames = async ({ queryKey }) => {
	const [_, gameName] = queryKey;

	if (!gameName) {
		return [];
	}

	const response = await axios.get(`${gameName}`);
	return response.data;
};
