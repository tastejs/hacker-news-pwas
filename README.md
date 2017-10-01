<p align="center">
  <a href="https://hnpwa.com/">
    <img src='https://raw.githubusercontent.com/tastejs/hacker-news-pwas/b3f3d40b9e4bd385dbb973d238ce207aed1f60eb/media/logo.png' width='400px'/>
  </a>
</p>

<p align="center">
  Hacker News readers as  <a href="https://g.co/ProgressiveWebApps">Progressive Web Apps</a>. A spiritual successor to <a href="https://github.com/tastejs/todomvc">TodoMVC</a>.
</p>

<p align="center">
  <a href="https://travis-ci.org/tastejs/hacker-news-pwas"><img alt="Build Status" src="https://travis-ci.org/tastejs/hacker-news-pwas.svg?branch=master"></a>
</p>

---

## Implementations

See our [site](https://hnpwa.com/) or the `site/apps` directory for the current
list of implementations. 

## Specification

Each implementation must include:

* Views: Hacker News Top Stories, New, Show, Ask, Jobs & threaded Comments
  * Each of these should use routing to enable sharability. For reference, see the [PreactHN](https://hn.kristoferbaxter.com/) implementation.
* App must display 30 items per-page for story list views
* App must be a [Progressive Web App](https://g.co/ProgressiveWebApps)
* App must score over a 90/100 using [Lighthouse](https://github.com/GoogleChrome/lighthouse)
* App must aim to be interactive in under 5 seconds on a Moto G4 over 3G. Use [WebPageTest](https://www.webpagetest.org/easy) using the auto-selected Moto G4 + Faster 3G setting to validate "Time to interactive"
  * We look at numeric Lighthouse scores for TTI as well as a manual inspection of the application's Timeline "trace" and [Filmstrip](https://www.webpagetest.org/video/compare.php?tests=170514_00_bb389f33405b558ea644b37f565c8a56-r:1-c:0) as a sanity check.
* App must use the [Application Shell](https://developers.google.com/web/fundamentals/architecture/app-shell) pattern to instantly load the skeleton of the UI on repeat visits
* App is responsive on desktop and mobile, making best use of available screen real-estate. See [Vue HN](https://vue-hn.now.sh/top) as an example.
* App must do its best to work cross-browser

Optionally:

* App supports offline caching of HN data (e.g similar to the 'Offline Mode' in ReactHN)
* App may use server-side rendering so displaying content is resilient to JS not loading on the network

User interface:

* At this time, HNPWA does not prescribe a specific stylesheet or theme for implementations. We will be aiming to provide this in the near future similar to how we do with TodoMVC.

### Data sources

* [Official real-time Hacker News API powered by Firebase](https://github.com/HackerNews/API)
* [Unofficial Hacker News API](https://github.com/cheeaun/node-hnapi) by cheeaun

If using the Firebase powered API please use 30 stories per-page to ensure consistency between implementations using the Unofficial API as well as the actual [Hacker News website](https://news.ycombinator.com/)

## Network settings

* Emerging Markets: Chrome Beta on a Motorola G (gen 4) tested from Dulles, Virginia on a 400 Kbps 3G connection with 400ms of latency. Tested with [WebPageTest](https://www.webpagetest.org/easy) using the auto-selected Moto G4 + Emerging Markets setting.
* Faster 3G: Chrome Beta on a Motorola G (gen 4) tested from Dulles, Virginia on a 1.6 Mbps 3G connection with 300ms of latency. Tested with [WebPageTest](https://www.webpagetest.org/easy) using the auto-selected Moto G4 + Faster 3G setting.
* `Time to Interactive` readings taken from linked Lighthouse results in WebPageTest.

## License

Each implementation preserves the license noted in the linked to applications.
