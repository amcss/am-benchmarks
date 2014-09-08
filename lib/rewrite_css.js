var rework = require('rework');

var convertToAm = function replace(ast) {
  ast.rules.forEach(function (rule) {
    if (rule.type == 'media') replace(rule);
    if (rule.type != 'rule' || !rule.selectors) return;

    rule.selectors = rule.selectors.map(function (selector) {
      return selector.replace(/\.([\w-]+)/g, "[am-klass~='$1']");
    })
  });
};
var keepOriginal = function (ast) {
};

module.exports = function (css, AMify) {
  return rework(css).use(AMify ? convertToAm : keepOriginal).toString();
};
