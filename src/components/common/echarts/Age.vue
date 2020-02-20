<template>
    <div id="ageChart" class="chartBox">
        <div class="echartsTitle">{{office}}年龄分布</div>
        <div id="age"></div>
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
        name: "Age",
        data(){
            return {
                office:'',
            }
        },
        props:['ageData'],
        methods:{
            ageEchart(){
                let myChart = echarts.init(document.getElementById('age'));
                //数据
                let source=[];
                //英文机构
                let xDataArrs=[];
                //中文机构
                let xDatas=[];

                //英文横轴
                let xDataArr=[];

                //用来放横轴对应的数据
                let thirty=[];
                let forty=[];
                let fifty=[];
                let sixty=[];
                let sixtyUp=[];

                //颜色
                let colorList=['#ffd273','#afa3f5','#00d488','#3feed4','#3bafff'];

                //放横纵轴数据
                for (let item in this.ageData.太原市){
                    xDataArrs.push(item);
                    let ageObj=this.ageData.太原市[item];
                    thirty.push(ageObj['THIRTYDOWN']);
                    forty.push(ageObj['FORTY']);
                    fifty.push(ageObj['FIFTY']);
                    sixty.push(ageObj['SIXTY']);
                    sixtyUp.push(ageObj['SIXTYUP']);
                    for (let officeItem in this.ageData.太原市[item]){
                        xDataArr.push(officeItem);
                        source.push(this.ageData.太原市[item][officeItem])
                    };
                };

                //机构英转汉
                xDataArrs.forEach((value, index) => {
                    switch (value) {
                        case 'GONG':
                            value = '公安局';
                            break;
                        case 'JIAN':
                            value = '检察院';
                            break;
                        case 'FA':
                            value = '法院';
                            break;
                        case 'SI':
                            value = '司法局';
                            break;
                        case 'ZHENG':
                            value = '政法委';
                            break;
                    }
                    xDatas.push(value);
                });

                //横轴英转汉
                let xData=[];
                xDataArr.forEach(value => {
                    switch (value) {
                        case 'THIRTYDOWN':value='30岁及以下';break;
                        case 'FORTY':value='31~40岁';break;
                        case 'FIFTY':value='41~50岁';break;
                        case 'SIXTY':value='51~59岁';break;
                        case 'SIXTYUP':value='60岁以上';break;
                    }
                    xData.push(value);
                });

                //y轴配置
                let yAxisObj={
                    name:'(人)       ',
                    nameTextStyle:{
                        color:'#999999'
                    },
                    nameGap:10,
                    axisLine: {
                        //不显示
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                };

                //首页配置项
                let options = {
                    tooltip: {},
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
                    //图表外边框
                    grid: {
                        show: true,
                        top: 70,
                        bottom: 40,
                        right: 20,
                        left: 60,
                        borderColor:'#9d9d9d',
                        borderWidth:0.5
                    },
                    xAxis: {
                        //类目轴
                        type: 'category',
                        data:xDatas,
                        //x坐标轴字体设置
                        axisLabel: {
                            show: true,
                            interval: 0,
                            fontSize: 12,
                            textStyle: {
                                color: '#333', //文字颜色
                                lineHeight:22
                            }
                        },
                        //x轴轴线设置
                        axisLine: {
                            //不显示
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: yAxisObj,
                    legend:{
                        icon: "rect",
                        itemWidth:15,
                        itemHeight:15,
                        textStyle:{
                            fontSize:10,
                            lineHeight:30
                        },
                        itemGap:20,
                        top:20,
                        left:'10%'
                    },
                    series: [{
                        name: '30岁及以下',
                        type: 'bar',
                        barWidth: '12%',
                        data: thirty,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 11,
                                color: '#ffd273'
                            }
                        },
                    },
                        {
                            name: '31~40岁',
                            type: 'bar',
                            barWidth: '12%',
                            data: forty,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 11,
                                    color: '#afa3f5'
                                }
                            }
                        },
                        {
                            name: '41~50岁',
                            type: 'bar',
                            barWidth: '12%',
                            data: fifty,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 11,
                                    color: '#00d488'
                                }
                            }
                        },
                        {
                            name: '51~59岁',
                            type: 'bar',
                            barWidth: '12%',
                            data: sixty,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 11,
                                    color: '#3feed4'
                                }
                            }
                        },
                        {
                            name: '60岁及以上',
                            type: 'bar',
                            barWidth: '12%',
                            data: sixtyUp,
                            barGap:'25%',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 11,
                                    color: '#3bafff'
                                }
                            }
                        },]
                };
                //机构页配置项
                let option = {
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
                    tooltip: {},
                    //图表外边框
                    grid: {
                        show: true,
                        top: 30,
                        bottom: 42,
                        right: 30,
                        left: 50,
                        borderColor:'#9d9d9d',
                        borderWidth:0.5
                    },
                    xAxis:{
                        //类目轴
                        type: 'category',
                        data:xData,
                        //x坐标轴字体设置
                        axisLabel: {
                            show: true,
                            fontSize: 12,
                            textStyle: {
                                color: '#333', //文字颜色
                                lineHeight:20
                            }
                        },
                        //x轴轴线设置
                        axisLine: {
                            //不显示
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        interval:0
                    },
                    yAxis: yAxisObj,
                    series: [{
                        type: 'bar',
                        barWidth: 17,
                        data: source,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 20,
                                color: function (params) {
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                    }]
                };

                //判断显示
                if (xDataArrs.length>1){
                    this.office='政法委、公、检、法、司';
                    myChart.setOption(options);
                }else {
                    this.office=xDatas[0];
                    myChart.setOption(option);
                }
            },
        },
        mounted() {
            this.ageEchart();
            // console.log(this.ageData);
        }
    }
</script>

<style scoped lang="scss">
    .chartBox{
        #age {
            width: 100%;
            height: 3.4rem;
        }
    }
</style>