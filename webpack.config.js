import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: "./src/index.js",
  target: "node",
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
            presets: ["@babel/preset-env"]
          },
        },
      },
    ],
  },
};

export default [
  // CJS 빌드
  {
    ...config,
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "mission-utils.cjs",
      library: {
        type: "commonjs",
      },
    },
  },
  // ESM 빌드
  {
    ...config,
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "mission-utils.js",
      library: {
        type: "module",
      },
      chunkFormat: "module",
    },
    experiments: {
      outputModule: true, // ESM 출력 모듈 활성화
    },
  },
];
