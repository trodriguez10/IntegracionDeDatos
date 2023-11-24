import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Feather';
import { dummyGames } from '../../data/dummyData';
import GameItem from './components/GameItem';
import { StatusBar } from 'expo-status-bar';

const GamesScreen = ({ navigation }) => {
	const insets = useSafeAreaInsets();
	const games = dummyGames;

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
					<GameItem name={item.name} image={item.image} />
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
