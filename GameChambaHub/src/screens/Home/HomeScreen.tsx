import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
	const insets = useSafeAreaInsets();
	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<StatusBar style="light" backgroundColor="#000000" />
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
});

export default HomeScreen;
