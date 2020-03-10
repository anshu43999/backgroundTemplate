<!--  -->
<template>
<div class=''>
    <div class="printTitle"><span>太原市{{dateArr.yyyy}}年{{dateArr.MM}}月{{dateArr.dd}}日12110短信报警抽取日志表</span></div>
    <div class="optionsSum">
        <div>日期 <span>{{time}}</span> </div>
        <div>传输总量: <span>{{pushQuery.number}}</span> </div>
        <div>传输次数： <span>{{pushQuery.transmissionCapacity}}</span> </div>
        <div>传输设备数： <span>{{pushQuery.ipNumber}}</span> </div>
    </div>

    <table>
        <tr>
            <td style="width:15% ;border-left:1px solid #dddddd; ">时间</td>
            <td style="width:30% ">单位</td>
            <td style="width:30% ">ip地址</td>
            <td>传输量</td>
        </tr>

        <tr v-for="(item,index) in tableData" :key="index">
            <td style="border-left:1px solid #dddddd; ">{{item['time']}}</td>
            <td>{{item['unitName']}}</td>
            <td>{{item['ip']}}</td>
            <td>{{item['transmissionCapacity']}}</td>
        </tr>

    </table>

</div>
</template>

<script>
import { setTimeout } from 'timers';
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mapGetters,mapMutations} from 'vuex'
import Qs from 'qs'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    ExcelInfo :'',
    tableData : [],
    time : '',
    // title 时间
    dateArr : {
        yyyy :'',
        MM:'',
        dd:''
    },
    urlPort : [this.apiRoot+'log/findDetails'],
    pushQuery : {},
};
},
//监听属性 类似于data概念
computed: {
    ...mapGetters(['userId'])
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

    getData(){
        this.time = this.$route.query.time;
        this.pushQuery = this.$route.query;
        let arr = this.time.split('.');
        this.dateArr.yyyy = arr[0];
        this.dateArr.MM = arr[1];
        this.dateArr.dd = arr[2];

        let newTime = this.time.replace(/\./g,'-');

        let data = {
            xzqh: this.userId,
            time : newTime
        }
        this.$http({
            method: 'post',
            url: this.urlPort[0],
            data: Qs.stringify(data)
        })
        .then(function (res) {
            this.tableData =  res.data;

            this.InitExcel();
        }.bind(this))
    },



    InitExcel(){
        this.addPageSetting();
        setTimeout(v=>{
            this.addPageSetting();
            this.print();
        },1500)
    },
    print(){
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
        //  console.log(style);
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

// @page {
//         size: A4 portrait;
//     }

.printTitle{
    display: flex;
    justify-content: center;
    font-size: 20px;
    margin-bottom:20px; 
}


.optionsSum{
    display: flex;
    >div{
        width: 25%;
        text-align: center;
        margin-bottom:10px; 
    }
}

table{
        width: 99.99%;
        height: 100%;
        border-collapse:collapse;
        font-size: .12rem;
        border-top:1px solid #dddddd;
        // border-left:1px solid #dddddd;
        tr{
            height: .3rem;
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
                
                // background: #fffbfb;
            }

            td{
                text-align: center;
                border-right:1px solid #dddddd;
                border-bottom:1px solid #dddddd;
            }

        }
    }
</style>