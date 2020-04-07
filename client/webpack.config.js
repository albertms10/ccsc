const path = require('path');
const fs = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './scripts/ant-theme-vars.less'), 'utf8'));

// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
themeVariables['@icon-url'] = '\'http://localhost:8080/fonts/iconfont\'';

module.exports = {
  context: __dirname,
  entry: './scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './'),
  },
  resolve: {
    modules: ['scripts', 'node_modules'],
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          presets: [
            ['env', { modules: false, targets: { browsers: ['last 2 versions'] } }],
            'react',
          ],
          cacheDirectory: true,
          plugins: [
            ['import', { libraryName: 'antd', style: true }],
            'transform-strict-mode',
            'transform-object-rest-spread',
          ],
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              modifyVars: themeVariables,
              root: path.resolve(__dirname, './'),
            },
          },
        ],
      },
    ],
  },
};
