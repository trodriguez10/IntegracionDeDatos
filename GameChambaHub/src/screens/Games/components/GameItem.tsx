import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type GameItemProps = {
	name: string;
	image: string;
};

const GameItem = ({ name, image }: GameItemProps) => {
	const navigation = useNavigation();
	return (
		<Pressable
			onPress={() => navigation.navigate('GameDetail')}
			style={styles.itemContainer}>
			<Image
				source={require('../../../../assets/gta.jpg')}
				style={styles.gameImage}
			/>
			<View style={styles.gameInfo}>
				<Text style={styles.gameName}>{name}</Text>
			</View>
			<Icon name="chevron-right" size={30} color="white" />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	gameImage: {
		height: 80,
		marginRight: 10,
		width: 80,
		borderRadius: 5,
	},
	gameInfo: {
		flex: 1,
	},
	gameName: {
		color: 'white',
		fontSize: 16,
		fontWeight: '700',
	},
	itemContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: 10,
	},
});

export default GameItem;
