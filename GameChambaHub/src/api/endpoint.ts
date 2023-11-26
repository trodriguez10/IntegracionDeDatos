import axios from 'axios';
import { Game } from '../models/types';

const BASE_URL = 'http://127.0.0.1:3000';

const instance = axios.create({ baseURL: BASE_URL });

export const fetchGames = async (gameName: string): Promise<Game> => {
	const response = await instance.get<GameResponse>('/games', {
		params: {
			game: {
				name: gameName,
			},
		},
	});
	const data = response.data;
	const platformsArray = data.rawg_platforms?.split(', ') || [];
	const genresArray = data.rawg_genres?.split(', ') || [];
	const mergedRating =
		(data.igdb_rating + (parseInt(data.rawg_rating, 10) / 5) * 100) / 2;
	return {
		id: data._id.$oid,
		title: data.name,
		image: data.background_image,
		price: data.current_price,
		rating: mergedRating,
		description: data.igdb_summary,
		languages: data.languages,
		genres: genresArray,
		publishers: data.publishers,
		platforms: platformsArray,
		released: data.rawg_released,
		sotreUrl: data.store_url,
	};
};

type GameResponse = {
	_id: {
		$oid: string;
	};
	background_image: string;
	current_price: number;
	developers: string;
	full_price: number;
	igdb_id: number;
	igdb_popularity: number | null;
	igdb_rating: number;
	igdb_score: number | null;
	igdb_slug: string;
	igdb_summary: string;
	languages: string;
	meta_score: number | null;
	meta_url: string | null;
	published_igdb: string | null;
	published_meta: string | null;
	publishers: string;
	rawg_esrb_rating: string;
	rawg_genres: string;
	rawg_id: number;
	rawg_metacritic: string;
	rawg_platforms: string;
	rawg_rating: string;
	rawg_released: string;
	rawg_stores: string;
	store_url: string;
	store_uscore: number | null;
	name: string;
	igdb_url: string;
};
