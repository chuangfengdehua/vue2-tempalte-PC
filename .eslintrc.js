module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0, //禁止使用console
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0, //禁止使用debugger
    'prettier/prettier': [0, { singleQuote: true, parser: 'flow' }],
    'one-var': 0, // 连续声明
    'space-before-function-paren': 0, // 函数定义时括号前面要不要有空格
    'dot-notation': 0, //避免不必要的方括号,关闭强制尽可能的使用点访问对象属性
    'no-new': 0, //禁止在使用new构造一个实例后不赋值
    'no-new-func': 0, //禁止使用new Function
    'no-new-object': 0, //禁止使用new Object()
    'no-new-require': 0, //禁止使用new require
    'no-new-wrappers': 0, //禁止使用new创建包装实例，new String new Boolean new Number
    camelcase: 0, // 强制驼峰法命名
    'no-control-regex': 0, //禁止在正则表达式中使用控制字符
    'no-unused-vars': [1, { vars: 'all', args: 'after-used' }], // 不能有声明后未被使用的变量或参数
    'vue/no-unused-components': 1, // vue中引入的组件未使用
    'vue/require-prop-type-constructor': 0, // 禁止要求 prop 类型必须是构造函数
    'no-prototype-builtins': 0 // 禁止使用Object.prototypes 内置函数
  }
}
