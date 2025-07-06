const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PROD = !IS_DEV

const optimize = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
  }

  if (IS_PROD) {
  }

  if (IS_DEV) {
    }

  return config
}

const getFileName = (ext) => `[name]${IS_DEV ? '' : '.[hash]'}.${ext}`

const setCssLoaders = (extra) => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader']

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

const setJsLoaders = (extra) => {
  const loaders = {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }

  if (extra) {
    loaders.options.presets.push(extra)
  }

  return loaders
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.jsx',
    stat: './statistics.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: getFileName('js')
  },
  target: 'web',
  devServer: {
    port: 4200,
    hot: false
  },
  devtool: IS_DEV ? 'source-map' : false,
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@model': path.resolve(__dirname, 'src/model'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@less': path.resolve(__dirname, 'src/less'),
      '@sass': path.resolve(__dirname, 'src/sass')
    }
  },
  optimization: optimize(),

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'favicon.png'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: getFileName('css')
    }),
    new ESLintPlugin({
      extensions: ['js'],
      configType: 'eslintrc',
      fix: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: setJsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: setJsLoaders('@babel/preset-typescript')
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: setJsLoaders('@babel/preset-react')
      },
      {
        test: /\.css$/i,
        use: setCssLoaders()
      },
      {
        test: /\.less$/i,
        use: setCssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/i,
        use: setCssLoaders('sass-loader')
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]'
        }
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/i,
        use: ['csv-loader']
      }
    ]
  }
}
