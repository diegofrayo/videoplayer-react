const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../build/player/'),
		publicPath: '/player/'
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};
