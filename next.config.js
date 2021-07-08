module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|mp3|mpe?g)(\?[a-z0-9=.]+)?$/,
      loader: "file-loader",

    });
    return config;
  },
};
