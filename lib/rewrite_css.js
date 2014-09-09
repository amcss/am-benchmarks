var rework = require('rework');

var convertToAm = function (selectorCb) {
  return function replace(ast) {
    ast.rules.forEach(function (rule) {
      if (rule.type == 'media') replace(rule);
      if (rule.type != 'rule' || !rule.selectors) return;

      rule.selectors = rule.selectors.map(selectorCb);
    });
  }
};

var pluginsByMode = {
  classes: function () {
  },
  attributes: convertToAm(function (selector) {
    return selector.replace(/\.([\w-]+)/g, "[am-$1]");
  }),
  values: convertToAm(function (selector) {
    return selector.replace(/\.([\w-]+)/g, "[am-klass~='$1']");
  })
};

module.exports = function (css, mode) {
  return rework(css).use(pluginsByMode[mode]).toString();
};
