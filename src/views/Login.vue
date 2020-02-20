<template>
    <div id="login">
<!--        banner-->
        <div class="banner" style="background-image: url(static/images/login/banner.png)"></div>
<!--        form-->
        <form action="">
            <div class="user">
                <input type="text" placeholder="用户名" v-model="username">
                <div class="userPic">
                    <i class="iconfont iconzhanghu"></i>
                </div>
            </div>
            <div class="pass">
                <input type="password" placeholder="密码" v-model="password">
                <div class="passPic">
                    <i class="iconfont iconmima"></i>
                </div>
            </div>
            <div class="message_warp">
                <p v-if="show" class="message">{{errorMessage}} </p>
            </div>
            <input  type="button" value="登录" :class="[active? 'btnActive':'btnFocurs']" @click="submit">
        </form>
<!--        copyright-->
        <div class="copyright">山西硬汉网络科技有限公司 版权所有:Copyright©2018—2019</div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                username:'',
                password:'',
                active : false,
                errorMessage: '',
                show : false,
            }
        },
        methods:{
            submit(){
                this.active = true;
                this.$router.push({ path: '/index/home'});
                this.active = false;

                // if(this.username && this.password){
                //     this.$http({
                //         method: 'post',
                //         url: this.apiRoot +  'login',
                //         transformRequest: [function (data) {
                //             // Do whatever you want to transform the data
                //             let ret = '';
                //             for (let it in data) {
                //                 ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                //             }
                //             return ret
                //         }],
                //         headers: {'Content-Type': 'application/x-www-form-urlencoded','crossDomain': true},
                //         withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                //         crossDomain: true,
                //         data: {
                //             userName:this.username,
                //             userPass:this.password,
                //         }
                //     }).then(function (response) {
                //         console.log(response)
                //         if(response.data.success == true) {
                //             var payload={};
                //             payload.libraryId=response.data.user.libraryId;
                //             payload.libraryName=response.data.user.libraryName;
                //             payload.userName=response.data.user.userName;
                //             payload.userId=response.data.user.id;
                //             payload.userAuth=response.data.user.resourceName;
                //             payload.Token=response.data.user.token;
                //             payload.permissions=response.data.user.permissions;
                //             payload.roleName=response.data.user.roleName;
                //             this.setUserInfo(payload);
                //             this.active = false;
                //             // console.log('开始登陆')
                //             this.$router.push({ path: '/index/home'});
                //         }else if(response.data.success == false){
                //             // console.log('登录失败');
                //             this.errorMessage=response.data.code+'!';
                //             this.active = false;


                //             this.show = true;
                //             this.errorMessage =response.data.code+'!';
                //         }
                //     }.bind(this)).catch(function (error) {
                //         console.log(error);
                //     });
                //     this.show = false;
                //     this.$router.push({ path: '/index/home'});
                // }else{
                //     this.show = true;
                //     this.active = false;
                //     this.errorMessage = '请输入用户名或密码'
                // }
            }
        }
    }
</script>

<style scoped lang="scss">
#login{
    width: 100%;
    height: 100%;
    /*banner*/
    .banner{
        width: 100%;
        height: 4rem;
        // background-image: url("../../public/static/images/login/banner.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
/*    form*/
    form{
        width: 4.6rem;
        margin: 0.47rem auto;
        .user,.pass{
            height: 0.5rem;
            width: 100%;
            position: relative;
            margin-bottom: 0.21rem;
            .userPic,.passPic{
                width: 0.5rem;
                height: 0.5rem;
                background-image: linear-gradient(90deg,
                        #ef3510 0%,
                        #d20002 100%);
                background-blend-mode: normal,
                normal;
                box-shadow: 1px 2px 5px 0px
                rgba(255, 68, 32, 0.33);
                position: absolute;
                top: 0;
                left: 0;
                text-align: center;
                .iconfont{
                    font-size: 0.28rem;
                    line-height: 0.5rem;
                    color: #fff;
                }
            }
            input[type='text'],input[type='password']{
                display: block;
                width: 100%;
                height: 100%;
                background-color: #fff4f7;
                /*box-shadow: 0;*/
                border: 0;
                padding-left: 0.79rem;
                letter-spacing: 2px;
                &::placeholder{
                    color: #b5b6b8;
                }
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px rgba(255, 244, 247, 0.97) inset
                }
                font-size: 0.16rem;
                outline:#d40403 solid 1px;
            }
        }
        input[type='button']{
            width: 100%;
            height: 0.5rem;
            background-image: linear-gradient(90deg,
                    #ef3510 0%,
                    #d20002 100%);
            background-blend-mode: normal,
            normal;
            box-shadow: 1px 2px 5px 0px
            rgba(255, 68, 32, 0.33);
            border: none;
            display: block;
            color: #fff;
            letter-spacing: 12px;
            font-size: 0.24rem;
            &.btnActive{
                cursor: pointer;
                transform: scale(0.9);
            }
            &.btnFocurs{
                cursor: pointer;
                transform: scale(1);
            }
        }
        .message{
            background-color: #f8ffa9;
            width: 3.5rem;
            text-align: center;
            border-radius: 4px;
            color: #999999;
            height: .3rem;
            line-height: .3rem;
        }
        .message_warp{
            width: 3.5rem;
            margin: .15rem auto .1rem;
            height: .3rem;
        }
    }
/*    copyright*/
    .copyright{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0.1rem;
        text-align: center;
        font-size: 0.14rem;
        color: #777777;
        letter-spacing: 1px;
    }
}
</style>