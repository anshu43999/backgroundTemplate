<template>
    <div id="sexChart" class="chartBox">
        <div class="echartsTitle" v-if="this.$route.name==='首页'">{{office}}男女比例对比</div>
        <div class="echartsTitle" v-else>{{office}}<br>男女比例对比</div>
        <div id="sex"></div>
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
        name: "Sex",
        props: ['sexData'],
        data() {
            return {
                office: ''
            }
        },
        methods: {
            sexEchart() {
                //首页中文标题
                let titleArr = [];

                //英文标题
                let titleArrs = [];

                //具体机构的标题
                let titleArr1 = [];

                //echarts所需数据
                let man = [];
                let woman = [];

                //首页series
                let seriesArrs = [];

                //具体机构series
                let seriesArr = [];

                //放echarts所需数据
                for (let item in this.sexData.太原市) {
                    titleArr.push(item);
                    man.push({name: '男性', value: this.sexData.太原市[item].MAN});
                    woman.push({name: '女性', value: this.sexData.太原市[item].WOMAN});
                }

                //放标题
                titleArr.forEach((value, index) => {
                    switch (value) {
                        case 'GONG':value='公安局';break;
                        case 'JIAN':value='检察院';break;
                        case 'FA':value='法院';break;
                        case 'SI':value='司法局';break;
                        case 'ZHENG':value='政法委';break;
                    }
                    titleArrs.push({
                        text: value,
                        left: index * 20 + 9 + '%',
                        top: '56%',
                        textAlign: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 12,
                            color: '#333',
                            textAlign: 'center',
                        },
                    });
                    titleArr1.push({
                        text: value,
                        left: '44%',
                        top: '55%',
                        textAlign: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 14,
                            color: '#333',
                            textAlign: 'center',
                        },
                    });
                    seriesArrs.push({
                            name: value,
                            type: 'pie',
                            radius: ['30%', '52%'],
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        return colorList[params.dataIndex]
                                    }
                                }
                            },
                            center: [index * 20 + 9.5 + '%', '60%'],
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 5,
                                    length2: 15,
                                    lineStyle: {
                                        color: '#d3d3d3'
                                    },
                                    align: 'right'
                                },
                                color: "#000",
                                emphasis: {
                                    show: true
                                }
                            },
                            label: {
                                normal: {
                                    formatter: function (params) {
                                        return params.value + '%';
                                    },
                                    show: true,
                                    color: '#00a8ff',
                                    fontSize: 10
                                }
                            },
                            data: [{name: '男性', value: man[index].value}, {name: '女性', value: woman[index].value}]
                        },
                        {
                            radius: ['47%', '52%'],
                            center: [index * 20 + 9.5 + '%', '60%'],
                            type: 'pie',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            animation: false,
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(250,250,250,0.5)'
                                }
                            },
                            data: [{
                                value: 1,
                            }],
                        });
                    seriesArr.push({
                            name: value,
                            type: 'pie',
                            radius: ['34%', '58%'],
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        return colorList[params.dataIndex]
                                    }
                                }
                            },
                            center: ['47%', '60%'],
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 5,
                                    length2: 10,
                                    lineStyle: {
                                        color: '#d3d3d3'
                                    },
                                    align: 'right'
                                },
                                color: "#000",
                                emphasis: {
                                    show: true
                                }
                            },
                            label: {
                                normal: {
                                    formatter: function (params) {
                                        return params.value + '%';
                                    },
                                    show: true,
                                    color: '#00a8ff',
                                    fontSize: 10
                                }
                            },
                            data: [{name: '男性', value: parseInt(man[index].value)}, {name: '女性', value: parseInt(woman[index].value)}]
                        },
                        {
                            radius: ['52%', '58%'],
                            center: ['47%', '60%'],
                            type: 'pie',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            animation: false,
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(250,250,250,0.5)'
                                }
                            },
                            data: [{
                                value: 1,
                            }],
                        }
                    );
                });

                //放颜色
                let colorList = ['#ffd16f', '#a495ff', "rgba(250,250,250,0.5)"];
                let myChart = echarts.init(document.getElementById('sex'));

                //首页echarts配置项
                let options = {
                    backgroundColor: "#fff",
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
                    title: titleArrs,
                    series: seriesArrs,
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}:{d}%"
                    },
                    legend: {
                        icon: "rect",
                        orient: 'horizontal',
                        x: 'center',
                        itemWidth: 15,
                        itemHeight: 15,
                        itemGap: 84,
                        top: 10,
                        textStyle: {
                            fontSize: 12
                        },
                        data: ['男性', '女性']
                    },
                };

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
                        orient:'vertical',
                        //位置
                        right: 0,
                        top: 20,
                        //层级
                        zlevel: 999
                    },
                    backgroundColor: "#fff",
                    title: titleArr1,
                    series: seriesArr,
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}:{d}%"
                    },
                    legend: {
                        icon: "rect",
                        orient: 'horizontal',
                        x: 'center',
                        itemWidth: 15,
                        itemHeight: 15,
                        itemGap: 50,
                        top: 20,
                        left:20,
                        textStyle: {
                            fontSize: 12
                        },
                        data: ['男性', '女性']
                    },
                };
                if (titleArrs.length > 1) {
                    myChart.setOption(options);
                    this.office = '政法委、公、检、法、司'
                } else {
                    myChart.setOption(option);
                    this.office = titleArrs[0].text;
                    // if (titleArr[0])
                }
            }
        },
        mounted() {
            // console.log(this.sexData);
            // this.sexEchart();
        }
    }
</script>

<style scoped lang="scss">
    .chartBox {
        #sex {
            width: 100%;
            height: 3rem;
        }
    }
</style>