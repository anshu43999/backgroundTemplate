<template>
    <div id="eduChart" class="chartBox">
        <div class="echartsTitle">{{office}}学历对比</div>
        <div id="edu"></div>
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
        name: "Edu",
        data() {
            return {
                office: '',
            }
        },
        props: ['eduData'],
        methods: {
            eduChart() {
                let series = [];
                let yAxis = [];
                let data = [];
                let arrName = [];
                let sumValue = 0;
                for (let item in this.eduData) {
                    for (let officeItem in this.eduData[item]) {
                        switch (officeItem) {
                            case 'GONG':
                                this.office = '公安局';
                                break;
                            case 'JIAN':
                                this.office = '检察院';
                                break;
                            case 'FA':
                                this.office = '法院';
                                break;
                            case 'SI':
                                this.office = '司法局';
                                break;
                            case 'ZHENG':
                                this.office = '政法委';
                                break;
                        }
                        for (let eduItem in this.eduData[item][officeItem]) {
                            if (eduItem==='TOTAL'){
                                sumValue=this.eduData[item][officeItem][eduItem];
                            }else {
                                data.push({'name': eduItem, 'value': this.eduData[item][officeItem][eduItem]});
                            }
                        }
                    }
                }
                data.forEach((value, index) => {
                    switch (value.name) {
                        case 'BENKE':
                            value.name = '本科';
                            break;
                        case 'YANJIUSHENG':
                            value.name = '研究生';
                            break;
                    }
                    // sumValue += value.value;
                    arrName.push(value.name);
                    // console.log(value.value);
                    if (sumValue!==0){
                        yAxis.push((value.value / sumValue * 100).toFixed(2) + "%");
                    }else {
                        yAxis.push('0%');
                    }

                    series.push({
                        name: '',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [70 - index * 32 + '%', 60 - index * 32 + '%'],
                        center: ["50%", "65%"],
                        label: {
                            show: false
                        },
                        itemStyle: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth: 5,
                        },
                        data: [{
                            value: value.value,
                            name: value.name
                        }, {
                            value: sumValue - value.value,
                            name: '',
                            itemStyle: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 0
                            },
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }]
                    }, {
                        name: '',
                        type: 'pie',
                        silent: true,
                        z: 1,
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [70 - index * 32 + '%', 60 - index * 32 + '%'],
                        center: ["50%", "65%"],
                        label: {
                            show: false
                        },
                        itemStyle: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth: 5,
                        },
                        data: [{
                            value: 8,
                            itemStyle: {
                                color: "#fcf181",
                                borderWidth: 0
                            },
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }, {
                            value: 2,
                            name: '',
                            itemStyle: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 0
                            },
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }]
                    })
                });
                let myChart = echarts.init(document.getElementById('edu'));
                let option = {
                    backgroundColor: '#fff',
                    legend: {
                        show: true,
                        icon: "circle",
                        top: 20,
                        data: arrName,
                        padding: [0, 5],
                        itemGap: 25,
                        orient:'horizontal',
                        textStyle: {
                            fontSize: 14,
                            lineHeight: 20,
                            color: "#333"
                        },
                    },
                    tooltip: {},
                    color: ['#00898d', '#36b3ed'],
                    grid: {
                        top: '18%',
                        bottom: '50%',
                        left: "40%",
                        containLabel: false
                    },
                    yAxis: [{
                        type: 'category',
                        inverse: true,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                            inside: true,
                            textStyle: {
                                fontSize: 16,
                                // margin : 20, 
                            },
                            show: true
                        },
                        data: yAxis
                    }],
                    xAxis: [{
                        show: false
                    }],
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
                        orient:'vertical',
                        //位置
                        right: 10,
                        top: 20,
                        //层级
                        zlevel: 999
                    },
                    series: series
                };
                myChart.setOption(option);
            }
        },
        mounted() {
            // this.eduChart();
        }
    }
</script>

<style scoped lang="scss">
    .chartBox {
        #edu {
            width: 100%;
            height: 4rem;
        }
    }
</style>