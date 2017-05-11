<img src='https://raw.githubusercontent.com/tastejs/hacker-news-pwas/b3f3d40b9e4bd385dbb973d238ce207aed1f60eb/media/logo.png' width='400px'/>

Hacker News readers as [Progressive Web Apps](https://g.co/ProgressiveWebApps). A spiritual successor to [TodoMVC](https://github.com/tastejs/todomvc).

## Implementations

See our [site](https://hnpwa-prod.appspot.com/) or the `site/apps` directory for the current
list of implementations. 

## Specification

Each implementation must include:

* Views: Top Stories, New, Show, Ask, Jobs & threaded Comments
* App must be a [Progressive Web App](https://g.co/ProgressiveWebApps)
* App must score over a 90/100 using [Lighthouse](https://github.com/GoogleChrome/lighthouse)
* App must become interactive in under 5 seconds on a Moto G4 over 3G. Use [WebPageTest](https://www.webpagetest.org/easy) using the auto-selected Moto G4 + Faster 3G setting to check.
* App must use the [Application Shell](https://developers.google.com/web/fundamentals/architecture/app-shell) pattern to instantly load the skeleton of the UI on repeat visits
* App must do its best to work cross-browser

Optionally:

* App supports offline caching of HN data (e.g similar to the 'Offline Mode' in ReactHN)
* App may use server-side rendering so displaying content is resilient to JS not loading on the network

### Data sources

* [Official real-time Hacker News API powered by Firebase](https://github.com/HackerNews/API)
* [Unofficial Hacker News API](https://github.com/cheeaun/node-hnapi) by cheeaun

## Network settings

* Emerging Markets: Chrome Beta on a Motorola G (gen 4) tested from Dulles, Virginia on a 400 Kbps 3G connection with 400ms of latency. Tested with [WebPageTest](https://www.webpagetest.org/easy) using the auto-selected Moto G4 + Emerging Markets setting.
* Faster 3G: Chrome Beta on a Motorola G (gen 4) tested from Dulles, Virginia on a 1.6 Mbps 3G connection with 300ms of latency. Tested with [WebPageTest](https://www.webpagetest.org/easy) using the auto-selected Moto G4 + Faster 3G setting.
* `Time to Interactive` readings taken from linked Lighthouse results in WebPageTest.

## License

Each implementation preserves the license noted in the linked to applications.
