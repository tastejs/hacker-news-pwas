# Contributing

Thank you for your interest in contributing!

If your Hacker News implementation meets the [specifications](https://github.com/tastejs/hacker-news-pwas#specification), don't hesitate to put up a PR for it!

If you would like to file a PR to update the site's design, please file an [issue](https://github.com/tastejs/hacker-news-pwas/issues/new) for it first.

## Setup

1. Fork the repo
2. Clone your fork
3. Make a branch for your changes
4. `npm install`
5. `npm run dev` to kick off a development server
6. To test the Service Worker locally you can run `npm run dev-sw` instead.
7. If you're adding a Hacker News implementation:
    * Add your app underneath the `_apps` directory
    * Fill out the list of attributes following the format of any of the other apps in the same directory 
    * Add yourself to the `_contributors` directory and similarly fill out all the attributes there (make sure the `authors` attribute underneath your app in `_apps` has the same exact name attribute as here)
8. We're exploring using wildcards for our handlers in the `appl.yaml` file but if you add a static file or asset to the repository, you'll have to include it in this file in the meantime.
9. Create a pull request from your branch on your fork to `master` on this repo
10. Have your branch get merged in! :star2:
