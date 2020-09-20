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
            
            <span class="textTime">IP搜索</span>
            <el-input class="inputs" style="width: 2rem" size=small  v-model="crux" placeholder="关键字搜索"></el-input>

            <div class="optionsBtn" @click="topOptions('submit')">
                <i class="iconfont iconseach"></i>
                <span>筛选</span>
                
            </div>

            <div class="optionsBtn" @click="topOptions('cancel')">
                <i class="iconfont iconcancel"></i>
                <span>取消</span>
            </div>

            <div class="addWrap">
                <div class="addBtn"  @click="handleClick('add')">
                    <i class="iconfont iconxinzenghuizong"></i>
                    <span>新增配置</span>
                </div>
                <!-- <el-button class='addBtn'  round type="primary"  size="small" @click="handleClick('add')"><i class="iconfont iconxinzenghuizong"></i>新增配置</el-button> -->
            </div>


        </div>
        <div class="mainBodyContext">
            <div   class="mainBodyContext_tableWrap" >
                <tableList @operate='operate' ref='tables' :tbTaskH=tbTaskH  class="tablesList" :tableData = tablePaging :type=listType></tableList>
            </div>
            <div class="mainBodyContext_pagination">
                <div>
                    <span>共{{listSum}}项</span> {{totalPage}}页
                </div>
                <div class='pagination_center'>
                    <span class="spanCommon previous" @click="goPage( currentPage-1,8)"> &lt </span>
                    <span class="spanCommon nowPage">{{currentPage}}</span>
                    <span class="spanCommon next" @click="goPage( currentPage+1,8)">&gt</span>
                    <span class="spanCommon goPage">到第 <input min="1" :max="totalPage" type="number" style="text-align:center "   v-model.number="currentPage">页   </span>
                    <span class="spanCommon pageNext" @click="goSpecific">确定</span>
                </div>
            </div>

            <!-- <Paging    v-if="pagingShow" :tableData='tableData'      ref="paging"></Paging> -->


            
        </div>

    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Breadcrumb from '../../components/common/action/Breadcrumb';
import tableList from '../../components/tableList';
import Paging from '../../components/paging';
import {mapGetters,mapMutations} from 'vuex'
import Qs from 'qs'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Breadcrumb,
    tableList,
    Paging,
},
data() {
//这里存放数据
return {
    urlPort : [this.apiRoot + 'IPManage/fingIPList',this.apiRoot + 'IPManage/deleteIP', this.apiRoot + 'IPManage/findKeyword'],
    route:'',
    breadcrumb: {
        search: false,
        searching: '',
    },
    filtrate : '',
    // ----------------------------------------分页数据
    tableData : [],   // 总数
    tablePaging : [],  // 分页数据
    listSum : 0, //总数
    totalPage : 1 ,  //总页数
    currentPage : 1  , //当前页数
    tableData : [
       
    ],
    tbTaskH : '' ,   // table 的高度
    crux: '', // 关键词
    listType : 2,  //  table 类型
    pagingShow : false, // 分页是否显示     2020 03 04  弃用


};
},
//监听属性 类似于data概念
computed: {
    ...mapGetters(['userName','userId'])
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 新增配置  
    handleClick(value){
        this.$emit('operate',{code : value})
    },
    // 双层操作方法
    operate(value){
        this.$emit('operate',value)
    },
    // 获取数据
    getList(){
        let data = {
            unitName: this.userName,
            xzqh : this.userId
        }  
        this.$http({
            method: 'post',
            url: this.urlPort[0],
            data: Qs.stringify(data)
        })
        .then(function (res) {
            this.tableData  = res.data;
            // number   传输总量 // ipNumber     设备数// transmissionCapacity  传输总量  // time    日期
            
            this.goPage(1,8)     // 开始替换
        }.bind(this))
    },
    // 分页
    goPage(nowPage,pageSize,value){
        if(this.tableData.length === 1 ){
            this.listSum = 1; 
            this.totalPage = 1;
            this.currentPage = 1;
            this.tablePaging = this.tableData ;
            return;
        }
        let  num  = this.tableData.length ;     //  总数length 值
        this.listSum = num; 
        if( num/pageSize > parseInt(num/pageSize) ){
            this.totalPage=parseInt(num/pageSize)+1;   
        }else{
            this.totalPage=parseInt(num/pageSize);   
        }
        if(nowPage<=0 || nowPage> this.totalPage){ return};
        this.currentPage = nowPage; //当前页数
        let startRow = (this.currentPage - 1) * pageSize;   // 开始   index 值
        let endRow = this.currentPage * pageSize;      // 结束  index  值
        endRow = (endRow > num)? num+1 : endRow;        // 判断  当结束length值 大于 总数length值时  取   总数length值    最后一页不是页数最大量
        this.tablePaging = this.tableData.slice(startRow,endRow)
    },
    // 特殊页跳转
    goSpecific(){
        this.goPage(this.currentPage,8);

    },
    // top  options
    topOptions(value){
        switch(value){
            case  'submit' :this.optionsFiltrate(); break; 
            case 'cancel' : this.optionsCancel(); break;
        }
    },
    //  筛选方法
    optionsFiltrate(){
        let data = {
            keyword : this.crux
        }
        
        this.$http({
            method: 'post',
            url: this.urlPort[2],
            data: Qs.stringify(data)
        })
        .then(function (res) {
            // 这里返回 一条 {}
            this.tableData = [];    // 清除 tableData
            this.tableData = res.data;
            this.goPage(1,8)
        }.bind(this))
    },
    // 取消方法
    optionsCancel(){
        this.crux = '';
        this.getList();

        
    }



},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

    this.tbTaskH = this.$refs.tables.$el.clientHeight;

    this.getList();


    

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
            height: 60px;
            border-bottom: 1px solid #dddddd;
            display: flex;
            flex-direction: row;
            align-items: center;
            .textTime{
                margin: 0 18px;
                font-weight: 550;
            }
            .optionsBtn{
                box-shadow: 0 .03rem .07rem 0 rgba(8, 34, 120, 0.35);
                cursor: pointer;
                width: 80px;
                height: 32px;
                display: flex;
                align-items: center;
                margin-left:41px;
                background: #61baef;
                border-radius: 18px;
                color: #ffffff;
                i{
                    font-size: 12px;
                    margin: 0 8% 0 12%; 
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
                    box-shadow: 0 .03rem .07rem 0 rgba(8, 34, 120, 0.35);
                    // margin-right:41px;
                    // height: 100%;
                    cursor: pointer;
                    width: 125px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    margin-right:41px;
                    background: #61baef;
                    border-radius: 18px;
                    color: #ffffff;
                    i{
                        font-size: 12px;
                        margin: 0 10% 0 15%; 
                    }
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
                        cursor: pointer;
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
                        cursor: pointer;
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