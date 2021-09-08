<!--
  table + pagination 表格与分页公共组件     zls-2021/8/25
  使用说明==》
    特此说明：除了支持以下Attributes，你还可以使用element-ui的el-table及el-pagination的所有Attributes！！！！！！！！！！
             父组件使用该组件时，外层最好包一层，该层使用 calc 百分比布局，这样table表格的高度可实现自适应，不需要传递height/max-height！！！！
    Attributes: 
          1、type: 1,                // 列表中的项是序号数字（1:序号、2:单选、3:多选），默认为1
          2、headData: [],           // 标题列表数据(必传), 具体配置参数，请看下方【参数解析】
          3、startIndex: 1           // 序号
          4、oprateData: [],         // 操作按钮数据（默认为空）, 具体配置参数，请看下方【参数解析】
          5、oprateWidth: 150,       // 操作项的宽度，默认为150（oprateData必须存在）
          6、oprateFixed: false,     // 操作项是否浮动，默认为false（oprateData必须存在）
          7、oprateCustom: false,    // 是否自定义操作项，默认否。当oprateCustom为true时，oprateData不需要传！!
          8、showPagination: true,   // 是否显示分页,默认显示

            参数解析==》
              1、headData头部数据
                text:头部内容、prop:数据项的键、width: 当前项的宽度（不传则自适应）、align: 当前项是否居中显示，默认为center（left、center、right）
                  headData:[
                    {text:'站序号',prop:'a',width:100},
                    {text:'监控索引号',prop:'b',width:150},
                    {text:'设备名称',prop:'c'},
                  ]
              2、tableData表格数据
                  tableData: [
                    {a: '1',b: '1023',c:'110Kv三变/#1主变/开关',d: },
                    {a: '1',b: '1023',c:'110Kv三变/#1主变/开关',d: },
                    {a: '1',b: '1023',c:'110Kv三变/#1主变/开关',d: },
                  ]
              3、oprateData操作项数据
                  3.1）文字操作按钮
                      text:  按钮名称、event: 按钮事件名、color: 文字颜色、borderColor: 边框颜色、bgColor: 背景颜色、fontSize:文字大小（不需要加px）
                      oprateData:[
                        {text:'详情',event:'detail',color:'#fff',borderColor:'#2ed5ff',bgColor:'#156a94'},
                        {text:'编辑',event:'edit',color:'#fff',borderColor:'#b8d6fe',bgColor:'#245992'},
                        {text:'审核',event:'shenhe',color:'#fff',borderColor:'#ffa2a2',bgColor:'#51455d'},
                      ],
                  3.2）svg图标操作按钮
                      svg:  按钮名称、event: 按钮事件名
                      oprateData:[
                        {svg:'aperture_plus',event:'detail'},
                        {svg:'xingxing-icon',event:'edit'},
                        {svg:'video-righttop',event:'shenhe'}
                      ]

    Events: 
        1、this.$emit('selection-change', arr)     // 点击多选按钮及全选(传递数组) 
        2、this.$emit('cell-click', row)           // 当某个单元格被点击时会触发该事件(传递对象)
        3、this.$emit('row-click', row)            // 点击单选按钮或多选按钮
        4、this.$emit('row-dbclick', row)          // 鼠标双击（对象）
        5、this.$emit('header-click', column)      // 当某一列的表头被点击时会触发该事件
        6、this.$emit(oprateItem.event, info)      // 点击操作项中的按钮（注意：oprateItem.event是开发人员自己传过来的事件名）
        7、this.$emit('current-page', val)         // 将当前页传递给父组件（这是一个数字）
        8、this.$emit('size-change', val)          // 将当前页的条数传递给父组件（这是一个数字）

    Demo1（常见的序号、单选、多选；根据type切换）==》
        <div class="table-box">
          <jy-table
            :v-loading="loading"
            :type="1"
            :headData="headData"
            :data="tableData"
            :total="total"
            :page-size="pageSize"
            :current-page="currentPage"
            :startIndex="startIndex"
            @row-click="rowClick"
            @current-page="pageChange"
            @size-change="sizeChange"
          ></jy-table>
        </div>

        data() {
          return {
            loading: true,
            tableData: [
              { a: '1', b: '1023', c: '110Kv三变/#1主变/开关' },
              { a: '1', b: '1027', c: '110Kv三变/#1主变/开关' },
              { a: '1', b: '1021', c: '110Kv三变/#1主变/开关' }
            ],
            headData: [
              { label: '站序号', prop: 'a', width: 100 },
              { label: '监控索引号', prop: 'b', width: 150 },
              { label: '设备名称', prop: 'c' }
            ],
            total: 0,
            pageSize: 1,
            currentPage: 1,
            startIndex: 1
          }
        },
        methods: {
          // 点击某一行
          rowClick(val) {
            console.log('--当前行的数据--', val)
          },
          pageChange(val) {
            console.log('--当前页--', val)
          },
          sizeChange(val) {
            console.log('--当前页的条数--', val)
          }
        }


    Demo2（自定义操作按钮 / 自定义某些项el-table-column）==>
        <div class="table-box">
          <jy-table
            :v-loading="loading"
            :type="1"
            :headData="headData"
            :data="tableData"
            :total="total"
            :page-size="pageSize"
            :current-page="currentPage"
            :startIndex="startIndex"
            :oprateCustom="true"
            @row-click="rowClick"
            @current-page="pageChange"
            @size-change="sizeChange"
          >
            <div class="elTableColumnCustom1" slot="item1" slot-scope="data" @click.stop="customItem1">
              <span>获取当前行数据的属性a的值==></span>
              <span>{{ data.item1.a }}</span>
            </div>
            <div class="elTableColumnCustom2" slot="item2" slot-scope="data" @click.stop="customItem2">
              <span>获取当前行数据的属性b的值==></span>
              <span>{{ data.item2.b }}</span>
            </div>
            <div class="oprateCustom" slot="oprateCustom" slot-scope="data">
              <span>当前行的数据==>{{ data }}</span>
              <span>操作1</span>
              <span>操作2</span>
            </div>
          </jy-table>
        </div>

        data() {
          return {
            loading: true,
            tableData: [
              { a: '1', b: '1023', c: '110Kv三变1', d: '自定义1' },
              { a: '1', b: '1027', c: '110Kv三变2', d: '自定义2' },
              { a: '1', b: '1021', c: '110Kv三变3', d: '自定义3' }
            ],
            headData: [
              { label: '站序号', prop: 'a', width: 100 },
              { label: '监控索引号', prop: 'b', width: 150 },
              { label: '变电站', prop: 'c', type: 'slot1' },
              { label: '自定义', prop: 'd', type: 'slot2' }
            ],
            total: 0,
            pageSize: 1,
            currentPage: 1,
            startIndex: 1
          }
        },
        methods: {
          customItem1() {
            console.log(111111)
          },
          customItem2() {
            console.log(22222)
          },
          // 点击某一行
          rowClick(val) {
            console.log('--当前行的数据--', val)
          },
          pageChange(val) {
            console.log('--当前页--', val)
          },
          sizeChange(val) {
            console.log('--当前页的条数--', val)
          }
        }


    Demo3（table树）==>
        <div class="table-box">
          <jy-table :type="0" :row-key="'tableId'" :tree-props="{ children: 'children' }" :headData="headData" :data="tableData" :showPagination="false"></jy-table>
        </div>

        data() {
          return {
            tableData: [
              { tableId: 1, a: '1', b: '1023', c: '110Kv三变/#1主变/开关', code: 1, parentCode: 0 },
              { tableId: 2, a: '12', b: '1027', c: '110Kv三变/#1主变/开关', code: 9, parentCode: 0 },
              { tableId: 3, a: '1234', b: '1021', c: '110Kv三变/#1主变/开关', code: 90, parentCode: 0 },
              { tableId: 4, a: '2', b: '1021', c: '110Kv三变/#1主变/开关', code: 2, parentCode: 1 },
              { tableId: 5, a: '3', b: '49846', c: '110Kv三变/#1主变/开关', code: 3, parentCode: 2 },
              { tableId: 6, a: '10', b: '15', c: '110Kv三变/#1主变/开关', code: 10, parentCode: 9 },
              { tableId: 7, a: '900', b: '789798', c: '110Kv三变/#1主变/开关', code: 900, parentCode: 90 },
              { tableId: 8, a: '900', b: '789798', c: '110Kv三变/#1主变/开关', code: 901, parentCode: 900 },
              { tableId: 9, a: '900', b: '789798', c: '110Kv三变/#1主变/开关', code: 902, parentCode: 901 }
            ],
            headData: [
              { label: '站序号', prop: 'a', width: 150, align: 'left' },
              { label: '监控索引号', prop: 'b', width: 150 },
              { label: '设备名称', prop: 'c' }
            ],
            rowKey: 'tableId'
          }
        },
        mounted() {
          this.tableData = this.listToTree(this.tableData)
        },
        methods: {
          listToTree(arr) {
            return arr.filter(e => {
              const pCode = e.parentCode
              const resultArr = arr.filter(ele => {
                if (ele.code === pCode) {
                  ;(ele.children || (ele.children = [])).push(e)
                  return true
                }
              })
              return resultArr.length === 0
            })
          }
        }

    Demo4（合并单元格，等等）
-->

<template>
  <div class="z-table" id="z-table">
    <el-table
      ref="tableList"
      v-loading="$attrs['v-loading']"
      :element-loading-text="$attrs['element-loading-text'] || '加载中...'"
      :height="$attrs.height"
      :max-height="$attrs['max-height'] || height"
      :data="$attrs.data"
      :stripe="$attrs.stripe || true"
      :border="$attrs.border"
      :highlight-current-row="$attrs['highlight-current-row']"
      :row-class-name="$attrs['row-class-name'] || 'rowClassName'"
      :cell-class-name="$attrs['cell-class-name']"
      :header-row-class-name="$attrs['header-row-class-name'] || 'headerRowClassName'"
      :header-cell-class-name="$attrs['header-cell-class-name']"
      :row-key="$attrs['row-key'] || 'tableId'"
      :empty-text="$attrs['empty-text']"
      :default-expand-all="$attrs['default-expand-all']"
      :expand-row-keys="$attrs['expand-row-keys']"
      :default-sort="$attrs['default-sort']"
      :tooltip-effect="$attrs['tooltip-effect']"
      :show-summary="$attrs['show-summary']"
      :sum-text="$attrs['sum-text']"
      :summary-method="$attrs['summary-method']"
      :span-method="$attrs['span-method']"
      :select-on-indeterminate="$attrs['select-on-indeterminate']"
      :indent="$attrs['indent']"
      :lazy="$attrs['lazy']"
      :load="$attrs['load']"
      :tree-props="$attrs['tree-props']"
      @selection-change="selectionChange"
      @cell-click="cellClick"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @header-click="headerClick"
    >
      <!-- 显示序号数字（不显示单选与多选） -->
      <el-table-column v-if="type === 1" label="序号" width="65" header-align="center" align="center" prop="num"></el-table-column>
      <!-- 显示单选按钮 -->
      <el-table-column v-if="type === 2" label="选择" width="65" header-align="center" align="center">
        <template slot-scope="scope">
          <el-radio :label="scope.row.num" v-model="radio"></el-radio>
        </template>
      </el-table-column>
      <!-- 显示多选按钮 -->
      <el-table-column v-if="type === 3" width="65" header-align="center" align="center" type="selection"></el-table-column>

      <!-- 内容区 -->
      <el-table-column
        v-for="(head, headI) in headData"
        :key="headI"
        :label="head.label"
        :prop="head.prop"
        :width="head.width || 'auto'"
        :min-width="head['min-width']"
        :resizable="head.resizable"
        :formatter="head.formatter"
        :show-overflow-tooltip="head['show-overflow-tooltip'] || true"
        :align="head.align || 'center'"
        :header-align="head['header-align']"
        :class-name="head['class-name']"
        :label-class-name="head['label-class-name']"
        :sortable="head.sortable"
      >
        <template slot-scope="scope">
          <div>
            <!-- 使用具名插槽，自定义内容1 -->
            <slot name="item1" v-if="head.type === 'slot1'" :item1="scope.row"></slot>
            <!-- 使用具名插槽，自定义内容2 -->
            <slot name="item2" v-else-if="head.type === 'slot2'" :item2="scope.row"></slot>
            <!-- 使用具名插槽，自定义内容3 -->
            <slot name="item3" v-else-if="head.type === 'slot3'" :item3="scope.row"></slot>
            <!-- 使用具名插槽，自定义内容4 -->
            <slot name="item4" v-else-if="head.type === 'slot4'" :item4="scope.row"></slot>
            <!-- 显示内容 -->
            <span v-else>{{ scope.row[head.prop] }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 操作按钮 -->
      <el-table-column :fixed="oprateFixed" v-if="oprateData.length > 0 || oprateCustom" :width="oprateWidth" label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <!-- 文字操作项 -->
          <div class="oprateButtons" v-if="oprateType === 1">
            <span
              v-for="(oprate, oprateI) in oprateData"
              :key="oprateI"
              :style="{
                color: oprate.color || '#fff',
                border: oprate.borderColor ? `1px solid ${oprate.borderColor}` : '0',
                backgroundColor: oprate.bgColor || '#156a94',
                fontSize: `${oprate.fontSize}px` || '14px'
              }"
              @click.stop="oprateButtonClick(scope.row, oprate)"
            >
              {{ oprate.text }}
            </span>
          </div>
          <!-- svg图标操作项 -->
          <div class="oprateSvgs" v-if="oprateType === 2">
            <svg-icon v-for="(oprate, oprateI) in oprateData" :key="oprateI" :icon-class="oprate.svg" @click.stop="oprateButtonClick(scope.row, oprate)"></svg-icon>
          </div>
          <!-- 使用具名插槽，自定义操作项 -->
          <slot name="oprateCustom" v-if="oprateCustom" :oprateCustom="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="showPagination"
      :small="$attrs.small"
      :background="$attrs.background"
      :total="$attrs.total || 0"
      :page-size="$attrs['page-size'] || 15"
      :page-count="$attrs['page-count']"
      :pager-count="$attrs['pager-count']"
      :current-page="$attrs['current-page']"
      :layout="$attrs.layout || 'total, sizes, prev, pager, next, jumper'"
      :page-sizes="$attrs['page-sizes'] || [15, 30, 45, 60]"
      :popper-class="$attrs['popper-class']"
      :disabled="$attrs.disabled"
      :hide-on-single-page="$attrs['hide-on-single-page']"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: 1
    },
    headData: {
      type: Array,
      default: () => []
    },
    startIndex: {
      type: Number,
      default: 1
    },
    oprateData: {
      type: Array,
      default: () => []
    },
    oprateWidth: {
      type: Number,
      default: 150
    },
    oprateFixed: {
      type: Boolean | String,
      default: false
    },
    oprateCustom: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      height: 0, // table表格默认的最大高度（自适应）
      timer: null, // 记录时间
      radio: '', // 单选按钮绑定的值
      oprateType: 0 // 操作项是文字还是svg图标（1:文字、2:图标），默认是文字
    }
  },
  inheritAttrs: false,
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  mounted() {
    this.getAutoHeight()
    window.addEventListener('resize', this.getAutoHeight, false)
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer)
    window.removeEventListener('resize', this.getAutoHeight)
  },
  methods: {
    // 初始化数据
    init() {
      // 当没有单选与多选按钮时，显示序号，添加序号数字
      this.$attrs.data.forEach((v, i) => {
        this.$set(v, 'num', i + this.startIndex)
      })
      // 根据操作项数组中的某一项判断  是文字还是svg图标
      if (this.oprateData.length > 0) {
        this.oprateType = this.oprateData[0]?.text ? 1 : 2
      }
    },

    // 点击多选按钮及全选(传递数组)
    selectionChange(arr) {
      this.$emit('selection-change', arr)
    },

    // 当某个单元格被点击时会触发该事件(传递对象)
    cellClick(row) {
      this.$emit('cell-click', row)
    },

    // 点击单选按钮或多选按钮
    rowClick(row) {
      if (this.type === 1 || this.type === 2) {
        this.radio = row.num
        this.$emit('row-click', row) // 向组件传递当前项的信息(对象)
      } else if (this.type === 3) {
        this.selectionChange() // 点击多选按钮及全选(数组)
        this.$refs.tableList.toggleRowSelection(row) // 多选时，切换某一行的选中状态
      }
    },

    // 鼠标双击（对象）
    rowDblclick(row) {
      this.$emit('row-dbclick', row)
    },

    // 当某一列的表头被点击时会触发该事件
    headerClick(column) {
      this.$emit('header-click', column)
    },

    // 点击操作下面的按钮
    oprateButtonClick(info, oprateItem) {
      this.$emit(oprateItem.event, info)
    },

    // 分页操作(当前页)
    currentChange(val) {
      this.$emit('current-page', val)
    },
    // 分页操作(每页多少条)
    sizeChange(val) {
      this.$emit('size-change', val)
    },

    // 设置表格的自适应高度(获取最外层盒子的高度，然后减去底部分页的高度)
    getAutoHeight() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let obj = document.getElementById('z-table').getBoundingClientRect()
        this.height = obj.height - 40
      }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
.z-table {
  width: 100%;
  height: 100%;
  font-size: 14px;
  position: relative;
}
/deep/ .el-table {
  position: absolute;
  .el-radio__label {
    display: none;
  }
  .headerRowClassName {
    > th {
      padding: 0;
      height: 40px;
    }
    > th:last-child {
      border-bottom: 1px solid #ebeef5;
    }
  }
  .rowClassName {
    padding: 8px 0;
  }
  .el-table__row--striped {
    > td {
      // background-color: #8cb7c0;
    }
  }
  .el-table__row:hover {
    > td {
      // background-color: #8cb7c0;
    }
  }

  // 图片样式
  .imgCustom {
    width: 60px;
    height: 30px;
    border-radius: 3px;
  }

  //操作按钮——文字
  .oprateButtons {
    @include flex(center, center);
    > span {
      margin: 0 4px;
      height: 26px;
      padding: 0 10px;
      border-radius: 3px;
      cursor: pointer;
    }
  }

  // 操作按钮——svg
  .oprateSvgs {
    @include flex(center, center);
    > svg {
      padding: 0 10px;
      height: 26px;
      cursor: pointer;
    }
  }
}

/deep/ .el-pagination {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
}
</style>
