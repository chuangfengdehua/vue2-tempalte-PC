/*
 * @描述信息: 常用正则校验
 */

const reg = {
  intNum: {
    description: '正整数校验',
    regExp: /^[1-9]\d*$/,
    error: '请输入正整数'
  },
  zeroIntNum: {
    description: '非负整数校验',
    regExp: /(^\d$)|(^[1-9]\d+$)/,
    error: '请输入非负整数'
  },
  decimalNum: {
    description: '金额校验(最多保留两位小数)',
    regExp: /^([1-9]\d*|0)(\.\d{1,2})?$/,
    error: '请输入两位小数以内的数字'
  },
  idNum: {
    description: '身份证校验',
    regExp: /(^[1-9]\d{7}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$)|(^[1-9]\d{5}[1-3]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(\d{3}[\dXx])$)/,
    error: '请输入正确的身份证号'
  },
  phone: {
    description: '手机号校验',
    regExp: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    error: '请输入正确的手机号'
  },
  userName: {
    description: '姓名校验',
    regExp: /^[\u4e00-\u9fa5]{2,10}$/,
    error: '请输入2-10位的汉字'
  },
  name: {
    description: '名称校验',
    regExp: /^[\u4e00-\u9fa5A-z0-9]{1,20}$/,
    error: '请输入1-20位的汉字、英文、数字'
  },
  textName: {
    description: '描述信息校验',
    regExp: /^[\u4E00-\u9FA5A-Za-z0-9，。,.!·？?/+=@￥$-]{1,100}$/,
    error: '描述信息格式错误，请重新输入'
  },
  loginName: {
    description: '登录账号校验',
    regExp: /^(?!.*admin)[0-9a-zA-Z_]{5,15}$/,
    error: '账号由5到15位数字字母下划线组成，不能包含admin'
  },
  loginPwd: {
    description: '登录密码校验',
    regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@*&,.])(?!.*admin)[a-zA-Z\d!#@*&,.]{7,17}[!#@*&,.]$/,
    error: '必须包含大小写字母、数字、个别特殊字符、长度8-18位，以特殊字符结尾，不能包含admin'
  }
}
export default reg
