# Contributing

Thank you for your interest in contributing!

If your Hacker News implementation meets the [specifications](https://github.com/tastejs/hacker-news-pwas#specification), don't hesitate to put up a PR to add its summary to HNPWA!

If you would like to file a PR to update the site's design, please file an [issue](https://github.com/tastejs/hacker-news-pwas/issues/new) for it first.

## Setup

1. Fork the repo
2. Clone your fork
3. Make a branch for your changes
4. Install `Ruby` version 2.1+. To install the latest - execute following commands:
   * `curl -L https://get.rvm.io | bash -s stable`
   * `rvm install ruby-[version]`
5. Install `jekyll` and `bundler` gems.
   * `gem install jekyll bundler`
6. Go into the `site` directory and execute:
   * `bundle install`
7. `npm install`
8. `npm run dev` to kick off a development server
9. To test the Service Worker locally you can run `npm run dev-sw` instead.
10. If you're adding a summary of your Hacker News implementation:
    * Create a new entry under `_apps` with your application name
    * Fill out the list of attributes following the format of any of the other apps in the same directory. You'll need to include an image of your application as well. To fit the phone outline appropriately, please take a screenshot of your application emulated within a Nexus 5X using Chrome DevTools. This [tutorial](https://developers.google.com/web/tools/chrome-devtools/device-mode/) shows how to toggle Device Mode for the browser. 
    * Add yourself to the `_contributors` directory and similarly fill out all the attributes there (make sure the `authors` attribute underneath your app in `_apps` has the same exact name attribute as here)
11. Create a pull request from your branch on your fork to `master` on this repo
12. Have your branch get merged in! :star2:
