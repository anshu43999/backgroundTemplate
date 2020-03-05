<!--  -->
<template>
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
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
props : ['tableData'],
components: {},
data() {
//这里存放数据
return {
    // ----------------------------------------分页数据
    // tableData : [],   // 总数
    tablePaging : [],  // 分页数据
    listSum : 0, //总数
    totalPage : 1 ,  //总页数
    currentPage : 1  , //当前页数

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 分页
    goPage(nowPage,pageSize,value){
        console.log('分页方法开始执行')
        console.log(this.tableData);

        if(this.tableData.length === 1 ){
            this.listSum = 1; 
            this.totalPage = 1;
            this.currentPage = 1;
            this.tablePaging = this.tableData ;
            return this.tablePaging;
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
        return this.tablePaging;
    },
    // 特殊页跳转
    goSpecific(){
        this.goPage(this.currentPage,8);
    },


},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    
    if(this.tableData !== []){
// this.goPage();
    // console.log(this.tableData);
    }


},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
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
</style>