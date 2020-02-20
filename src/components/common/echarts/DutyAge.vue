<template>
    <div id="dutyAgeChart" class="chartBox">
        <!-- <div class="echartsTitle">{{office}}任现职务层次年限比</div> -->
        <div class="echartsTitle">{{office}}任现职时间对比</div>

        <div id="dutyAge"></div>
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
        name: "dutyAge",
        props: ['dutyAgeData'],
        data() {
            return {
                office: '',
            }
        },
        methods: {
            dutyAgeEchart() {
                let myChart = echarts.init(document.getElementById('dutyAge'));
                //数据
                let source = [];

                //横轴数据
                //首页横轴英文
                let xDataArrs = [];
                //首页横轴中文
                let xDataArr=[];

                //横轴对应的数据
                let twoDown=[];
                let five = [];
                let ten = [];
                let tenUp = [];

                //颜色数组
                let colorArray = [
                    {
                        top: '#fcc60a',
                        bottom: '#f5834a'
                    }, {
                        top: '#85d372',
                        bottom: '#0cbdb5'
                    },
                    {
                        top: '#288cf7',
                        bottom: '#6653f1'
                    },
                    {
                        top: '#c523fc',
                        bottom: '#fd1787'
                    },
                ];

                //获取横轴纵轴数据
                for (let item in this.dutyAgeData.太原市) {
                    xDataArrs.push(item);
                    let ageObj = this.dutyAgeData.太原市[item];
                    twoDown.push(ageObj['TWODOWN']);
                    five.push(ageObj['FIVE']);
                    ten.push(ageObj['TEN']);
                    tenUp.push(ageObj['TENUP']);
                    for (let officeItem in this.dutyAgeData.太原市[item]){
                        xDataArr.push(officeItem);
                        source.push(this.dutyAgeData.太原市[item][officeItem])
                    }
                };
                /* console.log(source);*/

                //首页横轴英转汉
                let xDatas=[];
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

                //机构横轴英转汉
                let xData=[];
                xDataArr.forEach((value, index) => {
                    switch (value) {
                        case 'TWODOWN':
                            value = '2年以下';
                            break;
                        case 'FIVE':
                            value = '2~5年';
                            break;
                        case 'TEN':
                            value = '5~10年';
                            break;
                        case 'TENUP':
                            value = '10年以上';
                            break;
                    }
                    xData.push(value);
                });

                //y轴设置（统一的）
                let yAxisObj={
                    axisLine: {
                        //不显示
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    name:'(人)       ',
                    nameTextStyle:{
                        color:'#999999'
                    },
                    nameGap:10,
                };

                //首页配置项
                let options = {
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
                        top: 70,
                        bottom: 40,
                        right: 20,
                        left: 60,
                        borderColor: '#9d9d9d',
                        borderWidth: 0.5
                    },
                    xAxis: {
                        //类目轴
                        type: 'category',
                        data: xDatas,
                        //x坐标轴字体设置
                        axisLabel: {
                            show: true,
                            interval: 0,
                            fontSize: 12,
                            textStyle: {
                                color: '#333', //文字颜色
                                lineHeight: 22
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
                    legend: {
                        icon: "rect",
                        itemWidth: 15,
                        itemHeight: 15,
                        textStyle: {
                            fontSize: 10,
                            lineHeight: 30
                        },
                        left:80,
                        top:20,
                        itemGap: 40,
                    },
                    series: [{
                        name: '2年以下',
                        type: 'bar',
                        barWidth: 13,
                        data: twoDown,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 11,
                                color: new echarts.graphic.LinearGradient(
                                    //右，下，左，上
                                    0, 0, 0, 1, [{
                                        //0%位置的颜色
                                        offset: 0,
                                        color: '#fcc60a'
                                    },
                                        {
                                            //100%位置的颜色
                                            offset: 1,
                                            color: '#f5834a'
                                        }
                                    ]
                                )
                            }
                        },
                    },
                        {
                            name: '2~5年',
                            type: 'bar',
                            barWidth: 13,
                            data: five,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 11,
                                    color: new echarts.graphic.LinearGradient(
                                        //右，下，左，上
                                        0, 0, 0, 1, [{
                                            //0%位置的颜色
                                            offset: 0,
                                            color: '#85d372'
                                        },
                                            {
                                                //100%位置的颜色
                                                offset: 1,
                                                color: '#0cbdb5'
                                            }
                                        ]
                                    )
                                }
                            },
                        },
                        {
                            name: '5~10年',
                            type: 'bar',
                            barWidth: 13,
                            data: ten,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 11,
                                    color: new echarts.graphic.LinearGradient(
                                        //右，下，左，上
                                        0, 0, 0, 1, [{
                                            //0%位置的颜色
                                            offset: 0,
                                            color: '#288cf7'
                                        },
                                            {
                                                //100%位置的颜色
                                                offset: 1,
                                                color: '#6653f1'
                                            }
                                        ]
                                    )
                                }
                            }
                        },
                        {
                            name: '10年以上',
                            type: 'bar',
                            barWidth: 13,
                            data: tenUp,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 11,
                                    color: new echarts.graphic.LinearGradient(
                                        //右，下，左，上
                                        0, 0, 0, 1, [{
                                            //0%位置的颜色
                                            offset: 0,
                                            color: '#fd1787'
                                        },
                                            {
                                                //100%位置的颜色
                                                offset: 1,
                                                color: '#c523fc'
                                            }
                                        ]
                                    )
                                }
                            }
                        }
                    ]
                };

                //机构配置项
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
                        borderColor: '#9d9d9d',
                        borderWidth: 0.5
                    },
                    xAxis: [{
                        //类目轴
                        type: 'category',
                        data: xData,
                        //x坐标轴字体设置
                        axisLabel: {
                            show: true,
                            interval: 0,
                            fontSize: 12,
                            textStyle: {
                                color: '#333', //文字颜色
                                lineHeight: 20
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
                    }],
                    yAxis: yAxisObj,
                    series: [{
                        type: 'bar',
                        barWidth: 17,
                        data: source,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 20,
                                color: function(params) {
                                    let num = colorArray.length;
                                    return {
                                        type: 'linear',
                                        colorStops: [{
                                            offset: 0,
                                            color: colorArray[params.dataIndex % num].bottom
                                        }, {
                                            offset: 1,
                                            color: colorArray[params.dataIndex % num].top
                                        }, {
                                            offset: 0,
                                            color: colorArray[params.dataIndex % num].bottom
                                        }, {
                                            offset: 1,
                                            color: colorArray[params.dataIndex % num].top
                                        }, {
                                            offset: 0,
                                            color: colorArray[params.dataIndex % num].bottom
                                        }, {
                                            offset: 1,
                                            color: colorArray[params.dataIndex % num].top
                                        }],
                                        //globalCoord: false
                                    }
                                },
                            }
                        },
                    }]
                };

                //判断该显示全部还是某个机构的
                if (xDatas.length>1){
                    this.office='政法委、公、检、法、司';
                    myChart.setOption(options);
                }else {
                    this.office=xDatas[0];
                    myChart.setOption(option);
                }
            },
        },
        mounted() {
            // this.dutyAgeEchart();
            // console.log(this.dutyAgeData);
        }
    }
</script>

<style scoped lang="scss">
    .chartBox {
        #dutyAge {
            width: 100%;
            height: 3.4rem;
        }
    }
</style>