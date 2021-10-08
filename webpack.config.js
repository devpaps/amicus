const currentTask = process.env.npm_lifecycle_event;
const dotenv = require('dotenv');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
dotenv.config({ path: './.env' });

const config = {
	entry: {
		app: path.resolve(__dirname, './src/index.js'),
	},
	output: {
		filename: '[name].[bundle].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: './',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /\.css$/,
					name: 'style',
					chunks: 'all',
				},
			},
		},
	},
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			title: 'Amicus',
			chunks: ['app'],
		}),
		new CopyPlugin({
			patterns: [{ from: './src/assets/', to: './assets/' }],
		}),
	],
	mode: 'development',
	devServer: {
		port: 3000,
		contentBase: path.resolve(__dirname, './dist'),
		hot: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				use: ['file-loader'],
			},
		],
	},
};

module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		console.log('Development');
		return config;
	}

	if (argv.mode === 'production') {
		console.log('Production');
		config.mode = 'production';
		config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;

		config.plugins.push(
			new MiniCssExtractPlugin({ filename: 'main.[fullhash].css' }),
			new CleanWebpackPlugin(),
			new CopyPlugin({
				patterns: [{ from: './src/assets/', to: './assets/' }],
			}),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				filename: 'index.html',
				title: 'Amicus',
				chunks: ['app'],
			})
		);
	}
	return config;
};
