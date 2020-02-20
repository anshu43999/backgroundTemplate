<template>
    <div id="layOut">
        <el-container class="containerOut">
            <el-header>
                <Tpms-header></Tpms-header>
            </el-header>
            <el-container class="containerInner">
                <!-- <el-aside width="3rem" style="background: linear-gradient( rgba(17,81,147,1), rgba(59,62,130,1))"> -->
                <el-aside width='2.5rem' style="background:#d20002">
                    
                    <Tpms-sidebar></Tpms-sidebar>
                </el-aside>
                <el-container>
                    <el-main :class="[this.$route.name==='首页'?'bgColor':'bgImg','main_wrap']">
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
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

        },
        data() {
            return {
                overflow: false
            }
        }
    }
</script>

<style lang="scss">
    #layOut{
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
                    background: url("../../../../public/static/images/common/bg.png");
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    height: 100%;
                }
                .bgColor{
                    background: #eee5e6;
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
   

//    table表头高度     
.el-table__body td,.el-table__body th{
    height: .48rem;
    // height: calc(20%);

    padding:1px;

}
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