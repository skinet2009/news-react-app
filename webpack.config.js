/* eslint-env node */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CLIENT_PATH = path.join(__dirname, '/src');
const DEBUG = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const resultConfig = {
    entry: {
        main: 'src/index.js',
    },

    context: CLIENT_PATH,
    output: {
        path: path.join(CLIENT_PATH, '../dist'),
        filename: './js/[name].js',
        library: '[name]',
        libraryTarget: 'this',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            src: CLIENT_PATH,
            // ui: path.join(CLIENT_PATH, 'ui'),
            // lib: path.join(CLIENT_PATH, 'lib'),
            // template: path.join(CLIENT_PATH, 'template'),
            // theme: path.join(CLIENT_PATH, 'theme'),
            // partial: path.join(ASSETS_PATH, 'template'),
        },
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    publicPath: '../',
                }),
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]',
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'less-loader',
                        },
                    ],
                    publicPath: '../',
                }),
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.join(CLIENT_PATH),
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-0'],
                        },
                    },
                ],
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '30000',
                            name: 'images/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.gif$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.ttf(\?[a-z0-9=\.]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            mimetype: 'application/font-ttf',
                            name: 'fonts/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.svg(\?[a-z0-9=\.]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            mimetype: 'image/svg+xml',
                            name: 'fonts/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.woff(\?[a-z0-9=\.]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.woff2(\?[a-z0-9=\.]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            mimetype: 'application/font-woff2',
                            name: 'fonts/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.eot(\?[a-z0-9=\.]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            mimetype: 'application/vnd.ms-fontobject',
                            name: 'fonts/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            __DEBUG__: JSON.stringify(DEBUG),
            'process.env': {
                NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production'),
            },
        }),
        new ExtractTextPlugin('./css/[name].css'),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery',
        //     'window.$': 'jquery',
        // }),
        new CommonsChunkPlugin({
            name: 'common',
        }),
    ],

    watch: DEBUG,

    devtool: DEBUG ? 'source-map' : false,

    devServer: {
        hot: true,
        port: 3000,
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/dist/',
    },
};

// Минимизация кода, если production режим
if (!DEBUG) {
    resultConfig.plugins.push(
        new UglifyJsPlugin()
    );
}

module.exports = resultConfig;

// module.exports = environments[process.env.NODE_ENV] || environments.development;
