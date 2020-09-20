<template>
  <div class="header">
    <!--		logo-->
    <div class="logo">
      <img class="logoImg" src="static/images/header/logo.png" alt />
      <span class="systemName">后台管理系统</span>
    </div>
    <!--		用户信息-->
    <div class="headerR">
      <div class="userInfo" @click="handleChangeRole">
        <el-avatar :src="user.url"></el-avatar>
        <span class="username">{{user.userName}}</span>
      </div>

      <i class="iconfont icontuichu exit" @click="handleExit"></i>
    </div>
  </div>
</template>
<script>
require("../../../assets/style/index/index.css");
import { mapMutations, mapGetters} from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["userName"]),
  },
  methods: {
    // ...mapMutations(['logout']),
    // ...mapActions([]),
    ...mapMutations(['setUserInfo']),
    handleCommand(command) {
      switch (command) {
        case "personalCenter":
          // this.$emit('operate','personalCenter')

          this.$emit("operate", { code: "personalCenter" });

          // {code:code,id:row.id}
          break;
        case "exit":
          this.$confirm("您要退出登录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
              .then(() => {
                //点击确定的回调
                this.$router.push({ path: "/login" });
              })
              .catch(() => {
                //点击取消的回调
                this.isExit = false;
              });
          break;
      }
    },
    handleExit() {
      this.$router.push({
        name: "登录",
      });
      sessionStorage.clear();
    },
    handleChangeRole(){
      this.$prompt('请输入角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        let payload
        if(value==="超级管理员"){
          payload = {
            userName: "admin",
            roleName:'超级管理员',
            userId:"1"
          }
        }else if(value==="预审人员"){
          payload = {
            userName: "",
            roleName:'预审人员',
            userId:"32",
            area:"一枢纽",
            areaId:"1"
          }
        }else if(value==="甲方负责人"){
          payload = {
            userName: "",
            roleName:'甲方负责人',
            userId:"3"
          }
        }else {
          payload={
            userName: "",
            roleName:'配置人员',
            userId:""
          }
        }
        this.setUserInfo(payload);
        this.$router.go(0);
      })
    },
  },
  data() {
    return {
      user: {
        url: "static/images/header/admin.png",
        userName: sessionStorage.getItem("roleName"),
      },
      msgNum: 2,
      isExit: false,
    };
  },
};
</script>

