module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    // 多个选择器样式之间不允许有空行 never-multi-line / null
    'rule-empty-line-before': null,
    // 屏蔽一些scss等语法检查
    'at-rule-no-unknown': [true, { ignoreAtRules: ['function', 'if', 'return', 'include', 'extend', 'mixin', 'else', 'while', 'for', 'each'] }],
    // 禁止低优先级的选择器出现在高优先级的选择器之后
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': true,
    // 'font-family-no-missing-generic-family-keyword': [true, { ignoreFontFamilies: ['液晶数字字体', '微软雅黑', '迷你简菱心', 'DIN-Medium', 'MicrosoftYaHei-Bold', 'MicrosoftYaHei', 'DIN'] }],
    // 在规则之前要求有空行
    'at-rule-empty-line-before': 'never',
    'declaration-empty-line-before': 'never',
    'declaration-colon-newline-after': null,
    // 在声明块中要求或禁止尾部分号 always / null
    'declaration-block-trailing-semicolon': null,
    'font-family-no-missing-generic-family-keyword': null
  }
}
