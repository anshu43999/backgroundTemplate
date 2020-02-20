<template>
    <div id="analysis">
        <div class="row1">
            <!--            性别-->
            <div class="sexBox my-sexBox chartBox">
                <sex :sex-data="sexData" ref="sexChart"></sex>
            </div>
            <!--            年龄-->
            <div class="ageBox chartBox" v-if="!smallScreen">
                <age :age-data="ageData" ref="ageChart"></age>
            </div>
            <!--            职务年限-->
            <div class="dutyAgeBox chartBox">
                <duty-age :duty-age-data="dutyAgeData" ref="dutyAgeChart"></duty-age>
            </div>
        </div>
        <!--        小分辨率显示-->
        <div class="row3" v-if="smallScreen">
            <div class="ageBox chartBox">
                <age :age-data="ageData" ref="ageChart"></age>
            </div>
        </div>
        <div class="row2">
            <!--            学历-->
            <div class="eduBox chartBox">
                <edu :edu-data="eduData" ref="eduChart"></edu>
            </div>
            <!--            职务层次-->
            <div class="jobLevelBox chartBox">
                <job-level :job-level-data="jobLevelData" ref="jobLevelChart"></job-level>
            </div>
        </div>
    </div>
</template>

<script>
    import Sex from "../echarts/Sex";
    import Age from "../echarts/Age";
    import DutyAge from "../echarts/DutyAge";
    import JobLevel from "../echarts/JobLevel";
    import Edu from "../echarts/Edu";
    export default {
        name: "Analysis",
        data(){
            return {
                screenWidth:0,
                smallScreen:false
            }
        },
        props:['sexData','ageData','dutyAgeData','jobLevelData','eduData'],
        components:{
            Sex,
            Age,
            DutyAge,
            JobLevel,
            Edu
        },
        methods:{
            getWindowSize(){
                let wsize=window.innerWidth;
                this.screenWidth=wsize;
                let sexBox=document.querySelector('.sexBox');
                let dutyAgeBox=document.querySelector('.dutyAgeBox');
                if (this.screenWidth<=1284){
                    this.smallScreen=true;
                }else {
                    this.smallScreen=false;
                }
            },
            render(){
                this.$refs.sexChart.sexEchart();
                this.$refs.ageChart.ageEchart();
                // this.$refs.ageBox.ageEchart();
                this.$refs.dutyAgeChart.dutyAgeEchart();
                this.$refs.jobLevelChart.jobLevelChart();
                this.$refs.eduChart.eduChart();
            }
        },
        mounted() {
            this.getWindowSize();
            window.onresize= ()=> {
                this.getWindowSize();
                this.$router.go(0);
                this.render();
            };
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/style/index/Home.css";
    .echartsTitle.my-sexBox{
        text-align: center;
    }
    #analysis{
        width: 100%;
        min-height: 100%;
        .chartBox{
            height: 100%;
            background-color: #fff;
            box-shadow: 0px 2px 6px 0px rgba(191, 191, 191, 0.75);
            overflow: hidden;
            margin-right: 2%;

            &:last-child{
                margin: 0;
            }
        }
        /*.row3{*/
        /*    display: none;*/
        /*}*/
        .row1,.row2,.row3{
            width: 100%;
            margin-bottom: 0.39rem;
            height: 4rem;
            &:after{
                content: "";
                display: block;
                height: 0;
                clear:both;
                visibility: hidden;
            }
            /*性别*/
            .sexBox{
                width: 18%;
                min-width: 2.6rem;
                float: left;
                .echartsTitle{
                    text-align: center;
                    padding: 0.11rem 0.17rem;
                }
            }
            /*年龄*/
            .ageBox{
                width: 43%;
                float: left;
            }
            /*职务年限*/
            .dutyAgeBox{
                width: 35%;
                float: left;
            }
            /*学历*/
            .eduBox{
                width: 32%;
                height: 5rem;
                float: left;
            }
            /*职务层次*/
            .jobLevelBox{
                width: 66%;
                height: 5rem;
                float: left;
            }
        }
        .row2{
            height: auto;
            margin: 0;
        }
    }
    @media screen and (max-width:1284px) {
        .dutyAgeBox{
            width: calc(100% - 3.4rem)!important;
            float: right!important;
        }
        .pageBox{
            min-width: 8rem!important;
        }
        .sexBox{
            width: 3rem!important;
        }
        .row3{
            display: block!important;
            .ageBox{
                width: 100%!important;
            }
        }
        .row1>.ageBox{
            display: none!important;
        }
    }

    @media screen and (max-width:1284px){
        .dutyAgeBox{
            width: calc(100% - 3.4rem)!important;
            float: right!important;
        }
        .pageBox{
            min-width: 8rem!important;
        }
        .sexBox{
            width: 3rem!important;
        }
        .row3{
            display: block!important;
            .ageBox{
                width: 100%!important;
                /*height: 3.29rem!important;*/
            }
        }
        .row1>.ageBox{
            display: none!important;
        }
    }
</style>