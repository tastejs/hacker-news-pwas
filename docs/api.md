# HNPWA API

**A fast, CDN delivered, aggregated Hacker News API**

https://hnpwa.com/api/v0/news.json

## Why?

Everything in the official Hacker News API is either 
[an item](https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty) or 
[a list of items](https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty).

This structure is not ideal for building fast loading Progressive Web Apps since it will require multiple network requests
to get the needed payload for page render. 

The HNPWA solves this problem by aggregating each item in the id list into item feeds.

## Item feeds

There are five item feeds.

| Name | URL |
| --- | --- |
| News| https://hnpwa.com/api/v0/news.json |
| Newest | https://hnpwa.com/api/v0/newest.json |
| Ask | https://hnpwa.com/api/v0/ask.json |
| Show | https://hnpwa.com/api/v0/show.json |
| Jobs | https://hnpwa.com/api/v0/jobs.json |

### Schema

Each item feed returns an array of `FeedItem`.

```ts
export interface FeedItem {
  id: number;
  title: string;
  points?: number | null;
  user?: string | null;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url?: string;
  domain?: string;
}
```

### Paging 

Item feeds can be paged with the `?page=` query parameter. Each page starts at 1 and each feed has a different ending page.

[https://hnpwa.com/api/v0/news.json?page=2](https://hnpwa.com/api/v0/news.json?page=2)
  
| Name | Max Pages |
| --- | --- |
| News| 10 |
| Newest | 12 |
| Ask | 3 |
| Show | 2 |
| Jobs | 1 |

## Individual items

Feeds provide the top level view of an item, but other details like comment threads are avaiable at the individual item level.

[https://hnpwa.com/api/v0/item/13831370.json](https://hnpwa.com/api/v0/item/13831370.json)

### Schema 

```ts
export interface Item {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  time_ago: string;
  content: string;
  deleted?: boolean;
  dead?: boolean;
  type: string;
  url?: string;
  domain?: string;
  comments: Item[]; // Comments are items too
  level: number;
  comments_count: number;
}
```

## Users

Users are retrieved by username.

[https://hnpwa.com/api/v0/user/davideast.json](https://hnpwa.com/api/v0/user/davideast.json)

### Schema

```ts
export interface User {
  about?: string;
  created_time: number;
  created: string;
  id: string;
  karma: number;  
}
```

## Local Development

The HNPWA API uses the [hnpwa-api](https://github.com/davideast/hnpwa-api/) module and ran on [Cloud Functions](https://firebase.google.com/docs/functions/) and [Firebase Hosting](https://firebase.google.com/docs/hosting/functions).
If you want to run the API while offline you can globally install the module to serve offline.

```bash
npm i -g hnpwa-api
hnpwa-api --save # saves current HN API data set offline
hnpwa-api --serve --offline --port=4000
```
