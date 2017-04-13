<img src='https://raw.githubusercontent.com/tastejs/hacker-news-pwas/b3f3d40b9e4bd385dbb973d238ce207aed1f60eb/media/logo.png' width='400px'/>

Hacker News readers as [Progressive Web Apps](https://g.co/ProgressiveWebApps). A spiritual successor to [TodoMVC](https://github.com/tastejs/todomvc).

## Implementations

### React

* Live: https://react-hn.appspot.com
* Repo: https://github.com/insin/react-hn
* WPT: https://www.webpagetest.org/result/170328_4T_471cf99ca38b890fc687d1ca25e2260f/
* Time to interactive: 4.2s
* Lighthouse: 100/100

### Preact

* Live: https://hn.kristoferbaxter.com/
* Repo: https://github.com/kristoferbaxter/preact-hn
* WPT: https://www.webpagetest.org/result/170328_SX_2b62ae440379075b887f472c02a3e0a3/
* Time to interactive (beta): 1.78s
* Lighthouse: 100/100

### Svelte

* Live: https://svelte-hn.now.sh/
* Repo: https://github.com/sveltejs/svelte-hackernews
* WPT: https://www.webpagetest.org/result/170326_WA_W1F/
* Time to interactive (beta): 4.5s
* Lighthouse: 100/100

### Vue.js

* Live: https://vue-hn.now.sh/
* Repo: https://github.com/vuejs/vue-hackernews-2.0
* WPT: https://www.webpagetest.org/result/170413_KY_7F4/
* Time to interactive: 2.9s
* Lighthouse: 93/100

### Angular

* Live: https://angular2-hn.firebaseapp.com/
* Repo: https://github.com/housseindjirdeh/angular2-hn
* WPT: https://www.webpagetest.org/result/170328_N6_761d4f12fce28adc5163a3d056ce0af6/
* Time to interactive: 3.48s
* Lighthouse: 100/100

### viperHTML

* Live: https://viperhtml-164315.appspot.com/
* Repo: https://github.com/WebReflection/viper-news
* WPT: https://www.webpagetest.org/result/170412_R2_1K0J/
* Time To Interactive (alpha): 1.9s
* Lighthouse: 100/100

## Specification

Each implementation must include:

* Views: Top Stories, New, Show, Ask, Jobs & threaded Comments
* App must be a [Progressive Web App](https://g.co/ProgressiveWebApps)
* App must score over a 90/100 using [Lighthouse](https://github.com/GoogleChrome/lighthouse)
* App must become interactive in under 5 seconds on a Moto G4 over 3G. Use [WebPageTest](https://www.webpagetest.org/easy) using the auto-selected Moto G4 + Emerging Market setting to check.
* App must use the [Application Shell](https://developers.google.com/web/fundamentals/architecture/app-shell) pattern to instantly load the skeleton of the UI on repeat visits
* App must do its best to work cross-browser 

Optionally:

* App supports offline caching of HN data (e.g similar to the 'Offline Mode' in ReactHN)
* App may use server-side rendering so displaying content is resilient to JS not loading on the network

### Data sources

* [Official real-time Hacker News API powered by Firebase](https://github.com/HackerNews/API)
* [Unofficial Hacker News API](https://github.com/cheeaun/node-hnapi) by cheeaun

## License

Each implementation preserves the license noted in the linked to applications.

