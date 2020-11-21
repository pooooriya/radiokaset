// Nextjs
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');

// Webpack
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = withPlugins(
  [
    [withCss],
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
    async rewrites() {
      return [
        {
          source: '/sitemap/musics/:page/index.xml',
          destination: '/api/sitemap/music',
        },
        {
          source: '/sitemap/artists/:page/index.xml',
          destination: '/api/sitemap/artist',
        },
      ];
    },
    dir: './src',
    distDir: './build',
    env: {},
    webpack: (config, { dev, isServer }) => {
      if (isServer || dev) {
        return config;
      }

      // Source Map in production
      /* if (!dev) {
				config.devtool = 'source-map';
			} */

      const isProduction = config.mode === 'production';
      // var isClient = config.name === 'client';

      config.plugins.push(
        new webpack.DefinePlugin({
          PRODUCTION: JSON.stringify(isProduction),
        })
      );

      if (!isProduction) {
        return config;
      }

      // config.plugins.push(new CleanWebpackPlugin(['build', 'dist']));

      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        })
      );

      // optimize moment
      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

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
