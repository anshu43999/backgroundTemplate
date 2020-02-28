<!--  -->
<template>
<div class='pagesWrap'>
    <!--        面包屑-->
    <div class="breadWrap" >
        <p class="nowPosition"></p>
        <breadcrumb class="bread" :breadcrumb="breadcrumb"></breadcrumb>
    </div>

    <div class="mainBody">
        <div class="mainBodyHeader">
            
            <span class="textTime">关键字搜索</span>
            <el-input class="inputs" style="width: 2rem" size=small  v-model="crux" placeholder="关键字搜索"></el-input>

            <div class="optionsBtn">
                <i class="iconfont iconseach"></i>
                <span>筛选</span>
                
            </div>

            <div class="optionsBtn">
                <i class="iconfont iconcancel"></i>
                <span>取消</span>
            </div>

            <div class="addWrap">
                <!-- <div class="addBtn">
                    <i class="iconfont iconxinzenghuizong"></i>
                    <span>新增配置</span>
                </div> -->
                <el-button class='addBtn'  round type="primary" round size="small" @click="handleClick('add')"><i class="iconfont iconxinzenghuizong"></i>新增配置</el-button>
            </div>


        </div>
        <div class="mainBodyContext">
            <div   class="mainBodyContext_tableWrap" >
                <tableList @operate='operate' ref='tables' :tbTaskH=tbTaskH  class="tablesList" :tableData = tableData :type=listType></tableList>
            </div>
            <div class="mainBodyContext_pagination">
                <div>
                    <span>共20项</span> 3页
                </div>
                <div class='pagination_center'>
                    <span class="spanCommon previous"> &lt </span>
                    <span class="spanCommon nowPage">1</span>
                    <span class="spanCommon next">&gt</span>
                    <span class="spanCommon goPage">到第 <input type="number">页   </span>
                    <span class="spanCommon pageNext">确定</span>
                </div>
                
                

            </div>



            
        </div>

    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Breadcrumb from '../../components/common/action/Breadcrumb';
import tableList from '../../components/tableList'

export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Breadcrumb,
    tableList,
},
data() {
//这里存放数据
return {
    route:'',
    breadcrumb: {
        search: false,
        searching: '',
    },
    filtrate : '',
    tableData : [
        {id : 1, deployTime: '2016-05-02', address: '王小虎', ipDetail: '192.168.1.253' }, 
        {id : 2, deployTime: '2016-05-02', address: '王小虎', ipDetail: '192.168.1.253' }, 
        {id : 3, deployTime: '2016-05-02', address: '王小虎', ipDetail: '192.168.1.253' }, 
        {id : 4, deployTime: '2016-05-02', address: '王小虎', ipDetail: '192.168.1.253' }, 
        {id : 5, deployTime: '2016-05-02', address: '王小虎', ipDetail: '192.168.1.253'  }, 
        {id : 6, deployTime: '2016-05-02', address: '王小虎', ipDetail: '192.168.1.253' }, 
        {id : 7, deployTime: '2016-05-02', address: '王小虎', ipDetail: '192.168.1.253' }, 
        {id : 8, deployTime: '2016-05-02', address: '王小虎', ipDetail: '192.168.1.253'  }, 
    ],
    tbTaskH : '' ,   // table 的高度
    crux: '', // 关键词
    listType : 2,  //  table 类型


};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 新增配置  
    handleClick(value){
        console.log(value);
        this.$emit('operate',value)
    },
    // 双层操作方法
    operate(value){
        this.$emit('operate',value)
    }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

    console.log(this.$refs.tables.$el.clientHeight)
    this.tbTaskH = this.$refs.tables.$el.clientHeight;


    

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {

}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.pagesWrap{
    height: 100%;
    display: flex;
    flex-direction: column;
    .breadWrap{
        display: flex;
        flex-direction:row;
        border-bottom: 1px solid #dddddd;
        padding-bottom: 15px;
        margin-bottom: 20px;
        .nowPosition{
            width: 3px;
            background: #082278;
            margin-right: 10px;
            // height: 100%;
        }
        .bread{
            flex: 1;
        }


    }

    .mainBody{
        flex: 1;
        border:1px solid #dddddd;
        display: flex;
        flex-direction: column;
        .mainBodyHeader{
            height: 7%;
            border-bottom: 1px solid #dddddd;
            display: flex;
            flex-direction: row;
            align-items: center;
            .textTime{
                margin: 0 18px;
                font-weight: 550;
            }
            .optionsBtn{
                width: 6%;
                height: 70%;
                display: flex;
                align-items: center;
                margin-left:41px;
                background: #61baef;
                border-radius: 18px;
                color: #ffffff;
                i{
                    margin: 0 10% 0 15%; 
                }
            }
            .addWrap{
                flex: 1;
                height: 100%;
                 display: flex;
                flex-direction:  row-reverse ;
                align-items: center;
                justify-content: right;
                .addBtn{
                    margin-right:41px;
                    // width: 13%;
                    // height: 70%;
                    // display: flex;
                    // align-items: center;
                    // margin-right:41px;
                    // background: #61baef;
                    // border-radius: 18px;
                    // color: #ffffff;
                    // i{
                    //     margin: 0 10% 0 15%; 
                    // }
                }
            }
        }
        .mainBodyContext{
            flex: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
            .mainBodyContext_tableWrap{
                height: 86%;
                
                .tablesList{
                    height: 100%;
                    display : flex;
                    flex-direction: column;

                }
                
            }
            .mainBodyContext_pagination{
                border-top: 1px solid #cccccc;
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;



                // fff
              
                    
                .pagination_center{
                    width : 20%;
                    height: 35%;
                    display: flex;
                    .previous{
                        width: 10%;
                        background: #ffffff;
                        border: 1px solid #cccccc;
                        text-align: center;

                    }
                    .spanCommon{
                        display : flex;
                        align-items : center;
                        justify-content: center;
                    }
                    .nowPage{
                        width: 10%;
                        background: #5db6e8;
                        color: #ffffff;
                        border: 1px solid #cccccc;
                        text-align: center;
                    }
                    .next{
                        width: 10%;
                        background: #ffffff;
                        border: 1px solid #cccccc;
                        text-align: center;
                    }
                    .goPage{
                        width: 40%;
                        margin: 0 2%;
                        border: 1px solid #cccccc;
                        input{
                            width : 35%;
                            border: 0;
                        }
                    }
                    .pageNext{
                        cursor: pointer;
                        width: 20%;
                        background: #5db6e8;
                        color: #ffffff;
                        justify-content: center;
                        border-radius: 2px;
                    }
                }

                

                // fff
            }
        }
        

    }

}

</style>