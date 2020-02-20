<!--  -->
<template>
<div class='query_wrap'>
    <div class="query_left">
        <i class="iconfont iconchaxun"  style="color:#fe5e27;margin-right:.1rem;"></i>
        <span>精确查询</span>
    </div>
        <input class="query_inputs" style="width: 1.6rem;"  type="text" v-model="name" placeholder="请输入姓名">
    <!-- <div class="Idcard_warp"> -->
        <input class="query_inputs" style="width:2.3rem"  type="text"  min="0" max="18"  v-model="IdCard" placeholder="请输入身份证号">
    <!-- </div> -->
    

    <div class="btn_query" @click="query_submit">确定</div>
    <span v-show="hint_error" class="query_hint">请输入正确身份证号</span>
    <div class="screen btn_options_screen" v-on:click = "startSX"> <span class="screen_left"> <i class="iconfont iconshaixuan"></i>  </span> <span class="screen_right">条件筛选</span></div>

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
    name : '',
    IdCard : '',
    hint_error:false,
};
},
//监听属性 类似于data概念
computed: {
    // _IdCard:{
    //     get:function(){
    //     return this.IdCard;
    //     },
    //     set:function(newValue){
    //         // this.IdCard=newValue.replace(/[^\d]/g,'');
    //         // if(!this.IdCard){
    //         //     this.IdCard = null
    //         // }
    //     }

    // }
    

},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 提交
    query_submit(){
        this.hint_error = false;

        if(this.IdCard){
            var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            if(idcardReg.test(this.IdCard)) {
                // 合法
                // console.log('合法');
            }else{
                this.hint_error = true;
                return;
            }
        }
        let data = {
            name : this.name,
            idCard : this.IdCard
            // idCard : null

        }
        this.$emit('query_submit',data)
          
    },
    startSX(){
        this.$emit('Boxchange','show');
    },
 
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
.query_wrap{
    position: relative;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    display: flex;
    height: .6rem;
    line-height: .59rem;

    .query_left{
        width: 1.4rem;
        text-align: center;
    }
    
    
    .query_inputs{
        
        height: .4rem;
        margin-top: .1rem;
        margin-right: .32rem;
        font-size: .14rem;
        padding-left:.2rem; 
        &::placeholder{
            color: #a9a9a9
        }
        border: 1px solid #e7e7e7;
        outline:none;
    }
    .btn_options_screen{
        margin-left: 1rem;
        overflow: hidden;
        display: flex;
        border-radius:.23rem; 
        cursor: pointer;
        margin-top:.14rem; 
        width: 1.61rem;
        height: .36rem;
        line-height: .39rem;
        text-align: center;
        color: #ffffff;
        // background-image:url("../../../../public/static/images/common/sxbg.png");
        background-image: linear-gradient(0deg, 
            #e5322a 0%, 
            #e84b44 26%, 
            #eb635d 52%, 
            #e5322a 100%), 
        linear-gradient(0deg, 
            #170209 0%, 
            #ebf1ef 100%);
        background-blend-mode: normal, 
            normal;
        box-shadow: 0px 2px 3px 0px 
            rgba(0, 0, 0, 0.75);
        border-radius: 23px;
        background-size: cover;
        .screen_left{
            width: 30%;
            background-image: linear-gradient(0deg, 
                #fff7b9 0%, 
                #fff9cc 26%, 
                #fffbde 52%, 
                #fff7b9 100%), 
            linear-gradient(
                #fff7b9, 
                #fff7b9);
            background-blend-mode: normal, 
                normal;
            color:#fbab56;    
        }
        .screen_right{
            width: 70%;
            text-align: center;
        }

    }
}


.btn_query{
    cursor: pointer;
    width: .8rem;
    height: .32rem;
    line-height: .31rem;
    text-align: center;
    margin-top: .14rem;
    margin-left: .25rem;
    background: linear-gradient(to right, rgba(239,53,16,1), rgba(210,0,2,1)); /* 标准的语法 */
    box-shadow: 0px 2px 5px 0px rgba(255, 68, 32, 0.33);
    color: #ffffff;


}
.query_hint{
    margin-left:.2rem;
    color: red; 
}


</style>