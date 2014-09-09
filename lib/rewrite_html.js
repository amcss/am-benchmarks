"use strict";

var conversions = {
  baseline: function () {
  },
  classes: function () {
  },
  attributes: function replace($) {
    $('[class]').each(function () {
      var elem = $(this);
      elem.attr('class').split(' ').forEach(function (c) {
        elem.attr('am-' + c, '');
      });
      elem.attr('class', null);
    });
  },
  values: function replace($) {
    $('[class]').each(function () {
      var elem = $(this);
      elem.attr('am-klass', elem.attr('class'));
      elem.attr('class', null)
    });
  }
};

module.exports = function ($, mode) {
  conversions[mode]($);
  return $.html();
};
