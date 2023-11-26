import { Game } from '../models/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamsList = {
	Home: undefined;
	GameDetail: { game: Game };
	Games: { games: Game[] };
};

export type AppStackScreenProps<RouteName extends keyof AppStackParamsList> =
	NativeStackScreenProps<AppStackParamsList, RouteName>;
