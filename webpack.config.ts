import path from 'path';
import {Configuration, DefinePlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const debug = process.env.production || !process.env.development;
console.log(path.resolve(__dirname, 'build'));

const webpackConfig = (): Configuration => ({
    entry: './src/index.tsx',
    devtool: debug ? 'eval-source-map' : false,
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})]
    },
    output: {
        clean: true,
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                },
                exclude: /build/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
            template: './public/index.html'
        }),
        // DefinePlugin allows you to create global constants which can be configured at compile time
        new DefinePlugin({
            'process.env': debug
        })
        // not producing build so commenting this below plugin
        // new ForkTsCheckerWebpackPlugin({
        //     // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
        //     eslint: {
        //         files: './src/**/*.{ts,tsx,js,jsx}'
        //     }
        // })
    ]
});

export default webpackConfig;
