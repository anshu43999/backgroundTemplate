<!--@赵雪丽-->
<template>
  <div>
    <tabs :tabs="tabs" :active-name="activeName" @handleChangeTab="handleChangeTab" :to-audit="toAudit"></tabs>
    <pagination :paging="paging" @pageChange="pageChange"></pagination>
  </div>
</template>

<script>
import Pagination from "@/components/common/Pagination";
import Tabs from "@/components/common/Tabs";
export default {
name: "Test",
  components:{
    Pagination,
    Tabs
  },
  data(){
    return {
      paging: {
        pages: 1,//总页数
        Nums: 10, //每页条数
        NowPage: 1, //当前页数
        total: 10  //总数
      },
      tabs: [{
        name: "全部",
        icon: "iconquanbu",
        auth: ["超级管理员", "预审人员"]
      }, {
        name: "建议预审",
        icon: "iconchulizhong",
        auth: ["超级管理员", "预审人员"]
      }, {
        name: "已完成",
        icon: "iconwancheng",
        auth: ["超级管理员", "预审人员"]
      }],
      activeName: '全部',
      toAudit:false
    }
  },
  methods:{
    // tab
    handleChangeTab(name) {
      this.activeName = name;
    },
    //  页数改变时
    pageChange(v) {
      this.paging.NowPage = v;
    },
  }
}
</script>

<style scoped>

</style>
