<!--  -->
<template>
    <div class="pageBox">
        <div class="btn_wrap">
            <div class="filtrate_btn" @click="flag">组织架构筛选</div>
        </div>
        <div id='court'>
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
                InitUrl:this.apiRoot+'jianliA01/dataAnalysis',  //初始化数据
                InitQTUrl:this.apiRoot+'jianliA01/QTdataAnalysis',  //初始化数据
                treeUrl : this.apiRoot + 'jianliA01/screenDataAnalysis' ,// 提交tree 筛选
                showTree :false,
                sexData: {
                    '太原市':{
                        "FA": {
                            'MAN': 0,
                            'WOMAN': 0
                        },
                    },
                },
                ageData:{
                    '太原市':{
                        "FA": {
                            'THIRTYDOWN': 0,
                            'FORTY': 0,
                            'FIFTY': 0,
                            'SIXTY': 0,
                            'SIXTYUP': 0
                        },
                    }
                },
                dutyAgeData:{
                    '太原市':{
                        "FA": {
                            'TWODOWN': 0,
                            'FIVE':0,
                            'TEN': 0,
                            'TENUP': 0
                        },
                    }
                },
                jobLevelData:{
                    '太原市':{
                        "FA": {
                            'MAN':{
                                'FUTING':0,
                                'ZHENGCHU':0,
                                'FUCHU':0,
                                'ZHENGKE':0,
                                'FUKE':0,
                                'OTHER':0
                            },
                            'WOMAN':{
                                'FUTING':0,
                                'ZHENGCHU':0,
                                'FUCHU':0,
                                'ZHENGKE':0,
                                'FUKE':0,
                                'OTHER':0
                            }
                        }
                    }
                },
                eduData:{
                    '太原市':{
                        "FA": {
                            'BENKE': 0,
                            'YANJIUSHENG': 0,
                            'TOTAL':0
                        }
                    }
                },
                
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
            getData() {
                let type = this.$route.path;
                let jieKou ;
                console.log(type);
                let params = '';
                switch (type) {
                    case '/index/analysis/Committee':
                        params = ''
                        jieKou = this.InitUrl;
                        break;
                    case '/index/analysis/publicSecurity':
                        params = 'gaj';
                        jieKou = this.InitQTUrl;
                        break;
                    case '/index/analysis/procuratorate':
                        params = 'jcy';
                        jieKou = this.InitQTUrl;
                        break;    
                    case '/index/analysis/court':
                        params = 'fy';
                        jieKou = this.InitQTUrl;
                        break;
                    case '/index/analysis/justiceBureau':
                        params = 'sfj';
                        jieKou = this.InitQTUrl;
                        break;
                    default:
                        break;
                }


                this.$http.get(jieKou,{
                    params : {
                        card : params
                    }
                })
                .then(function (res) {
                    this.dispose(res);
                    
                }.bind(this)).catch(function (error) {
                    console.log(error);
                })
            },
            dispose(res){
                if (res.status === 200) {
                    this.sexData.太原市.FA.MAN = res.data.sexRatio1;
                    this.sexData.太原市.FA.WOMAN = res.data.sexRatio2;
                    this.ageData.太原市.FA.THIRTYDOWN = res.data['30'];
                    this.ageData.太原市.FA.FORTY = res.data['40'];
                    this.ageData.太原市.FA.FIFTY = res.data['50'];
                    this.ageData.太原市.FA.SIXTY = res.data['59'];
                    this.ageData.太原市.FA.SIXTYUP = res.data['60'];
                    this.dutyAgeData.太原市.FA.TWODOWN = res.data.dutyLevelTwo;
                    this.dutyAgeData.太原市.FA.FIVE = res.data.dutyLevelFive ;
                    this.dutyAgeData.太原市.FA.TEN = res.data.dutyLevelNine;
                    this.dutyAgeData.太原市.FA.TENUP = res.data.dutyLevelTen;

                    this.eduData.太原市.FA.BENKE =res.data.University;
                    this.eduData.太原市.FA.YANJIUSHENG =res.data.postgraduate;
                    this.eduData.太原市.FA.TOTAL =res.data.total;


                    this.jobLevelData.太原市.FA.MAN = {
                        'FUTING':  res.data['1A22-1'],
                        'ZHENGCHU':  res.data['1A31-1'],
                        'FUCHU':  res.data['1A32-1'],
                        'ZHENGKE':  res.data['1A41-1'],
                        'FUKE':  res.data['1A42-1'],
                        'OTHER':  res.data['KY1']
                    };
                    this.jobLevelData.太原市.FA.WOMAN = {
                        'FUTING':  res.data['1A22-2'],
                        'ZHENGCHU':  res.data['1A31-2'],
                        'FUCHU':  res.data['1A32-2'],
                        'ZHENGKE':  res.data['1A41-2'],
                        'FUKE':  res.data['1A42-2'],
                        'OTHER':  res.data['KY2']
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
            this.$refs.echarts.render();
            this.getData();
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
    #court {
        width: 100%;
        background-color: #fff;
        opacity: 0.8;
        padding: 0.33rem 0;

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