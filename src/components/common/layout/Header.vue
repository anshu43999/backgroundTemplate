<template>
    <div class="header">
        <!--		logo-->
        <div class="logo">
            <img class="logoImg" src="static/images/header/logo.png" alt=""/>
            <span class="systemName">12110 短信报警平台数据接口系统</span>
        </div>
        <!--		用户信息-->
        <div class="headerR">
            <div class="block">
                <i class="iconfont iconbell"></i>
<!--                <div class="message">{{msgNum}}</div>-->
            </div>
            <div class="split"></div>
            <div class="userInfo">
                <el-avatar class="userIcon" shape="square" :src="squareUrl"></el-avatar>
                <span>{{userName}}</span>
                <!-- <i class="iconfont iconxiala-"></i> -->
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
            exit() {
                // this.logout() ;
                // console.log(this.$store.state.userName);
                this.$router.push({path: '/login'});
                // this.logout()
            },

            // cut(){
            // 	// console.log(this.userBSF);
            // 	if(this.userName =='admin'){
            // 		this.squareUrl4 = this.squareUrl
            // 	}else{
            // 		this.squareUrl4 = this.squareUrl2
            // 	}
            // }
        },
        mounted() {
            // this.cut();
        },
        data() {
            return {
                squareUrl: 'static/images/header/admin.png',
                userName: 'admin',
                msgNum:2
            }
        }
    }
</script>


<style lang="scss">
    .exit {
        cursor: pointer;
    }
    .header{
        // background: red !important;
        background: url("../../../../public/static/images/common/top.png") no-repeat center top  !important;

    }

</style>