<!--  -->
<template>
    <div class="pageBox">
        <div class="btn_wrap">
            <div class="filtrate_btn" @click="flag">组织架构筛选</div>
        </div>
        <div id='committee'>
            <div class="my-container">
                <analysis :sex-data="sexData"
                          :age-data="ageData"
                          :duty-age-data="dutyAgeData"
                          :job-level-data="jobLevelData"
                          :edu-data="eduData"
                          ref="echarts">
                </analysis>
            </div>
        </div>
        <Footer></Footer>


    <!-- 组织结构树 -->
    <transition name="slide-fade">
        <keep-alive>
            <textureTree class="textureTree" v-if="showTree"  @closeTree='closeTree' @getTree='getTree'></textureTree>
            
        </keep-alive>
    </transition>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import analysis from '../../components/common/analysis/Analysis'
import Footer from "../../components/common/layout/Footer";
import textureTree from '../../components/common/filtrate/textureTree';
export default {
//import引入的组件需要注入到对象中才能使用
    components: {
        analysis,
        Footer,
        textureTree,
    },
    data() {
//这里存放数据
        return {
            InitUrl:this.apiRoot+'jianliA01/ZFWdataAnalysis',  //初始化数据
            InitQTUrl:this.apiRoot+'jianliA01/QTdataAnalysis',  //初始化数据

            treeUrl : this.apiRoot + 'jianliA01/screenDataAnalysis' ,// 提交tree 筛选



            showTree :false,


            sexData: {
                '太原市': {
                    "ZHENG": {
                        'MAN': 0,
                        'WOMAN': 0
                    }
                },
            },
            ageData: {
                '太原市': {
                    "ZHENG": {
                        'THIRTYDOWN': 0,
                        'FORTY': 0,
                        'FIFTY': 0,
                        'SIXTY': 0,
                        'SIXTYUP': 0
                    }
                }
            },
            dutyAgeData: {
                '太原市': {
                    "ZHENG": {
                        'TWODOWN': 0,
                        'FIVE':0,
                        'TEN': 0,
                        'TENUP': 0
                    }
                }
            },
            jobLevelData: {
                '太原市': {
                    "ZHENG": {
                        'MAN': {
                            'FUTING': 0,
                            'ZHENGCHU': 0,
                            'FUCHU': 0,
                            'ZHENGKE': 0,
                            'FUKE': 0,
                            'OTHER': 0
                        },
                        'WOMAN': {
                            'FUTING': 0,
                            'ZHENGCHU': 0,
                            'FUCHU': 0,
                            'ZHENGKE': 0,
                            'FUKE': 0,
                            'OTHER': 0
                        }
                    }
                }
            },
            eduData:{
                '太原市':{
                    "ZHENG": {
                        'BENKE': 0,
                        'YANJIUSHENG': 0,
                        'TOTAL':0
                    }
                }
            }
        };
    },
    props: ['analysis'],
//监听属性 类似于data概念
    computed:
        {}
    ,
    //监控data中的数据变化
    watch: {}
    ,
    //方法集合
    methods: {
        //1男，2女
        getData() {
            

            this.$http({
                method: 'post',
                url: this.InitUrl,
                headers: {'ConTENt-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                transformRequest: [function (data) {
                    // Do whatever you want to transform the data
                    let ret = '';
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                crossDomain: true,
                data: {}
            }).then(function (res) {
                // console.log(res);
                this.dispose(res);
            }.bind(this)).catch(function (error) {
                console.log(error);
            })
        },
        // 处理respose 数据
        dispose(res){
            if (res.status === 200) {
                this.sexData.太原市.ZHENG={
                    'MAN':res.data.sexRatio1,
                    'WOMAN':res.data.sexRatio2
                };
                this.ageData.太原市.ZHENG={
                    'THIRTYDOWN':res.data['30'],
                    'FORTY':res.data['40'],
                    'FIFTY':res.data['50'],
                    'SIXTY':res.data['59'],
                    'SIXTYUP':res.data['60']
                };
                this.dutyAgeData.太原市.ZHENG={
                    'TWODOWN':res.data.dutyLevelTwo,
                    'FIVE':res.data.dutyLevelFive,
                    'TEN':res.data.dutyLevelNine,
                    'TENUP':res.data.dutyLevelTen
                };
                this.jobLevelData.太原市.ZHENG.MAN = {
                    'FUTING':  res.data['1A22-1'],
                    'ZHENGCHU':  res.data['1A31-1'],
                    'FUCHU':  res.data['1A32-1'],
                    'ZHENGKE':  res.data['1A41-1'],
                    'FUKE':  res.data['1A42-1'],
                    'OTHER':  res.data['KY1']
                };
                this.jobLevelData.太原市.ZHENG.WOMAN = {
                    'FUTING':  res.data['1A22-2'],
                    'ZHENGCHU':  res.data['1A31-2'],
                    'FUCHU':  res.data['1A32-2'],
                    'ZHENGKE':  res.data['1A41-2'],
                    'FUKE':  res.data['1A42-2'],
                    'OTHER':  res.data['KY2']
                };
                this.eduData.太原市.ZHENG={
                    'BENKE': res.data.University,
                    'YANJIUSHENG': res.data.postgraduate,
                    'TOTAL':res.data.total
                };
                this.$refs.echarts.render();
            } else {
                console.log(res.msg);
            }
        },
        // 关闭树
        closeTree(){
            this.Banned = false;
            this.showTree = false;
        },
            // tree 结构数据
        getTree(v){
            console.log(v.tree);
            console.log('getTree')
            this.$http.get(this.treeUrl,{
                params : {
                    UID : v.tree
                }
            })
            .then(function (response) { 
                // console.log(response);
                this.dispose(response)
                
            }.bind(this))

        },
        flag(){
            this.showTree = ! this.showTree;
        },

    }
    ,
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    }
    ,
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getData();
        // this.$refs.echarts.render();
    }
    ,
    beforeCreate() {
    }
    , //生命周期 - 创建之前
    beforeMount() {
    }
    , //生命周期 - 挂载之前
    beforeUpdate() {
    }
    , //生命周期 - 更新之前
    updated() {
    }
    , //生命周期 - 更新之后
    beforeDestroy() {
    }
    , //生命周期 - 销毁之前
    destroyed() {
    }
    , //生命周期 - 销毁完成
    activated() {
    }
    , //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
    //@import url(); 引入公共css类
    .pageBox{
        position: relative;
        .btn_wrap{
                width: 1.3rem;
                text-align: center;
                position: fixed;
                color: #fff;
                background-image: linear-gradient(0deg, #e5322a 0%, #e84b44 26%, #eb635d 52%, #e5322a 100%), linear-gradient(0deg, #170209 0%, #ebf1ef 100%);
                z-index: 999;
                height: .36rem;
                line-height: .39rem;
                border-radius: 4px;
                right:2.8%;
                top: 8%;
                opacity: .8;
                cursor: pointer; 
        }
    }
    
    
    #committee {
        width: 100%;
        background-color: #fff;
        opacity: 0.8;
        padding: 0.33rem 0;
        min-width: 12rem;
        .my-container {
            width: 97.83%;
            background-color: transparent;
            margin: 0 auto;
        }
    }
    .textureTree{
        position: fixed;
        height: 100%;
        width: 30%;
        // top: 2.5%;
    }
    
</style>