const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const compression = require('compression');
const API_BASE = 'https://hacker-news.firebaseio.com/v0';

app.use(compression());
app.use(express.static(path.join(__dirname, 'app')));

app.get(
    '/items.json',
    (req, res) => {
        Promise
            .all(req.query.ids.split(',').map(
                id => fetch(`${API_BASE}/item/${id}.json`).then(v => v.json())))
            .then(v => res.json(v))
            .catch(e => console.log(e))});

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: './app'});
});

app.listen(port, () => {
  console.log('Server running on ' + port);
});
