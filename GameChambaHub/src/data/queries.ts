import { useQuery } from 'react-query';
import { fetchGames } from '../api/endpoint';

export const useGamesData = () => {
	return useQuery({
		queryKey: ['gameData'],
		queryFn: () => fetchGames,
		enabled: false,
	});
};
