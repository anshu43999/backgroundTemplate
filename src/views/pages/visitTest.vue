<!--  -->
<template>
<div class='pagesWrap'>
    <!--        面包屑-->
    <div class="breadWrap" >
        <p class="nowPosition"></p>
        <breadcrumb class="bread" :breadcrumb="breadcrumb"></breadcrumb>
    </div>
    <div class="mainBody">
        <div class="mainBodyTop">
            <div class="mainBodyTopLeft">测试说明</div>
            <div class="mainBodyTopRight">
                <p>访问测试旨在检测接口系统与三台合一之间是否能够正常传输数据。点击"访问测试”按钮开始测试。</p>
                <p>注：测试完毕后将显示测试结果，测试结果显示前请勿多次点击测试按钮。"</p>
            </div>
        </div>
        <div class="mainBodyMiddle">
            <div class="testsBtn" @click="sendTest">   
                <i class="iconfont iconceshijingli- "></i>
                <span>访问测试</span> 
            </div>
        </div>
        <div class="mainBodyBottom">
            <div class="mainBodyBottomLeft">测试记录 </div>
            <div class="mainBodyBottomRight">
                <div class="record">
                    <ul>
                        <li v-for="(item,index) in testRecord" :key="index">
                            <span class="spanOne">{{item.createTime}}--{{item.state}} </span>
                            <span class="spanTwo">访问测试... </span>
                            <span class="sapnThree success" v-if="item.result ==='200'" > <i class="iconfont iconchenggong "></i> 测试成功</span>
                            <span class="sapnThree failed" v-if="item.result === '400'" > <i class="iconfont iconanzhuangshibai "></i> 测试失败</span>
                        </li>
                    </ul>
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
import Qs from 'qs';
import {mapGetters,mapMutations} from 'vuex'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Breadcrumb,
},
data() {
//这里存放数据
return {
    urlPort : [this.apiRoot+'accessTest/test',this.apiRoot+'accessTest/findTestList'],
    route:'',
    breadcrumb: {
        search: false,
        searching: '',
    },
    testRecord : [        
    ]

};
},
//监听属性 类似于data概念
computed: {
    ...mapGetters(['userId','permissions','userName'])
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    initData(){
        let data = {
        xzqh: this.userId
        }
        this.$http({
            method: 'post',
            url: this.urlPort[1],
            data: Qs.stringify(data)
        })
        .then(function(res){
            console.log(res); 
            this.testRecord = res.data
        }.bind(this))
    },
    sendTest(){
        let data = {
        xzqh: this.userId,
        unitName :this.userName,
        code : this.permissions,
        }
        this.$http({
            method: 'post',
            url: this.urlPort[0],
            data: Qs.stringify(data)
        })
        .then(function(res){
            console.log(res); 
            if(res.data.success){
                this.$notify({
                    title: '成功',
                    message: res.data.code ? res.data.code : '成功',
                    type: 'success',
                });
            }else{
                this.$notify.error({
                    title: '错误',
                    message:  res.data.code ? res.data.code : '网络错误',
                    type: 'success'
                });
            }
            this.initData();
        }.bind(this))
    }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.initData();

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
        display: flex;
        flex-direction:column; 
        .mainBodyTop{
            height: 16%;
            padding: 10px 18px;
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #cccccc;
            .mainBodyTopLeft{
                width: 6%;
                height: 100%;
                
            }
            .mainBodyTopRight{
                flex: 1;
                height: 100%;
                border: 1px solid #cccccc;
                padding: 8px 18px;
                // line-height: 28px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: left;
                p{
                    text-align: left;
                }
            }

        }
        .mainBodyMiddle{
            height: 10%;
            border-bottom: 1px solid #cccccc;
            display: flex;
            align-items: center;
            // justify-content: center;
            .testsBtn{
                cursor: pointer;
                margin-left:49px;
                width: 10%;
                height: 60%;
                line-height: 48px;
                border-radius: 24px;
                background: #61baef;
                color: #ffffff;
                display: flex;
                flex-direction: row;
                align-items: center;
            
                i{
                    width: 15%;
                    margin: 0 12% ;
                    font-size: 24px;
                }
                span{
                    width: 55%;
                    font-size: 14px;
                }


            }
            

        }
        .mainBodyBottom{
            flex: 1;

            padding: 18px 18px;
            display: flex;
            flex-direction: row;
            .mainBodyBottomLeft{
                width: 6%;
                height: 100%;
            }
            .mainBodyBottomRight{
                flex: 1;
                height: 100%;
                position: relative;
                border: 1px solid #cccccc;
                overflow: hidden;
                overflow-y: auto;
                .record{
                    position: absolute;
                    width: 90%;
                    margin: 10px 5%;
                    ul{
                        li{
                            height: 56px;
                            line-height: 55px;
                            display: flex;
                            flex-direction: row;
                            .success{
                                color:  #73d0cb
                            }
                            .failed{
                                color: #e24a1b
                            }
                            .spanOne{
                                width: 16%;
                            }
                            .spanTwo{
                                width: 25%;
                            }
                            .sapnThree{
                                flex: 1;
                            }
                            
                         
                        }
                    }
                }
            }
        }
    }

}

</style>