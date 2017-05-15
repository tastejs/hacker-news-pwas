module.exports = {
  staticFileGlobs: [
    "_site/**/*.html",
    "_site/assets/**/*"
  ],
  stripPrefix: '_site/',
  runtimeCaching: [{
    urlPattern: /^https:\/\/github.com\/(.*).png/,
    handler: 'cacheFirst',
    options: {
      cache: {
        name: 'contributor-headshots'
      }
    }
  }]
};
