"use strict";

var express = require('express'),
  compression = require('compression'),
  fetchAndInline = require('./lib/fetch_and_inline'),
  port = process.env.PORT || 5001,
  app = express();

app.disable("x-powered-by");
app.use(compression());
app.set('views', __dirname);
app.set('view engine', 'jade');

app.route('/').get(function (req, res) {
  res.render('index');
});

app.route(/^\/(baseline|classes|attributes|values)\/(.*)$/).get(function (req, res) {
  // Everything here is cached for a week
  res.setHeader('Cache-Control', 'public, max-age=' + 3600*24*7);

  // Only respond to HTML pages
  if (!(req.headers['accept'].match(/text\/html/))) return res.status(404).send();

  // Fetch the URL, process it and send it down
  var mode = req.params[0];
  var uri = req.params[1];
  fetchAndInline(uri, mode)
    .then(function (body) {
      res.send(body);
    })
    .catch(function (e) {
      res.status(400).send(e);
    });
});

var server = app.listen(port, function () {
  console.log('Listening on port %d', server.address().port);
});
