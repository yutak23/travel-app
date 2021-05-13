const HtmlWebPackPlugin = require("html-webpack-plugin")
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            "/": {
                target: "http://localhost:8081",
            }
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader",
            },
            {
                loader: "css-loader",
                options: {
                    url: false,
                    sourceMap: true,
                    importLoaders: 2,
                },
            },
            {
                loader: "postcss-loader",
                options: {
                    sourceMap: true,
                    postcssOptions: {
                        plugins: ["autoprefixer"],
                    },
                },
            },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                },
            },
            ]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}