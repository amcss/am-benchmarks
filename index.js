var express = require('express'),
  compression = require('compression'),
  fetchAndInline = require('./lib/fetch_and_inline'),
  port = process.env.PORT || 5001,
  app = express();

app.disable("x-powered-by");
app.use(compression());
app.route('/').get(function (req, res) {
  res.send("HOKAY");
});

app.route(/^\/am-is-rad\/(.*)$/).get(function (req, res) {
  var uri = req.params[0];
  fetchAndInline(uri)
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
