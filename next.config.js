const fs = require('fs');
const path = require('path');

// Nextjs
const withCss = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');

// Ant-Design
const lessToJS = require('less-vars-to-js');
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

// Webpack
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = withPlugins(
  [
    [
      withLess,
      {
        // cssModules: true,
        // cssLoaderOptions: {
        //   // sourceMap: false,
        //   importLoaders: 1,
        //   localIdentName: "[local]___[hash:base64:5]",
        // },
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: lessToJS(
            fs.readFileSync(
              path.resolve(__dirname, './src/styles/variables.less'),
              'utf8'
            )
          ),
        },
        webpack: (config, { isServer }) => {
          config.node = {
            fs: 'empty',
          };
          // config.plugins.push(new AntdDayjsWebpackPlugin());
          if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
              (context, request, callback) => {
                if (request.match(antStyles)) return callback();
                if (typeof origExternals[0] === 'function') {
                  origExternals[0](context, request, callback);
                } else {
                  callback();
                }
              },
              ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ];
            config.module.rules.unshift({
              test: antStyles,
              use: 'null-loader',
            });
          }
          return config;
        },
      },
    ],
    [
      withCss,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
    ],
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
    ],
    [withFonts],
    [withImages],
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true',
    }),
  ],
  {
    dir: './src',
    distDir: './build',
    env: {},
    webpack: (config, { dev, isServer }) => {
      if (isServer || dev) {
        return config;
      }

      // Source Map in production
      /*if (!dev) {
				config.devtool = 'source-map';
			}*/

      var isProduction = config.mode === 'production';
      // var isClient = config.name === 'client';

      config.plugins.push(
        new webpack.DefinePlugin({
          PRODUCTION: JSON.stringify(isProduction),
        })
      );

      if (!isProduction) {
        return config;
      }

      config.plugins.push(new CleanWebpackPlugin(['build', 'dist']));

      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        })
      );

      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));

      config.plugins.push(
        new BrotliPlugin({
          asset: '[path].br[query]',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );

      return config;
    },
  }
);
