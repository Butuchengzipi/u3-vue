<template>
  <div class="block">
      <span class="demonstration">直接前往</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="value"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
  </div>
</template>

<script>
  export default {
      methods: {
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          }
      },
      data() {
          return {
            currentPage: 5,
            value: false
          };
      }
  }
</script>