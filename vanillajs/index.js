const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 3000;
const API_BASE = 'https://hacker-news.firebaseio.com/v0';
const MAX_AGE = '24h';

app.set('view engine', 'pug');
app.use(compression());
app.use(express.static(path.join(__dirname, 'app'), {maxage: MAX_AGE}));

function fetchItems(ids) {
  return Promise.all(
      ids.map(id => fetch(`${API_BASE}/item/${id}.json`).then(v => v.json())))
}

app.get(
    '/stories.json',
    (req, res) => {
        fetch(API_BASE + `/${req.query.scope}.json`)
            .then(v => v.json())
            .then(
                ids => fetchItems(ids.slice(req.query.offset, req.query.num))
                           .then(stories => stories.map((v, idx) => {
                             v.idx = idx + parseInt(req.query.offset, 10);
                             return v;
                           })))
            .then(v => res.json(v))
            .catch(e => console.log(e))});

app.get(
    '/items.json',
    (req, res) => {fetchItems(req.query.ids.split(','))
                       .then(v => res.json(v))
                       .catch(e => console.log(e))});

app.get('*', (req, res) => {
  let linkHeaders = ['</cc.js>; rel=preload; as=script'];

  if (req.path === '/' || req.path === '/top') {
    linkHeaders.push(
        '</stories.json?scope=topstories&offset=0&num=30>; rel=preload')
  }
  res.header('link', linkHeaders)
  res.render('index', {maxage: MAX_AGE});
});

app.listen(port, () => {
  console.log('Server running on ' + port);
});
