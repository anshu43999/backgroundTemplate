<template>
    <div id="indexChart" class="chartBox">
        <div class="echartsTitle">{{office}}男女职务层次人数对比</div>
        <div id="jobLevel"></div>
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
        name: "JobLevel",
        data() {
            return {
                office: '',
            }
        },
        props: ['jobLevelData'],
        methods: {
            //首页
            jobLevelChart() {
                // console.log(this.jobLevelData);



                //英文机构
                let legendArrs = [];
                //中文机构
                let legendArr = [];

                //series配置项
                let seriesArrs=[];
                let manArr=[];
                let womanArr=[];
                // 轴配置项
                let xData=[];
                let xAxisArr=[];
                let yAxisArr=[];

                //用来放某个机构的数据
                let manData = [];
                let womanData=[];

                //数据
                //所有机构男性的数据
                let manXDatas = [];
                //数据女性
                let womanXDatas = [];

                //用来中转的对象
                let gonganManObj = {};
                let jianManObj = {};
                let faManObj = {};
                let siManObj = {};
                let zhengManObj = {};
                let gonganWomanObj = {};
                let jianWomanObj = {};
                let faWomanObj = {};
                let siWomanObj = {};
                let zhengWomanObj = {};

                //公安男性
                let gonganMan = [];
                //检察院男性
                let jianMan = [];
                //法院男性
                let faMan = [];
                //司法局男性
                let siMan = [];
                //市政法委男性
                let zhengMan = [];

                //女性
                let gonganWoman = [];
                let jianWoman = [];
                let faWoman = [];
                let siWoman = [];
                let zhengWoman = [];

                //中转对象赋值
                for (let item in this.jobLevelData.太原市) {
                    legendArrs.push(item);
                    let x=[];
                    let y=[];
                    switch (item) {
                        case 'GONG':
                            gonganManObj = this.jobLevelData.太原市.GONG.MAN;
                            for (let manItem in gonganManObj) {
                                x.push(manItem);
                                manXDatas=x;
                                gonganMan.push(gonganManObj[manItem]);
                                manData=gonganMan;
                            }
                            gonganWomanObj = this.jobLevelData.太原市.GONG.WOMAN;
                            for (let womanItem in gonganWomanObj) {
                                y.push(womanItem);
                                womanXDatas=y;
                                gonganWoman.push(gonganWomanObj[womanItem]);
                                womanData=gonganWoman;
                            }
                            break;
                        case 'JIAN':
                            jianManObj = this.jobLevelData.太原市.JIAN.MAN;
                            for (let manItem in jianManObj) {
                                x.push(manItem);
                                manXDatas=x;
                                jianMan.push(jianManObj[manItem]);
                                manData=jianMan;
                            }
                            jianWomanObj = this.jobLevelData.太原市.JIAN.WOMAN;
                            for (let womanItem in jianWomanObj) {
                                y.push(womanItem);
                                womanXDatas=y;
                                jianWoman.push(jianWomanObj[womanItem]);
                                womanData=jianWoman;
                            }
                            break;
                        case 'FA':
                            faManObj = this.jobLevelData.太原市.FA.MAN;
                            for (let manItem in faManObj) {
                                x.push(manItem);
                                manXDatas=x;
                                faMan.push(faManObj[manItem]);
                                manData=faMan;
                            }
                            faWomanObj = this.jobLevelData.太原市.FA.WOMAN;
                            for (let womanItem in faWomanObj) {
                                y.push(womanItem);
                                womanXDatas=y;
                                faWoman.push(faWomanObj[womanItem]);
                                womanData=faWoman;
                            }
                            break;
                        case 'SI':
                            siManObj = this.jobLevelData.太原市.SI.MAN;
                            for (let manItem in siManObj) {
                                x.push(manItem);
                                manXDatas=x;
                                siMan.push(siManObj[manItem]);
                                manData=siMan;
                            }
                            siWomanObj = this.jobLevelData.太原市.SI.WOMAN;
                            for (let womanItem in siWomanObj) {
                                y.push(womanItem);
                                womanXDatas=y;
                                siWoman.push(siWomanObj[womanItem]);
                                womanData=siWoman;
                            }
                            break;
                        case 'ZHENG':
                            zhengManObj = this.jobLevelData.太原市.ZHENG.MAN;
                            for (let manItem in zhengManObj) {
                                x.push(manItem);
                                manXDatas=x;
                                zhengMan.push(zhengManObj[manItem]);
                                manData=zhengMan;
                            }
                            zhengWomanObj = this.jobLevelData.太原市.ZHENG.WOMAN;
                            for (let womanItem in zhengWomanObj) {
                                y.push(womanItem);
                                womanXDatas=y;
                                zhengWoman.push(zhengWomanObj[womanItem]);
                                womanData=zhengWoman;
                            }
                            break;
                    }
                }
                manArr.push(zhengMan)
                manArr.push(gonganMan);
                manArr.push(jianMan);
                manArr.push(faMan);
                manArr.push(siMan);
                // manArr.push(zhengMan);
                womanArr.push(zhengWoman)
                womanArr.push(gonganWoman);
                womanArr.push(jianWoman);
                womanArr.push(faWoman);
                womanArr.push(siWoman);
                // womanArr.push(zhengWoman);

                //机构转汉语
                legendArrs.forEach(value => {
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
                    legendArr.push(value);
                });

                //series
                for (let i=0;i<legendArr.length;i++){
                    seriesArrs.push({
                        name: legendArr[i],
                        type: 'line',
                        data: manArr[i],
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                borderWidth: 3,
                            }
                        },
                        lineStyle: {
                            width: 1
                        }
                    }, {
                        name: legendArr[i],
                        type: 'line',
                        data: womanArr[i],
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                borderWidth: 3,
                            }
                        },
                        lineStyle: {
                            width: 1
                        }
                    })
                }

                //职务层级数据英转汉
                let manXData = [];
                manXDatas.forEach(value => {
                    switch (value) {
                        case 'ZHENGTING':
                            value = '正厅';
                            break;
                        case 'FUTING':
                            value = '副厅';
                            break;
                        case 'ZHENGCHU':
                            value = '正处';
                            break;
                        case 'FUCHU':
                            value = '副处';
                            break;
                        case 'ZHENGKE':
                            value = '正科';
                            break;
                        case 'FUKE':
                            value = '副科';
                            break;
                        case 'OTHER':
                            value = '科员及其他';
                            break;
                    }
                    manXData.push(value);
                });

                let womanXData = [];
                womanXDatas.forEach(value => {
                    switch (value) {
                        case 'ZHENGTING':
                            value = '正厅';
                            break;
                        case 'FUTING':
                            value = '副厅';
                            break;
                        case 'ZHENGCHU':
                            value = '正处';
                            break;
                        case 'FUCHU':
                            value = '副处';
                            break;
                        case 'ZHENGKE':
                            value = '正科';
                            break;
                        case 'FUKE':
                            value = '副科';
                            break;
                        case 'OTHER':
                            value = '科员及其他';
                            break;
                    }
                    womanXData.push(value);
                });


                xData.push(manXData);
                xData.push(womanXData);
                for (let i=0;i<xData.length;i++){
                    xAxisArr.push({
                        //类目轴
                        type: 'category',
                        data: xData[i],
                        gridIndex: i,
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
                    });
                    yAxisArr.push({
                        type: 'value',
                        name:'(人)       ',
                        nameTextStyle:{
                            color:'#999999'
                        },
                        nameGap:10,
                        gridIndex: i,
                        axisLine: {
                            //不显示
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },)
                }

                let myChart = echarts.init(document.getElementById('jobLevel'));

                //首页配置项
                let options = {
                    color:['#366eb4','#fddc00','#de5a5b','#4bbc00','#7706eb'],
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
                    title: [{
                        text: '男性',
                        x: '4%',
                        top: '14%',
                        textStyle: {
                            color: '#333',
                            fontSize: 12,
                            fontWeight: 'normal'
                        }
                    }, {
                        text: '女性',
                        x: '54%',
                        top: '14%',
                        textStyle: {
                            color: '#333',
                            fontSize: 12,
                            fontWeight: 'normal'
                        }
                    }],
                    grid: [
                        {x: '4%', y: '24%', width: '43%', height: '64%', show: true},
                        {x2: '3%', y: '24%', width: '43%', height: '64%', show: true},
                    ],
                    tooltip: {},
                    legend: {
                        icon: "rect",   //  字段控制形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
                        itemWidth: 15,  // 设置宽度
                        itemHeight: 15, // 设置高度
                        data: legendArr,
                        top: 5,
                        itemGap: 40,
                        textStyle: {
                            fontSize: 12
                        },
                    },
                    xAxis:xAxisArr,
                    yAxis:yAxisArr,
                    series:seriesArrs
                };
                //单个机构配置项
                let option = {
                    color:['#7eb7ff','#ff7070'],
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
                        top: 60,
                        bottom: 36,
                        right: 30,
                        left: 60,
                        borderColor: '#9d9d9d',
                        borderWidth: 0.5
                    },
                    xAxis: {
                        //类目轴
                        type: 'category',
                        data: manXData,
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
                    },
                    yAxis: {
                        axisLine: {
                            //不显示
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    legend: {
                        icon: "rect",
                        itemWidth: 15,
                        itemHeight: 15,
                        textStyle: {
                            fontSize: 14,
                            lineHeight: 30
                        },
                        itemGap: 84,
                        top: 10,
                    },
                    series: [{
                        name: '男性',
                        type: 'bar',
                        barWidth: 16,
                        data: manData,
                    },
                        {
                            name: '女性',
                            type: 'bar',
                            barWidth: 16,
                            data: womanData,
                        },]
                };

                //判断显示的图表
                if (legendArr.length>1){
                    this.office='政法委、公、检、法、司';
                    myChart.setOption(options);
                }else {
                    this.office=legendArr[0];
                    myChart.setOption(option);
                }
            },
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .chartBox {
        #jobLevel {
            width: 100%;
            height: 4.4rem;

            #man, #woman {
                width: 50%;
                height: 100%;
                float: left;
            }

            #woman {
                float: right !important;
            }
        }
    }
</style>