<!--  -->
<template>
<div class='pagesWrap'>
    <!--        面包屑-->
    <div class="breadWrap" >
        <p class="nowPosition"></p>
        <breadcrumb class="bread" :breadcrumb="breadcrumb"></breadcrumb>
    </div>

    <div class="mainBody">
        <div class="mainBody_title">
            <span>太原市{{dateArr.yyyy}}年{{dateArr.MM}}月{{dateArr.dd}}日12110短信报警抽取日志表</span>

        </div>

        <div class='mainBody_filtrate'>
            <span>日期:</span>

            <el-input :disabled="true" class="inputs" size=small style="width: 2rem"  v-model="time" ></el-input>
            <!-- <el-date-picker
                class="inputs"
                size=small
                style="width: 2rem"
                v-model="filtrate"
                type="date"
                placeholder="选择日期">
            </el-date-picker> -->
            
            <span>传输总量:</span>
            <el-input :disabled="true" class="inputs" size=small style="width: 2rem"  v-model="number" placeholder="传输总量"></el-input>

            <span>传输次数:</span>
            <el-input :disabled="true" class="inputs" style="width: 2rem" size=small v-model="transmissionCapacity" placeholder="传输次数"></el-input>

            <span>传输设备数:</span>
            <el-input :disabled="true" class="inputs" style="width: 2rem" size=small v-model="ipNumber" placeholder="传输设备数"></el-input>

        </div>

        <div class='mainBody_list'>
            <ul>
                <li v-for="(item,index) in tablePaging" :key="index">
                    <span class='spanCommon  mainBodyList_time'>{{item.time}}</span>
                    <span class='spanCommon  mainBodyList_pic' v-if='index%2'><img src='../../../public/static/images/detail/list1.png'/> </span>
                    <span class='spanCommon  mainBodyList_pic' v-else><img src='../../../public/static/images/detail/list2.png'/> </span>
                    <span class='spanCommon  mainBodyList_address'>{{item.unitName}}</span>
                    <span class='spanCommon  mainBodyList_ipDetail'>IP:{{item.ip}}  </span>
                    <span class='spanCommon  mainBodyList_amount'>传输量：{{item.transmissionCapacity}}</span>

                </li>
            </ul>

        </div>

        <div class='mainBody_pagination'>
            <div class='pagination_center'>
                <span class="spanCommon previous" @click="goPage( currentPage-1,8)"> &lt </span>
                <span class="spanCommon nowPage">{{currentPage}}</span>
                <span class="spanCommon next" @click="goPage( currentPage+1,8)">&gt</span>
                <span class="spanCommon goPage">到第 <input min="1" :max="totalPage" type="number" style="text-align:center "   v-model.number="currentPage">页   </span>
                <span class="spanCommon pageNext" @click="goSpecific">确定</span> 
            </div>
        </div>

        <!-- <Paging :tableData='tableData'></Paging> -->


    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Breadcrumb from '../../components/common/action/Breadcrumb';
import Paging from '../../components/paging';
import {mapGetters,mapMutations} from 'vuex'
import Qs from 'qs'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Breadcrumb,
    Paging
},
data() {
//这里存放数据
return {
    urlPort : [this.apiRoot+'log/findDetails'],
    route:'',
    breadcrumb: {
        search: false,
        searching: '',
    },
    time: "",   //选择日期
    number : '',//传输总量
    transmissionCapacity : '',//传输次数
    ipNumber :'',//传输设备数

    // ----------------------------------------分页数据
    tableData : [],   // 总数
    tablePaging : [],  // 分页数据
    listSum : 0, //总数
    totalPage : 1 ,  //总页数
    currentPage : 1  , //当前页数


    logDetail:[
    ],
    // title 时间
    dateArr : {
        yyyy :'',
        MM:'',
        dd:''
    },




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
    
    getData(){
        let arr = this.time.split('.');
        this.dateArr.yyyy = arr[0];
        this.dateArr.MM = arr[1];
        this.dateArr.dd = arr[2];

        let newTime = this.time.replace(/\./g,'-');
        console.log(newTime);
        let data = {
            xzqh: this.userId,
            time : newTime
        }
        this.$http({
            method: 'post',
            url: this.urlPort[0],
            data: Qs.stringify(data)
        })
        .then(function (res) {
            console.log(res);
            this.tableData =  res.data;

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


    // 初始化数据
    dataInit(){
        this.time = this.$route.query.time;
        this.number = this.$route.query.number;
        this.transmissionCapacity = this.$route.query.transmissionCapacity;
        this.ipNumber = this.$route.query.ipNumber;

        this.getData();

    }


},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.dataInit();

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
        display : flex;
        flex-direction : column;
        overflow-y : auto; 

        .mainBody_title{
            height : 6%;
            display : flex; 
            align-items: center;
            border-bottom: 1px solid #dddddd;
            span{
                text-indent: 25px;
                font-weight: 550;
            }
            
        }
        .mainBody_filtrate{
            height : 9%;
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px solid #dddddd;
            span{
                margin-left : 30px;
            }
            .inputs{
                width: 2rem ; 
                margin-left : 12px ; 
                margin-right : 40px

            }
        }
        .mainBody_list{
            height : 78%;
            border-bottom : 1px solid #cccccc;
            padding: 10px 216px 0 36px;
            
            ul{
                height :100%;
                li {
                    height : 9%;
                    display : flex;
                    .spanCommon{
                        display : flex;
                        align-items : center;
                    }

                    .mainBodyList_time{
                        width : 4%;
                        border-bottom : 1px solid #cccccc;
                    }
                    .mainBodyList_pic{
                        width : 3%;
                        overflow :hidden;
                        img { 
                            // width : 100%;
                            height : 100%;
                        }
                    }
                    .mainBodyList_address{
                        width : 31%;
                        border-bottom : 1px solid #cccccc;
                    }
                    .mainBodyList_ipDetail{
                        width : 30%;
                        border-bottom : 1px solid #cccccc;
                    }
                    .mainBodyList_amount{
                        flex : 1;
                        border-bottom : 1px solid #cccccc;
                    }


                   
                }
                
            }
        }
        .mainBody_pagination{
            height : 6.9%;
            display : flex;
            justify-content: center;
            align-items: center;
            
            .pagination_center{
                width : 20%;
                height: 60%;
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

        }

    }

}

</style>