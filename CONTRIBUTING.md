# Contributing

Thank you for your interest in contributing!

## Adding a Hacker News implementation

If your Hacker News implementation meets the [specifications](https://github.com/tastejs/hacker-news-pwas#specification), don't hesitate to put up a PR for it!

## Updating the site

We're exploring using wildcards for our handlers in the `appl.yaml` file but if you add a static file or asset to the repository, you'll have to include it in file in the meantime.

## Pull Requests

If the Travis CI build for your PR fails with the following error: 

`gpg: decryption failed: bad key`

`The command "echo $super_secret_password | gpg --passphrase-fd 0 service-acc.json.gpg" failed and exited with 2 during .`

This is most likely due to the security restrictions Travis CI has in place with pull requests (see [here](https://docs.travis-ci.com/user/pull-requests/#Pull-Requests-and-Security-Restrictions)). The following build once your PR is merged in should be accurate.