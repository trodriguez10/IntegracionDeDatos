import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	Button,
	TextInput,
	Alert,
	ActivityIndicator,
	Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGamesData } from '../../data/queries';
import { Game } from '../../models/types';
import { AppStackScreenProps } from '../../navigation/routes';

const HomeScreen: React.FC<AppStackScreenProps<'Home'>> = ({ navigation }) => {
	const [gameName, setGameName] = useState('');
	const insets = useSafeAreaInsets();

	const onSuccess = (data: Game) => {
		navigation.navigate('Games', { games: [data] });
	};

	const { isLoading, error, refetch } = useGamesData(gameName, onSuccess);

	const handleSearch = () => {
		refetch();
	};

	if (error) {
		Alert.alert('Error', 'Ha ocurrido un error al buscar el juego.', [
			{ text: 'OK', onPress: () => console.log('OK Pressed') },
		]);
	}

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<StatusBar style="light" backgroundColor="#000000" />
			<View style={styles.logoContainer}>
				<Image
					style={styles.logo}
					source={require('../../../assets/gameicon.jpg')}
					resizeMode="contain"
				/>
			</View>

			<TextInput
				style={styles.input}
				value={gameName}
				onChangeText={setGameName}
				placeholder="Nombre del juego"
				placeholderTextColor="grey"
			/>
			{isLoading ? (
				<ActivityIndicator size="large" color="white" />
			) : (
				<Button title="Buscar" onPress={handleSearch} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'black',
		flex: 1,
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
	logoContainer: {
		marginBottom: 20,
		marginTop: 180,
		alignItems: 'center',
	},
	logo: {
		height: 100,
		width: 100,
	},
	text: {
		color: 'white',
	},
});

export default HomeScreen;
