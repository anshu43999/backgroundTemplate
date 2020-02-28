<template>


	<el-menu background-color="transparent" unique-opened :default-active="activePath" class="el-menu-vertical-demo" :router=true @open="handleOpen" @select="handleSelect" @close="handleClose" :collapse="this.isCollapse" >
		

		<el-menu-item index="/index/logManagement">
			<i class="iconfont iconrizhi1 firstlevel"></i>
			<span slot="title">日志管理</span>
		</el-menu-item>


    <el-menu-item index="/index/parameterDeploy">
			<i class="iconfont iconcanshu firstlevel"></i>
			<span slot="title">参数配置</span>
		</el-menu-item>

    <el-menu-item index="/index/visitTest">
			<i class="iconfont iconjiekoufangwenceshi firstlevel"></i>
			<span slot="title">访问测试</span>
		</el-menu-item>

	

	</el-menu>
</template>
<script>
require("../../../assets/style/common/Sidebar.css");
// import '@/assets/style/common/Sidebar.css';
// import '@/assets/style/index/index.scss';
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name : 'Aside',
  components: {},
  computed: {
    ...mapState(["isCollapse"]),
    // ...mapGetters([
    //   "modal_id",
    //   "libraryId",
    //   "libraryName",
    //   "userName",
    //   "userAuth",
    //   "roleName"
    // ]),
    activePath() {
      var path = this.$route.path.split("/");
      var zpath = path[0];
      for (var i = 1; i <= 3; i++) {
        if (path[i]) {
          zpath += "/" + path[i];
        }
      }
      return zpath;
    }
  },
  mounted() {},
  data() {
    return {
      //			isCollapse: false,
      backgroundColor: "#dff0f9",
      user: {
        name: "12345号",
        avater: "static/images/test/photo_01.png",
        status: 1
      },
      navlist: [
 
       
        
      ]
    };
  },
  methods: {
    ...mapMutations(["slideToggle", "route_click"]),
    ...mapActions(["addAction"]),
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      			// console.log(key, keyPath);
      this.route_click();
    },
    tostr(num) {
      return num.toString();
    },
    show_messions() {
      this.mission_show = true;
    },
    hidden_messions() {
      this.mission_show = false;
    },
    slide() {
      this.mission_show = false;
      setTimeout(() => {
        this.slideToggle();
      }, 100);
    },
  }
};
</script>
