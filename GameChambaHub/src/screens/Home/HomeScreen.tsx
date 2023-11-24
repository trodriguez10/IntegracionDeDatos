import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
	return (
		<View>
			<Text>Home Screen</Text>
			<Button
				title="Navigate to detail"
				onPress={() => {
					navigation.navigate('GameDetail');
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default HomeScreen;
