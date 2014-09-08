var express = require('express'),
  compression = require('compression'),
  fetchAndInline = require('./lib/fetch_and_inline'),
  port = process.env.PORT || 5001,
  app = express();

console.log('Gonna start on ' + port);

app.disable("x-powered-by");
app.use(compression());
app.set('views', __dirname);
app.set('view engine', 'jade');

app.route('/').get(function (req, res) {
  res.render('index');
});

app.route(/^\/(am-is-rad|actually-classes-were-better)\/(.*)$/).get(function (req, res) {
  var runAMreplacements = (req.params[0] === 'am-is-rad');
  var uri = req.params[1];
  fetchAndInline(uri, runAMreplacements)
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
