const path = require('path');
const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
    const isProd = process.argv.indexOf('-p') !== -1;
    console.log(`ENV: ${isProd? 'production': 'development'}`);


    const config = {
        devtool: isProd ? false: 'inline-source-map',
        resolve: { 
            extensions: ['.ts', '.js'],
            // modules: [
            //     path.resolve('../src'), 
            //     path.resolve('../node_modules')
            // ]
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
                    loader: 'raw-loader'
                },
                {
                    test: /\.(eot|svg|cur)$/,
                    loader: "file-loader",
                    options: {
                        name: '[name].[hash:20].[ext]',
                        outputPath: 'assets/'
                    }  
                },
                {
                    test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                    loader: "url-loader",
                    options: {
                        name: '[name].[hash:20].[ext]',
                        outputPath: 'assets/',
                        useRelativePath: true,
                        limit: 10000
                    }                      
                },
                {
                   
                    test: /\.css$/,
                    use: [
                        'to-string-loader',
                        'css-loader'
                    ]
                },
                {
                    enforce: 'post',
                    test: /\.(js|ts)$/,
                    loader: 'istanbul-instrumenter-loader',
                    include: path.resolve('../src'),
                    query: { esModules: true },
                    exclude: [
                      /\.(e2e|spec)\.ts$/,
                      /node_modules/
                    ]
                }                  
                
            ]
        },
        plugins: [
            new Dotenv({
              path: path.resolve('./.env')
            }),          
            new ProgressPlugin(),
            // new AotPlugin({
            //     tsConfigPath: './tsconfig.json',
            //     entryModule: path.join(__dirname, 'src/app/app.module#AppModule')
            // })

        ]
    };

    return config;
};