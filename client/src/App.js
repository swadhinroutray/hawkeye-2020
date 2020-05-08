import React from 'react';
import { AppRouter } from './routes/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './components/GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<div className="main-wrapper">
				<AppRouter />
			</div>
		</BrowserRouter>
	);
}

export default App;
