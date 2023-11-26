import { useQuery } from 'react-query';
import { fetchGames } from '../api/endpoint';
import { Game } from '../models/types';

export const useGamesData = (
	gameName: string,
	onSuccess: (data: Game) => void,
) => {
	return useQuery({
		queryKey: ['gameData', gameName],
		queryFn: () => fetchGames(gameName),
		onSuccess: (data) => {
			if (onSuccess) {
				onSuccess(data);
			}
		},
		enabled: false,
	});
};
