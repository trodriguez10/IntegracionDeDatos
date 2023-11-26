import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	Linking,
	Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AppStackScreenProps } from '../../navigation/routes';
import Icon from 'react-native-vector-icons/Feather';
import CircularProgressBar from './components/CircularProgressBar';

const { height } = Dimensions.get('window');
const GameDetailScreen: React.FC<AppStackScreenProps<'GameDetail'>> = ({
	navigation,
	route,
}) => {
	const game = route.params.game;

	const handleBuyNowPress = async () => {
		const url = game.sotreUrl;
		const canOpenUrl = await Linking.canOpenURL(url);
		if (canOpenUrl) {
			Linking.openURL(url);
		} else {
			Alert.alert('Error', 'Pagina no encontrada.', [
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			]);
		}
	};

	return (
		<ScrollView style={styles.scrollContainer}>
			<StatusBar style="light" backgroundColor="#000000" />
			<ImageBackground
				source={{ uri: game.image }}
				resizeMode="cover"
				style={styles.imageContainer}>
				<LinearGradient
					colors={['rgba(0, 0, 0, 0.00)', '#000']}
					style={styles.gradient}
					locations={[0.1247, 0.9706]}>
					<TouchableOpacity
						style={styles.backIcon}
						onPress={() => navigation.goBack()}>
						<Icon name="arrow-left" size={30} color="white" />
					</TouchableOpacity>
				</LinearGradient>
			</ImageBackground>
			<View style={styles.detailsContainer}>
				<Text style={styles.title}>{game.title}</Text>
				<Text style={styles.description}>{game.description}</Text>
				<View style={styles.additionalInfo}>
					<View style={styles.infoTextContainer}>
						<Text style={styles.sectionTitle}>Desarrollador:</Text>
						<Text style={styles.text}>{game.publishers}</Text>
					</View>
					<View style={styles.infoTextContainer}>
						<Text style={styles.sectionTitle}>Generos: </Text>
						<Text style={styles.text}>{game.genres}</Text>
					</View>
					<View style={styles.infoTextContainer}>
						<Text style={styles.sectionTitle}>Lanzamiento: </Text>
						<Text style={styles.text}>{game.released}</Text>
					</View>
				</View>

				<View style={styles.platformsAndRating}>
					<View style={styles.platformsContainer}>
						<Text style={styles.sectionTitle}>Plataformas:</Text>
						{game.platforms.map((platform, index) => (
							<Text key={index} style={styles.platformText}>
								• {platform}
							</Text>
						))}
					</View>
					<View style={styles.circularProgressBar}>
						<CircularProgressBar progress={game.rating} />
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={handleBuyNowPress}>
						<Text style={styles.buttonText}>Comprar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	additionalInfo: {
		marginTop: 20,
	},
	backIcon: {
		left: 20,
		position: 'absolute',
		top: 50,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#1e90ff',
		borderRadius: 0,
		padding: 10,
	},
	buttonContainer: {
		marginHorizontal: 42,
		marginTop: 20,
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
	},
	circularProgressBar: { marginRight: 24, marginTop: 24 },
	description: {
		color: 'white',
		fontSize: 16,
		paddingTop: 10,
	},
	detailsContainer: {
		padding: 20,
	},
	gradient: {
		height: '100%',
		justifyContent: 'flex-end',
		padding: 20,
	},
	imageContainer: {
		height: height / 2,
		justifyContent: 'flex-end',
		width: '100%',
	},
	infoText: {
		color: 'white',
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 10,
	},
	infoTextContainer: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	platformText: {
		color: 'white',
		fontSize: 16,
		marginLeft: 10,
	},
	platformsAndRating: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	platformsContainer: {
		marginBottom: 20,
		marginTop: 10,
	},
	scrollContainer: {
		backgroundColor: 'black',
		flex: 1,
	},
	sectionTitle: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	text: {
		color: 'white',
		fontSize: 16,
		marginBottom: 10,
		marginLeft: 10,
	},
	title: {
		color: 'white',
		fontSize: 26,
		fontWeight: 'bold',
		paddingTop: 10,
	},
});

export default GameDetailScreen;
