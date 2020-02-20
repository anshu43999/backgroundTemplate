<!--  -->
<template>
<div class='' style="height:100%;  ;position: relative;overflow:hidden">


    <!--        面包屑-->
    <div style="height: 0.34rem">
        <breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></breadcrumb>
    </div>


    
    <!-- 精确查询 -->
    <query @query_submit='query_submit' @Boxchange='Boxchange'></query>

    <!-- 列表 -->
    <TableList :tableData='tableData' :paging="paging" @printExcel='printExcel'  @goPages='goPages'  @previous='previous' @next='next'  :loading='loading' :show='show' @OpenInfo='OpenInfo'    @Boxchange='Boxchange'></TableList>
    

    <!-- 筛选框 -->
    <transition name="slide-fade">
        <keep-alive>
            <FilterBox v-if="show" :loading='loading' @StartLoading='StartLoading'   @closeBox='closeBox'   @fol_submit='fol_submit'></FilterBox>
        </keep-alive>
    </transition>
    <!-- 组织结构树 -->
    <transition name="slide-fade">
        <keep-alive>
            <textureTree v-if="showTree"  @closeTree='closeTree' @getTree='getTree'></textureTree>
            
        </keep-alive>
    </transition>
    


    <!-- 详细资料 -->
    <infoDetails v-if="info_show"  :DetailData='DetailData' @info_header_close="info_header_close"></infoDetails>
    
    
    
    <!-- <Footer></Footer> -->

    




</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Breadcrumb from '../../components/common/action/Breadcrumb';
import query from '../../components/common/filtrate/query';
import TableList from '../../components/common/action/tablelist';
import FilterBox from '../../components/common/filtrate/FilterBox';
import infoDetails from '../../components/common/filtrate/infoDetails';
import textureTree from '../../components/common/filtrate/textureTree';
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Breadcrumb,
    query,
    TableList,
    FilterBox,
    infoDetails,
    textureTree,
},
data() {
//这里存放数据
return {
    NowUrl : '', // 当前  下一页 url
    queryUrl : this.apiRoot +'jianliA01/selectQTNameAndCardList',  // 精确查询
    AllUrl : this.apiRoot + 'jianliA01/selectQTAllList' , //all
    FilterUrl : this.apiRoot + 'jianliA01/screenQTList', //筛选框
    treeUrl : this.apiRoot + 'jianliA01/findUidAllList' ,// 提交tree 筛选
    DetailsUrl : this.apiRoot +'jianliA01/findNameAndCard',   //任免表
    breadcrumb: {
        search: false,
        searching: '',
    },
    show: false,   //弹出筛选框
    showTree : false, //弹出tree
    info_show:false,    // 详细资料
    loading: false,  //table 数据加载loading
    Banned:false,  //禁止点击

    listType : 0 , //  list 查询类型
    
    AllInfo : {}, //all详细数据
    queryInfo :{} ,//query详细数据
    submitInfo :{}, //筛选详细数据
    treeInfo : {}, //树状结构数据                
    tableData: [],

    // 分页
    paging:{
        pages : 1 ,//页数
        Nums : 9 , //条数
        NowPage:1, //当前页数
        total :0  //总数
    },

    //任免表数据
    DetailData:'',

    // // 打印列表数据
    // ExcelList:'',


    

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 面包屑
    searchingfor(searching, page) {
        page ? page : 1;
        this.searchText = searching;
        console.log(this.searchText);
        var params = {};
        params.phoneNumberOralarmNumber = this.searchText;
        params.ruKuSampleState = 2
        params.fenxiaoyangSampleState = 3
        params.rank = 'sampleNum'
    },

    // 筛选界面
    Boxchange(v){
        // console.log('suaixuan')
        if(this.Banned) return;
        if(v === 'show'){
            this.Banned = true;
            this.show = ! this.show;
        }else{
            this.Banned = true;
            this.showTree = !this.showTree;
        }
    },
    // 关闭box
    closeBox(v){
        this.Banned = false;
        this.show = false;

    },
    // 关闭树
    closeTree(){
        this.Banned = false;
        this.showTree = false;
    },
    // 关闭  info
    info_header_close(){
        this.info_show = false;
        this.Banned = false;
    },
    // 打开 info 
    OpenInfo(v){
        if(this.Banned) return;
        this.$http({
            method: 'post',
            url: this.DetailsUrl,
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = '';
                for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded','crossDomain': true},
            // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
            crossDomain: true,
            data: {
                Aid :v.aid
            }
        }).then(function (response) {
            // console.log(response);
            this.DetailData ='';
            this.DetailData = response['data'][0];
            this.info_show = true;
            this.Banned = true;

            
        }.bind(this)).catch(function (error) {
            console.log(error);
        });
    },
    // 筛选提交数据
    fol_submit(v){
        console.log(v);
        // return;
        if(typeof(v) =='number'){
            this.paging.NowPage =v;
        }
        // list 类型改变
        this.listType = 3;

        // 判断是否为第一次
        if(typeof(v) == 'object'){
            this.submitInfo['sexValue']   = v.sexValue,  //性别
            this.submitInfo['age_highest']   = v.age_highest,   //最高年龄
            this.submitInfo['age_lowest']   = v.age_lowest,   //最低年龄
            this.submitInfo['nationValue']   = v.nationValue,   //民族
            this.submitInfo['place']  =v.place, // 籍贯
            this.submitInfo['educationBg_one']  = v.educationBg_one , // 第一学历
            this.submitInfo['educationBg_two']  = v.educationBg_two , // 第二学历
            this.submitInfo['department']  =v.department, // 所属部门
            this.submitInfo['duty']  = v.duty, // 职务
            this.submitInfo['CurrentLevel']  = v.CurrentLevel, // 现职级
            this.submitInfo['Joblevel']  = v.Joblevel, // 职务层次
            this.submitInfo['personnel']  = v.personnel, // 人员类别
            this.submitInfo['manage']  = v.manage, // 管理类别
            this.submitInfo['Compile']   = v.Compile, // 编制类型
            this.submitInfo['NewJoblevel']   = v.NewJoblevel, // 任现职层次时间
            this.submitInfo['employTime']   = v.employTime, // 录用时间
            this.submitInfo['joinTime']  = v.joinTime, // 入党时间
            this.submitInfo['transferring']   = v.transferring, // 是否为选调生
            this.submitInfo['rewardPunishment']  = v.rewardPunishment,   //奖惩情况 
            this.submitInfo['yearResult']  = v.yearResult ,  //年度考核结果 
            this.submitInfo['NowPage']  = 1,
            this.submitInfo['Nums']  = 9,
            // 初始pages
            this.paging = {
                pages : 1 ,//页数
                Nums : 9 , //条数
                NowPage:1, //当前页数
            }
        }

        this.$http({
        method: 'post',
            url: this.FilterUrl,
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = '';
                for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded','crossDomain': true},
            withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
            crossDomain: true,
            data: {
                NowPage:this.paging.NowPage,      
                Nums:this.paging.Nums,

                sexValue : this.submitInfo['sexValue'] ,  //性别
                age_highest : this.submitInfo['age_highest'],   //最高年龄
                age_lowest : this.submitInfo['age_lowest'] ,   //最低年龄
                nationValue :this.submitInfo['nationValue'] ,   //民族
                place: this.submitInfo['place'] , // 籍贯
                educationBg_one :  this.submitInfo['educationBg_one'] , // 第一学历
                educationBg_two: this.submitInfo['educationBg_two'] , // 第二学历
                department: this.submitInfo['department'] , // 所属部门
                duty: this.submitInfo['duty'] , // 职务
                CurrentLevel: this.submitInfo['CurrentLevel'] , // 现职级
                Joblevel: this.submitInfo['Joblevel'] , // 职务层次
                personnel: this.submitInfo['personnel']  , // 人员类别
                manage: this.submitInfo['manage'] , // 管理类别
                Compile: this.submitInfo['Compile']   , // 编制类型
                NewJoblevel:this.submitInfo['NewJoblevel'] , // 任现职层次时间
                employTime: this.submitInfo['employTime'] , // 录用时间
                joinTime: this.submitInfo['joinTime'] , // 入党时间
                transferring:  this.submitInfo['transferring'] , // 是否为选调生
                rewardPunishment :this.submitInfo['rewardPunishment'],   //奖惩情况 
                yearResult : this.submitInfo['yearResult'], //年度考核结果 
                card : 'gaj',  //类别 

                

            }
        }).then(function (response) {
            console.log(response);
            let pages = parseInt((response['data']['total'])/9);
            this.paging.pages = pages +1;
            this.paging.total = response['data']['total']
            this.tableData = response['data']['rows'];
            
            
        }.bind(this)).catch(function (error) {
            console.log(error);
        });




    },
    // 查询提交数据
    query_submit(v){
        console.log(typeof(v));
        if(typeof(v) =='number'){
            this.paging.NowPage =v;

        }
        // list 类型改变
        this.listType = 2;

        // 判断是否为第一次
        if(typeof(v) == 'object'){
            this.queryInfo['idCard'] = v.idCard;
            this.queryInfo['name'] = v.name;

            // 初始pages
            this.paging = {
                pages : 1 ,//页数
                Nums : 9 , //条数
                NowPage:1, //当前页数
            }
        }
        // url 改变
        // this.NowUrl =  this.queryUrl;
        this.$http.get(this.queryUrl,{
            params:{
                idCard: this.queryInfo['idCard'],
                name: this.queryInfo['name'],
                NowPage:this.paging.NowPage,      
                Nums:this.paging.Nums,     
            }
        })
        .then(function (response) {
            console.log(response);
            let pages = parseInt((response['data']['total'])/9);
            this.paging.pages = pages +1;
            this.paging.total = response['data']['total']
            

            this.tableData = response['data']['rows'];
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });

    },
    // 加载loading ui
    StartLoading(v){
        if(v){
            this.loading = true;
        }else{
            this.loading = false;
        }
    },
    // tree 结构数据
    getTree(v){
        console.log(v);
        let that = this;
        if(typeof(v) =='number'){
            this.paging.NowPage =v;
        }
        // list 类型改变
        this.listType = 4;

        // 判断是否为第一次
        if(typeof(v) == 'object'){
            this.treeInfo['uid'] = v.tree;
            // this.queryInfo['name'] = v.name;
            // 初始pages
            this.paging = {
                pages : 1 ,//页数
                Nums : 9 , //条数
                NowPage:1, //当前页数
            }
        }
        this.$http.get(this.treeUrl,{
            params : {
                Nums : this.paging.Nums,
                NowPage :this.paging.NowPage,
                UID : this.treeInfo['uid']
            }
        })
        .then(function (response) { 
            console.log(response);
            let pages = parseInt((response['data']['total'])/9);
            console.log(response['data']['total']%9);
            if(response['data']['total']%9){
                this.paging.pages = pages +1;
            }else{
                this.paging.pages = pages
            }
            this.paging.total = response['data']['total']
            this.tableData = response['data']['rows'];
         }.bind(this))

    },
    //初始化数据
    tableListInit(v){
        if(typeof(v) =='number'){
            this.paging.NowPage =v;

        }


        this.listType = 1;
        // url 改变
        // this.NowUrl =  this.AllUrl;
        
        this.$http.get(this.AllUrl,{
            params:{
                NowPage:this.paging.NowPage,      
                Nums:this.paging.Nums,
                card : 'gaj',  //类别 
                    
            }
        })
        .then(function (response) {
            console.log(response['data']['total']);
             let pages = parseInt((response['data']['total'])/9);
            // console.log( pages)

            this.paging.pages = pages +1;
            this.paging.total = response['data']['total']
            this.tableData = response['data']['rows'];
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
    },

    

    //上一页
    previous(){
        this.paging.NowPage--;
        if(this.listType === 2){
            this.query_submit();
        }else if(this.listType === 1){
            this.tableListInit();
        }else if(this.listType === 3){
            this.fol_submit();
        }else if(this.listType === 4){
            this.getTree();
        }

    },
    // 下一页
    next(){
        this.paging.NowPage++;
        if(this.listType === 2){
            this.query_submit();
        }else if(this.listType === 1){
            this.tableListInit();
        }else if(this.listType === 3){
            this.fol_submit();
        }else if(this.listType === 4){
            this.getTree();
        }
    },
    // 跳转第几页
    goPages(v){
        console.log(v);
        if(this.listType === 2){
            this.query_submit(v);
        }else if(this.listType === 1){
            this.tableListInit(v);
        }else if(this.listType === 3){
            this.fol_submit(v)
        }else if(this.listType === 4){
            this.getTree(v);
        }

    },
    // 打印Excel
    printExcel(v){
        // console.log(v);
        this.ExcelList = v;
        this.$router.push({path:'/filtrate/printTable',query:{ info : JSON.stringify(v)   }})


    }
    
    


},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.tableListInit();
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

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>