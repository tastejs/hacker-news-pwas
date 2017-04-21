const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 3001;
const API_BASE = 'https://hacker-news.firebaseio.com/v0';
const MAX_AGE = '24h';
const jsdom = require("jsdom");
const dom = require('./app/app');
const request = require('request');
const pug = require('pug');
const indexFn = pug.compileFile('./views/index.pug');

app.set('view engine', 'pug');
app.use(compression());
app.use(express.static(path.join(__dirname, 'app'), { maxage: MAX_AGE }));

function fetchItems(ids) {
  return Promise.all(
    ids.map(id => fetch(`${API_BASE}/item/${id}.json`).then(v => v.json())))
}

function fetchStories(scope, offset, num) {
  return fetch(API_BASE + `/${scope}.json`)
    .then(v => v.json())
    .then(
      ids => fetchItems(ids.slice(offset, num))
      .then(stories => stories.map((v, idx) => {
        v.idx = idx + parseInt(offset, 10);
        return v;
      })));
}

app.get(
  '/stories.json',
  (req, res) => {
    const scope = req.query.scope;
    const offset = req.query.offset;
    const num = req.query.num;
    fetchStories(scope, offset, num)
      .then(v => res.json(v))
      .catch(e => console.log(e))
  });

app.get(
  '/items.json',
  (req, res) => {
    fetchItems(req.query.ids.split(','))
      .then(v => res.json(v))
      .catch(e => console.log(e))
  });

app.get('/', (req, res) => {
  jsdom.env(
    indexFn(), [''],
    function(err, window) {
      const app = window.document.querySelector('#app');

      fetchStories('topstories', 0, 30).then(stories => {
        dom.showStories = dom.showStories.bind(window);
        dom.showStories(stories, app);
        res.send(window.document.documentElement.outerHTML);
      });
    }
  );

});

app.get('*', (req, res) => {
  let linkHeaders = ['</cc.js>; rel=preload; as=script'];

  if (req.path === '/' || req.path === '/top') {
    linkHeaders.push(
      '</stories.json?scope=topstories&offset=0&num=30>; rel=preload')
  }
  res.header('link', linkHeaders)
    // res.render('index', {maxage: MAX_AGE});
});

app.listen(port, () => {
  console.log('Server running on ' + port);
});