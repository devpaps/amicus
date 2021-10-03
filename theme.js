// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

const colors = {
	brand: {
		100: '#292929',
		200: '#f7f7f7',
	},
	mainBrand: {
		100: '#e53e3e',
	},
};

// 3. extend the theme
const theme = extendTheme({ config, colors });

export default theme;
