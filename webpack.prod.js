const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const VersionFile = require('webpack-version-file');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { DateTime } = require('luxon');

const dt = DateTime.now();

module.exports = {
	entry: './src/client/index.js',
	mode: 'production',
	module: {
		rules: [
			{
				test: '/.js$/',
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(css|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
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
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new WorkboxPlugin.GenerateSW(),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery'
		}),
		new LicenseWebpackPlugin({
			unacceptableLicenseTest: (licenseType) =>
				['GPL', 'AGPL', 'LGPL', 'NGPL'].includes(licenseType),
			outputFilename: 'meta/license.txt'
		}),
		new VersionFile({
			output: './dist/version.json',
			templateString: `{${['version', 'buildDate', 'timestamp', 'environment']
				.map((key) => `"${key}": "<%= ${key} %>"`)
				.join(',')}}`,
			data: {
				buildDate: dt.toISO(),
				timestamp: dt.toSeconds(),
				environment: process.env.NODE_ENV || 'development'
			}
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: './../report/index.html'
		})
	]
};
