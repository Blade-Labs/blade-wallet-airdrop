const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: {
      index: path.resolve(__dirname, "src/js/index.js")
    },
    output: {
     path: path.resolve(__dirname, "docs"),
     filename: "[name][contenthash].js",
     clean: true
    },
    devServer: {
      static: path.resolve(__dirname, "docs"),
      hot: true,
      open: true,
      port: 4242
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html"
      }),
      new Dotenv()
    ]
  };
}
