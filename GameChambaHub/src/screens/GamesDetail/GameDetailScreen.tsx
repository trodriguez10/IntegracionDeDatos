import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	ScrollView,
	Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { height } = Dimensions.get('window');
const GameDetailScreen = ({ navigation, game }) => {
	return (
		<ScrollView style={styles.scrollContainer}>
			<StatusBar style="light" backgroundColor="#000000" />
			<ImageBackground
				source={require('../../../assets/cod.jpg')}
				resizeMode="cover"
				style={styles.imageContainer}>
				<LinearGradient
					colors={['rgba(0, 0, 0, 0.00)', '#000']}
					style={styles.gradient}
					locations={[0.1247, 0.7706]}
				/>
			</ImageBackground>
			<View style={styles.detailsContainer}>
				<Text style={styles.title}>Call of Duty: Warzone</Text>
				<Text style={styles.description}>
					Battle Royale redefined. Join the fight and take on the world in this
					high-stakes game mode.
				</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
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
		width: '100%',
		justifyContent: 'flex-end',
	},
	scrollContainer: {
		backgroundColor: 'black',
		flex: 1,
	},
	title: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
		paddingTop: 10,
	},
});

export default GameDetailScreen;
