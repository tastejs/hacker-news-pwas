# HNPWA API Publish Server

The HNPWA API is served statically by Firebase Hosting. However, the files are generated and published every 20 minutes on AppEngine. 

## Prioritizing new content
The Official Hacker News API uses categories of new content: Top Stories, Ask, Jobs, Show, Newest, and such. Each category has a max number of pages. The stories on these pages are considered "fresh content". Every 20 minutes the HNPWA API generates static files for these categories and their pages as static files. Since these files are static and prepublished, they will load much more quickly than dynamically generated files. However, the API still provides older individual items. These items are generated with Cloud Functions and served over Firebase Hosting's CDN. These items are likely to take longer to load.

## Publishing instructions
1. Ask davideast for deploy permissions.
1. Install dependencies inside the `api` folder.
1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/). 
1. Initialize Google Cloud SDK to HNPWA project.
1. Run `yarn build` (or `npm run build`).
1. Run `yarn deploy`.
1. Check the [GCP dashboard for errors](console.cloud.google.com/errors).
