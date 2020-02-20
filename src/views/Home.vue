<template>
    <div id="home"  v-loading.fullscreen.lock="fullscreenLoading">
        <video  autoplay loop muted class="video_bg"  >
            <!-- <source src="static/images/index/dongtu1.mp4" type="video/mp4"/>
            浏览器不支持 video 标签，建议升级浏览器。
            <source src="static/images/index/dongtu2.webm" type="video/webm"/>
            浏览器不支持 video 标签，建议升级浏览器。 -->
            <source src="../assets/video/dongtu1.mp4" type="video/mp4"/>
            浏览器不支持 video 标签，建议升级浏览器。
            <source src="../assets/video/dongtu2.webm" type="video/webm"/>
            浏览器不支持 video 标签，建议升级浏览器。
        </video>
       


        <!--        内容框-->
        <div class="my-container">
            <!-- 人数对比 -->
            <div class="peopleNum">
                    <div class="peopleNum_left">
                        <div class="left_title">政法委、公、检、法、司人数对比</div>
                        <div class="left_context">  
                            <ul>
                                <li v-for="(item,index) in allPeopleNum" :key="index">
                                    <span>{{item['type']}}</span>
                                    <span class="left_context_num">{{item['value']}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="peopleNum_right">
                        <div class="right_title">政法委地域人数对比</div>
                        <div class="right_context">  
                            <ul>
                                <li v-for="(item,index) in allAreaNum" :key="index">
                                    <span>{{item['type']}}</span>
                                    <span class="left_context_num">{{item['value']}}</span>
                                </li>
                               
                            </ul>
                        </div>
                    </div>


                
            </div>
            <!--            对比-->
            <div class="contrast">
                <!--            年龄-->
                <div class="constantBox">
                    <!--                    标题-->
                    <div class="contrastTitle">
                        <span>{{age.title}}</span>
                        <div class="ageIcon contrastIcon">
                            <i :class="['iconfont',age.icon]"></i>
                        </div>
                    </div>
                    <!--                    数据-->
                    <ul class="detailBox">
                        <li v-for="(item,index) in age.data" :key="index">
                            <p>{{item.type}}</p>
                            <p class="ageValue">{{item.value}}</p>
                            
                        </li>
                    </ul>
                    <!--                    总计-->
                    <div class="totalBox">
                        <!-- <span style="font-size: inherit">总计</span>公、检、法、司、市政法委{{age.data[age.data.length-1].type}}：<span
                            class="ageValue">{{age.data[age.data.length-1].value}}</span>岁 -->
                    </div>
                </div>


                <!--                民族-->
                
                <!-- <div class="constantBox">
                    <div class="contrastTitle">
                        <span>{{minority.title}}</span>
                        <div class="ageIcon contrastIcon">
                            <i :class="['iconfont',minority.icon]"></i>
                        </div>
                    </div>
                    <ul class="detailBox">
                        <li v-for="(item,index) in minority.data" :key="index">
                            <p class="minorityValue">{{item.value}}</p>
                            <p>{{item.type}}</p>
                        </li>
                    </ul>
                    <div class="totalBox">
                    </div>
                </div> -->


                <!--                学历-->
                <div class="constantBox">
                    <!--                    标题-->
                    <div class="contrastTitle">
                        <span>{{education.title}}</span>
                    </div>
                    <!--                    数据-->
                    <div class="eduDetailBox">
                        <ul class="eduIconBox">
                            <li v-for="(item,index) in education.icon" :key="index">
                                <div class="eduIcon">
                                    <i :class="['iconfont',item.icon]"></i>
                                </div>
                                <span>{{item.text}}</span>
                            </li>
                        </ul>
                        <div class="eduDdataBox">
                            <ul>
                                <li v-for="(yanjiushengItem,index) in education.data[0].研究生"  :key="index">{{yanjiushengItem.type}}</li>
                            </ul>
                            
                            <ul>
                                <li class="education1" v-for="(benkeItem,index) in education.data[0].本科" :key="index">{{benkeItem.value}}
                                </li>
                            </ul>
                            <ul>
                                <li class="education2" v-for="(yanjiushengItem,index) in education.data[0].研究生"  :key="index">
                                    {{yanjiushengItem.value}}
                                </li>
                            </ul>
                            <!-- <ul>
                                <li v-for="(yanjiushengItem,index) in education.data[0].研究生"  :key="index">{{yanjiushengItem.type}}</li>
                            </ul> -->
                        </div>
                    </div>
                    <!--                    总计-->
                    <div class="totalBox">
                        <!-- <span style="font-size: inherit">总计</span>公、检、法、司、市政法委{{education.data[education.data.length-1].type}}：<span
                            class="education1">{{education.data[education.data.length-1].value}}</span> -->
                    </div>
                </div>
            </div>
            <!--            echarts-->
            <!--            性别-->
            <div class="sexBox echartsBox">
                <sex-chart :sex-data="sexData" ref="sexChart"></sex-chart>
            </div>
            <!--            年龄、职务年限-->
            <div class="ageDutyAgeBox">
                <!--                年龄-->
                <div class="ageBox echartsBox">
                    <age-chart :age-data="ageData" ref="ageChart"></age-chart>
                </div>
                <!--                职务年限-->
                <div class="dutyAgeBox echartsBox">
                    <dutyAge-chart :dutyAgeData="dutyAgeData" ref="dutyAgeChart"></dutyAge-chart>
                </div>
            </div>
            <!--            职务人数-->
            <!-- <div class="dutyNumBox echartsBox">
                <duty-num :duty-num-data="dutyNumData" ref="dutyNumChart"></duty-num>
            </div> -->
            <!--           职务层次 -->
            <div class="jobLevelBox echartsBox">
                <job-level :job-level-data="jobLevelData" ref="jobLevelChart"></job-level>
            </div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import Footer from "../components/common/layout/Footer";
    //sexchart
    import SexChart from '../components/common/echarts/Sex'
    //agechart
    import AgeChart from '../components/common/echarts/Age'
    //职务年限
    import DutyAgeChart from '../components/common/echarts/DutyAge'
    //职务层次人数
    import DutyNum from '../components/common/echarts/DutyNum'
    //职务层次
    import JobLevel from '../components/common/echarts/JobLevel'

    export default {
        name: "Home",
        components: {
            Footer,
            SexChart,
            AgeChart,
            DutyAgeChart,
            DutyNum,
            JobLevel
        },
        data() {
            return {
                // 政法委 公检法司 人数
                allPeopleNum : [
                    {type : '政法委',value:"0"},
                    {type : '公',value :  "0"},    
                    {type : '检',value :  "0"}, 
                    {type : '法',value :  "0"},
                    {type : '司',value :  "0"},  
                ],
                // 政法委 市县区
                allAreaNum : [
                    // {type : '太原市',value:"0"},
                    {type : '小店区',value :  "0"},    
                    {type : '迎泽区',value :  "0"}, 
                    {type : '杏花岭区',value :  "0"},
                    {type : '尖草坪区',value :  "0"},  
                    {type : '万柏林区',value :  "0"},  
                    {type : '晋源区',value :  "0"},  
                    {type : '清徐县',value :  "0"},
                    {type : '阳曲县',value :  "0"},  
                    {type : '娄烦县',value :  "0"},  
                    {type : '古交市',value :  "0"},  

                ],
                age: {
                    title: '政法委、公、检、法、司平均年龄对比',
                    icon: 'iconnianling',
                    data: [
                        {type: '政法委', value: 0},
                        {type: '公', value: 0},
                        {type: '检', value: 0},
                        {type: '法', value: 0},
                        {type: '司', value: 0},
                        // {type: '市政法委', value: 0},
                        {type: '平均年龄', value: 0}
                    ]
                },
                minority: {
                    title: '政法委、公、检、法、司少数名族占比',
                    icon: 'iconshaoshuminzu',
                    data: [
                        {type: '公', value: '0%'},
                        {type: '检', value: '0%'},
                        {type: '法', value: '0%'},
                        {type: '司', value: '0%'},
                        {type: '政法委', value: '0%'},
                        {type: '少数民族占比', value: '0%'}
                    ]
                },
                education: {
                    title: '政法委、公、检、法、司本科、研究生及占比',
                    icon: [{icon: 'iconbenke', text: '本科'}, {icon: 'iconyanjiusheng', text: '研究生'}],
                    data: [
                        {
                            '本科': [
                                {type: '政法委', value: '0%'},

                                {type: '公', value: '0%'},
                                {type: '检', value: '0%'},
                                {type: '法', value: '0%'},
                                {type: '司', value: '0%'},
                                // {type: '市政法委', value: '0%'}
                            ],
                            '研究生': [
                                {type: '政法委', value: '0%'},

                                {type: '公', value: '0%'},
                                {type: '检', value: '0%'},
                                {type: '法', value: '0%'},
                                {type: '司', value: '0%'},
                                // {type: '市政法委', value: '0%'}
                            ]
                        },
                        {type: '本科、研究生学历', value: '0%'}
                    ]
                },
                sexData: {
                    '太原市': {
                        "ZHENG": {
                            'MAN': 0,
                            'WOMAN': 0
                        },
                        "GONG": {
                            'MAN': 0,
                            'WOMAN': 0
                        },
                        "JIAN": {
                            'MAN': 0,
                            'WOMAN': 0
                        },
                        "FA": {
                            'MAN': 0,
                            'WOMAN': 0
                        },
                        "SI": {
                            'MAN': 0,
                            'WOMAN': 0
                        },
                        
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
                        },
                        "GONG": {
                            'THIRTYDOWN': 0,
                            'FORTY': 0,
                            'FIFTY': 0,
                            'SIXTY': 0,
                            'SIXTYUP': 0
                        },
                        "JIAN": {
                            'THIRTYDOWN': 0,
                            'FORTY': 0,
                            'FIFTY': 0,
                            'SIXTY': 0,
                            'SIXTYUP': 0
                        },
                        "FA": {
                            'THIRTYDOWN': 0,
                            'FORTY': 0,
                            'FIFTY': 0,
                            'SIXTY': 0,
                            'SIXTYUP': 0
                        },
                        "SI": {
                            'THIRTYDOWN': 0,
                            'FORTY': 0,
                            'FIFTY': 0,
                            'SIXTY': 0,
                            'SIXTYUP': 0
                        },
                        
                    }
                },
                // 职务层次年限比
                dutyAgeData: {
                    '太原市': {
                        "ZHENG": {
                            'TWODOWN': 0,
                            'FIVE':0,
                            'TEN': 0,
                            'TENUP': 0
                        },
                        "GONG": {
                            'TWODOWN': 0,
                            'FIVE':0,
                            'TEN': 0,
                            'TENUP': 0
                        },
                        "JIAN": {
                            'TWODOWN': 0,
                            'FIVE':0,
                            'TEN': 0,
                            'TENUP': 0
                        },
                        "FA": {
                            'TWODOWN': 0,
                            'FIVE':0,
                            'TEN': 0,
                            'TENUP': 0
                        },
                        "SI": {
                            'TWODOWN': 0,
                            'FIVE':0,
                            'TEN': 0,
                            'TENUP': 0
                        },
                        
                    }
                },
                dutyNumData: {
                    '太原市': {
                        'JING': {
                            'YIZHANG': 0,
                            'ERZHANG': 0,
                            'SANZHANG': 0,
                            'SIZHANG': 0,
                            'YIYUAN': 0,
                            'ERYUAN': 0,
                            'SANYUAN': 0,
                            'SIYUAN': 0,
                            'OTHER': 0
                        },
                        'FA': {
                            'SHOUDA': 0,
                            'YIDA': 0,
                            'ERDA': 0,
                            'YIGAO': 0,
                            'ERGAO': 0,
                            'SANGAO': 0,
                            'SIGAO': 0,
                            'YI': 0,
                            'ER': 0,
                            'SAN': 0,
                            'SI': 0,
                            'WU': 0,
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
                        },
                        "GONG": {
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
                        },
                        "JIAN": {
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
                        },
                        "FA": {
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
                        },
                        "SI": {
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
                            },
                        },
                        // "ZHENG": {
                        //     'MAN': {
                        //         'FUTING': 0,
                        //         'ZHENGCHU': 0,
                        //         'FUCHU': 0,
                        //         'ZHENGKE': 0,
                        //         'FUKE': 0,
                        //         'OTHER': 0
                        //     },
                        //     'WOMAN': {
                        //         'FUTING': 0,
                        //         'ZHENGCHU': 0,
                        //         'FUCHU': 0,
                        //         'ZHENGKE': 0,
                        //         'FUKE': 0,
                        //         'OTHER': 0
                        //     }
                        // }
                    }
                },
                smallScreen: false,
                // 职务层次  url
                dutyLevelUrl : {
                    zfw : ['jianliA01/ZFWdataAnalysis',''],
                    jcy : ['jianliA01/QTdataAnalysis','jcy'],
                    fy : ['jianliA01/QTdataAnalysis','fy'],
                    sfj : ['jianliA01/QTdataAnalysis','sfj']
                },
                //  Init url
                initUrl : 'jianliA01/findIndexData',
                // loading: true
                fullscreenLoading : true,
                // 


            }
        },
        methods: {
            
            getWindowSize() {
                let wsize = window.innerWidth;
                this.screenWidth = wsize;
                if (this.screenWidth <= 1372) {
                    this.smallScreen = true;
                } else {
                    this.smallScreen = false;
                }
            },
            
            // 职务层次
            getDutyLevel(){
               
                let flag = 0;   // 计数器
                let dutyData = this.jobLevelData['太原市'] ;  
                let that = this;
                // console.log(dutyData);   


                // 政法委
                this.$http.get(this.apiRoot + this.dutyLevelUrl.zfw[0],{
                })
                .then(function (res) {
                    dispose(res['data'],'ZHENG');
                }.bind(this))
                // 检察院
                this.$http.get(this.apiRoot + this.dutyLevelUrl.jcy[0],{
                    params : {
                        card : this.dutyLevelUrl.jcy[1]
                    }
                })
                .then(function (res) {
                    dispose(res['data'],'JIAN');
                }.bind(this))
                // 法院
                this.$http.get(this.apiRoot + this.dutyLevelUrl.fy[0],{
                    params : {
                        card : this.dutyLevelUrl.fy[1]
                    }
                })
                .then(function (res) {
                    dispose(res['data'],'FA');
                }.bind(this))

                // 司法局
                this.$http.get(this.apiRoot + this.dutyLevelUrl.sfj[0],{
                    params : {
                        card : this.dutyLevelUrl.sfj[1]
                    }
                })
                .then(function (res) {
                    dispose(res['data'],'SI');
                }.bind(this))

                // 公安局
                // this.$http.get(this.apiRoot + this.dutyLevelUrl.zfw[0],{

                // })
                // .then(function (res) {
                // })

                function dispose(data,type) {
                    flag ++ ;  // 判断请求都进入的时候   开始填入对象
                    dutyData[type] = {
                        'MAN': {
                                'FUTING': data['1A22-1'],
                                'ZHENGCHU': data['1A31-1'],
                                'FUCHU': data['1A32-1'],
                                'ZHENGKE': data['1A41-1'],
                                'FUKE': data['1A42-1'],
                                'OTHER': data['KY1']
                            },
                            'WOMAN': {
                               'FUTING': data['1A22-2'],
                                'ZHENGCHU': data['1A31-2'],
                                'FUCHU': data['1A32-2'],
                                'ZHENGKE': data['1A41-2'],
                                'FUKE': data['1A42-2'],
                                'OTHER': data['KY2']
                            }
                    }
                    if(flag === 4){
                        // console.log(dutyData);
                        that.jobLevelData['太原市'] = dutyData;

                        // console.log(that.jobLevelData);

                        that.$refs.jobLevelChart.jobLevelChart();
                    }
                }
            },
            getInitData(){
                this.$http.get(this.apiRoot + this.initUrl,{

                })
                .then(function (res) {
                    this.fullscreenLoading = false;
                    // 人数对比
                    this.allPeopleNum[0]['value'] = res['data']['Total']['ZFWTotal'];
                    // this.allPeopleNum[1]['value'] = res['data']['Total']['ZFWTotal']
                    this.allPeopleNum[2]['value'] = res['data']['Total']['JCYTotal']
                    this.allPeopleNum[3]['value'] = res['data']['Total']['FYTotal']
                    this.allPeopleNum[4]['value'] = res['data']['Total']['SFJTotal']


                    // 公检法司年龄对比
                    this.age['data'][0]['value'] = res['data']['ageRatio']['zfwSex'];
                    // this.age['data'][1]['value'] = res['data']['ageRatio']['jcySex'];
                    this.age['data'][2]['value'] = res['data']['ageRatio']['jcySex'];
                    this.age['data'][3]['value'] = res['data']['ageRatio']['fySex'];
                    this.age['data'][4]['value'] = res['data']['ageRatio']['sfjSex'];


                    // 公检法司  少数民族占比

                    // this.minority['data'][0]['value'] = 
                    this.minority['data'][1]['value'] =  res['data']['ethnicMinorityRatio']['jcyEthnicMinority'] + '%';
                    this.minority['data'][2]['value'] =  res['data']['ethnicMinorityRatio']['fyEthnicMinority'] + '%';;
                    this.minority['data'][3]['value'] =  res['data']['ethnicMinorityRatio']['sfjEthnicMinority'] + '%';;
                    this.minority['data'][4]['value'] =  res['data']['ethnicMinorityRatio']['zfwEthnicMinority'] + '%';;
                    // this.minority['data'][5]['value'] =  res['data']['ethnicMinorityRatio']['jcyEthnicMinority'] + '%';;

                    // 年龄分布
                    // this.ageData['太原市']['GONG'] = 
                    this.ageData['太原市']['JIAN'] = {
                        'THIRTYDOWN': res['data']['ageDistribution']['JCYAgeDistribution'][30],
                        'FORTY': res['data']['ageDistribution']['JCYAgeDistribution'][40],
                        'FIFTY': res['data']['ageDistribution']['JCYAgeDistribution'][50],
                        'SIXTY': res['data']['ageDistribution']['JCYAgeDistribution'][59],
                        'SIXTYUP': res['data']['ageDistribution']['JCYAgeDistribution'][60],
                    }
                    this.ageData['太原市']['FA'] = {
                        'THIRTYDOWN': res['data']['ageDistribution']['FYAgeDistribution'][30],
                        'FORTY': res['data']['ageDistribution']['FYAgeDistribution'][40],
                        'FIFTY': res['data']['ageDistribution']['FYAgeDistribution'][50],
                        'SIXTY': res['data']['ageDistribution']['FYAgeDistribution'][59],
                        'SIXTYUP': res['data']['ageDistribution']['FYAgeDistribution'][60],
                    }
                    this.ageData['太原市']['SI'] = {
                        'THIRTYDOWN': res['data']['ageDistribution']['SFJAgeDistribution'][30],
                        'FORTY': res['data']['ageDistribution']['SFJAgeDistribution'][40],
                        'FIFTY': res['data']['ageDistribution']['SFJAgeDistribution'][50],
                        'SIXTY': res['data']['ageDistribution']['SFJAgeDistribution'][59],
                        'SIXTYUP': res['data']['ageDistribution']['SFJAgeDistribution'][60],
                    }
                    this.ageData['太原市']['ZHENG'] = {
                        'THIRTYDOWN': res['data']['ageDistribution']['ZFWAgeDistribution'][30],
                        'FORTY': res['data']['ageDistribution']['ZFWAgeDistribution'][40],
                        'FIFTY': res['data']['ageDistribution']['ZFWAgeDistribution'][50],
                        'SIXTY': res['data']['ageDistribution']['ZFWAgeDistribution'][59],
                        'SIXTYUP': res['data']['ageDistribution']['ZFWAgeDistribution'][60],
                    }
                    this.$refs.ageChart.ageEchart();


                    // 层级年龄对比
                    // this.dutyAgeData['太原市']['GONG'] 
                    this.dutyAgeData['太原市']['JIAN'] = {
                        'TWODOWN': res['data']['dutyLevel']['JCYDutyLevel']['dutyLevelTwo'],
                        'FIVE':res['data']['dutyLevel']['JCYDutyLevel']['dutyLevelFive'],
                        'TEN': res['data']['dutyLevel']['JCYDutyLevel']['dutyLevelNine'],
                        'TENUP': res['data']['dutyLevel']['JCYDutyLevel']['dutyLevelTen'],
                    }
                    this.dutyAgeData['太原市']['FA'] = {
                        'TWODOWN': res['data']['dutyLevel']['FYDutyLevel']['dutyLevelTwo'],
                        'FIVE':res['data']['dutyLevel']['FYDutyLevel']['dutyLevelFive'],
                        'TEN': res['data']['dutyLevel']['FYDutyLevel']['dutyLevelNine'],
                        'TENUP': res['data']['dutyLevel']['FYDutyLevel']['dutyLevelTen'],
                    }
                    this.dutyAgeData['太原市']['SI'] = {
                        'TWODOWN': res['data']['dutyLevel']['SFJDutyLevel']['dutyLevelTwo'],
                        'FIVE':res['data']['dutyLevel']['SFJDutyLevel']['dutyLevelFive'],
                        'TEN': res['data']['dutyLevel']['SFJDutyLevel']['dutyLevelNine'],
                        'TENUP': res['data']['dutyLevel']['SFJDutyLevel']['dutyLevelTen'],
                    }
                    this.dutyAgeData['太原市']['ZHENG'] = {
                        'TWODOWN': res['data']['dutyLevel']['ZFWDutyLevel']['dutyLevelTwo'],
                        'FIVE':res['data']['dutyLevel']['ZFWDutyLevel']['dutyLevelFive'],
                        'TEN': res['data']['dutyLevel']['ZFWDutyLevel']['dutyLevelNine'],
                        'TENUP': res['data']['dutyLevel']['ZFWDutyLevel']['dutyLevelTen'],
                    }
                    this.$refs.dutyAgeChart.dutyAgeEchart();


                    // 公检法司  男女比例对比
                    // this.sexData['太原市']['GONG'] 
                    this.sexData['太原市']['JIAN'] = {
                        'MAN': res['data']['sexRatio']['jcyMan'],
                        'WOMAN': res['data']['sexRatio']['jcyGirl']
                    }
                    this.sexData['太原市']['FA']  = {
                        'MAN': res['data']['sexRatio']['fyMan'],
                        'WOMAN': res['data']['sexRatio']['fyGirl']
                    }
                    this.sexData['太原市']['SI']  = {
                        'MAN': res['data']['sexRatio']['sfjMan'],
                        'WOMAN': res['data']['sexRatio']['sfjGirl']
                    }
                    this.sexData['太原市']['ZHENG']  = {
                        'MAN': res['data']['sexRatio']['zfwMan'],
                        'WOMAN': res['data']['sexRatio']['zfwGirl']
                    }
                    this.$refs.sexChart.sexEchart();


                    // 公检法司  本科研究生占比

                    this.education['data'][0]['本科'] = [
                        {type: '政法委', value: res['data']['education']['zfwbk']+'%'},
                        {type: '公', value: '0%'},
                        {type: '检', value: res['data']['education']['jcybk']+'%'},
                        {type: '法', value: res['data']['education']['fybk']+'%'},
                        {type: '司', value: res['data']['education']['sfjbk']+'%'},
                        
                    ];
                    this.education['data'][0]['研究生'] = [
                        {type: '政法委', value: res['data']['education']['zfwyjs']+'%'},
                        {type: '公', value: '0%'},
                        {type: '检', value: res['data']['education']['jcyyjs']+'%'},
                        {type: '法', value: res['data']['education']['fyyjs']+'%'},
                        {type: '司', value: res['data']['education']['sfjyjs']+'%'},
                    ]
                    
                }.bind(this))
            },
            
        },
        mounted() {
            this.getWindowSize();
            window.onresize = () => {
                this.getWindowSize();
            };
            // this.$refs.sexChart.sexEchart();
            // this.$refs.ageChart.ageEchart();
            // this.$refs.dutyAgeChart.dutyAgeEchart();
            
            // this.$refs.jobLevelChart.jobLevelChart();


            // this.$refs.dutyNumChart.chartRender();
            this.getDutyLevel();
            this.getInitData();
        }
    }
</script>

<style lang="scss">
    @import "../assets/style/index/Home.css";

    #home {
        width: 100%;
        min-width: 15rem;
        // background-image: url('../../public/static/images/index/dongtu.gif');
        background-repeat: no-repeat;
        background-size: 100%;
        height: 23.5rem;
        position: relative;
        background-color: #fff;
        .video_bg{
            width: 100%;
           
        }
        /*内容框*/
        .my-container {
            width: 97.83%;
            position: absolute;
            top: 3.63rem;
            left: 0;
            right: 0;
            margin: auto;
            // 人数对比
            .peopleNum{
                width: 100%;
                height: 2rem;
                // box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.61);
                display: flex;
                justify-content: space-between;
                .peopleNum_left{
                    width: 30%;
                    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.61);
                    .left_title{
                        padding: 0 5%;
                        height: 20%;
                        display: flex;
                        align-items: center;
                        font-size: .18rem;
                        font-weight: 550;
                    }  
                    .left_context{
                        height: 80%;
                        ul{
                            width: 100%;
                            height: 100%;
                            display: flex;
                            li{
                                display: flex;
                                width:20%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column; 
                                span{
                                    display: block;
                                    width: 100%;
                                    // height: 50%;
                                    text-align: center;
                                    font-size: .16rem;
                                    
                                }
                                .left_context_num{
                                    margin-top:.3rem; 
                                    color: #2667ea;
                                    font-size: .18rem;
                                    font-weight: 550;
                                }
                            }
                        }
                    }


                }
                .peopleNum_right{
                    width: 69%;
                    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.61);
                    .right_title{
                        padding: 0 2%;
                        height: 20%;
                        display: flex;
                        align-items: center;
                        font-size: .18rem;
                        font-weight: 550;
                    }  
                    .right_context{
                        height: 80%;
                        ul{
                            width: 100%;
                            height: 100%;
                            display: flex;
                            li{
                                display: flex;
                                width:10%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column; 
                                span{
                                    display: block;
                                    width: 100%;
                                    // height: 50%;
                                    text-align: center;
                                    font-size: .16rem;
                                    
                                }
                                .left_context_num{
                                    margin-top:.3rem; 
                                    color: #2667ea;
                                    font-size: .18rem;
                                    font-weight: 550;
                                }
                            }
                        }
                    }

                }
            }
            /*对比*/
            .contrast {
                margin-top:.38rem; 
                width: 100%;
                height: 2.5rem;
                background: transparent;
                display: flex;
                justify-content: space-between;
                /*颜色*/
                .ageValue {
                    color: #2667ea;
                }

                .minorityValue {
                    color: #ffd06f;
                }

                .education1 {
                    color: #f78a8a;
                }

                .education2 {
                    color: #a494fe;
                }

                /*放置对比内容的盒子*/
                .constantBox {
                    width: 40%;
                    height: 100%;
                    background: #fff;
                    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.61);
                    margin-right: 1.2%;
                    padding: 0 0.18rem;
                    box-sizing: border-box;
                    position: relative;

                    &:first-child {
                        // .totalBox {
                        //     border-top: 1px solid #d7e4ff;
                        // }
                    }
                    &:nth-child(2) {
                        width: 32%;
                        min-width: 4.6rem;
                        // .totalBox {
                        //     border-top: 1px solid #fff6e4;
                        // }
                    }
                    &:last-child {
                        width: 55%;
                        margin-right: 0;
                        // .totalBox {
                        //     border-top: 1px solid #fff6e4;
                        // }
                    }

                    /*标题*/
                    .contrastTitle {
                        width: 100%;
                        height: 0.48rem;
                        box-sizing: border-box;
                        padding: 0.1rem 0;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        span {
                            color: #333333;
                            font-size: .18rem;
                            font-weight: 550;
                            line-height: 0.31rem;
                        }
                        .contrastIcon {
                            width: 0.31rem;
                            height: 0.31rem;
                            border-radius: 50%;
                            float: right;
                            text-align: center;
                            line-height: 0.31rem;
                        }
                        .ageIcon {
                            background: #d7e4ff;

                            .iconnianling {
                                color: #2567ed;
                                font-size: 0.18rem;
                            }
                        }
                    }

                    /*数据*/
                    .detailBox {
                        width: 100%;
                        margin-top: 0.6rem;
                        margin-bottom:0;
                        overflow: hidden;
                        padding-left: 0.1rem;
                        box-sizing: border-box;

                        li {
                            width: 20%;
                            height: 100%;
                            text-align: center;
                            float: left;

                            p:nth-child(1) {
                                font-size: .16rem;
                            }

                            p:nth-child(2) {
                                font-size: .16rem;
                                letter-spacing: 1px;
                                margin-top: 0.4rem;
                                // color: #333;
                            }

                            &:last-child {
                                display: none;
                            }
                        }
                    }

                    .eduDetailBox {
                        width: 100%;
                        overflow: hidden;
                        margin-bottom: 0.1rem;
                        margin-top: 0.4rem;

                        .eduIconBox {
                            height: 100%;
                            float: left;
                            width: 1.1rem;

                            li {
                                
                                width: 100%;
                                height: 26px;
                                margin-top: 0.48rem;

                                margin-bottom: 0.21rem;
                                position: relative;

                                .eduIcon {
                                    width: 0.31rem;
                                    height: 0.31rem;
                                    background: #ffb6b6;
                                    border-radius: 50%;
                                    text-align: center;
                                    line-height: 0.31rem;
                                    float: left;
                                    margin-top: calc(6.5px - 0.06rem);

                                    .iconfont {
                                        color: #e32828;
                                    }
                                }

                                &:last-child {
                                    margin-bottom: 0;

                                    .eduIcon {
                                        background: #ded8ff;
                                        /*margin: auto;*/

                                        .iconfont {
                                            color: #a494fe;
                                        }
                                    }
                                }

                                span {
                                    line-height: 26px;
                                    margin-left: 0.1rem;
                                    letter-spacing: 2px;
                                    font-size: 12px;
                                    font-weight: 550;
                                }
                                &:last-child{
                                    margin-top: 0;
                                }
                            }
                        }

                        .eduDdataBox {
                            height: 100%;
                            float: right;
                            width: calc(100% - 1.1rem);

                            ul {
                                overflow: hidden;
                                margin-bottom: 0.24rem;


                                &:last-child {
                                    margin: 0;

                                    li {
                                        font-size: 0.20rem;
                                        // color: #333;
                                    }
                                }

                                li {
                                    float: left;
                                    width: 20%;
                                    height: 100%;
                                    text-align: center;
                                    font-size: 0.16rem;

                                    &:last-child {
                                        margin: 0;
                                    }
                                }
                            }
                        }
                    }
                    /*总计*/
                    .totalBox {
                        width: calc(100% - 0.36rem);
                        // height: 0.62rem;
                        padding-left: 0.26rem;
                        line-height: 0.62rem;
                        color: #333333;
                        font-size: 12px;
                        position: absolute;
                        bottom: 0.1rem;

                        span {
                            font-size: 0.22rem;
                        }
                    }
                }
            }
            /*echarts*/
            .echartsBox {
                width: 100%;
                background: #fff;
                box-shadow: 0px 2px 6px 0px rgba(191, 191, 191, 0.75);
                margin-top: 0.39rem;
                border: solid 1px #dcdcdc;
                overflow: hidden;
            }
            .sexBox{
                height: 3.8rem;
            }
            /*年龄、职务年限*/
            .ageDutyAgeBox {
                margin-top: 0.39rem;
                height: 4.2rem;

                &::after {
                    conTENt: '';
                    display: block;
                    clear: both;
                }
                /*年龄、职务年限*/
                .ageBox, .dutyAgeBox {
                    width: 49%;
                    height: 100%;
                    float: left;
                    margin: 0;
                }

                .dutyAgeBox {
                    float: right !important;
                }

                #age, #dutyAge {
                    height: 3.5rem;
                }
            }
            /*职务层次*/
            .jobLevelBox {
                height: 5rem;
            }
        }
    }

    @media screen and (max-width: 1311px) {
        #home {
            width: 18.4rem;
        }
        .main_wrap {
            overflow-x: scroll !important;
        }
    }
</style>