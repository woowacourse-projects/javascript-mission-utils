const path = require("path");

module.exports = {
  entry: "./src/index.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "mission-utils.js",
    library: {
      name: "MissionUtils",
      type: "umd",
    },
    globalObject: "this",
    clean: true,
  },
  resolve: {
    extensions: [".js"],
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
};
