import { resolve as _resolve } from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';

export const mode = 'development';
export const entry = './src/index.js';
export const output = {
  path: _resolve(__dirname, 'sandbox/common'),
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
      exclude: /(node_modules|bower_components)/,
    },
  ],
};
export const resolve = {
  modules: [_resolve('./src'), _resolve('./node_modules')],
  extensions: ['.json', '.js'],
};
export const plugins = [new ESLintPlugin()];
