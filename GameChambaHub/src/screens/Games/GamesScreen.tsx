import React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Feather';
import GameItem from './components/GameItem';
import { StatusBar } from 'expo-status-bar';
import { AppStackScreenProps } from '../../navigation/routes';
import { Game } from '../../models/types';

const GamesScreen: React.FC<AppStackScreenProps<'Games'>> = ({
	navigation,
	route,
}) => {
	const insets = useSafeAreaInsets();
	const games: Game[] = route.params.games;

	const onItemPressed = (item: Game) => {
		navigation.navigate('GameDetail', { game: item });
	};

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<StatusBar style="light" backgroundColor="#000000" />
			<TouchableOpacity
				style={styles.backIcon}
				onPress={() => navigation.goBack()}>
				<Icon name="arrow-left" size={24} color="white" />
			</TouchableOpacity>
			<FlatList
				data={games}
				renderItem={({ item }) => (
					<Pressable onPress={() => onItemPressed(item)}>
						<GameItem name={item.title} image={item.image} />
					</Pressable>
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: 'black',
	},
	backIcon: {
		left: 10,
		marginTop: 24,
		marginBottom: 24,
	},
});

export default GamesScreen;
