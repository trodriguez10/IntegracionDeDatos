import React from 'react';
import { View, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

type CircularProgressBarProps = {
	progress: number;
};

const CircularProgressBar = ({ progress }: CircularProgressBarProps) => {
	return (
		<View style={styles.container}>
			<CircularProgress
				value={progress}
				radius={50}
				activeStrokeWidth={10}
				inActiveStrokeWidth={10}
				activeStrokeColor={'#1e90ff'}
				inActiveStrokeColor={'#333'}
				duration={2000}
				showProgressValue={true}
				titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default CircularProgressBar;
