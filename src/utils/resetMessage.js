/**
 * 重置message，防止重复点击重复弹出message弹框
 *    Demo==> this.$message.success('成功消息')
 *            this.$message.warning('警告消息')
 *            this.$message.error('失败消息')
 */
import { Message } from 'element-ui'
const showMessage = Symbol('showMessage')
class DoneMessage {
  [showMessage](type, options, single) {
    if (single) {
      if (document.getElementsByClassName('el-message').length === 0) {
        Message[type](options)
      }
    } else {
      Message[type](options)
    }
  }
  info(options, single = true) {
    this[showMessage]('info', options, single)
  }
  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }
  error(options, single = true) {
    this[showMessage]('error', options, single)
  }
  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
}
export const message = new DoneMessage()
