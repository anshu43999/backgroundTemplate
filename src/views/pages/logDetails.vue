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
            <span>太原市2020年8月1日12110短信报警抽取日志表</span>

        </div>

        <div class='mainBody_filtrate'>
            <span>日期:</span>
            <el-date-picker
                class="inputs"
                size=small
                style="width: 2rem"
                v-model="filtrate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            
            <span>传输总量:</span>
            <el-input class="inputs" size=small  v-model="gross" placeholder="传输总量"></el-input>

            <span>传输次数:</span>
            <el-input class="inputs" style="width: 2rem" size=small v-model="transmitNumber" placeholder="传输次数"></el-input>

            <span>传输设备数:</span>
            <el-input class="inputs" style="width: 2rem" size=small v-model="deviceNumber" placeholder="传输设备数"></el-input>

        </div>

        <div class='mainBody_list'>
            <ul>
                <li v-for="(item,index) in logDetail" :key="index">
                    <span class='spanCommon  mainBodyList_time'>{{item.time}}</span>
                    <span class='spanCommon  mainBodyList_pic' v-if='index%2'><img src='../../../public/static/images/detail/list1.png'/> </span>
                    <span class='spanCommon  mainBodyList_pic' v-else><img src='../../../public/static/images/detail/list2.png'/> </span>
                    <span class='spanCommon  mainBodyList_address'>{{item.address}}</span>
                    <span class='spanCommon  mainBodyList_ipDetail'>IP:{{item.ipDetail}}  </span>
                    <span class='spanCommon  mainBodyList_amount'>传输量：{{item.gross}}</span>

                </li>
            </ul>

        </div>

        <div class='mainBody_pagination'>
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
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Breadcrumb from '../../components/common/action/Breadcrumb';

export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Breadcrumb,
},
data() {
//这里存放数据
return {
    route:'',
    breadcrumb: {
        search: false,
        searching: '',
    },
    filtrate: "",
    gross : '',
    transmitNumber : '',
    deviceNumber :'',
    logDetail:[
        {time : '08:00',address : '太原市110情报指挥中心',ipDetail : '192.168.192',gross : '1000'},
        {time : '08:00',address : '太原市110情报指挥中心',ipDetail : '192.168.192',gross : '1000'},
        {time : '08:00',address : '太原市110情报指挥中心',ipDetail : '192.168.192',gross : '1000'},
        {time : '08:00',address : '太原市110情报指挥中心',ipDetail : '192.168.192',gross : '1000'},
        {time : '08:00',address : '太原市110情报指挥中心',ipDetail : '192.168.192',gross : '1000'},
        {time : '08:00',address : '太原市110情报指挥中心',ipDetail : '192.168.192',gross : '1000'},
        {time : '08:00',address : '太原市110情报指挥中心',ipDetail : '192.168.192',gross : '1000'},
        {time : '08:00',address : '太原市110情报指挥中心',ipDetail : '192.168.192',gross : '1000'},
        {time : '08:00',address : '太原市110情报指挥中心',ipDetail : '192.168.192',gross : '1000'},
        {time : '08:00',address : '太原市110情报指挥中心',ipDetail : '192.168.192',gross : '1000'},


    ]



};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
                    width: 25%;
                    margin: 0 2%;
                    border: 1px solid #cccccc;
                    input{
                        width : 20%;
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