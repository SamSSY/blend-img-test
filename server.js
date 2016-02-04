var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var port = 3000;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/asset', express.static(__dirname + '/asset'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log('HTTP on http://localhost:3000/');
});
