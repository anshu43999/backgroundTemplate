<template>
	<div id="login">


         <div class="homepage-hero-module">
            <div class="video-container">
                <div class='login_title'>
                    <b class="guohui" src="../assets/images/guohui.png"></b>
                    <!-- <image src="../assets/images/index/guohui.png" alt=""></image> -->
                    <!-- <b class="guohui"></b> -->
                    <span>12110 短信报警平台数据接口系统</span>
                </div>

                <div class='loginBodyWrap'   >
                    <div class='loginBodybox' v-if="optionstype === 1">
                        <div class="loginBodybox_main">
                            <div class="username_wrap">
                                <div class="info_wrap">
                                    <i class="iconfont iconwulumuqishigongandashujuguanlipingtai-ico-"></i>
                                    <input type="text"  v-model="loginFrom.userName" placeholder="请输入用户名">
                                </div>
                            </div>
                            <div class="password_wrap">
                                <div class="info_wrap">
                                    <i class="iconfont iconmima"></i>
                                    <input type="password" v-model="loginFrom.userPass" placeholder="请输入密码">

                                </div>
                            </div>
                            <div class="login_wrap" @click="login">
                                <span>登录</span>    
                            </div>
                            <div class="register_wrap">
                                <span @click="mouseClick('login')"><i class="iconfont iconfeiji"></i>去注册</span>
                            </div>
                        </div>
                    </div>


                    <div class='loginBodybox'   v-if="optionstype === 2">
                        <div class="loginBodybox_main" style="margin: 10% 11% 8% 12%;">
                            <div class="username_wrap">
                                <div class="info_wrap">
                                    <i class="iconfont iconwulumuqishigongandashujuguanlipingtai-ico-"></i>
                                    <input type="text" v-model="registerFrom.userName" placeholder="请输入用户名">
                                </div>
                            </div>
                            <div class="username_wrap">
                                <div class="info_wrap">
                                    <i class="iconfont iconwulumuqishigongandashujuguanlipingtai-ico-"></i>
                                    <input type="text" v-model="registerFrom.registrationCode" placeholder="请输入注册码">
                                </div>
                            </div>
                            <div class="password_wrap">
                                <div class="info_wrap">
                                    <i class="iconfont iconmima"></i>
                                    <input type="password" v-model="registerFrom.userPass" placeholder="请输入密码">

                                </div>
                            </div>
                            <div class="login_wrap" @click="register">
                                <span>注册</span>    
                            </div>
                            <div class="register_wrap">
                                <span @click="mouseClick('register')"><i class="iconfont iconfeiji"></i>去登录</span>
                            </div>
                        </div>
                    </div>

                </div>
              
                       

               
                <video autoplay loop muted playsinline src="../assets/video/dongtu1.mp4" class="fillWidth" style="width= 100%; height=100%; object-fit: fill"></video>
            </div>
        </div>



		<div class="copyright">山西硬汉网络科技有限公司提供技术支持</div>





	</div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    import Qs from 'qs'
	export default {
		name: "Login",
		data () {
			return {
                urlPort : [this.apiRoot + 'Account/zhuce',this.apiRoot + 'Account/login'],
				active : false,
				name : '',
                password : '',
                optionstype : 1,
                loginFrom : {
                    userName    : '',
                    userPass : '',
                },
                registerFrom : {
                    userName : '',
                    registrationCode : '',
                    userPass : '',

                },

			}
		},
		methods : {
            ...mapMutations(['setUserInfo']),
            // 登录
            login(){
                console.log('登录')
                let arr = Object.values(this.loginFrom);
                let that = this;
                for(let item of arr){
                    if(!item){
                        that.$notify.error({
                            title: '错误',
                            message:  '请将信息填写正确',
                            type: 'success'
                        });
                        return;
                    }
                }

                this.$http({
                    method: 'post',
                    url: this.urlPort[1],
                    data: Qs.stringify(this.loginFrom)
                })
                .then(function (res) {
                    console.log(res.data.success);
                    if(res.data.success){
                         this.$router.push({ path : '/index/logManagement' , query : { }  })
                        let payload = {
                            userName :  res.data.username,
                            userId : res.data.userid,
                            permissions : res.data.urerCode,
                        }
                        this.setUserInfo(payload)

                    }else{
                        that.$notify.error({
                            title: '错误',
                            message:  res.data.code ?res.data.code : '用户名或者密码错误',
                            type: 'success'
                        });
                        return;

                    }
                }.bind(this))

                return;
               

            },
            // 注册
            register(){
                let arr = Object.values(this.registerFrom);
                let that = this;
                for(let item of arr){
                    if(!item){
                        that.$notify.error({
                            title: '错误',
                            message:  '请将信息填写正确',
                            type: 'success'
                        });
                        return;
                    }
                }

                console.log(this.registerFrom);
                this.$http({
                    method: 'post',
                    url: this.urlPort[0],
                    data: Qs.stringify(this.registerFrom)
                })
                .then(function (res) {
                    console.log(res)
                    if(res.data.success){
                        that.$notify({
                            title: '成功',
                            message: "注册成功",
                            type: 'success',
                        });
                        that.optionstype = 1;

                    }else{
                        that.$notify.error({
                            title: '错误',
                            message:  res.data.code ? res.data.code :"网络错误" ,
                            type: 'success'
                        });

                    }
                }.bind(this))

            },
            // 操作类型
            mouseClick(value){
                console.log('mouseclick---------'+value)
                switch(value){
                    case "register" : this.optionstype = 1 ;  break;
                    case 'login' :  this.optionstype = 2 ; break; 
                }
                console.log(this.optionstype);

            },

			
			
		},
		mounted(){

		

			
		
		},
		directives:{
			focus:{
				inserted : function (el,{value}) {
					// console.log(el,{value})
					if(value){
						el.focus();
					}
				}
			}
		},

	}
</script>

<style scoped lang="scss">
input{
    background: transparent;
    border: none;
    color: #000;
    
}
input:focus{outline:none;}
.copyright{
     width: 100%;
    color: #f8fbff;
    position: absolute;
    left: 0;
    bottom: 5px;
    text-align: center;
}

#login{
    position: relative;
    // background : url('../assets/images/index/login_bg.png');
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    .homepage-hero-module{
        width: 100%;
        height : 100%;
    }


    .video-container {
        position: relative;
        bottom: 0%;
        left: 0%;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .video-container .login_title{
        position: absolute;
        top: 10%;
        width: 100%;
        height: 10%;
        z-index : 999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size : .45rem;
        .guohui{
            display: inline-block;
            width: .7rem;
            height:.7rem;
            background: url('../assets/images/guohui.png');
            background-repeat: no-repeat;
            background-position: center;
            background-size:100% 100%; 
            z-index: 1000;
            margin-right:1rem; 
        }
    }
    .video-container .loginBodyWrap{
        position: absolute;
        top: 25%;
        width: 100%;
        height: 60%;
        z-index : 999;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .loginBodybox{
            width :32%;
            height:100%;
            margin-right: 5%;
            border-radius: 5px;
            box-shadow: 0px 3px 32px 0px 
		    rgba(49, 114, 188, 0.64);
            .loginBodybox_main{
                width: 77%;
                height: 72%;
                margin: 20% 11% 8% 12%;
                .username_wrap{
                    height: 27%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .info_wrap{
                        width: 100%;
                        height: 70%;
                        border-radius: 4px;
                        border : 2px solid #04113f;
                        display: flex;
                        justify-content: start;
                        align-items: center;

                        i{
                            font-size: .3rem;
                            margin-left:.3rem; 
                            margin-right:.3rem; 
                        }
                        input{
                            width: 70%;
                            height: 50%;
                        }
                    }
                }
                .password_wrap{
                    height: 27%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .info_wrap{
                        width: 100%;
                        height: 70%;
                        border-radius: 4px;
                        border : 2px solid #04113f;
                        display: flex;
                        justify-content: start;
                        align-items: center;
                        i{
                            font-size: .3rem;
                            margin-left:.3rem; 
                            margin-right:.3rem; 

                        }

                    }
                }
                .login_wrap{
                    cursor: pointer;
                    height: 26%;
                    display: flex;
                    align-items: center;
                    span{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 43%;
                        color: #ffffff;
                        background-image: linear-gradient(90deg, 
                            #05217b 0%, 
                            #030d2f 100%);
                        box-shadow: 0px 7px 13px 0px 
                            rgba(8, 34, 120, 0.35);
                        border-radius: 4px;
                        border: solid 2px #04113f;
                    }
                }
                .register_wrap{
                    height: 17%;
                    color: #030d30;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span{
                        cursor: pointer;
                    }
                }



            }
        }
    }

    
    .video-container video {
        width:100%;
        height: 100%;
        position: absolute;
        z-index: 0;
        bottom: 0;
    }

    // .video-container video.fillWidth {
    //     width: 100%;
    // }

    .btnActive{
            transform: scale(0.9);
    }
    .btnFocurs{
        transform: scale(1);
    }



}
</style>
