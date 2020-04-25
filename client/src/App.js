import React from 'react';
import { AppRouter } from './routes/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './components/GlobalStyle';
function App() {
	return (
		<BrowserRouter>
			{/* <Switch><Route path="/app" component={AppRouter} /></Switch> */}
			<GlobalStyle />
			<AppRouter />
		</BrowserRouter>
	);
}

export default App;
