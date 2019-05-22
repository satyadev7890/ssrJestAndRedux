var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");

var browserConfig = {
    entry: './src/browser/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(t|j)sx?$/, use: 'babel-loader', exclude: /(node_modules)/, },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { importLoaders: 1 }
                        },
                        {
                            loader: "postcss-loader",
                            options: { plugins: [autoprefixer()] }
                        }
                    ]
                })
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "css/style.css",
            disable: false,
			allChunks: true
        }),
        new webpack.DefinePlugin({
            __isBrowser__: "true"
        })
    ]
}

var serverConfig = {
    entry: './src/server/index.tsx',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: __dirname,
        filename: 'server.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(t|j)sx?$/, use: 'babel-loader', exclude: /(node_modules)/, },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        })
    ]
}

module.exports = [browserConfig, serverConfig]