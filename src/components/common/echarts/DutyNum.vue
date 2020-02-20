<template>
    <div id="dutyNumChart" class="chartBox">
        <div class="echartsTitle">警察、法检各职务层次人数比例</div>
        <!--        切换按钮-->
        <div class="my-switch" @click="select($event)">
            <div class="my-button active">警察</div>
            <div class="my-button">法检</div>
        </div>
        <div id="dutyNum"></div>
    </div>
</template>

<script>
    //引入echarts
    let echarts = require('echarts/lib/echarts');
    // 引入折线图图组件
    require('echarts/lib/chart/line');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    // 引入柱饼图组件
    require("echarts/lib/chart/pie");
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require("echarts/lib/component/legend");
    require("echarts/lib/component/title");
    require("echarts/lib/component/dataZoom");
    require("echarts/lib/component/toolbox");

    export default {
        name: "dutyNum",
        props:['dutyNumData'],
        data(){
            return {
                office:'',
                legend:[]
            }
        },
        methods:{
            dutyNumEchart(dataObj){
                //横轴数据英文
                let xDataArrs=[];
                let yData=[];
                for (let dataObjItem in dataObj){
                    xDataArrs.push(dataObjItem);
                    yData.push(dataObj[dataObjItem]);
                }
                //横轴英转汉
                //横轴数据中文
                let xDataArr=[];
                xDataArrs.forEach((value, index) => {
                    switch (value) {
                        case 'YIZHANG':
                            value = '一级警长';
                            break;
                        case 'ERZHANG':
                            value = '二级警长';
                            break;
                        case 'SANZHANG':
                            value = '三级警长';
                            break;
                        case 'SIZHANG':
                            value = '四级警长';
                            break;
                        case 'YIYUAN':
                            value = '一级警员';
                            break;
                        case 'ERYUAN':
                            value = '二级警员';
                            break;
                        case 'SANYUAN':
                            value = '三级警员';
                            break;
                        case 'SIYUAN':
                            value = '四级警员';
                            break;
                        case 'OTHER':
                            value = '试用期及其他';
                            break;
                        case 'SHOUDA':
                            value = '首级大法检';
                            break;
                        case 'YIDA':
                            value = '一级大法检';
                            break;
                        case 'ERDA':
                            value = '二级大法检';
                            break;
                        case 'YIGAO':
                            value = '一级高级法检';
                            break;
                        case 'ERGAO':
                            value = '二级高级法检';
                            break;
                        case 'SANGAO':
                            value = '三级高级法检';
                            break;
                        case 'SIGAO':
                            value = '四级高级法检';
                            break;
                        case 'YI':
                            value = '一级法检';
                            break;
                        case 'ER':
                            value = '二级法检';
                            break;
                        case 'SAN':
                            value = '三级法检';
                            break;
                        case 'SI':
                            value = '四级法检';
                            break;
                        case 'WU':
                            value = '五级法检';
                            break;
                    }
                    xDataArr.push(value);
                });
                let myChart = echarts.init(document.getElementById('dutyNum'));
                //配置项
                let option={
                    toolbox:{
                        show: true,
                        feature: {
                            //转表格
                            dataView: {readOnly: false},
                            //图表转换
                            magicType: {type: ['line', 'bar']},
                            //刷新
                            restore: {},
                            //保存
                            saveAsImage: {}
                        },
                        //位置
                        right: 0,
                        top: 0,
                        //层级
                        zlevel: 999
                    },
                    tooltip:{},
                    background: '#fff',
                    //x轴
                    xAxis: {
                        //类目轴
                        type: 'category',
                        //x轴数据来源
                        data: xDataArr,
                        //x坐标轴字体设置
                        axisLabel: {
                            show: true,
                            interval: 0,
                            fontSize: 12,
                            textStyle: {
                                color: '#333', //文字颜色
                                lineHeight: 24
                            }
                        },
                        //x轴轴线设置
                        axisLine: {
                            //不显示
                            show: true,
                            lineStyle:{
                                color:'#999'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    //y轴
                    yAxis: {
                        //展示数值的轴
                        type: 'value',
                        //y轴字体设置
                        axisLabel: {
                            show: true,
                            fontSize: 12,
                            color: '#333'
                        },
                        //y轴轴线设置
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color:'#ccc'
                            }
                        },
                        //y轴分隔线设置
                        splitLine: {
                            //不显示
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        name:'(%)       ',
                        nameTextStyle:{
                            color:'#999999'
                        },
                    },
                    //图表的设置
                    series: [
                        {
                            //图表类型：柱状图
                            type: 'bar',
                            //柱子宽度
                            barWidth: '15%',
                            //数据来源，一般是数值的数组
                            data: yData,
                            //柱子样式
                            itemStyle: {
                                //正常显示的样式
                                normal: {
                                    //柱子渐变
                                    color: new echarts.graphic.LinearGradient(
                                        //右，下，左，上
                                        0, 0, 0, 1, [{
                                            //0%位置的颜色
                                            offset: 0,
                                            color: '#e85a44'
                                        },
                                            {
                                                //100%位置的颜色
                                                offset: 1,
                                                color: '#d75969'
                                            }
                                        ]
                                    )
                                }
                            },
                        },
                    ],
                    grid: {
                        show: false,
                        top: 45,
                        bottom: 46,
                        right: 20,
                        left: 50
                    },
                };
                myChart.setOption(option);
            },
            select(event){
                let btn=document.querySelectorAll('.my-button');
                btn.forEach((value, key) => {
                    value.classList.remove('active');
                });
                event.target.classList.add('active');
                this.chartRender();
            },
            chartRender(){
                let data= this.dutyNumData.太原市;
                let selectItem=document.querySelector('.my-button.active');
                let dataObj={};
                for (let dataItem in data){
                    this.legend.push(dataItem);
                }
                if (selectItem.innerHTML==='警察'){
                    dataObj=data.JING;
                }else {
                    dataObj=data.FA;
                }
                for (let item in this.dutyNumData){
                    this.office=item;
                }
                this.dutyNumEchart(dataObj);
            }
        },
        mounted() {
            // this.chartRender();
        }
    }
</script>

<style scoped lang="scss">
    .chartBox{
        .my-switch{
            width: 2.4rem;
            height: 0.3rem;
            margin: 0.11rem auto;
            .my-button{
                width: 50%;
                height: 100%;
                float: left;
                line-height: 0.3rem;
                letter-spacing: 3px;
                text-align: center;
                font-size: 0.16rem;
                cursor: pointer;
                &.active{
                    background-image: linear-gradient(180deg,
                            #d6596b 0%,
                            #eb5a3d 100%);
                    border-radius: 0.14rem;
                    color: #fff;
                    line-height: 0.3rem;
                    letter-spacing: 3px;
                    text-align: center;
                    font-size: 0.16rem;
                }
            }
        }
        #dutyNum {
            width: 100%;
            height: 3.4rem;
        }
    }
</style>