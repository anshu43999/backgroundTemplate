<!--  -->
<template>
<div class='infoDetails_wrap'>
    <div class="infoDetails_header">
        <div class="infoDetails_header_close" @click="info_header_close">
            ×
        </div>
    </div>

    <div class="infoDetails_main">
      
        <table  v-if="pitch === 1">
            <tr>
                <td rowspan="2" style="height:.3rem" class="width13 reminder">姓 名</td>
                <td rowspan="2" class="width10">{{DetailData['A01']['name']}}</td>
                <td rowspan="2" class="width13 reminder">性 别</td>
                <td rowspan="2" class="width11">{{DetailData['A01']['sex']}}</td>
                <td rowspan="2" class="width13 reminder">出生年月</td>
                <td rowspan="1" class="width20" style="border-bottom: 0;padding:0">{{DetailData['A01']['birthDay']}}</td>
                <td class="width21" rowspan="6" > 
                    <div class="ImgUrl" :style="{ backgroundImage: 'url(data:image/png;base64,' + this.DetailData['url'] + ')' }">
                    </div>
                    <!-- <img style="width:100%;height:100%;" :src="'data:image/png;base64,' + this.DetailData['url'] "> -->
                </td>
            </tr>
            <tr>
                <td>{{year+'岁'}}</td>
            </tr>
            <tr>
                <td rowspan="2" class="reminder">民 族</td>
                <td rowspan="2">{{DetailData['A01']['nation']}}</td>
                <td rowspan="2" class="reminder">籍 贯</td>
                <td rowspan="2">{{DetailData['A01']['homeTown']}}</td>
                <td rowspan="2" class="reminder">出生地</td>
                <td rowspan="2" >{{DetailData['A01']['birthPlace']}}</td>
                <!-- <td> </td> -->
            </tr>

            <tr></tr>


            <tr>
                <td class="reminder">入党时间</td>

                <td v-if="DetailData['A39']['joinTime']">{{DetailData['A39']['joinTime']}}</td>
                <td v-else></td>


                
                
                <td class="reminder">参加工<br>作时间</td>
                <td>{{DetailData['A01']['workingTime']}}</td>
                <td class="reminder">健康状况</td>
                <td>{{DetailData['A01']['healthState']}}</td>
                <!-- <td> </td> -->
            </tr>
            <tr>
                <td class="reminder">专业技<br>术职务</td>
                <td colspan="2">{{DetailData['A01']['specialityPost']}}</td>
                <td class="reminder">熟悉专业<br>有何特长</td>
                <td colspan="2">{{DetailData['A01']['speciality']}}</td>
                <!-- <td> </td> -->
            </tr>

            <template v-if="DetailData['A08'][0]">
                <tr>
                    <td class="reminder"  rowspan="4">学历<br> 学位</td>
                    <td class="reminder" rowspan="2">全日制<br>教育</td>


                    <td style="border-bottom:0" colspan="2">{{DetailData['A08'][0]['educational']}}</td>
                    
                    
                    <td class="reminder" rowspan="2">毕业院校<br>系及专业 </td>
                    <td v-if="DetailData['college'][0]"  rowspan="2" colspan="2">{{DetailData['college'][0]['college']}}</td>
                    <td v-else rowspan="2" colspan="2"></td>

                </tr>
                <tr>
                    <!-- <td  colspan="2"></td> -->
                    <td  colspan="2">{{DetailData['A08'][0]['degree']}}</td>
                </tr>
                <tr>
                    <td class="reminder" rowspan="2">在职<br>教育</td>


                    <td v-if="DetailData['A08'][1]" style="border-bottom:0"  colspan="2">{{DetailData['A08'][1]['educational']}}</td>
                    <td v-else style="border-bottom:0"  colspan="2"></td>
                    
                    
                    <td class="reminder" rowspan="2">毕业院校<br>系及专业</td>
                    <td v-if="DetailData['college'][1]" rowspan="2" colspan="2">{{DetailData['college'][1]['college']}}</td>
                    <td v-else rowspan="2" colspan="2"></td>
                </tr>
                <tr>
                    <!-- <td  colspan="2"></td> -->
                    <td v-if="DetailData['A08'][1]"  colspan="2">{{DetailData['A08'][1]['degree']}}</td>
                    <td v-else  colspan="2"></td>
                </tr>

            </template>

            <template v-else>
                <tr>
                    <td class="reminder"  rowspan="4">学历<br> 学位</td>
                    <td class="reminder" rowspan="2">全日制<br>教育</td>


                    <td style="border-bottom:0" colspan="2"></td>
                    
                    
                    <td class="reminder" rowspan="2">毕业院校<br>系及专业 </td>
                    <!-- <td v-if="DetailData['college'][0]"  rowspan="2" colspan="2"></td> -->
                    <td  rowspan="2" colspan="2"></td>

                </tr>
                <tr>
                    <!-- <td  colspan="2"></td> -->
                    <td  colspan="2"></td>
                </tr>
                <tr>
                    <td class="reminder" rowspan="2">在职<br>教育</td>


                    <!-- <td v-if="DetailData['A08'][1]" style="border-bottom:0"  colspan="2">{{DetailData['A08'][1]['educational']}}</td> -->
                    <td  style="border-bottom:0"  colspan="2"></td>
                    
                    
                    <td class="reminder" rowspan="2">毕业院校<br>系及专业</td>
                    <!-- <td v-if="DetailData['college'][1]" rowspan="2" colspan="2">{{DetailData['college'][1]['college']}}</td> -->
                    <td  rowspan="2" colspan="2"></td>
                </tr>
                <tr>
                    <!-- <td  colspan="2"></td> -->
                    <!-- <td v-if="DetailData['A08'][1]"  colspan="2">{{DetailData['A08'][1]['degree']}}</td> -->
                    <td  colspan="2"></td>
                </tr>


            </template>
            




            <tr>
                <td class="reminder" colspan="2">工作单位及职务</td>
                <td  colspan="5">{{DetailData['A01']['jobNameL']}}</td>
            </tr>
            <tr>
                <td class="reminder" rowspan="40">
                    简历
                </td>
                <td  rowspan="40" colspan="6" style="position: relative;">
        
                        <div style="font-size:.12rem;width:90%; margin-right:.2rem; white-space: pre-wrap; text-align:left;padding-left:.2rem;" v-html="DetailData['A01']['resume']">
                        </div>
                </td>
            </tr>
            
            <!-- <template>
                <tr v-for="(item,index) in strArray" :key="index">
                    <td  colspan="6">
                        {{item}}


                    </td>
                </tr>   
            </template> -->

        </table>

  
        



        <table v-if="pitch === 2">
            <tr>
                <td class="width13 reminder" colspan="1" rowspan="3">奖罚情况</td>
                <td colspan="5" rowspan="3">{{DetailData['A01']['awardAndPenalty']}}</td>
            </tr>
            <tr></tr>
            <tr></tr>

            <tr>
                <td class="width13 reminder" colspan="1" rowspan="3">年度考核结果</td>
                <td colspan="5" rowspan="3">{{ DetailData['A01']['yearResult'] }}</td>
            </tr>
            <tr></tr>
            <tr></tr>
        
            <tr>
                <td class="width13 reminder" colspan="1" rowspan="14">家庭主要成员及重要社会关系</td>
                <td >称谓</td>
                <td >姓名</td>
                <td >出生日期</td>
                <td >政治面貌</td>
                <td >工作单位及职务</td>
            </tr>
            <template  v-if="DetailData['A36']">
                <tr v-for="(item,index) in DetailData['A36']" :key="index">
                    <td >{{item['jrcall']}}</td>
                    <td >{{item['jrname']}}</td>
                    <td >{{item['jrbirthDay']}}</td>
                    <td >{{item['jrpolitics']}}</td>
                    <td >{{item['jrjobPlace']}}</td>

                    <!-- <td v-for="(n,v) in lengthNum" :key="v"  ></td> -->
                </tr>
                <tr v-for="(n,v) in lengthNum" >
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td ></td>
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
            
        </table>

        <table v-if="pitch === 3">
            <tr>
                <td class="reminder" style="width:25%" colspan="2">是否考录</td>
                <td style="width:25%">{{InfoExamination}}</td>
                <td class="reminder" style="width:25%" >录用时间</td>
                <td style="width:25%">{{DetailData['A01']['employTime'] }}</td>
            </tr>
            <tr>
                <td class="reminder" style="width:25%" colspan="2">是否选调生</td>
                <td style="width:25%">{{InfoTransferring}}</td>
                <td class="reminder" style="width:25%" >进入选调生时间</td>
                <td style="width:25%">{{DetailData['A01']['transferringTime']}}</td>
            </tr>
            <tr>
                <td class="reminder" style="width:25%" colspan="2">专业技术类公<br>务员任职资格</td>
                <td style="width:25%"></td>
                <td class="reminder" style="width:25%" >成长地</td>
                <td style="width:25%">{{DetailData['A01']['grow_old']}}</td>
            </tr>
            <tr>
                <td class="reminder" style="width:25%" colspan="2">级别</td>
                <td style="width:25%">{{DetailData['A01']['level']}}</td>
                <td class="reminder" style="width:25%" colspan="2"></td>
                <!-- <td style="width:25%"></td> -->
            </tr>
            <tr>
                <td class="reminder" style="width:12.5%" rowspan="10">备注</td>
                <td colspan="4" rowspan="10"></td>
            </tr>
            <tr v-for="(item,index) in brr" :key="index">
                <!-- <td ></td>
                <td ></td>
                <td ></td>
                <td ></td>
                <td ></td> -->
            </tr>

            <tr>
                <td class="reminder" style="width:100%" rowspan="10" colspan="5"></td>
                <!-- <td colspan="4" rowspan="10"></td> -->
            </tr>

        </table>

        
       


    </div>
     <!-- 表切换按钮 -->
    <div class="infoDetails_pages" >
        <span :class="[pitch === 1? 'active':'Unactive' ,'infoDetails_export', 'infoDetails_btns']" @click="choose(1)">任免审批表（一）</span>
        <span :class="[pitch === 2? 'active':'Unactive' ,'infoDetails_export' ,'infoDetails_btns']" @click="choose(2)">任免审批表（二）</span>
        <span :class="[pitch === 3? 'active':'Unactive' ,'infoDetails_print' ,'infoDetails_btns']" @click="choose(3)">其他信息 </span>


    </div>


    <div class="infoDetails_btn" >
        <span class="infoDetails_export infoDetails_btns"   @click="ExportDetail" >导出表</span>
        <span class="infoDetails_print infoDetails_btns" @click="PrintDetail">打印表</span>

    </div>



</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
props:['DetailData'],
components: {},
data() {
//这里存放数据
return {
    pitch:1,
    arr:[1,2,3,4,5,6,7,8,9,10,11,12,13],
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
    strArray:[], 
    



};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 关闭按钮
    info_header_close(){
        this.$emit('info_header_close')

    },
    // 选择展示内容
    choose(v){
        this.pitch =v; 
    },

    InitData(){
        console.log(this.DetailData);
        let full = new Date().getFullYear();
        if(!this.DetailData['A01']['birthDay']) return;
        let str = (this.DetailData['A01']['birthDay']).substring(0,4);
        console.log(this.DetailData['A01']['birthDay']);
        console.log(full);
        this.year = parseInt(full) - parseInt(str);
        console.log( this.year);

        if( this.DetailData['A36']){
            console.log(this.DetailData['A36'].length)
            this.lengthNum =13 -this.DetailData['A36'].length;
            console.log( this.lengthNum)
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


        // console.log(this.DetailData['A01']['resume']);
        let oldStr = this.DetailData['A01']['resume'];
        console.log(oldStr);
        let newStr = oldStr.replace(/\r\n/g,"<br>");
        this.strArray= oldStr.split(/\r/);

        


        // console.log(strArray);


    },
    // ExportDetail
    ExportDetail(){
        // Aid: 000000100000506ba6e400097810ffa72c232ba2f5b2d
        // console.log(this.DetailData['A01']['aid'])
        var loadiframe=document.getElementById('fordownload2');
        console.log(loadiframe);
        loadiframe.src=this.apiRoot+'jianliA01/ExportJianLi?id='+this.DetailData['A01']['aid'];

        // loadiframe.src=this.apiRoot+'jianliA01/ExportJianLi?id=00000010000051ef2c24665c3e9fbf1b74e15e65f0959';

    },


    // PrintDetail
    PrintDetail(){
        // console.log(this.DetailData['A01']['aid'])
        this.$router.push({path:'/filtrate/print',query:{info :(this.DetailData['A01']['aid'])   }  })

    }





},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.InitData();

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
.infoDetails_wrap{
    height: 99%;
    width: 41%;
    position: absolute;
    // background-color: red;
    left: 25%;
    top: 0;
    z-index: 999;
    box-shadow: 0px 4px 5px 0px 
		rgba(0, 0, 0, 0.33);
    background-color:#ffffff;
    .infoDetails_header{
        height: .3rem;
        background:linear-gradient(rgba(214,89,107,1),rgba(235,90,61,1));
        .infoDetails_header_close{
            width: .3rem;
            height: .3rem;
            text-align: center;
            line-height: .29rem;
            font-size: .16rem;
            float: right;
            color: #ffffff;
            cursor: pointer;
        }
    }
    .infoDetails_main{
        position: relative;
        height:calc(100% - .3rem );
        // max-height:calc(100% - .3rem );
        // height: 100%;
        

        
        padding: .21rem  .3rem .33rem .27rem;
        overflow-y: auto;
        overflow-x:visible;
        .infoDetails_info{
            width: 100%;
            height: calc(100%);
        }

        table{
        
            table-layout:fixed;word-break:break-all;
      
            // transform: scale(.8);
            width: 99.99%;
            height: 100%;
            border-collapse:collapse;
            font-size: .12rem;
            border-top:1px solid #dddddd;
            border-left:1px solid #dddddd;
            tr{
                .width13{
                    width: 13%;
                }
                .width10{
                    width: 10%;
                }
                .width11{
                     width: 12%;
                }
                .width20{
                    width: 18%;
                }
                .width21{
                    width: 21%;
                }
                .reminder{
                    background: #fffbfb;
                }

                td{
                    text-align: center;
                    border-right:1px solid #dddddd;
                    border-bottom:1px solid #dddddd;
                }
            }

            

        }

        .table1{
            
            // transform: scale(.8);
            width: 99.99%;
            height: 50%;
            overflow: hidden;
            border-collapse:collapse;
            font-size: .12rem;
            border-top:1px solid #dddddd;
            border-left:1px solid #dddddd;
            tr{
                .width13{
                    width: 13%;
                }
                .width10{
                    width: 10%;
                }
                .width11{
                     width: 12%;
                }
                .width20{
                    width: 18%;
                }
                .width21{
                    width: 21%;
                }
                .reminder{
                    background: #fffbfb;
                }

                td{
                    text-align: center;
                    border-right:1px solid #dddddd;
                    border-bottom:1px solid #dddddd;
                }
            }

            

        }

    }
    .infoDetails_btn{
        width: 100%;
        // height: 100%;
        font-size: .12rem;
        position: absolute;
        left: 0;
        bottom: .1%;
        // margin-top:.2rem; 
        text-align: left;
        .infoDetails_btns{
            cursor: pointer;
            display: inline-block;
            // background: linear-gradient(rgba(255,210,115,1),rgba(252,136,51,1));
            background: linear-gradient(rgba(214,89,107,1),rgba(235,90,61,1));
            width: .7rem;
            height: .24rem;
            text-align: center;
            line-height: .23rem;
            color: #ffffff;

        }
        .infoDetails_export{
            margin-right: .1rem;
            margin-left: .5rem;

           
        }
    }
    .infoDetails_pages{
        font-size: .12rem;
        position: absolute;
        right: -19%;
        top: .5rem;
        margin-top:.2rem; 
        text-align: right;
        .infoDetails_btns{
            cursor: pointer;
            display: block;
            // background: linear-gradient(rgba(214,89,107,1),rgba(235,90,61,1));
            width: 1.4rem;
            height: .32rem;
            text-align: center;
            line-height: .31rem;
            color: #ffffff;

        }
        .active{
            background: linear-gradient(rgba(214,89,107,1),rgba(235,90,61,1));
        }
        .Unactive{
            background: #fae1dd;
        }

        .infoDetails_export{
            margin-bottom: .1rem;
           
        }
       
        

    }
    .ImgUrl{
        width: 100%;
        min-height: 100%;
        overflow: hidden;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
}
</style>