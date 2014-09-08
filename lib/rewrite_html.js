var convertToAm = function replace($) {
  $('[class]').each(function () {
    var elem = $(this);
    elem.attr('am-klass', elem.attr('class'));
    elem.attr('class', null)
  });
};

module.exports = function ($, AMify) {
  if (AMify) convertToAm($);
  return $.html();
};
