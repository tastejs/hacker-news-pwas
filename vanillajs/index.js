const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'app')));

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: './app'});
});

app.listen(port, () => {
  console.log('Example app listening on port ' + port);
});
