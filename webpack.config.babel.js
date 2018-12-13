import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const configs = {
    entry: path.resolve(__dirname, 'src/index.jsx'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'memory-game-v2.[hash].js'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {

        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: [/(node_modules)/, /(lib)/],
                use: {
                    loader: 'eslint-loader',
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-transform-async-to-generator',
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }
            },

            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif|tiff|woff|woff2|eot|svg|ttf)(\?v=(.*))?$/,
                loader: 'file-loader'
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'Memory Game v2',
            template: 'src/index.html'
        }),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise'
        })
    ],

    devServer: {
        hot: true,
        historyApiFallback: true,
        inline: true,
        host: '0.0.0.0',
        contentBase: './dist',
        port: 9096,
        disableHostCheck: true
    }

};

if (process.env.NODE_ENV === 'production') {
    configs.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));

    configs.mode = 'production';
    configs.plugins.push(new UglifyJSPlugin());
} else {
    configs.devtool = 'inline-source-map';
    configs.mode = 'development';
}

export default configs;
