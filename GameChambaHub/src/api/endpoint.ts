import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000';

const instance = axios.create({ baseURL: BASE_URL });

export const fetchGames = async (gameName: string) => {
	const response = await instance.get('/games', {
		params: {
			game: {
				name: gameName,
			},
		},
	});
	console.log(response);
	return response.data;
};
