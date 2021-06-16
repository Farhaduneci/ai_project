const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

var config = {
	mode: "production",
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "",
	},
	module: {
		rules: [
			{
				test: /\.js$/i,
				include: path.resolve(__dirname, "src"),
				use: {
					loader: "babel-loader",
					options: { presets: ["@babel/preset-env"] },
				},
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, "src/css"),
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		watchContentBase: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Farhad Uneci &bullet; 9708253",
			template: "./src/index.html",
		}),
		new FaviconsWebpackPlugin({
			logo: "./src/statics/favicon.ico",
			prefix: "assets/",
			mode: "light",
		}),
	],
};

module.exports = (env, argv) => {
	if (argv.mode === "development") {
		config.output.filename = "script.js"
	} else {
		config.output.filename = "script.[contenthash].js"
		config.output.clean = true
	}

	return config;
};
