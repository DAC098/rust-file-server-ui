const path = require("path");

module.exports = {
	entry: {
		main: "./src/main.tsx"
	},
	output: {
		path: path.resolve(__dirname, "dst"),
		filename: "[name].b.js",
		clean: true
	},
	resolve: {
		extensions: [".ts",".tsx",".js",".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader"
					}
				]
			}
		]
	},
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				blueprint_ui: {
					test: /[\\/]node_modules[\\/]@blueprintjs/,
					name: "blueprint_ui",
					chunks: "all"
				},
				vendor: {
					test: /[\\/]node_modules[\\/](?!@blueprintjs)/,
					name: "vendor",
					chunks: "all"
				}
			}
		}
	}
};