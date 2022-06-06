const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');

module.exports = {
	entry: './src/client/index.js',
	mode: 'development',
	devtool: 'source-map',
	stats: 'verbose',
	devServer: {
		host: '0.0.0.0',
		port: 8080,
		proxy: {
			'/': {
				target: 'http://localhost:8081'
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(css|scss)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
							sourceMap: true,
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: ['autoprefixer']
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/client/views/index.html',
			filename: './index.html'
		}),
		new CleanWebpackPlugin({
			dry: true,
			verbose: true,
			cleanStaleWebpackAssets: true,
			protectWebpackAssets: false
		}),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery'
		}),
		new LicenseWebpackPlugin({
			unacceptableLicenseTest: (licenseType) =>
				['GPL', 'AGPL', 'LGPL', 'NGPL'].includes(licenseType),
			excludedPackageTest: (packageName) => packageName === 'excluded-package',
			outputFilename: 'meta/license.txt'
		})
	]
};
