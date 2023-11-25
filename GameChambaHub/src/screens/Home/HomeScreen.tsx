import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGamesData } from '../../data/queries';

const HomeScreen = ({ navigation }) => {
	const [gameName, setGameName] = useState('');
	const insets = useSafeAreaInsets();

	const { data, isLoading, error, refetch } = useGamesData(gameName);

	const handleSearch = () => {
		refetch({ queryKey: ['gameData', gameName] });
	};

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<StatusBar style="light" backgroundColor="#000000" />
			<TextInput
				style={styles.input}
				value={gameName}
				onChangeText={setGameName}
				placeholder="Nombre del juego"
				placeholderTextColor="grey"
			/>
			<Button title="Buscar" onPress={handleSearch} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'black',
		flex: 1,
		justifyContent: 'center',
	},
	input: {
		borderColor: 'grey',
		borderRadius: 5,
		borderWidth: 1,
		color: 'white',
		height: 40,
		margin: 12,
		padding: 10,
		width: '80%',
	},
	text: {
		color: 'white',
	},
});

export default HomeScreen;
