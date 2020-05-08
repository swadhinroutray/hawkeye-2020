import React from 'react';
import { AppRouter } from './routes/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './components/GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	setTimeout(function() {
		// This hides the address bar:
		window.scrollTo(0, 1);
	}, 0);
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
