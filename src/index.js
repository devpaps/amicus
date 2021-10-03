import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from '../theme';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './components/userContext';

import './style.css';

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<ChakraProvider resetCSS={true} theme={theme}>
				<UserProvider>
					<App />
				</UserProvider>
			</ChakraProvider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('app')
);

if (module.hot) {
	module.hot.accept();
}
