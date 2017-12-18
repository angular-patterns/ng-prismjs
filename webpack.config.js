const path = require('path');
const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonChunksPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const  ExtractTextPlugin  =  require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const del = require('del');
const  Dotenv  =  require('dotenv-webpack');

del.sync("dist/**");

module.exports = () => {
    const isProd = process.argv.indexOf('-p') !== -1;
    console.log(`ENV: ${isProd ? 'production' : 'development'}`);


    const config = {
        devtool: isProd ? false : 'inline-source-map',
        resolve: { extensions: ['.ts', '.js'] },
        entry: {
            app: './src/main.ts',
            vendor: './src/vendor.ts',
            polyfills: './src/polyfills.ts'
        },
        output: {
            filename: 'bundles/[name].[hash].bundle.js',
            path: path.join(process.cwd(), "dist")
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: '@ngtools/webpack', 
                    options: {
                        tsConfigPath: './tsconfig.json'
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        removeAttributeQuotes: false,
                        minimize: false
                    }
                },
                {
                    test: /\.(eot|svg|cur)$/,
                    loader: "file-loader",
                    options:  {
                        name:  '[name].[hash:20].[ext]',
                        outputPath:  'assets/'
                    }
                },
                {
                    test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                    loader: "url-loader",
                    options:  {
                        name:  '[name].[hash:20].[ext]',
                        outputPath:  'assets/',
                        useRelativePath: true,
                        limit: 10000
                    }
                },
                {

                    test: /\.css$/,
                    include: [
                        path.join(__dirname, 'src/app')
                    ],
                    use: [
                        'to-string-loader',
                        'css-loader'
                    ]
                },

                {
                    test: /\.css$/,
                    exclude: [
                        path.join(__dirname, 'src/app')
                    ],
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                }

            ]
        },
        plugins: [
            new  Dotenv({
                path:  './.env'
            }),
            new ProgressPlugin(),
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: 'static',
            }),
            new  ExtractTextPlugin('bundles/styles.[hash].bundle.css'),
            new HtmlWebpackPlugin({
                filename: __dirname + '/dist/index.html',
                template: __dirname + '/src/index.html',
                xhtml: true,
                compile: true,
                showErrors: true
            }),
            new CommonChunksPlugin({
                names: ['app', 'vendor', 'polyfills']
            })
            

        ].concat(isProd ? [
            new AotPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: path.join(__dirname, 'src/app/app.module#AppModule')
            })
        ]:[
            new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/)
        ])
    };

    return config;
};