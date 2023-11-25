import React from 'react';
import AppStack from './src/navigation/AppStack';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AppStack />
		</QueryClientProvider>
	);
};

export default App;
