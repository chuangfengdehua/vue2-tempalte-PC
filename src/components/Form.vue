<!--
  form表单公共组件     zls-2021/8/28
  使用说明==》
    特此说明：除formRef属性外，以下所有Attributes都使用element-ui的el-form及其子项的Attributes！！！
    支持种类：input、textarea、select下拉框、cascader级联选择器、所有的日期/时间选择器、slot具名插槽自定义内容！！！
    满足场景：表单的展示与编辑切换、表单验证、表单联动、表单子项内容的change事件传递（通过中间件）、表单提交与重置

  Demo==》
    <template>
      <div class="listchild2">
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
    .custom1 {
      > img {
        width: 100%;
      }
    }
    </style>
-->

<template>
  <el-form
    class="z-form"
    :ref="formRef"
    :model="$attrs.model"
    :inline="true"
    :size="$attrs.size || 'small'"
    :label-position="$attrs['label-position']"
    :label-width="$attrs['label-width'] || '110px'"
    :hide-required-asterisk="$attrs['hide-required-asterisk']"
  >
    <el-row :gutter="$attrs.gutter">
      <template v-for="(item, index) in $attrs.model.list">
        <el-col :key="index" v-if="item.show !== false" :span="item.span ? item.span : 8">
          <el-form-item
            :prop="'list.' + index + '.' + [item.prop]"
            :rules="item.rules ? item.rules[item.prop] : null"
            :label="item.label"
            :label-width="item['label-width']"
            :required="item.required || false"
          >
            <!--input框 -->
            <el-input
              v-if="item.way === 'input' || item.way === 'textarea' || item.way === 'password' || item.way === 'number'"
              v-model="item[item.prop]"
              :type="item.type"
              :maxlength="item.maxlength || 100"
              :minlength="item.minlength"
              :show-word-limit="item['show-word-limit']"
              :placeholder="item.placeholder || '请输入'"
              :clearable="item.clearable || true"
              :show-password="item['show-password']"
              :disabled="item.disabled"
              :size="item.size"
              :prefix-icon="item['prefix-icon']"
              :suffix-icon="item['suffix-icon']"
              :autosize="item.autosize || { minRows: 3, maxRows: 3 }"
              :readonly="item.readonly"
              :step="item.step"
              :resize="item.resize || 'none'"
              :autofocus="item.autofocus"
            ></el-input>

            <!--select单选下拉框 -->
            <el-select
              v-if="item.way === 'select'"
              v-model="item[item.prop]"
              :multiple="item.multiple"
              :disabled="item.disabled"
              :value-key="item['value-key'] || 'value'"
              :size="item.size"
              :clearable="item.clearable || true"
              :collapse-tags="item['collapse-tags']"
              :multiple-limit="item['multiple-limit']"
              :name="item.name"
              :placeholder="item.placeholder || '请选择'"
              :filterable="item.filterable"
              :allow-create="item['allow-create']"
              :filter-method="item['filter-method']"
              :remote="item.remote"
              :remote-method="item['remote-method']"
              :loading="item.loading"
              :loading-text="item['loading-text']"
              :no-match-text="item['no-match-text']"
              :no-data-text="item['no-data-text']"
              :popper-class="item['popper-class']"
              :reserve-keyword="item['reserve-keyword']"
              :default-first-option="item['default-first-option']"
              :popper-append-to-body="item['popper-append-to-body']"
              :automatic-dropdown="item['automatic-dropdown']"
              @change="change(item.prop, item[item.prop])"
            >
              <el-option v-for="(opt, optI) in item.list" :key="optI" :label="opt.label" :value="opt.value" :disabled="optI.disabled || false"></el-option>
            </el-select>

            <!-- 日期时间选择框 -->
            <el-date-picker
              v-if="item.way === 'date'"
              v-model="item[item.prop]"
              :readonly="item.readonly"
              :disabled="item.disabled"
              :editable="item.editable"
              :clearable="item.clearable"
              :placeholder="item.placeholder || '请选择'"
              :start-placeholder="item['start-placeholder'] || '开始日期'"
              :end-placeholder="item['end-placeholder'] || '结束日期'"
              :type="item.type"
              :format="item.format"
              :align="item.align"
              :popper-class="item['popper-class']"
              :picker-options="item['picker-options']"
              :range-separator="item['range-separator']"
              :default-value="item['default-value']"
              :default-time="item['default-time']"
              :value-format="item['value-format']"
              :unlink-panels="item['unlink-panels'] || true"
              @change="change(item.prop, item[item.prop])"
            ></el-date-picker>

            <!-- 时间选择框 -->
            <el-time-picker
              v-if="item.way == 'time'"
              v-model="item[item.prop]"
              :readonly="item.readonly"
              :disabled="item.disabled"
              :editable="item.editable"
              :clearable="item.clearable"
              :placeholder="item.placeholder || '请选择'"
              :start-placeholder="item['start-placeholder'] || '开始时间'"
              :end-placeholder="item['end-placeholder'] || '结束时间'"
              :is-range="item['is-range']"
              :arrow-control="item['arrow-control']"
              :align="item.align"
              :popper-class="item['popper-class']"
              :picker-options="item['picker-options']"
              :range-separator="item['range-separator']"
              :value-format="item['value-format']"
              :default-value="item['default-value']"
              @change="change(item.prop, item[item.prop])"
            ></el-time-picker>

            <!-- 时间段选择框 -->
            <el-time-select
              v-if="item.way == 'timeSelect'"
              v-model="item[item.prop]"
              :readonly="item.readonly"
              :disabled="item.disabled"
              :editable="item.editable"
              :clearable="item.clearable"
              :placeholder="item.placeholder || '请选择'"
              :start-placeholder="item['start-placeholder'] || '开始时间'"
              :end-placeholder="item['end-placeholder'] || '结束时间'"
              :is-range="item['is-range']"
              :arrow-control="item['arrow-control']"
              :align="item.align"
              :popper-class="item['popper-class']"
              :picker-options="item['picker-options']"
              :range-separator="item['range-separator']"
              :value-format="item['value-format']"
              :default-value="item['default-value']"
              @change="change(item.prop, item[item.prop])"
            >
            </el-time-select>

            <!-- 级联选择器 -->
            <el-cascader
              v-if="item.way === 'cascader'"
              v-model="item[item.prop]"
              :options="item.options"
              :props="item.props || { expandTrigger: 'hover' }"
              :placeholder="item.placeholder || '请选择'"
              :disabled="item.disabled"
              :clearable="item.clearable || true"
              :show-all-levels="item['show-all-levels']"
              :collapse-tags="item['collapse-tags']"
              :separator="item.separator"
              :filterable="item.filterable"
              :filter-method="item['filter-method']"
              :before-filter="item['before-filter']"
              :popper-class="item['popper-class']"
              @change="change(item.prop, item[item.prop])"
            ></el-cascader>

            <slot :name="item.prop"></slot>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    formRef: {
      default: 'formCustomRef',
      type: String
    }
  },
  methods: {
    // form表单中的事件中间件 { eventName:事件名称, item: 当前项中的数据 }
    change(eventName, val) {
      this.$emit('change', eventName, val)
    },

    // 提交事件
    submit(callback) {
      this.$refs[this.formRef].validate(valid => {
        if (valid) {
          callback(this.getFormObj())
        } else {
          return false
        }
      })
    },
    // 重置事件
    reset(callback) {
      this.$refs[this.formRef].resetFields()
      callback(this.getFormObj())
    },

    // 获取表单所有属性及其值
    getFormObj() {
      const obj = this.$attrs.model.list.reduce((acc, cur) => ({ ...acc, [cur.prop]: cur[cur.prop] }), {})
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
.formOne {
  width: 100%;
  height: 100%;
}
</style>
