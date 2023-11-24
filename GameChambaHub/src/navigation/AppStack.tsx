import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameDetailScreen from '../screens/GamesDetail/GameDetailScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import { AppStackParamsList } from './routes';
import GamesScreen from '../screens/Games/GamesScreen';

const Stack = createNativeStackNavigator<AppStackParamsList>();

const AppStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Games" component={GamesScreen} />
				<Stack.Screen name="GameDetail" component={GameDetailScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
