
—————————————————

#后台管理系统 小模板

##aside
````
// 侧导航数据
data(){
    return {
        navlist: [{
            name: "数据统计",
            icon: "iconshujutongji",
            linkTo: "/index/statistics",       //跳转链接
            pid: -1,                           //父级id
            level: 1,                          //是否只有一级，1是一级，2不只有一级
            show: ['超级管理员', '甲方负责人']    //需要在哪个权限下才能显示出来
        }],
    }
}
````

##pagination
带省略的分页
````
<el-pagination
        small                                    // 小型分页
        background                               // 带背景
        layout="prev, pager, next"               // 带分页、翻页按钮
        :hide-on-single-page="true"              // 只有一页隐藏分页
        :current-page="paging.NowPage"
        :page-size="paging.Nums"
        :pager-count="7"                         // 总共展示有几个分页，只能单数
        @current-change="pageChange"
        :total="paging.total*paging.Nums">       // 总页数
    </el-pagination>
````
引入
````
import Pagination from "@/components/common/Pagination";
````
使用
````
<pagination :paging="paging" @pageChange="pageChange"></pagination>
````
传的参数
````
paging: {
        pages: 1,//总页数
        Nums: 10, //每页条数
        NowPage: 1, //当前页数
        total: 1  //总数
      },
````
页码改变触发
````
// Pagination
pageChange(v){
      this.$emit("pageChange",v);
    }
//  父组件
    pageChange(v) {
      this.paging.NowPage = v;
    },
````

##tab
自定义tab
引入
````
import Tabs from "@/components/common/Tabs";
````
使用
````
<tabs :tabs="tabs" :active-name="activeName" @handleChangeTab="handleChangeTab" :to-audit="toAudit"></tabs>
````
传参
````
tabs: [{
        name: "全部",
        icon: "iconquanbu",              //可有可无
        auth:["超级管理员","预审人员"]
      }, 
activeName: '全部',                      // 当前激活菜单
toAudit: true                           // 控制红点出现或隐藏，原来是用来标记有未读消息的
````
切换
````
// tab
handleChangeTab(name){
      this.$emit("handleChangeTab",name);
    }
// 父组件
handleChangeTab(name) {
      this.activeName = name;
}
````
