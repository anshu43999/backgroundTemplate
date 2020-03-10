<!--  -->
<template>
<div class='' ref='element'>
    <el-table
        height="85%"
        style="width:99.9%;background-color:transparent;border-bottom:0"
        :data="tableData"
        size=small  
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :row-style="{background:'transparent'}" 
        >
        <template v-if='type === 1'>
            <el-table-column
                align='center'
                prop="time"
                label="日期"
                width="240">
            </el-table-column>
            <el-table-column
                align='center'
                prop="number"
                label="传输总量"
                width="240">
            </el-table-column>
            <el-table-column
                align='center'
                prop="transmissionCapacity"
                label="传输次数">
            </el-table-column>
            <el-table-column
                prop="ipNumber"
                align='center'
                label="传输设备数"
                >
            </el-table-column>
        </template>

        <template v-if='type === 2'>
            <el-table-column
                align='center'
                prop="updateTime"
                label="配置时间"
                width="240">
            </el-table-column>
            <el-table-column
                align='center'
                prop="unitName"
                label="所属单位"
                width="240">
            </el-table-column>
            <el-table-column
                align='center'
                prop="ip"
                label="IP地址">
            </el-table-column>
        </template>

        <el-table-column
            fixed="right"
            align='center'
            label="操作"
            width="180">
            <template    slot-scope="scope">
                <template v-if='type ===1'>
                    <el-button class="elBtn" @click="handleClick(scope.row,'detail')" type="text" size="small">  <i class="iconDetail iconfont iconrizhi1"></i>日志详情</el-button>
                </template>
                <template v-if='type ===2'>
                   <el-button class="elBtn" @click="handleClick(scope.row,'edit')" type="text" size="small">  <i class="iconEdit iconfont iconai-edit"></i>编辑</el-button>
                    <el-button class="elBtn" @click="handleClick(scope.row,'delete')" type="text" size="small">  <i class="iconDelete iconfont iconshanchu"></i>删除</el-button>
                </template>
            </template>
            
        </el-table-column>
        
    </el-table>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    props : ['tableData','tbTaskH','type'],
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods:{
    handleClick(row,code){  
        switch(code){
            case 'detail' : this.$router.push({path : 'logManagement/logDetails',query : { time : row.time ,number:row.number,transmissionCapacity : row.transmissionCapacity ,ipNumber : row.ipNumber  }}); break;
            case 'edit' :   this.$emit('operate',{ip : row.ip, code:code,id:row.id});  break;
            case 'delete' : this.$emit('operate',{code:code,id:row.id});  break;
        }
    }
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
    .elBtn{
        color : #000;
        i{
            margin-right : 4px;
        }
        .iconDetail{
            color : #05c697;

        }
        .iconEdit{
            color : #05c697
        }
        .iconDelete{
            color : #ffbd68

        }
    }


</style>