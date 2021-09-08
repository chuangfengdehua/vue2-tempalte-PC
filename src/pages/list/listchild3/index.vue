<!--
 * @描述信息: 自定义多功能table表格
 * @Author:  zls
-->
<template>
  <div class="listchild3">
    <div class="listchild3-box">
      <div class="permission" v-permission>测试按钮级别的权限指令</div>
      <h1 class="zhanwei">自定义多功能table表格</h1>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Listchild3',
  data() {
    return {
      loading: false,
      type: 1,
      tableData: [
        { a: '1', b: '1023', c: '110Kv三变/#1主变/开关' },
        { a: '1', b: '1027', c: '110Kv三变/#1主变/开关' },
        { a: '1', b: '1021', c: '110Kv三变/#1主变/开关' },
        { a: '1', b: '1027', c: '110Kv三变/#1主变/开关' }
      ],
      headData: [
        { label: '站序号', prop: 'a', width: 100, sortable: false },
        { label: '监控索引号', prop: 'b', width: 150, sortable: true },
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
}
</script>

<style lang="scss" scoped>
.listchild3 {
  &-box {
    height: 100%;
    color: #333;
    display: flex;
    flex-direction: column;
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
    .table-box {
      height: calc(100% - 100px);
    }
  }
}
</style>
