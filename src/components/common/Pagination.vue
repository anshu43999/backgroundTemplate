<template>
  <div id="pagination">
<!--    :hide-on-single-page="true"-->
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :current-page="paging.NowPage"
        :page-size="paging.Nums"
        :pager-count="7"
        @current-change="pageChange"
        :total="paging.total*paging.Nums">
    </el-pagination>
  </div>

</template>

<script>
export default {
  name: "pagination",
  props:["paging"],
  data() {
    return {
      // paging: {
      //   pages: 1,//总页数
      //   Nums: 10, //每页条数
      //   NowPage: 1, //当前页数
      //   total: 0  //总数
      // },
    }
  },
  methods:{
    pageChange(v){
      // this.paging.NowPage=v;
      this.$emit("pageChange",v);
    }
  }
}
</script>

<style scoped lang="scss">
#pagination{
  position: absolute;
  bottom: .3rem;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
}
</style>
