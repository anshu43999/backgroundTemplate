<template>
    <div id="layOut">
        <el-container class="containerOut">
            <el-header>
                <Tpms-header @operate='operate'></Tpms-header>
            </el-header>
            <el-container class="containerInner">
                <el-aside width='2.4rem' style="background:#e9ebf6">

                    <Tpms-sidebar></Tpms-sidebar>
                </el-aside>
                <el-container>
                    <el-main :class="[this.$route.name==='首页'?'bgColor':'bgImg','main_wrap']">
                        <router-view  ref="mainBody"  @operate='operate'></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>

        <div class='shade' v-if='shade'>
            <div class="box_wrap"   v-if='shadeType === 1'>
                <div class="boxCommon box_topColumn">
                    <span>所属单位</span>
                    <el-input class="inputs" style="width: 50%" size=medium :disabled="true"  v-model="units" placeholder="所属单位"></el-input>
                </div>
                <div class="boxCommon box_centerColumn">
                    <span>IP地址</span>
                    <el-input class="inputs" style="width: 50%" size=medium   v-model="ipDetail" placeholder="IP地址"></el-input>
                </div>
                <div class="boxCommon special box_bottomColumn">
                    <el-button type="primary" round size="small" @click="handleClick('save')"><i class="iconfont iconbaocun-tianchong"></i>保存</el-button>
                    <el-button round  size="small" @click="handleClick('cancel')"><i class="iconfont iconcancel"></i>取消</el-button>
                </div>
            </div>

            <div class="box_wrap"   v-if='shadeType === 2'>
                <div class="boxCommon box_topColumnDelete">
                    <span class="deleteHint">确认删除此配置？</span>
                </div>
                <div class="boxCommon special box_bottomColumn">
                    <el-button  type="warning" round  size="small" @click="handleClick('delete')"><i class="iconfont iconshanchu"></i>删除</el-button>
                    <el-button round  size="small" @click="handleClick('cancel')"><i class="iconfont iconcancel"></i>取消</el-button>
                </div>
            </div>

            <div class="box_wrap"  style="width: 500px;height: 427px;"  v-if='shadeType === 3'>
                <div class='box_userPic'>
                    <i class="iconfont btnClose iconguanbi"  @click="handleClick"></i>
                    <div class="userPortrait">
                        <img class='' :src="user.squareUrl">

                    </div>

                </div>

                <div class='boxCommonOne box_units'>
                    <span>所属单位</span>
                    <el-input
                        style="width: 65%"
                        placeholder="所属单位"
                        v-model="units"
                        :disabled="true">
                    </el-input>

                </div>

                <div class='boxCommonOne box_signature'>
                    <span>数字签名</span>
                    <el-input
                        style="width: 65%"
                        placeholder="数字签名"
                        v-model="signature"

                        >
                    </el-input>

                </div>

                <div class='box_amend'>
                    <span> <i class="iconfont  iconmimaxiugai1"></i> <span>密码修改</span></span>

                </div>

            </div>

        </div>




        <iframe id="fordownload" style="display:none"></iframe>
		<iframe id="fordownload2" style="display:none"></iframe>
    </div>
</template>

<script>
    import TpmsHeader from '@/components/common/layout/Header.vue'
    import TpmsSidebar from '@/components/common/layout/Aside.vue'
    import {mapGetters,mapMutations} from 'vuex'
    import Qs from 'qs'
    export default {
        name: "Layout",
        components: {
            TpmsHeader,
            TpmsSidebar,
        },
        computed: {
            ...mapGetters(['userName','permissions'])
        },
        created() {
        },
        //防止首页变形
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.overflow = true
            })
        },
        beforeRouteUpdate(to, from, next) {
            if (to.name == '首页') {
                this.overflow = true
            } else {
                this.overflow = false
            }
            next()
        },
        methods: {
            // 操作按钮选择
            handleClick(value){
                // 取消 直接 return
                if(value === 'cancel'){
                    this.shade = false;
                    return;
                }
                // console.log(this.btnType);   // 开始判断  按键 btntype  类型
                // console.log(this.userName);
                // console.log(this.deleteId);
                let data = {};

                // 请求 http
                let that = this;
                function sendReqest(url,data,msg){
                    that.$http({
                        method: 'post',
                        url: url,
                        data: Qs.stringify(data)
                    })
                    .then(function (res) {

                        if(res.data.success){
                            that.$refs.mainBody.getList();
                            that.$notify({
                                title: '成功',
                                message: msg,
                                type: 'success',
                            });
                        }else{
                            that.$notify.error({
                                title: '错误',
                                message:  res.data.msg ? res.data.msg : '网络错误',
                                type: 'success'
                            });
                        }
                    })
                }
                // 判断ip地址的可用性
                let ipRegular = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g;
                let ipResult = ipRegular.test(this.ipDetail)


                switch(this.btnType){
                    case 'add' :

                                if(! ipResult){
                                    that.$notify.error({
                                        title: '错误',
                                        message: 'ip格式错误',
                                        type: 'success'
                                    });
                                    return;
                                }

                                data = {
                                    unitName: this.units,
                                    ip : this.ipDetail
                                }
                                sendReqest(this.urlPort[0],data,'添加成功');
                                break;
                    case 'delete':

                                data = {
                                    id : this.deleteId
                                }
                                sendReqest(this.urlPort[1],data,'删除成功')

                                break;

                    case 'edit':
                                if(! ipResult){
                                    that.$notify.error({
                                        title: '错误',
                                        message: 'ip格式错误',
                                        type: 'success'
                                    });
                                    return;
                                }

                                data = {
                                    id : this.editId,
                                    ip : this.ipDetail
                                }
                                sendReqest(this.urlPort[2],data,'修改成功')
                                break;

                }


                this.shade = false;

            },
            // 双层  子传父  方法
            operate(value){


                switch(value.code){
                    case 'add' :   this.btnType = 'add' ;  this.ipDetail=''; this.units = this.userName ; this.shade = true;  this.shadeType = 1; break;
                    case 'edit' :   this.btnType = 'edit'; this.ipDetail = value.ip ; this.editId = value.id  ;this.units = this.userName ;  this.shade = true; this.shadeType = 1;   break;
                    case 'delete' : this.btnType = 'delete'; this.deleteId = value.id  ; this.shade = true; this.shadeType = 2;  break;
                    case 'personalCenter' : this.btnType = 'userInfo';  this.shade = true; this.shadeType = 3;  break;

                }

                // this.shade = true;
            }

        },
        data() {
            return {
                // 添加 ip 方法   删除ip参数
                urlPort : [ this.apiRoot+'IPManage/insertIP',this.apiRoot + 'IPManage/deleteIP',this.apiRoot + 'IPManage/editIP'],
                overflow: false,
                // units : '',
                ipDetail : '',
                shade : false,   //   编辑操作 遮罩
                shadeType : 1 ,   //     遮罩类型
                units : '',   // 所属单位
                signature : '',   //数字签名
                btnType : '' , // 按钮类型
                deleteId : '', //  删除id

                user:{     // 用户信息
                    squareUrl: 'static/images/header/admin.png',
                    userName: '太原市公安局110指挥中心'
                },
            }
        },
        mounted(){
            this.units = this.userName;
            this.signature = this.permissions;
        },
    }
</script>

<style lang='scss' scoped>
    #layOut{
        position: relative;
        width: 100%;
        height: 100%;
        .containerOut{
            height: 100%;
            overflow:hidden;
            .containerInner{
                height: calc(100% - 1rem);
                overflow:hidden;
                .bgImg{
                    width:100%;
                    background: url("../../../../public/static/images/common/bg.png") no-repeat center ;
                    // background-repeat: no-repeat;
                    background-size: contain;

                    // background-position: center top;
                    height: 100%;
                }
                .bgColor{
                    background: #eee5e6;
                }
            }
        }
        .shade{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 2000;
            background: rgba(0, 0, 0, .5);
            display: flex;
            justify-content: center;
            align-items: center;
            .box_wrap{
                // width: 24%;
                // height: 30%;
                width: 463px;
	            height: 280px;
                background: #ffffff;
                border-radius: 8px;
                padding: 0 1% 0 1%;
                .boxCommon{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-top: 8%;

                    >span{
                        width: 30%;
                        font-size: 16px;
                        font-weight: 550;
                    }
                }
                .special{
                    padding-top: 1%;
                }
                .box_topColumn{

                    height: 35%;
                    border-bottom: 1px solid #dddddd;
                }
                .box_topColumnDelete{
                    height: 65%;
                    .deleteHint{
                       width: 100%;
                       text-align : center;
                   }
                }
                .box_centerColumn{
                    height: 35%;
                }
                .box_bottomColumn{
                    height: 29%;
                    justify-content: space-around;

                }
                .boxCommonOne{
                    display: flex;
                    align-items: center;
                    justify-content: space-around;

                }
                .box_userPic{
                    width : 100%;
                    height : 33%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 2px;
                    .btnClose{
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        right: 1%;
                        top: 15%;
                        cursor: pointer;
                    }
                    .userPortrait{
                        width: .6rem;
                        height: .6rem;
                        border: 1px solid #ccc;
                        img{
                            width : 100%;
                            height : 100%;
                        }

                    }
                }
                .box_units{
                    width : 100%;
                    height : 25%;
                    border-top: 1px solid #dddddd;
                    border-bottom : 1px solid #dddddd;
                }
                .box_signature{
                    width : 100%;
                    height : 25%;
                }
                .box_amend{
                    width : 100%;
                    height : 10%;
                    display : flex;
                    align-items: center;
                    justify-content: flex-end;
                    color: #999999;

                    cursor: pointer;
                    span{
                        i{
                            color: #ffdb8e;
                            margin-right:2px;
                            font-size: 20px;
                        }
                        span{
                            border-bottom: 1px solid #999;
                        }

                    }
                }



            }




        }
    }

    // table 的兼容
    body .el-table th.gutter{
        display: table-cell!important;
    }

    body .el-table colgroup.gutter{
        display: table-cell!important;
    }
    .el-table .warning-row {
        background:  #fff9f7;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
    .main_wrap{
        overflow-y: auto !important;
        overflow-x: hidden !important;
        width: 99.99%;
    }

    .el-table thead{
        color: #000;
        font-weight: 400 !important;
    }
    th{
        font-weight: 400 !important;
    }
    .el-table::before{
        height: 0;
    }


    //  input 选中 边框

    input{
        outline:none;
    }
    .el-input input{
        outline:none  !important;
        border-radius: 0 !important;
    }
    .el-select .el-input.is-focus .el-input__inner{
        border-color: #DCDFE6;
        border-radius: 0px;
    }
    .el-select .el-input__inner:focus {
        border-color: #DCDFE6;
    }


   table表头高度
.el-table__body td,.el-table__body th{
    height: .48rem;
    // height: calc(20%);

    padding:1px;

}

// .el-table__body{

//     height: 100%;
//     .tbody{
//         height: 100%;

//         }
// }


// 禁止显示上下箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
   -webkit-appearance: none !important;
   margin: 0;
}
input[type="number"]{-moz-appearance:textfield;}

// input 加 padding 后 宽度变化
input{
    -webkit-box-sizing: border-box;//谷歌浏览器
    -moz-box-sizing: border-box;//火狐浏览器
    box-sizing: border-box;//其它浏览器
}

// select 选中框

.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #ee320f;
    border-color: #ee320f;
}

//
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
    font-weight: normal!important;
}




</style>
