<!--  -->
<template>
<div class='infoDetails_wrap'>
   


        <div style="text-align: center;font-size:.24rem;margin-bottom:.2rem; letter-spacing:4px">干部任免审批表</div>
        <table class="frist_pages"  v-if="DetailData">
            <tr>
                <td rowspan="2" class="width13 " style="border-left:1px solid #dddddd;">姓 名</td>
                <td rowspan="2" class="width10">{{DetailData['A01']['name']}}</td>
                <td rowspan="2" class="width13 ">性 别</td>
                <td rowspan="2" class="width11">{{DetailData['A01']['sex']}}</td>
                <td rowspan="2" class="width13 ">出生年月</td>
                <td rowspan="1" class="width20" style="border-bottom: 0;padding:0">{{DetailData['A01']['birthDay']}}</td>
                <td class="width21" rowspan="6">
                    <!-- <div class="ImgUrl" :style="{ backgroundImage: 'url(data:image/png;base64,' + this.DetailData['url'] + ')' }">
                       
                    </div> -->
                    <div style="width:100%;height:100%;">
<!--                        <img style="width:100%;height:100%;" :src="'data:image/png;base64,' + this.DetailData['url'] ">-->
                        <img class="avatar" :src="'data:image/png;base64,' + this.DetailData['url'] ">
                    </div>
                    

                </td>
            </tr>
            <tr>
                <td>{{year+'岁'}}</td>
            </tr>
            <tr>
                <td rowspan="2" class="" style="border-left:1px solid #dddddd;">民 族</td>
                <td rowspan="2">{{DetailData['A01']['nation']}}</td>
                <td rowspan="2" class="">籍 贯</td>
                <td rowspan="2">{{DetailData['A01']['homeTown']}}</td>
                <td rowspan="2" class="">出生地</td>
                <td rowspan="2" >{{DetailData['A01']['birthPlace']}}</td>
                <!-- <td> </td> -->
            </tr>

            <tr></tr>


            <tr>
                <td class="" style="border-left:1px solid #dddddd;">入党时间</td>

                <td v-if="DetailData['A39']['joinTime']">{{DetailData['A39']['joinTime']}}</td>

                
                
                <td class="">参加工<br>作时间</td>
                <td>{{DetailData['A01']['workingTime']}}</td>
                <td class="">健康状况</td>
                <td>{{DetailData['A01']['healthState']}}</td>
                <!-- <td> </td> -->
            </tr>
            <tr>
                <td class="" style="border-left:1px solid #dddddd;">专业技<br>术职务</td>
                <td colspan="2">{{DetailData['A01']['specialityPost']}}</td>
                <td class="">熟悉专业<br>有何特长</td>
                <td colspan="2">{{DetailData['A01']['speciality']}}</td>
                <!-- <td> </td> -->
            </tr>
            <tr>
                <td class=""  rowspan="4" style="border-left:1px solid #dddddd;">学历<br> 学位</td>
                <td class="" rowspan="2">全日制<br>教育</td>


                <td style="border-bottom:0" colspan="2">{{DetailData['A08'][0]['educational']}}</td>
                
                
                <td class="" rowspan="2">毕业院校<br>系及专业 </td>
                <td  rowspan="2" colspan="2">{{DetailData['A01']['graduateSchool1']}}</td>
            </tr>
            <tr>
                <!-- <td  colspan="2"></td> -->
                <td  colspan="2">{{DetailData['A08'][0]['degree']}}</td>
            </tr>
            <tr>
                <td class="" rowspan="2">在职<br>教育</td>


                <td v-if="DetailData['A08'][1]" style="border-bottom:0"  colspan="2">{{DetailData['A08'][1]['educational']}}</td>
                <td v-else style="border-bottom:0"  colspan="2"></td>
                
                
                <td class="" rowspan="2">毕业院校<br>系及专业</td>
                <td rowspan="2" colspan="2">{{DetailData['A01']['graduateSchool2']}}</td>
            </tr>
            <tr>
                <!-- <td  colspan="2"></td> -->
                <td v-if="DetailData['A08'][1]"  colspan="2">{{DetailData['A08'][1]['degree']}}</td>
                <td v-else  colspan="2"></td>
            </tr>
            <tr>
                <td class="" colspan="2" style="border-left:1px solid #dddddd;">现任职务</td>
                <td  colspan="5" style="text-align: left;padding-left: 0.1rem">{{DetailData['A01']['jobNameL']}}</td>
            </tr>
            <tr>
                <td class="" colspan="2" style="border-left:1px solid #dddddd;">拟任职务</td>
                <td  colspan="5"></td>
            </tr>
            <tr>
                <td class="" colspan="2" style="border-left:1px solid #dddddd;">拟免职务</td>
                <td  colspan="5"></td>
            </tr>
           
            <tr>
                <td style="border-left:1px solid #dddddd;" class="reminder" rowspan="40">
                    <span style="display:block">简</span>
                    <span style="display:block">历</span>


                </td>
                <td rowspan="40" colspan="6"
                    style="text-align: left;vertical-align: top;padding-left: 0.1rem;padding-top: 0.1rem;position: relative;">
                    <!-- <div style="white-space: pre-wrap" v-html="DetailData['A01']['resume']">

                    </div> -->
                    <div style="font-size:.12rem;width:90%; margin-right:.2rem; white-space: pre-line; text-align:left;padding-left:.2rem;" v-html="DetailData['A01']['resume']">
                    </div>
                </td>
            </tr>
             <tr v-for="(item,index) in arr" :key="index"></tr>
           

        </table>








        <table v-if="DetailData" style="margin-top:8rem;margin-bottom:.3rem;page-break-after:always">
            <tr>
                <td  class="width13 " colspan="1" rowspan="4" style="border-left:1px solid #dddddd;">
                    <span style="display: block">奖</span>
                    <span style="display: block">罚</span>
                    <span style="display: block">情</span>
                    <span style="display: block">况</span>

                </td>
                <td colspan="6" rowspan="4" style="text-align: left;padding-left: 0.1rem">{{DetailData['A01']['awardAndPenalty']}}</td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            

            <tr>
                <td class="width13 " colspan="1" rowspan="3" style="border-left:1px solid #dddddd;">
                    <div style="width: 0.3rem;margin: auto">
                        <div style="float: left">
                            <span style="display: block">年</span>
                            <span style="display: block">度</span>
                            <span style="display: block">考</span>
                        </div>
                        <div style="float: right">
                            <span style="display: block">核</span>
                            <span style="display: block">结</span>
                            <span style="display: block">果</span>
                        </div>
                    </div>

                </td>
                <td colspan="6" rowspan="3" style="text-align: left;padding-left: 0.1rem">{{ DetailData['A01']['yearResult'] }}</td>
            </tr>
            <tr></tr>
            <tr></tr>

            <tr>
                <td class="width13 " colspan="1" rowspan="4" style="border-left:1px solid #dddddd;">
                    <span style="display: block">任</span>
                    <span style="display: block">免</span>
                    <span style="display: block">理</span>
                    <span style="display: block">由</span>

                </td>
                <td colspan="6" rowspan="4"></td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr>
                <td class="width13 " colspan="1" rowspan="9" style="border-left:1px solid #dddddd;">
                    <span style="display: block">家</span>
                    <span style="display: block">庭</span>
                    <span style="display: block">主</span>
                    <span style="display: block">要</span>
                    <span style="display: block">成</span>
                    <span style="display: block">员</span>
                    <span style="display: block">及</span>
                    <span style="display: block">重</span>
                    <span style="display: block">要</span>
                    <span style="display: block">社</span>
                    <span style="display: block">会</span>
                    <span style="display: block">关</span>
                    <span style="display: block">系</span>

                </td>
                <td style="width:10%;">称谓</td>
                    <td style="width:10%;">姓名</td>
                    <td style="width:10%;">年<br>龄</td>
                    <td style="width:10%;">政治<br>面貌</td>
                    <td colspan="2">工作单位及职务</td>
            </tr>
            <template  v-if="DetailData['A36']">
                <tr v-for="(item,index) in DetailData['A36']" :key="index">
                    <td >{{item['jrcall']}}</td>
                    <td >{{item['jrname']}}</td>
                    <!-- <td >{{item['jrbirthDay']}}</td> -->

                    <td >{{familyAges[index]}}</td>

                    <td >{{item['jrpolitics']}}</td>
                    <td colspan="2" style="text-align: left;padding-left: 0.1rem">{{item['jrjobPlace']}}</td>

                    <!-- <td v-for="(n,v) in lengthNum" :key="v"  ></td> -->
                </tr>
                <tr v-for="(n,v) in lengthNum" >
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td colspan="2"></td>
                </tr>
            </template>
                
            <template v-else>
                <tr v-for="(item,index) in arr" :key="index">
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td ></td>
                </tr>
            </template>
            <tr>
                    <td style="border-left:1px solid #dddddd;" class="width10 reminder" colspan="1" rowspan="5">
                        <span style="display: block">呈</span>
                        <span style="display: block">报</span>
                        <span style="display: block">单</span>
                        <span style="display: block">位</span>
                    </td>
                    <td colspan="6" rowspan="4" style="border-bottom:0"></td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr>
                    <td colspan="6" style=" text-align: right;padding-right:.2rem;">
                        &emsp;&emsp;年&emsp;&emsp;月&emsp;&emsp;日
                    </td>
                </tr>


                <tr>
                    <td style="border-left:1px solid #dddddd;" class="width10 reminder" colspan="1" rowspan="6">
                        <div style="width: 0.3rem;margin: auto">
                            <div style="float: left">
                                <span style="display: block">审</span>
                                <span style="display: block">批</span>
                                <span style="display: block">机</span>
                                <span style="display: block">关</span>
                            </div>
                            <div style="float: right">
                                <span style="display: block">意</span>
                                <span style="display: block">&nbsp;</span>
                                <span style="display: block">&nbsp;</span>
                                <span style="display: block">见</span>
                            </div>
                        </div>
                    </td>
                    <td style="border-bottom:0" colspan="4" rowspan="4"></td>
                    <td class="width10 reminder" style="width:10%;padding-left: 0.1rem;padding-right: 0.1rem" colspan="1"
                        rowspan="6">
                        <div style="width: 0.3rem;margin: auto">
                            <div style="float: left">
                                <span style="display: block">行</span>
                                <span style="display: block">政</span>
                                <span style="display: block">机</span>
                                <span style="display: block">关</span>
                            </div>
                            <div style="float: right">
                                <span style="display: block">任</span>
                                <span style="display: block">免</span>
                                <span style="display: block">意</span>
                                <span style="display: block">见</span>
                            </div>
                        </div>
                    </td>
                    <td style="border-bottom:0" rowspan="4"></td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr>
                    <td colspan="4" style="border-right:0;border-bottom:0; text-align: right; padding-right:.4rem;">(盖章)
                    </td>
                    <td style="border-bottom:0; text-align: right;padding-right:.4rem;">(盖章)</td>
                </tr>
                <tr>
                    <td colspan="4" style="border-right:0; text-align: right; padding-right:.2rem;">&emsp;&emsp;年&emsp;&emsp;月&emsp;&emsp;日</td>
                    <td style=" text-align: right; padding-right:.2rem;">&emsp;&emsp;年&emsp;&emsp;月&emsp;&emsp;日</td>
                </tr>

                <tr>
                    <td colspan="7" style="border-right:0;border-bottom:0; text-align:left; padding-right:.2rem;">&emsp;&emsp;填表人:</td>

                </tr>
            
        </table>



      





</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    pitch:1,
    arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    brr:[1,2,3,4,5,6,7,8,9],
    info:{
        name:'张三',
        sex :"男",
        birthDay :'1974.09',
        birthDay2 :'(44岁)',
        nation :'汉族',
        homeTown : '山西五台',   //籍贯
        birthPlace :"山西五台",  //出生地
        joinTime : '2004.06',   //入党时间
        workingTime :'1995.07', //参加工作时间
        healthState : '健康',  //健康状况
        specialityPost :'',  // 专业技术职务
        speciality : '',//熟悉专业有何专长
        educationTypeOne :'', //全日制教育
        educationTypeTwo :'', //在职教育
        graduateSchool1 :'', //毕业院校系及专业上
        graduateSchool2 :'', //毕业院校系及专业下
        jobNameL :'', //工作单位及职务全称
        resume :'', //简历


        awardAndPenalty :'',//奖罚情况
        yearResult :'', //年度考核结果



        JRname : '',	  //A3601   家人姓名
	    JRcall : '',	  //A3604A 家人称谓
	    JRbirthDay : '',	  //A3607 家人出生年月
	    JRpolitics : '',	  //A3627 家人政治面貌
	    JRjobPlace : '',	  //A3611 家人工作单位及职位

        // 是否考录
        // 录用时间
        // 是否选调生
        // 进入选调生时间	
        // 专业技术类公务员任职资格
        // 成长地
        // 级别
        // 备注


    },
    year:'',
    lengthNum : '',
    InfoExamination :'',//考录
    InfoTransferring:'', //选调生    
    DetailData :'',
    DetailsUrl : this.apiRoot +'jianliA01/findNameAndCard',   //任免表
    familyAges:[],    // 家人年龄
    InfoResume:[],   // 简历


};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   
   

    InitData(){
        // console.log(this.DetailData);
        let full = new Date().getFullYear();
        if(!this.DetailData['A01']['birthDay']) return;
        let str = (this.DetailData['A01']['birthDay']).substring(0,4);
        // console.log(this.DetailData['A01']['birthDay']);
        // console.log(full);
        this.year = parseInt(full) - parseInt(str);
        // console.log( this.year);

        if( this.DetailData['A36']){
            this.lengthNum =8 -this.DetailData['A36'].length;
            // console.log( this.lengthNum)
        }

        if(this.DetailData['A01']['examination']){
            if(this.DetailData['A01']['examination'] == 1){
                this.InfoExamination  = '是'
            }else{
                this.InfoExamination  = '否'
            }
        }

        if(this.DetailData['A01']['transferring']){
            if(this.DetailData['A01']['transferring'] == 1){
                this.InfoTransferring  = '是'
            }else{
                this.InfoTransferring  = '否'
            }
        }

        if(this.DetailData['A36']){
            this.DetailData['A36'].forEach(item => {
                // console.log(item);
                if(item['jrbirthDay']){
                    let old = item['jrbirthDay'].substring(0,4);
                    // console.log(old);
                    let now = new Date().getFullYear();
                    let newAges = parseInt(now)  - parseInt(old) ;
                    // console.log(newAges);
                    this.familyAges.push(newAges);

                }
                
            });

        }

        if(this.DetailData['A01']['resume']){
           this.InfoResume= ( this.DetailData['A01']['resume']).split(/\r/);
           console.log(this.InfoResume);
        }


        
        setTimeout(v=>{
            this.addPageSetting();
            this.print();
        },1500)


        // console.log(this.DetailData['A01']['resume'])



    },
    // 获取数据
    getData(){
        let aid = this.$route.query['info'];
        // console.log(aid);
        this.$http({
            method: 'post',
            url: this.DetailsUrl,
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = '';
                for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded','crossDomain': true},
            // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
            crossDomain: true,
            data: {
                Aid :aid
            }
        }).then(function (response) {
            this.DetailData ='';
            this.DetailData = response['data'][0];
            this.InitData();

            
        }.bind(this)).catch(function (error) {
            console.log(error);
        });
    },
    print() {
        document.getElementsByTagName('body')[0].style.zoom = 1;
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            var hkey_root, hkey_path, hkey_key;
            hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet" +
                "Explorer\\PageSetup\\";
            try {
                var RegWsh = new ActiveXObject("WScript.Shell");
                RegWsh.RegWrite(hkey_path + "header", "");
                RegWsh.RegWrite(hkey_path + "footer", "");
            } catch (e) {
            }
        }
        window.print();
        document.getElementsByTagName('body')[0].style.zoom = 1;
        // this.$router.go(-1)
        return false;
    },
    addPageSetting(){
        let styles=document.querySelectorAll('style');
        let style=styles[styles.length-1];
        console.log(style);
        style.innerHTML+='@page { size: A4 portrait; }';
        // console.log(style.innerHTML);
        // this.print();
    },



   





},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    // this.InitData();
    this.getData();
    

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {
    // this.InitData();

}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
// @page { size: portrait; }

// @page {
//         size: A4 portrait ;
//     }

table {
        width: 99.99%;
        height: 100%;
        border-collapse: collapse;
        font-size: .12rem;
        border-top: 1px solid #dddddd;
        // border-left:1px solid #dddddd;
        tr {
            height: .3rem;

            .width13 {
                width: 13%;
            }

            .width10 {
                width: 10%;
            }

            .width11 {
                width: 12%;
            }

            .width20 {
                width: 18%;
            }

            .width21 {
                width: 21%;
            }

            .reminder {

                // background: #fffbfb;
            }

            td {
                text-align: center;
                border-right: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;

                div{
                    .avatar{
                        width: 100%;
                        height: 100%;
                    }
                }
            }

        }
    }
    .ImgUrl{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        // border:1px  solid #cccccc;
    }

    .print{
        page-break-after:always
    }

/* 样式将只应用于打印 */
@media print {
    .avatar{
        width: 100%;
        height: 2rem!important;
    }
}

    // .frist_pages{

    // }
</style>