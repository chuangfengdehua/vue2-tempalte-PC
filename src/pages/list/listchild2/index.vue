<!--
 * @描述信息: 自定义多功能form表单
 * @Author:  zls
-->
<template>
  <div class="listchild2">
    <div class="listchild2-box">
      <div class="permission" v-permission>测试按钮级别的权限指令</div>
      <h1 class="zhanwei">自定义多功能form表单</h1>
      <div class="form-box">
        <jy-form ref="formRef" :model="formObj" @change="handleForm">
          <div class="custom1" slot="custom1">
            <img src="../../../assets/img/log-analysis-bg.png" alt="" />
          </div>
          <div class="custom2" slot="custom2">
            <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949" active-value="100" inactive-value="0"> </el-switch>
            <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"> </el-rate>
            <el-slider v-model="value2"></el-slider>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </jy-form>
        <button @click="submit">提交表单</button>
        <button @click="reset">重置表单</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Listchild2',
  data() {
    var cascaderArr = [
      {
        value: 'zhinan',
        label: '指南',
        children: [
          {
            value: 'shejiyuanze',
            label: '设计原则',
            children: [
              {
                value: 'yizhi',
                label: '一致'
              },
              {
                value: 'fankui',
                label: '反馈'
              }
            ]
          },
          {
            value: 'daohang',
            label: '导航',
            children: [
              {
                value: 'cexiangdaohang',
                label: '侧向导航'
              },
              {
                value: 'dingbudaohang',
                label: '顶部导航'
              }
            ]
          }
        ]
      },
      {
        value: 'zujian',
        label: '组件',
        children: [
          {
            value: 'basic',
            label: 'Basic',
            children: [
              {
                value: 'layout',
                label: 'Layout 布局'
              }
            ]
          },
          {
            value: 'form',
            label: 'Form',
            children: [
              {
                value: 'radio',
                label: 'Radio 单选框'
              },
              {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }
            ]
          }
        ]
      },
      {
        value: 'ziyuan',
        label: '资源',
        children: [
          {
            value: 'jiaohu',
            label: '组件交互文档'
          }
        ]
      }
    ]

    var checkName = (rule, value, callback) => {
      if (!/^[\u4E00-\u9FA5A-Za-z0-9]{1,10}$/.test(value)) {
        callback(new Error('请输入1-10位的汉字、英文、数字'))
      } else {
        callback()
      }
    }
    return {
      value: 3.6,
      value1: 1,
      value2: 2,
      dialogImageUrl: '',
      dialogVisible: false,
      formObj: {
        list: [
          {
            way: 'input',
            type: 'input',
            label: '文本:',
            prop: 'name',
            name: '',
            rules: {
              name: [{ required: true, validator: checkName, trigger: 'blur' }]
            }
          },
          {
            way: 'password',
            type: 'password',
            label: '密码:',
            prop: 'pwd',
            pwd: '',
            rules: {
              pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
          },
          {
            way: 'number',
            type: 'number',
            label: '数字间隔:',
            prop: 'nums',
            nums: 0,
            step: 5
          },
          {
            way: 'select',
            label: '单选框1:',
            prop: 'danxaun1',
            danxaun1: '',
            list: [
              { label: '联动父亲1', value: 1 },
              { label: '联动父亲2', value: 2 },
              { label: '联动父亲3', value: 3 }
            ]
          },
          {
            way: 'select',
            label: '单选框2:',
            prop: 'danxaun2',
            danxaun2: '',
            disabled: true,
            list: [
              { label: '联动儿子1', value: 11 },
              { label: '联动儿子2', value: 12 },
              { label: '联动儿子3', value: 13 }
            ]
          },
          {
            way: 'select',
            label: '单选框3:',
            prop: 'danxaun3',
            danxaun3: '',
            show: false,
            disabled: true,
            list: []
          },
          {
            way: 'date',
            type: 'date',
            label: '年月日:',
            prop: 'dateYearMonthDay',
            dateYearMonthDay: null
          },
          {
            way: 'date',
            type: 'datetime',
            label: '年月日时分秒:',
            prop: 'dateDatetime',
            dateDatetime: null
          },
          {
            way: 'date',
            type: 'daterange',
            label: '年月日range:',
            prop: 'dateDaterange',
            dateDaterange: null,
            'picker-options': {
              disabledDate: time => {
                console.log(time)
                return time.getTime() < Date.now() - 3600 * 1000 * 24
              }
            }
          },
          {
            way: 'date',
            type: 'datetimerange',
            label: '年月日时分秒range:',
            prop: 'dateDatetimerange',
            dateDatetimerange: null
          },
          {
            way: 'time',
            label: '任意时间点:',
            prop: 'anyPointTime',
            anyPointTime: null,
            'picker-options': {
              selectableRange: ['18:30:00 - 20:30:00', '22:30:00 - 23:30:00']
            }
          },
          {
            way: 'time',
            label: '任意时间点范围:',
            prop: 'anyPointTimeRange',
            anyPointTimeRange: null,
            'is-range': true
          },
          {
            way: 'timeSelect',
            label: '任意时间段:',
            prop: 'anyParagraphTime',
            anyParagraphTime: null,
            'picker-options': {
              start: '00:00',
              step: '00:30',
              end: '24:00'
            }
          },
          {
            way: 'cascader',
            label: '级联选择(单选可搜):',
            prop: 'cascader',
            cascader: [],
            options: cascaderArr
          },
          {
            way: 'cascader',
            label: '级联选择(多选可搜):',
            prop: 'cascaderMore',
            cascaderMore: [],
            options: cascaderArr,
            props: { multiple: true }
          },
          {
            way: 'textarea',
            type: 'textarea',
            label: '富文本:',
            prop: 'text',
            text: '',
            span: 24
          },
          {
            label: '自定义内容1:',
            prop: 'custom1',
            span: 12
          },
          {
            label: '自定义内容2:',
            prop: 'custom2',
            span: 12
          }
        ]
      }
    }
  },
  mounted() {
    console.log('---从列表孙子页获取的数据---', this.$route.params)
  },
  methods: {
    // form表单中的事件中间件
    handleForm(event, val) {
      switch (event) {
        case 'dateYearMonthDay':
          console.log('--选择年月日--', val)
          break
        case 'dateDatetime':
          console.log('--选择年月日时分秒--', val)
          break
        case 'dateDaterange':
          console.log('--选择年月日(范围)--', val)
          break
        case 'dateDatetimerange':
          console.log('--选择年月日时分秒(范围)--', val)
          break
        case 'anyPointTime':
          console.log('--任意时间点--', val)
          break
        case 'anyPointTimeRange':
          console.log('--任意时间点范围--', val)
          break
        case 'anyParagraphTime':
          console.log('--任意时间段--', val)
          break
        case 'cascader':
          console.log('--级联选择(单选可搜)--', val)
          break
        case 'cascaderMore':
          console.log('--级联选择(多选可搜)--', val)
          break
        case 'danxaun1':
          this.dxkChange1(val)
          break
        case 'danxaun2':
          this.dxkChange2(val)
          break
        default:
          break
      }
    },

    // 单选框1的change事件
    dxkChange1(val) {
      console.log('--单选框1选中的值--', val)
      this.formObj.list[4].disabled = val ? false : true
      this.formObj.list[5].disabled = val ? false : true
      this.formObj.list[4].danxaun2 = ''
      this.formObj.list[5].danxaun3 = ''
    },

    // 单选框2的change事件
    dxkChange2(val) {
      console.log('--单选框2选中的值--', val)
      this.formObj.list[5].disabled = val ? false : true
      this.formObj.list[5].danxaun3 = ''
      // 根据val调用单选框3的接口
      setTimeout(() => {
        this.formObj.list[5].list = [
          { label: '联动孙子1', value: 111 },
          { label: '联动孙子2', value: 121 },
          { label: '联动孙子3', value: 131 }
        ]
        this.formObj.list[5].show = this.formObj.list[5].list.length ? true : false
      }, 1000)
    },

    // 表单提交
    submit() {
      this.$refs.formRef.submit(obj => {
        console.log('--提交的表单数据--', obj)
      })
    },

    // 表单重置
    reset() {
      this.$refs.formRef.reset(obj => {
        console.log('--清空的表单数据--', obj)
      })
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.listchild2 {
  &-box {
    height: 100%;
    .permission {
      width: 300px;
      height: 40px;
      line-height: 40px;
      background-color: #6bad2e;
      border-radius: 4px;
      text-align: center;
      margin-bottom: 10px;
      font-size: 18px;
      color: #fff;
    }
    .zhanwei {
      width: 100%;
      margin-bottom: 20px;
      font-size: 26px;
      height: 30px;
    }
    .custom1 {
      > img {
        width: 100%;
      }
    }
  }
}
</style>
