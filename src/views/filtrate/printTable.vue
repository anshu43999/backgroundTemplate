<!--  -->
<template>
<div class=''>
    <table>
        <tr>
            <td style="width:8% ;border-left:1px solid #dddddd; ">序号</td>
            <td style="width:8% ">姓名</td>
            <td style="width:20% ">身份证号</td>
            <td>工作单位及职务(全称)</td>
            <td style="width:8% ">职务层次</td>
            <td style="width:8% ">任现职务层次时间</td>
            <td style="width:13% ">现职级</td>
            <td style="width:15% ">任现职级时间</td>
        </tr>

        <tr v-for="(item,index) in ExcelInfo" :key="index">
            <td style="border-left:1px solid #dddddd; ">{{index+1}}</td>
            <td>{{item['name']}}</td>
            <td>{{item['idCard']}}</td>
            <td>{{item['jobNameL']}}</td>
            <td>{{item['jobLevel']}}</td>
            <td>{{item['jobLevelTime']}}</td>
            <td>{{item['grade']}}</td>
            <td>{{item['gradeTime']}}</td>
        </tr>

    </table>

</div>
</template>

<script>
import { setTimeout } from 'timers';
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    ExcelInfo :'',
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    InitExcel(){
        let data =JSON.parse( this.$route.query.info);
        console.log(data);
        this.ExcelInfo = data;
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
         console.log(style);
        style.innerHTML+='@page { size: A4 landscape; }';
        // console.log(style.innerHTML);
        // this.print();

    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.InitExcel(); 
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
//         // size: A4 landscape;
//     }
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