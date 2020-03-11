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
            
            <span class="textTime">访问时间</span>
             <el-date-picker
                size=small
                v-model="filtrate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>


            <div class="optionsBtn"  @click="topOptions('submit')">
                <i class="iconfont iconseach"></i>
                <span>筛选</span>
                
            </div>

            <!-- <el-button type="primary" round ><i class="iconfont iconseach"></i> 主要按钮</el-button> -->



            <div class="optionsBtn" @click="topOptions('cancel')">
                <i class="iconfont iconcancel"></i>
                <span>取消</span>
            </div>


        </div>
        <div class="mainBodyContext">
            <div   class="mainBodyContext_tableWrap" >
                <tableList ref='tables' :tbTaskH=tbTaskH  class="tablesList" :tableData = tablePaging :type=listType></tableList>
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
            
        </div>

    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Breadcrumb from '../../components/common/action/Breadcrumb';
import tableList from '../../components/tableList'
import Qs from 'qs'
import {mapGetters,mapMutations} from 'vuex'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Breadcrumb,
    tableList,
},
data() {
//这里存放数据
return {
    urlPort : [ this.apiRoot+'log/findLogList',this.apiRoot+'log/findLogTime'],
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

    // ----------------------------------------table 
    tbTaskH : '' ,   // table 的高度
    listType : 1, //  table 类型



};
},
//监听属性 类似于data概念
computed: {
    ...mapGetters(['userId'])
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 获取 全部 列表数据
    getList(){
        let data = {
        xzqh: this.userId
            }
        
        this.$http({
            method: 'post',
            url: this.urlPort[0],
            data: Qs.stringify(data)
        })
        .then(function(res){
            this.tableData  = res.data;
            // number   传输总量 // ipNumber     设备数// transmissionCapacity  传输总量  // time    日期
            
            this.goPage(1,8)
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
            xzqh: this.userId,
            time : this.filtrate
        }
        
        this.$http({
            method: 'post',
            url: this.urlPort[1],
            data: Qs.stringify(data)
        })
        .then(function (res) {
            // 这里返回 一条 {}
            this.tableData = [];    // 清除 tableData
            this.tableData.push(res.data);
            this.goPage(1,8)
        }.bind(this))
    },
    // 取消方法
    optionsCancel(){
        this.filtrate = '';
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
            // height: 7%;
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
                span{
                    letter-spacing: 2px;
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
                        cursor: pointer;

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
                        cursor: pointer;
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