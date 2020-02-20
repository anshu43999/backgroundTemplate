<!--  -->
<template>
<div class='tablelist_wrap'>
    <div class="tablelist_options">
        <div class="export btn_options" @click="exports">导出所选名单</div>
        <div class="print btn_options" @click="printExcel">打印所选名单</div>

        <!-- <div class="screen btn_options_screen" v-on:click = "startSX"> <span class="screen_left"> <i class="iconfont iconshaixuan"></i>  </span> <span class="screen_right">条件筛选</span></div> -->
        <div class="screen btn_options_screen btn2" v-on:click = "startTree"> <span class="screen_left"> <i class="iconfont iconshaixuan"></i>  </span> <span class="screen_right">组织架构筛选</span></div>

    </div>
    
    <!-- list -->
    <div class="mainlist_wrap" style="" >
        <el-table
            height="85%"
            v-loading="loading"
            :header-cell-style="{background:'linear-gradient(to bottom, rgba(255,244,224,1), rgba(254,235,222,1))'}"
            size=mini
            style="width:100%;border-bottom:0;background-color: transparent;"
            class="el_table"
            :data="tableData"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
            >
            <el-table-column
            type="selection"
            width="50">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            align='center'
            width="60"
            :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
            prop="idCard"
            label="身份证号"
            align='center'
            width="150"
            >
            </el-table-column>
            <el-table-column
            prop="jobNameL"
            label="工作单位及职务（全称）"
            align='center'
            :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
            prop="jobLevel"
            label="职务层次"
            align='center'
            width="110"
            >
            </el-table-column>
            <el-table-column
            prop="jobLevelTime"
            label="任现职务层次时间"
            align='center'
            width="130"
            >
            </el-table-column>
            <el-table-column
            prop="grade"
            label="现职级"
            align='center'
            width="100"
            >
            </el-table-column>
            <el-table-column
            prop="gradeTime"
            label="任现职级时间"
            align='center'
            width="100"
            >
            </el-table-column>
            <el-table-column
            prop=""
            label="操作"
            align='center'
            width="140"
            >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small"  style="color:#d6596b">查看任免审批表</el-button>
                </template>
            </el-table-column>

            


        </el-table>

        <div class="paging">
            <div class="paging_main">
                
                <span class="previous" style="cursor: pointer;-webkit-tap-highlight-color: transparent;" @click='previous'>上一页</span>
                <span class="paging_input">{{NowPage}}</span>
                <!-- <input @blur='blur' type="number" class="paging_input"  v-model="NowPage"> -->
                <span class="next"  style="margin-right:.5rem;cursor: pointer;-webkit-tap-highlight-color: transparent;" @click="next">下一页</span>
                
                <!-- 前往<input @blur='blur' style="margin:0 .08rem;" type="number" class="paging_input" v-model="goPage">页 -->
                <!-- <input style="margin:0 .1rem 0 .4rem" @blur='blur' type="number" class="paging_input" v-model="goPage">
                <span  style="cursor: pointer;-webkit-tap-highlight-color: transparent;" @click="goPages" >跳转</span> -->
            </div>
            <div class="paging_statistics">
                 前往<input  type="number" class="paging_input" v-model="goPage">页
                <span class="tz_btn"  style="margin-right:.4rem ;cursor: pointer;-webkit-tap-highlight-color: transparent;" @click="goPages" >跳转</span>

                <span>共{{pages}}页，每页{{Nums}}条</span> 
            </div>

           
            
            
        </div>

      
    </div>

    



</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
props:['show','loading','paging','tableData'],
components: {},
data() {
//这里存放数据
return {
    
    // 处理后的数据
    // tableData:[],

    multipleSelection: [], //选中的list 数组


    // pages : 0 ,//页数
    // Nums : 0 , //条数
    // NowPage:0, //当前页数
    goPage :0,






};
},
//监听属性 类似于data概念
computed: {
    pages(){
        return this.paging['pages']
    },
    Nums(){
        return this.paging['Nums']
    },
    NowPage(){
        return  this.paging['NowPage']
        
        // get(){
        //     return this.paging['NowPage']
        // },
        // set(val){
        //     this.NowPage =  this.paging['NowPage']

        // }     
    },
    total(){
        return this.paging['total']
    }, 
 
    
},
//监控data中的数据变化
watch: {
    
},
//方法集合
methods: {
    // list 颜色
    tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2) {
            return 'warning-row';
        } 
        return '';
    },
    // 查看任免审批表
    handleClick(row) {
        // console.log(row);
        this.$emit('OpenInfo',row);
    },
    // 选中状态
    handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
    },
    // 开始筛选  右侧弹框出现
    startSX(){
        this.$emit('Boxchange','show');
    },
    startTree(){
        this.$emit('Boxchange','showTree');
    },
    // 打印
    printExcel(){
        if(!(this.multipleSelection[0])){ return};
        // this.$emit()
        // this.$router.push({path:'/filtrate/print',query:{info :JSON.stringify(this.multipleSelection)   }  })
        this.$emit('printExcel',this.multipleSelection)
        
        
    },
    // 导出
    exports(){
        if(!(this.multipleSelection[0])){ return};
        var loadiframe=document.getElementById('fordownload');
        console.log(loadiframe);
        let brr = [];
        this.multipleSelection.forEach(v => {
            brr.push(v.aid) 
            
        });
        let  strBrr= brr.join();
        console.log(strBrr);
        loadiframe.src=this.apiRoot+'jianliA01/ExportReport?ids='+strBrr;

    },


    // pages  处理数据 
    PagesInit(){
        this.NowPage =  this.paging['NowPage'];
        

    },

    //上一页
    previous(){
        if(this.NowPage ===1) return;
        this.$emit('previous')
        this.$emit('pagingMed')

    },
    // 下一页
    next(){
       
        if(this.NowPage === this.pages) return;
        this.$emit('next')

    },
    // 失去焦点
    blur(){
        // console.log(this.NowPage)
        // let v = parseInt(this.NowPage)
        // // console.log('shiqujiaodian ')
        // this.$emit('blur',v)
        this.goPages();
    },
    goPages(){
        let val = parseInt(this.goPage);
        console.log( this.pages )
        if(val > this.pages  || val <=0){
            this.goPage = ''
            return;
        
        }

        this.$emit('goPages',val);

        this.goPage = '';
    },
   

    




},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    // this.PagesInit();
    
    

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {
    // this.PagesInit();
    // this.goPage = this.NowPage
}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.tablelist_wrap{
    // overflow-x: auto;
    position: relative;
    margin-top:.26rem; 
    height: 84%;
    // height:calc(100% - .9rem);
    border:  1px solid #dddddd;
    .tablelist_options{
        height: .64rem;
        // line-height: .64rem;
        // display: flex;
        font-size: .16rem;
        .btn_options{
            cursor: pointer;
            margin-top:.18rem; 
            width: 1.41rem;
            height: .32rem;
            line-height: .32rem;
            text-align: center;
            color: #ffffff;
            background: linear-gradient(to right, rgba(239,53,16,1), rgba(210,0,2,1)); /* 标准的语法 */
         
        }
        .btn_options_screen{
            overflow: hidden;
            display: flex;
            border-radius:.23rem; 
            cursor: pointer;
            margin-top:.14rem; 
            width: 1.61rem;
            height: .36rem;
            line-height: .39rem;
            text-align: center;
            color: #ffffff;
            // background-image:url("../../../../public/static/images/common/sxbg.png");
            background-image: linear-gradient(0deg, 
                #e5322a 0%, 
                #e84b44 26%, 
                #eb635d 52%, 
                #e5322a 100%), 
            linear-gradient(0deg, 
                #170209 0%, 
                #ebf1ef 100%);
            background-blend-mode: normal, 
                normal;
            box-shadow: 0px 2px 3px 0px 
                rgba(0, 0, 0, 0.75);
            border-radius: 23px;
            background-size: cover;
            .screen_left{
                width: 30%;
                background-image: linear-gradient(0deg, 
                    #fff7b9 0%, 
                    #fff9cc 26%, 
                    #fffbde 52%, 
                    #fff7b9 100%), 
                linear-gradient(
                    #fff7b9, 
                    #fff7b9);
                background-blend-mode: normal, 
                    normal;
                color:#fbab56;    
            }
            .screen_right{
                width: 70%;
                text-align: center;
            }

        }
        .btn2{
            width:2rem;
        }

        .export{
            margin-left:.2rem; 
            float: left;
        }
        .print{
            margin-left: .1rem;
            float: left;
        }
        .screen{
            float: right;
            margin-right:.8rem; 
        }
    }
    .mainlist_wrap{
        margin:0 .2rem 0 .2rem;
        height:calc(100% - .66rem);
        position: relative;

        .paging{
            display: block;
            width: 100%;
            position: absolute;
            left: 0;
            bottom: .2rem;
            // margin: 0 auto; 
            text-align: center;
            .paging_input{
                text-align: center;
                width: .3rem;
                background-image: linear-gradient(0deg, 
                    #eaeaea 0%, 
                    #ffffff 50%, 
                    #eaeaea 100%);
                border-radius: 4px;
                border: solid 1px #e0e0e0;
            }
            .paging_main{
                display: inline-block;
                span{
                    display: inline-block;
                    width: .64rem;
                    height: .22rem;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    font-size: .12rem;
                    line-height: .22rem;
                }
                span:hover{
                    background-color: #ffffff;
                    color: blue;
                }
                .previous{
                    margin-right: .1rem;
                }
                .next{
                    margin-left: .1rem;
                }
                .paging_input{
                    text-align: center;
                    width: .3rem;
                    background-image: linear-gradient(0deg, 
                        #eaeaea 0%, 
                        #ffffff 50%, 
                        #eaeaea 100%);
                    border-radius: 4px;
                    border: solid 1px #e0e0e0;
                }

                
            }
            .paging_statistics{
                position: absolute;
                right: .5rem;
                top: 0;
                .tz_btn{
                    display: inline-block;
                    width: .64rem;
                    height: .22rem;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    font-size: .12rem;
                    line-height: .22rem;
                }
                .tz_btn:hover{
                     background-color: #ffffff;
                    color: blue;
                }
            }
        }
    }

    // .el-table .warning-row {
    //     background: #fff1ef !important;
    // }
    
    
}
</style>