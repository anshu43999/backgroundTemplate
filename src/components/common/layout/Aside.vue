<template>


  <el-menu
      class="el-menu-vertical-demo"
      background-color="transparent"
      unique-opened
      active-text-color="#fff"
      :default-active="activePath"
      :router='true'
      v-cloak>

    <template v-for="(item,index) of navlist">
      <el-menu-item :index="item.linkTo" v-if="item.pid===-1&&item.level===1&&role(item)">
        <i :class="['iconfont','firstlevel',item.icon]"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu :index="item.linkTo" v-if="item.pid===-1&&item.level===2&&role(item)"
                  :class="bg===item.name?'activeTwo':''">
        <template slot="title">
          <i :class="['iconfont','firstlevel',item.icon]"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <template v-for="i of navlist">
          <el-menu-item :index="i.linkTo" v-if="i.pid===index&&i.pid!==-1&&role(i)">{{i.name}}</el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
require("../../../assets/style/common/Sidebar.css");

export default {
  name: 'Aside',
  components: {},
  computed: {
    // 截取当前激活的菜单链接地址，解决菜单刷新后的选中问题
    activePath() {
      // 找出所有一级
      let first = []
      this.navlist.forEach(value => {
        if (value.level === 1) {
          first.push(value.linkTo);
        }
      })
      // 判断当前路径是否是一级下的，一级是两层
      let route = this.$route.path.split("/");
      let zpath1 = route[0];
      let zpath2 = route[0];
      for (let i = 1; i <= 2; i++) {
        if (route[i]) {
          zpath1 += "/" + route[i];
        }
      }
      for (let i = 1; i <= 3; i++) {
        if (route[i]) {
          zpath2 += "/" + route[i];
        }
      }
      if (first.includes(zpath1)) {
        // console.log(zpath1);
        return zpath1;
      } else {
        // console.log(zpath2);
        return zpath2;
      }
    },
    // 获取有多级菜单，获取第一级的数据
    getFirst() {
      let arr = [];
      this.navlist.forEach(value => {
        if (value.level !== 1) {
          arr.push(value.linkTo);
        }
      })
      return arr;
    },
    //  二级菜单的话一级要选中
    bg() {
      for (let i = 0; i < this.navlist.length; i++) {
        if (this.activePath === this.navlist[i].linkTo) {
          if (this.navlist[i].pid&&this.navlist[i].pid!==-1) {
            return this.navlist[this.navlist[i].pid].name;
          }
          if (this.navlist[i].pid===-1){
            return this.navlist[0].name;
          }
        }
      }
    }
  },
  mounted() {
  },
  data() {
    return {
      activeName: "",
      backgroundColor: "#dff0f9",
      user: {
        name: "12345号",
        avater: "static/images/test/photo_01.png",
        status: 1
      },
      navlist: [{
        name: "数据统计",
        icon: "iconshujutongji",
        linkTo: "/index/test",
        pid: -1,//父级id
        level: 1,//是否只有一级，1是一级，2不只有一级
        show: ['超级管理员', '甲方负责人']
      }, {
        name: "报表管理",
        icon: "iconxy-baobiao",
        linkTo: "/index/report",
        pid: -1,
        level: 1,
        show: ['超级管理员', '甲方负责人']
      }, {
        name: "报修维修",
        icon: "iconbaoxiu",
        linkTo: "/index/fix",
        pid: -1,
        level: 1,
        show: ['超级管理员', '甲方负责人', '预审人员']
      }, {
        name: "投诉管理",
        icon: "icontousujianyi",
        linkTo: "/index/complaint",
        pid: -1,
        level: 1,
        show: ['超级管理员', '预审人员']
      }, {
        name: "建议管理",
        icon: "iconjianyi1",
        linkTo: "/index/advice",
        pid: -1,
        level: 1,
        show: ['超级管理员', '预审人员', '甲方负责人']
      }, {
        name: "消息通知",
        icon: "iconxiaoxitongzhi",
        linkTo: "/index/notice",
        pid: -1,
        level: 1,
        show: ['超级管理员', '甲方负责人']
      }, {
        name: "企业服务",
        icon: "iconfuwu",
        linkTo: "/index/companyService",
        pid: -1,
        level: 2,
        show: ['超级管理员']
      }, {
        name: "洗车",
        icon: "",
        linkTo: "/index/companyService/washCar",
        pid: 6,
        level: 1,
        show: ['超级管理员']
      }, {
        name: "理发",
        icon: "",
        linkTo: "/index/companyService/cut",
        pid: 6,
        level: 1,
        show: ['超级管理员']
      }, {
        name: "配置管理",
        icon: "iconpeizhi",
        linkTo: "/index/peopleManagement",
        pid: -1,
        level: 2,
        show: ['超级管理员', '配置人员']
      }, {
        name: "移动公司主管",
        icon: "",
        linkTo: "/index/peopleManagement/party",
        pid: 9,
        level: 1,
        show: ['超级管理员', '配置人员']
      }, {
        name: "维修物业公司",
        icon: "",
        linkTo: "/index/peopleManagement/company",
        pid: 9,
        level: 1,
        show: ['超级管理员', '配置人员']
      }, {
        name: "物业服务主管",
        icon: "iconyewufuwuguanli",
        linkTo: "/index/service",
        pid: 9,
        level: 1,
        show: ['超级管理员', '配置人员']
      }, {
        name: "园区管理",
        icon: "iconyuanquguanli",
        linkTo: "/index/area",
        pid: -1,
        level: 1,
        show: ['超级管理员', '配置人员']
      }, {
        name: "字典管理",
        icon: "iconzidianguanli1",
        linkTo: "/index/dictionary",
        pid: -1,
        level: 1,
        show: ['超级管理员', '配置人员']
      }, {
        name: "权限管理",
        icon: "iconquanxianguanli",
        linkTo: "/index/authority",
        pid: -1,
        level: 2,
        show: ['超级管理员', '配置人员']
      }, {
        name: "角色管理",
        icon: "iconquanxianguanli",
        linkTo: "/index/authority/role",
        pid: 15,
        level: 1,
        show: ['超级管理员', '配置人员']
      }, {
        name: "用户管理",
        icon: "iconquanxianguanli",
        linkTo: "/index/authority/user",
        pid: 15,
        level: 1,
        show: ['超级管理员', '配置人员']
      }, {
        name: "资源管理",
        icon: "iconquanxianguanli",
        linkTo: "/index/authority/resource",
        pid: 15,
        level: 1,
        show: ['超级管理员', '配置人员']
      }]
    };
  },
  methods: {
    select() {
      let route = this.$route.path.split("/").slice(0, -1).join("/");
      let name = "", i = 0;
      this.navlist.forEach((value) => {
        value.pid === 0 && value.linkTo === route ? name = value.name : "";
      });
      this.getFirst.includes(name) ? i = this.getFirst.indexOf(name) : i = null;
      let ele = document.getElementsByClassName("el-submenu__title");
      for (let i1 = 0; i1 < ele.length; i1++) {
        ele[i1].style.background = "transparent";
      }
      ele[i].style.background = "#d3def2";
    },
    //  判断那个权限的人可以看什么
    role(item) {
      let rolename = sessionStorage.getItem("roleName");
      return item.show.includes(rolename);
    },
  },

};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>
