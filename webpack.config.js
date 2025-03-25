import  { resolve as _resolve } from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';
import { BundleAnalyzerPlugin as bundleAnalyzer } from 'webpack-bundle-analyzer';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const mode = process.env.NODE_ENV || 'production';
export const entry = './src/index.js';
export const output = {
  path: _resolve(__dirname, 'build'),
  filename: 'three-nebula.js',
  library: 'Nebula',
  libraryTarget: 'umd',
  globalObject: 'this',
};
export const devtool = 'source-map';
export const module = {
  rules: [
    {
      test: /(\.jsx|\.js)$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/,
    },
  ],
};
export const resolve = {
  modules: [_resolve('./src'), _resolve('./node_modules')],
  extensions: ['.json', '.js'],
};
export const plugins = [
  new bundleAnalyzer({
    analyzerMode: 'disabled',
    generateStatsFile: true,
  }),
  new ESLintPlugin(),
];
