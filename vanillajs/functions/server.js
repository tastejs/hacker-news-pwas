const SECTION_MATCHER = /^\/$|news|new|show|ask|jobs/;
const STORY_MATCHER = /story\/(\d+$)/;

const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 3001;
const API_BASE = 'https://hnpwa-api.firebaseapp.com';
const MAX_AGE = '24h';
const jsdom = require('jsdom');
const dom = require('./app/app');
const request = require('request');
const pug = require('pug');
const renderIndex = pug.compileFile(__dirname + '/views/index.pug');

app.set('view engine', 'pug');
app.use(compression());
app.use(express.static(path.join(__dirname, 'app'), {maxage: MAX_AGE}));

function fetchItems(ids) {
  return Promise.all(
      ids.map(id => fetch(`${API_BASE}/item/${id}.json`).then(v => v.json())))
}

function fetchStories(scope, offset, num) {
  return fetch(`${API_BASE}/${scope}.json?page=${offset}`).then(v => v.json());
}

app.get('/stories.json', (req, res) => {
  const scope = req.query.scope;
  const offset = req.query.offset;
  const num = req.query.num;
  fetch(`${API_BASE}/${scope}.json?page=${offset}`)
    .then(res.json)
    .catch(console.log);
});

app.get('/item/:id', (req, res) => {
  const id = req.params.id;
  fetch(`${API_BASE}/item/${id}.json`)
    .then(res.json)
    .catch(console.log);
});

app.get(
    '/items.json',
    (req, res) => {fetchItems(req.query.ids.split(','))
                       .then(v => res.json(v))
                       .catch(e => console.log(e))});

function renderRoot(req, res, scope='news') {
  jsdom.env(renderIndex(), (err, window) => {
    const app = window.document.querySelector('#app');
    
    fetchStories(scope, 0).then(stories => {
      dom.showStories = dom.showStories.bind(window);
      dom.showStories(app, stories);
      res.send(window.document.documentElement.outerHTML);
    }).catch(e => {
      res.status(500);
      res.send(e.message);
    });
  });
}

function getScopeFromPath(path) {
  if (path === '/') {
    return 'news';
  }

  return `${path.match(SECTION_MATCHER)[0]}`
}

app.get('*', (req, res) => {
  let linkHeaders = ['</cc.js>; rel=preload; as=script'];

  if (req.path.match(SECTION_MATCHER)) {
    const scope = getScopeFromPath(req.path);
    linkHeaders.push(
        `</stories.json?scope=${scope}&page=0>; rel=preload`)
    res.header('link', linkHeaders)
    renderRoot(req, res, scope);
  } else if (req.path.match(STORY_MATCHER)) {
    // For now just punt the render to the client.
    res.send(renderIndex());
  } else {
    res.status(404);
    res.end();
  }
});

module.exports = app;
