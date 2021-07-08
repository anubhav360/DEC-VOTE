const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry:{ index:"./src/index.js" ,
    },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
    new CopyWebpackPlugin([{ from: "./src/admin.html", to: "admin.html" }]),
    new CopyWebpackPlugin([{ from: "./src/result.html", to: "result.html" }])
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
