<!--  -->
<template>
<div class='FilterBox_wrap'>
    <!-- 左边close -->
    <div class="FilterBox_left" @click="closeBox">
        <div class="sh_btn">
            <i class="iconfont iconzhankai-"></i>
        </div>
    
    </div>
    <!-- 筛选条件 -->
    <div class="FilterBox_right">
        <!-- 基本信息筛选 -->
        <div>
            <div style="line-height:.51rem;height:.52rem;margin-top:.23rem;">
                <i class="iconfont iconjibenxinxi iconPic" style="margin-right:8px"></i> <span>基本信息筛选</span>
            </div>
            <div class="FilterBox_list_main">
                <div class="lineList" >
                    <el-select style="width:1.5rem;margin-left:.2rem;" v-model="sexValue" placeholder="性别" size='mini' >
                        <el-option
                        
                        v-for="item in sexs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>

                    <div class="ages_warp" style="display:flex;margin-left:.2rem;">
                        <span style="display:inline-block;margin-right:.1rem" class="demonstration">年龄</span>
                        <el-input v-model="age_lowest" placeholder="最低" size='mini'></el-input>—
                        <el-input v-model="age_highest" placeholder="最高" size='mini'></el-input>
                    </div>


                    <el-select style="margin-left:.2rem;width:1.5rem;" v-model="nationValue" placeholder="民族" size='mini'>
                        <el-option
                        v-for="item in nations"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="lineList">
                    <el-input style="width:1.5rem;margin-left:.2rem;" v-model="place" placeholder="请输入籍贯" size='mini'></el-input>

                    <el-select v-model="educationBg_one" placeholder="第一学历" size='mini' style="margin-left:.2rem;width:1.5rem;">
                        <el-option
                        v-for="item in educationBg"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select v-model="educationBg_two" placeholder="第二学历" size='mini' style="margin-left:.2rem;width:1.5rem;">
                        <el-option
                        v-for="item in educationBg"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>  
            </div>
        </div>

        <!-- 现职务信息筛选 -->
        <div>
            <div style="line-height:.51rem;height:.52rem;margin-top:.23rem;">
                <i class="iconfont iconzhiwu1 iconPic" style="margin-right:8px"></i> <span>现职务信息筛选</span>
            </div>
            <div class="FilterBox_list_main">
                <div class="lineList" >
                    <div class="ages_warp" style="display:flex;margin-left:.2rem;">
                        <span style="display:inline-block">所属部门及职务:</span>
                        <el-select v-model="department" placeholder="部门" size='mini' style="margin-left:.2rem;width:1.5rem;margin-right:.2rem;">
                            <el-option
                            v-for="item in departments"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        —
                        <el-select v-model="duty" placeholder="职务" size='mini' style="margin-left:.2rem;width:1.5rem;">
                            <el-option
                            v-for="item in dutys"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        
                    </div>
                </div>

                <div class="lineList">
                    <div class="ages_warp" style="display:flex;margin-left:.2rem;">
                        <el-select v-model="Joblevel" placeholder="职务层次" size='mini' style="margin-left:.2rem;width:1.5rem;">
                            <el-option
                            v-for="item in Joblevels"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>

                        <el-select v-model="CurrentLevel" placeholder="现职级" size='mini' style="margin-left:.2rem;width:1.5rem;">
                            <el-option
                            v-for="item in CurrentLevels"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>

                        <el-select v-model="personnel" placeholder="人员类别" size='mini' style="margin-left:.2rem;width:1.7rem;">
                            <el-option
                            v-for="item in personnels"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>

                        
                    </div>
                </div>

                <div class="lineList">
                    <div class="ages_warp" style="display:flex;margin-left:.2rem;">
                        <el-select v-model="manage" placeholder="管理类别" size='mini' style="margin-left:.2rem;width:1.5rem;">
                            <el-option
                            v-for="item in manages"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>


                        <el-select v-model="Compile" placeholder="编制类型" size='mini' style="margin-left:.2rem;width:1.5rem;">
                            <el-option
                            v-for="item in Compiles"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                       
                        <el-date-picker
                        value-format="yyyy-MM"
                        size='mini'
                        style="margin-left:.2rem;width:1.9rem;"
                        v-model="NewJoblevel"
                        type="month"
                        placeholder="任现职层次时间">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            
        </div>

        <!-- 公务员/党务信息筛选 -->
        <div>
            <div style="line-height:.51rem;height:.52rem;">
                <i class="iconfont icongongwuyuanniandukaoheshenqingbiaodandayin iconPic" style="margin-right:8px"></i> <span>公务员/党务信息筛选</span>
            </div>
            <div class="FilterBox_list_main">
                <div class="lineList" >
                    <el-date-picker
                    value-format="yyyy-MM"
                     size='mini'
                     style="margin-left:.2rem;width:1.5rem;"
                    v-model="employTime"
                    type="month"
                    placeholder="录用时间">
                    </el-date-picker>

            
                 
                    <el-date-picker
                    value-format="yyyy-MM"
                     size='mini'
                     style="margin-left:.2rem;width:1.5rem;"
                    v-model="joinTime"
                    type="month"
                    placeholder="入党时间">
                    </el-date-picker>
                </div>

                <div class="lineList">

                    <!-- <el-select v-model="sexValue" placeholder="专业技术类公务员任职资格" size='mini' style="margin-left:.2rem;width:3rem;">
                        <el-option
                        v-for="item in sexs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->

                    <el-select v-model="transferring" placeholder="是否为选调生" size='mini' style="margin-left:.2rem;width:1.5rem;">
                        <el-option
                        v-for="item in transferrings"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>  

                <div class="lineList">
                    <el-input style="width:1.5rem;margin-left:.2rem;" v-model="rewardPunishment" placeholder="奖惩情况" size='mini'></el-input>
                    <el-input style="width:1.5rem;margin-left:.2rem;" v-model="yearResult" placeholder="年度考核结果" size='mini'></el-input>
                </div>
            </div>
        </div>


        <!-- btn -->

        <div class="folterBox_BTN">
            <div class="fol_btn fol_sure" @click="fol_submit">确定</div>
            <div class="fol_btn fol_cancel" @click="fol_cancel">重置</div>

        </div>
    </div>





</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
props:['loading'],
components: {},
data() {
//这里存放数据
return {
    InitUrl:this.apiRoot+'dropdowndata/findZFWPullData',  //初始化数据
    InitQTUrl:this.apiRoot+'dropdowndata/findQTPullData',  //初始化数据


    // 性别 
    sexs:[
        {
            value: null,
            label: '全部'
        },
        {
            value: '1',
            label: '男'
        },
        {
            value: '2',
            label: '女'
        },
   
    ],
    sexValue :'',

    // 年龄
    age_highest: '',
    age_lowest:'',

    // 民族
    nations:[
        {
            value: 'all',
            label: '汉族'
        },
        {
            value: 'man',
            label: '回族'
        },
        {
            value: 'woman',
            label: '维吾尔族'
        },
    ],
    nationValue:'',
    // nationArr:'',

    // 籍贯
    place:'',

    // 第一学历
    // 小学  初中  高中  中专   大专   大学   研究生   博士
    educationBg:[
        {
            value: null,
            label: '不限'
        },
        {
            value: '小学',
            label: '小学'
        },
        {
            value: '初中',
            label: '初中'
        },
        {
            value: '高中',
            label: '高中'
        },
        {
            value: '中专',
            label: '中专'
        },
        {
            value: '大专',
            label: '大专'
        },
        {
            value: '大学',
            label: '大学'
        },
        {
            value: '研究生',
            label: '研究生'
        },
        {
            value: '博士',
            label: '博士'
        },
    ],

    educationBg_one :'',
    // 第二学历
    educationBg_two:'',


    // 所属部门及现职级:

    // 所属部门
    // departmentArr:'',
    department:'',
    departments:[
        {
            value: '部门1',
            label: '部门1'
        },
        {
            value: '部门2',
            label: '部门2'
        }

    ],
    

    // 职务
    duty:'',
    dutys:[
        {
            value: '职务1',
            label: '职务1'
        },
        {
            value: '职务2',
            label: '职务2'
        }

    ],



    // 现职级
    CurrentLevels:[
        {
            value: '现职级1',
            label: '现职级1'
        },
        {
            value: '现职级2',
            label: '现职级2'
        }

    ],
    CurrentLevel:'',

    // 职务层次
    Joblevel :'',
    Joblevels:[
        {
            value: '职务层次1',
            label: '职务层次1'
        },
        {
            value: '职务层次2',
            label: '职务层次2'
        }


    ],


    // 人员类别
    personnel :'',
    personnels:[
        {
            value: '人员类别1',
            label: '人员类别1'
        },
        {
            value: '人员类别2',
            label: '人员类别2'
        }
    ],

    // 管理类别
    manage:'',
    manages:[
        {
            value: '管理类别1',
            label: '管理类别1'
        },
        {
            value: '管理类别2',
            label: '管理类别2'
        }

    ],
    // 编制类型
    Compile:'',
    Compiles:[
        {
            value: '编制类型1',
            label: '编制类型1'
        },
        {
            value: '编制类型2',
            label: '编制类型2'
        }
    ],
    // 任现职层次时间
    NewJoblevel:'',
    NewJoblevels:[
        {
            value: '任现职层次时间1',
            label: '任现职层次时间1'
        },
        {
            value: '任现职层次时间2',
            label: '任现职层次时间2'
        }
    ],
    // 录用时间
    employTime:'',


    // 入党时间
    joinTime:'',

    // 专业技术类公务员任职资格
    // qualification:'',

    // 是否为选调生
    transferring:'',
    transferrings:[
        {
            value: '1',
            label: '是'
        },
        {
            value: '0',
            label: '否'
        }
    ],
    // 奖惩情况
    rewardPunishment :'',

    // 年度考核结果
    yearResult :'',













    

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 关闭
    closeBox(){
        this.$emit('closeBox',false);
    },
    fol_submit(){
        // 筛选 关闭
        // this.closeBox();
        // this.loading = true;
        let date = new Date();
        // 当前时间
        let year = date.getFullYear();
        console.log(year);
        console.log(typeof(this.age_highest))
        let highAage;
        let age_lowest; 
        if(this.age_highest&&this.age_lowest){
            // highAage =year - parseInt(this.age_lowest);
            // age_lowest =year - parseInt(this.age_highest);
              highAage =year - parseInt(this.age_lowest);
            age_lowest =year - parseInt(this.age_highest);

            if(age_lowest>highAage){
                this.age_highest = '';
                this.age_lowest = '';
                return;
            };
            console.log(highAage);
        }else if(!this.age_highest&&!this.age_lowest){
            highAage='';
            age_lowest='';
        }else if(this.age_highest&&!this.age_lowest){
            highAage=year;
            age_lowest=year - parseInt(this.age_highest);

        }else if(!this.age_highest&&this.age_lowest){
            highAage=year - parseInt(this.age_lowest);
            age_lowest=1500;

        };

        let NewJoblevelStr = '';
        let employTimelStr = '';
        let joinTimelStr = '';



        if(this.NewJoblevel){
            console.log(this.NewJoblevel);
            let qian = this.NewJoblevel.substring(0,4);
            let hou = this.NewJoblevel.substring(5,7);
            NewJoblevelStr = qian+hou


        }
        if(this.employTime){
            console.log(this.employTime);
            let qian = this.employTime.substring(0,4);
            let hou = this.employTime.substring(5,7);
            employTimelStr = qian+hou

        }
        if(this.joinTime){
            console.log(this.joinTime);
            let qian = this.joinTime.substring(0,4);
            let hou = this.joinTime.substring(5,7);
            joinTimelStr = qian+hou

        }




        
        let data = {
            sexValue : this.sexValue,  //性别
            age_highest : highAage,   //最高年龄
            age_lowest : age_lowest,   //最低年龄
            nationValue : this.nationValue,   //民族
            place: this.place, // 籍贯
            educationBg_one : this.educationBg_one , // 第一学历
            educationBg_two: this.educationBg_two , // 第二学历
            department: this.department, // 所属部门
            duty: this.duty, // 职务
            CurrentLevel: this.CurrentLevel, // 现职级
            Joblevel: this.Joblevel, // 职务层次
            personnel: this.personnel, // 人员类别
            manage: this.manage, // 管理类别
            Compile: this.Compile, // 编制类型
            NewJoblevel: NewJoblevelStr, // 任现职层次时间
            employTime: employTimelStr, // 录用时间
            joinTime: joinTimelStr, // 入党时间
            transferring: this.transferring, // 是否为选调生
            rewardPunishment : this.rewardPunishment,   //奖惩情况 
            yearResult : this.yearResult ,  //年度考核结果 
            NowPage: 1,
            Nums: 9,
        }
        
        for(let key in data){
            if(!data[key]){
                data[key] = '';
            }
        }

        console.log(data);


        this.$emit('fol_submit',data)

    },
    // 重置
    fol_cancel(){
        this.sexValue = '',
        this.age_highest = '',
        this.age_lowest = '',
        this.nationValue = '',
        this.place = '',
        this.educationBg_one = '',
        this.educationBg_two = '',
        this.department = '',
        this.duty = '',
        this.CurrentLevel = '',
        this.Joblevel = '',
        this.personnel = '',
        this.manage = '',
        this.Compile = '',
        this.NewJoblevel = '',
        this.employTime = '',
        this.joinTime = '',
        this.transferring = '',
        this.rewardPunishment = '',   //奖惩情况 
        this.yearResult = ''  //年度考核结果
    },
    //  数据处理
    ArrDispose(arr){
        let UnitObj = { value :'',  label :''};
        let BigObj = [
            {
                value :null,
                label :'不限'
            }
        ];
        arr.forEach(v => {
            UnitObj = { value :'',  label :''};
            UnitObj['value'] = v;
            UnitObj['label'] = v;
            BigObj.push(UnitObj);
        });
        // console.log(BigObj);
        return BigObj;
    },
    // 民族数据
    nationMethod(){
        let nations = ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",  
               "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",  
               "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",  
              "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"];  
        let arr = this.ArrDispose(nations);
        this.nations = arr;        

    },
    // 初始化数据
    getData(){
        let type = this.$route.path;
        let jieKou ;
        console.log(type);
        let params = '';
        switch (type) {
            case '/index/filtrate/Committee':
                params = ''
                jieKou = this.InitUrl;
                break;
            case '/index/filtrate/publicSecurity':
                params = 'gaj';
                jieKou = this.InitQTUrl;
                break;
            case '/index/filtrate/procuratorate':
                params = 'jcy';
                jieKou = this.InitQTUrl;
                break;    
            case '/index/filtrate/court':
                params = 'fy';
                jieKou = this.InitQTUrl;
                break;
            case '/index/filtrate/justiceBureau':
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
            console.log(res);    
            let arr ;
            // 部门
            let department =  res['data']['department'];
            arr = this.ArrDispose(department);
            this.departments = arr;

            // 职务
            let dutys =  res['data']['present_duties'];
            arr = this.ArrDispose(dutys);
            this.dutys = arr;

            // 职务层次  ;
            let Joblevels =  res['data']['duty_level'];
            arr = this.ArrDispose(Joblevels);
            this.Joblevels = arr;

            // 现职级    current_level
            let CurrentLevels =  res['data']['current_level'];
            arr = this.ArrDispose(CurrentLevels);
            this.CurrentLevels = arr;
            
            // 人员类别 
            let personnels =  res['data']['personnel_category'];
            arr = this.ArrDispose(personnels);
            this.personnels = arr;

            // 管理类别  manages
            let manages =  res['data']['management_category'];
            arr = this.ArrDispose(manages);
            this.manages = arr;

            // 编制类型 
            let Compiles =  res['data']['compilation_type'];
            arr = this.ArrDispose(Compiles);
            this.Compiles = arr;
        }.bind(this)).catch(error=>{
            console.log(error);
        })
    },
    





},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.nationMethod();
    this.getData();

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.FilterBox_wrap{
    position: relative;
    display: flex;
    border: 1px solid #eeeeee;
    // border-right: 0;
    border-left:0; 
    z-index: 2000;
    position: absolute;
    width: 50%;
    height: 100%;
    right: 0;
    top: 0;
    .FilterBox_left{
        position: relative;
        width: .4rem;
        background: linear-gradient(to right,rgba(239,53,16,1),rgba(210,0,2,1));
        cursor: pointer;
        .sh_btn{
            position: absolute;
            left: 0;
            top: 48%;
            text-align: center;
            color: #fff;
            display: inline-block;
            vertical-align: middle;
            width: 100%;
            height: .35rem;
            // background-image:url("../../../../public/static/images/common/sxBtn.png");
            background-size: contain;

        }

    }
    .FilterBox_right{
        position: relative;
        flex: 1;
        background-color: #fff;
        padding-left: .2rem;
        .FilterBox_list_main{
            background-color: #fef8f7;
            .lineList{
                display:flex;
                height:.56rem;
                line-height:.55rem;
            }


        }
        .ages_warp{
            position: relative;
            .el-input{
                width: .8rem;
            }
            
            div{
                float: left;
            }
            span{
                display: inline-block;
            }
            
            display: inline-block;
            .ages_inputs{
                    &::placeholder{
                        color: #DCDFE6;
                    };
                    height: 28px;
                    line-height: 28px;
                    display: inline-block;
                    background-color: #FFF;
                    background-image: none;
                    border-radius: 4px;
                    border: 1px solid #DCDFE6;
                    box-sizing: border-box;
                    color: #606266;
                    display: inline-block;
                    font-size: inherit;
            }
        }
        .folterBox_BTN{
            position: absolute;
            text-align: center;
            left: 0;
            bottom: .5rem;
            width: 100%;
            .fol_btn{
                display: inline-block;
                width: .8rem;
                height: .32rem;
                line-height: .32rem;
            }
            .fol_sure{
                background: linear-gradient(rgba(239,53,16,1),rgba(210,0,2,1));
                color: #fff;
                cursor: pointer;
            }
            .fol_cancel{
                cursor: pointer;
                color: #d20002;
            }
            
        }
    }

    .line{
        height: .4rem;
        line-height: .4rem;
        overflow: hidden;
    }
    .iconPic{
        color: #e82f15;
    }
   
}
</style>