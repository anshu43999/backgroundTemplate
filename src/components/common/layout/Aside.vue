<template>


	<el-menu background-color="transparent" unique-opened :default-active="activePath" class="el-menu-vertical-demo" :router=true @open="handleOpen" @select="handleSelect" @close="handleClose" :collapse="this.isCollapse" >
		

		<el-menu-item index="/index/home">


			<i class="iconfont iconyemian-copy-copy-copy-copy firstlevel"></i>
			<span slot="title">首页</span>
		</el-menu-item>

		<template v-for="item in navlist" v-if="item.pid==0">
			<el-submenu :index="item.lid.toString()">

				<template slot="title">
					<div class="rightborder"></div>
					<div class="rightarrow"></div>
					<i class="iconfont firstlevel" :class="item.icon"></i>

					<el-badge slot="title" v-if="item.badge" :value="item.badge" class="navbadge">
						<span>{{item.title}}</span>
					</el-badge>
					<span v-else slot="title">{{item.title}}</span>
				</template>

				<template v-if="item.level==3">
					<template v-for="item2 in navlist" v-if="item2.pid==item.lid">

						<el-submenu :index="item2.lid.toString()">
							<template slot="title">
								<i class="iconfont secondlevel" :class="item2.icon"></i>

								<el-badge slot="title" v-if="item2.badge" :value="item2.badge" class="navbadge">
									<span>{{item2.title}}</span>
								</el-badge>
								<span v-else slot="title">{{item2.title}}</span>
							</template>

							<template v-for="item3 in navlist" v-if="item3.pid==item2.lid">
								<el-menu-item :index="item3.linkto">

									<div class="leftline"></div>
									<i class="iconfont thirdlevel" :class="item3.icon"></i>

									<el-badge slot="title" v-if="item3.badge" :value="item3.badge" class="navbadge">
										<span>{{item3.title}}</span>
									</el-badge>
									<span v-else slot="title">{{item3.title}}</span>
								</el-menu-item>
							</template>

						</el-submenu>

					</template>
				</template>

				<template v-if="item.level==2">
					<template v-for="item4 in navlist" v-if="item4.pid==item.lid">
						<el-menu-item :index="item4.linkto">

							<i class="iconfont secondlevel" :class="item4.icon"></i>

							<el-badge slot="title" v-if="item4.badge" :value="item4.badge" class="navbadge">
								<span>{{item4.title}}</span>
							</el-badge>
							<span class='positiontitle' v-else-if='item4.wrap' slot="title">{{item4.title}}</span>
							<span v-else slot="title">{{item4.title}}</span>
						</el-menu-item>
					</template>

				</template>

			</el-submenu>
		</template>

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
        {
          icon: "iconshaixuanxuanzhong",
          title: "信息筛选",
          linkto: "/index/filtrate/publicSecurity",
          level: 2,
          pid: 0,
          lid: 1
        },
        {
          icon: 'icondanghui',
          title: '政法委员会',
          linkto: '/index/filtrate/Committee',
          level: 2,
          pid: 1,
          lid: 6
        },
     
        {
          icon: "icongongan1",
          title: "公安局",
          linkto: "/index/filtrate/publicSecurity",
          level: 2,
          pid: 1,
          lid: 2
        },
        {
          icon: "iconjianchayuan",
          title: "检察院",
          linkto: "/index/filtrate/procuratorate",
          level: 2,
          pid: 1,
          lid: 3
        },
        {
          icon: 'iconicon-test',
          title: '法院',
          linkto: '/index/filtrate/court',
          level: 2,
          pid: 1,
          lid: 4
        },
        {
          icon: 'iconsifaju',
          title: '司法局',
          linkto: '/index/filtrate/justiceBureau',
          level: 2,
          pid: 1,
          lid: 5
        },
        
		{
			icon: 'iconshujufenxi',
			title: '数据分析',
			linkto: '/index/analysis/publicSecurity',
			level: 2,
			pid: 0,
			lid: 7
    },
    {
      icon: 'icondanghui',
      title: "政法委员会",
      linkto: "/index/analysis/Committee",
      level: 2,
      pid: 7,
      lid: 12
    },

    {
      icon: "icongongan1",
      title: "公安局",
      linkto: "/index/analysis/publicSecurity",
      level: 2,
      pid: 7,
      lid: 8
    },
    {
      icon: "iconjianchayuan",
      title: "检察院",
      linkto: "/index/analysis/procuratorate",
      level: 2,
      pid: 7,
      lid: 9
    },
    {
      icon: 'iconicon-test',
      title: "法院",
      linkto: "/index/analysis/court",
      level: 2,
      pid: 7,
      lid: 10
    },
    {
      icon: 'iconsifaju',
      title: "司法局",
      linkto: "/index/analysis/justiceBureau",
      level: 2,
      pid: 7,
      lid: 11
    },
    


   




       
        
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
