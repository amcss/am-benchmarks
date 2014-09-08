var rp = require('request-promise'),
  cheerio = require('cheerio'),
  url = require('url'),
  Promise = require('bluebird');

module.exports = function (uri) {
  // Start by fetching OBVS
  return rp({method: 'GET', uri: uri})
    .then(function (body) {
      // Set up the DOM, remove any scripts just to simplify things
      var $ = cheerio.load(body);
      $('script').remove();

      // Find all the LINKs to stylesheets
      var stylesheetUrls = $('link[rel=stylesheet]').get().map(function (elem) {
        return $(elem);
      });

      // Fetch them all and replace the LINK tags with inline STYLE tags
      var replacements = stylesheetUrls.map(function (stylesheet) {
        return rp({method: 'GET', uri: url.resolve(uri, stylesheet.attr('href'))})
          .then(function (styleBody) {
            stylesheet.replaceWith("<style>" + styleBody + "</style>");
          })
      });

      // Wait for all the replacements and return the new DOM
      return Promise.all(replacements)
        .then(function () {
          return $.html()
        })
    })
};