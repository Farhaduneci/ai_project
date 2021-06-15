const path = require("path");
module.exports = {
	mode: "production",
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "dist"),
		filename: "script.js",
		publicPath: "dist/",
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
};
