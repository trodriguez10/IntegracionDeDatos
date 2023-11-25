import { useQuery } from 'react-query';
import { fetchGames } from '../api/endpoint';

export const useGamesData = (gameName, onSuccess) => {
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
