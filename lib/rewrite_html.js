var convertToAm = function replace($) {
  console.log($.html())
  $('[class]').each(function () {
    var elem = $(this);
    elem.attr('am-klass', elem.attr('class'));
    elem.attr('class', null)
  })
  console.log($.html());
};

module.exports = function ($, AMify) {
  if (AMify) convertToAm($);
  return $.html();
};
