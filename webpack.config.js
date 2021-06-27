const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const baseConfig = {
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: path.resolve(__dirname, "node_modules"),
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};

const devConfig = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    open: true,
  },
});

const prodConfig = merge(baseConfig, {
  mode: "production",
  plugins: [new BundleAnalyzerPlugin()],
});

module.exports = (_env, argv) =>
  argv.mode === "production" ? prodConfig : devConfig;
