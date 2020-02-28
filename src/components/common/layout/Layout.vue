<template>
    <div id="layOut">
        <el-container class="containerOut">
            <el-header>
                <Tpms-header></Tpms-header>
            </el-header>
            <el-container class="containerInner">
                <!-- <el-aside width="3rem" style="background: linear-gradient( rgba(17,81,147,1), rgba(59,62,130,1))"> -->
                <el-aside width='2.5rem' style="background:#405b88">
                    
                    <Tpms-sidebar></Tpms-sidebar>
                </el-aside>
                <el-container>
                    <el-main :class="[this.$route.name==='首页'?'bgColor':'bgImg','main_wrap']">
                        <router-view  @operate='operate'></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>

        <div class='shade' v-if='shade'>
            <div class="box_wrap"   v-if='shadeType === 1'>
                <div class="boxCommon box_topColumn">
                    <span>所属单位</span>
                    <el-input class="inputs" style="width: 50%" size=medium   v-model="units" placeholder="关键字搜索"></el-input>
                </div>

                <div class="boxCommon box_centerColumn">
                    <span>IP地址</span>
                    <el-input class="inputs" style="width: 50%" size=medium   v-model="ipDetail" placeholder="关键字搜索"></el-input>
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
            
        </div>




        <iframe id="fordownload" style="display:none"></iframe>
		<iframe id="fordownload2" style="display:none"></iframe>
    </div>
</template>

<script>
    import TpmsHeader from '@/components/common/layout/Header.vue'
    import TpmsSidebar from '@/components/common/layout/Aside.vue'

    export default {
        name: "Layout",
        components: {
            TpmsHeader,
            TpmsSidebar,
        },
        computed: {},
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

                console.log(value);
                this.shade = false;

            },
            // 双层  子传父  方法
            operate(value){
                console.log("layout------------"+ value);

                switch(value){
                    case 'add' :  this.shade = true; this.shadeType = 1;   break;

                    case 'edit' :  this.shade = true; this.shadeType = 1;   break;
                    case 'delete' :this.shade = true; this.shadeType = 2;  break
                }

                // this.shade = true;
            }

        },
        data() {
            return {
                overflow: false,
                units : '',
                ipDetail : '',
                shade : false,   //   编辑操作 遮罩
                shadeType : 1 ,   //     遮罩类型 
            }
        }
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
            z-index: 99999;
            background: rgba(0, 0, 0, .5);
            display: flex;
            justify-content: center;
            align-items: center;
            .box_wrap{
                width: 24%;
                height: 30%;
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

   



</style>