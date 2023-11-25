import axios from 'axios';

const BASE_URL = '';

const instance = axios.create({ baseURL: BASE_URL });

export const fetchGames = async (gameName: string) => {
	const response = await instance.get(``);
	return response.data;
};
