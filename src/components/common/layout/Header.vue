<template>
    <div class="header">
        <!--		logo-->
        <div class="logo">
            <img class="logoImg" src="static/images/header/logo.png" alt=""/>
            <span class="systemName">12110 短信报警平台数据接口系统</span>
        </div>
        <!--		用户信息-->
        <div class="headerR" @click="exit">
            <div class="bell">
                <img class="bell_img" src="static/images/header/bell.png" alt="">
<!--                <div class="message"></div>-->
            </div>
            <div class="info">
                <img class="bell_img" src="static/images/header/info.png" alt="">
            </div>
            <div class="userInfo">
                <el-avatar class="userIcon" shape="square" :src="user.squareUrl"></el-avatar>
                <!-- <span class="username">{{user.userName}}</span>
                 <i class="iconfont iconxiajiantou"></i> -->
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <span class="username">{{user.userName}}</span>
                        <i class="iconfont iconxiajiantou"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item command="exit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>
           
        </div>
    </div>
</template>
<script>
    require("../../../assets/style/index/index.css");
    // import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
    export default {
        name: "Header",
        computed: {
            // ...mapState(['userName']),
            // ...mapGetters(["libraryId","libraryName","userName","roleName","userBSF"]),
        },
        methods: {
            // ...mapMutations(['logout']),
            // ...mapActions([]),
       
            handleCommand(command) {
                switch(command){
                    case 'personalCenter' :          
                            this.$emit('operate','personalCenter')
                    break;
                    case 'exit' : this.$confirm('您要退出登录, 是否继续?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        //点击确定的回调
                                        this.$router.push({path: '/login'});
                                    }).catch(() => {
                                        //点击取消的回调
                                        this.isExit=false;
                                    }); 
                    break;


                }

                
            },
            exit() {
                this.isExit=true;
            },
        },
        data() {
            return {
                user:{
                    squareUrl: 'static/images/header/admin.png',
                    userName: '太原市公安局110指挥中心'
                },
                msgNum:2,
                isExit:false
            }
        }
    }
</script>

