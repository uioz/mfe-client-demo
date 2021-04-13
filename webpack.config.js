const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { join } = require("path");
const dealWithServer = require("./dealWIthServer");

const publicPath = "/";

module.exports = async function (env, argv) {
  return {
    entry: "./src/index.js",
    output: {
      publicPath,
      path: join(__dirname, "dist"),
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].bundle.js",
      clean: true,
    },
    // make output more clear and easy to read
    devtool: false,
    resolve: {
      alias: {
        "@": join(__dirname, "src"),
      },
      extensions: [".vue", ".js"],
    },
    devServer: await dealWithServer(),
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: require("./package.json").name,
        template: "./public/index.html",
      }),
      new VueLoaderPlugin(),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
