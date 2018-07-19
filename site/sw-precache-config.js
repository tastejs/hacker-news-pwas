module.exports = {
  staticFileGlobs: ['_site/**/*.html', '_site/assets/styles/*'],
  stripPrefix: '_site/',
  runtimeCaching: [
    {
      urlPattern: /images/,
      handler: 'fastest',
      options: {
        cache: {
          name: 'app-images',
        },
      },
    },
    {
      urlPattern: /^https:\/\/github.com\/(.*).png/,
      handler: 'cacheFirst',
      options: {
        cache: {
          name: 'contributor-headshots',
        },
      },
    },
  ],
};
