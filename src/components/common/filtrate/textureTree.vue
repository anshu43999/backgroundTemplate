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

        <div class="treeChecked">  <span class="treeChecked_text">已选择</span>    <input class="treeChecked_inputs" v-model="treeChecked">    </div>

        <div class="treeWarp">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>         -->

        <!-- btn -->

        <div class="folterBox_BTN">
            <!-- <div class="fol_btn fol_sure" @click="fol_sure" >确定</div> -->
            <!-- <div class="fol_btn fol_cancel" @click="fol_cancel">重置</div> -->

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
    InitUrl:this.apiRoot+'rsUnmk/findZFWFramework',  //初始化数据 (zfw)
    InitQTUrl:this.apiRoot+'rsUnmk/findQTFramework',  //初始化数据(qt) card=sfj
    treeUrl : this.apiRoot + 'jianliA01/findUidAllList' ,// 提交tree 筛选

    data: [
       
    ],
    defaultProps: {
        children: 'children',
        label: 'name'
    },
    dataArr : {},   //结构树（未变化）
    newArr :[],   //结构树  （成功）
    treeChecked : '',  // 提示选择框
    treeUid : '',

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
        console.log('closeBox');
        this.$emit('closeTree',false);
    },
    handleNodeClick(data) {
        console.log(data['uid']);
        this.treeChecked = data['name'];
        // console.log(this.treeChecked);
        this.treeUid = data['uid'];

        this.$emit('getTree',{tree :this.treeUid })
    },
   
   
    

    // 初始化数据
    getData(){
        let strPath = this.$route.path;
        let jieKou = '';
        let params = '';
        console.log(strPath);
        if(strPath === '/index/filtrate/Committee' ||  strPath === '/index/analysis/Committee'){
            jieKou = this.InitUrl
        }else{
            jieKou = this.InitQTUrl;
            switch (strPath) {
                case '/index/analysis/publicSecurity':
                case '/index/filtrate/publicSecurity':
                    params = 'gaj'
                    break;
                case '/index/analysis/procuratorate':
                case '/index/filtrate/procuratorate':
                    params = 'jcy'
                    break;
                case '/index/analysis/court':
                case '/index/filtrate/court':
                    params = 'fy'
                    break;
                case '/index/analysis/justiceBureau':
                case '/index/filtrate/justiceBureau':
                    params = 'sfj'
                    break;
                default:
                    break;
            }
        }
        this.$http.get(jieKou,{
            params : {
                card : params
            }
        } )
        .then(function(res){
            this.dataArr = res.data;
            this.dispose();
        }.bind(this));
    },
    dispose(){
        this.newArr = [];
        let that = this;
        // this.dataArr;
        let objLength = Object.keys(this.dataArr);
        objLength.forEach( (item,index)=>{
            // console.log(this.dataArr[item]);
            this.newArr.push(...this.dataArr[item]);
        })
        // console.log(this.newArr);
        function getTrees(list, sid) {
            let items= {};
            // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
            for (let i = 0; i < list.length; i++) {
                let key = list[i].sid;
                if (items[key]) {
                    items[key].push(list[i]);

                } else {
                    items[key] = [];
                    items[key].push(list[i]);
                }
            }
            return formatTree(items, sid);
        };
          /**
         * 利用递归格式化每个节点
         */
        function formatTree(items, sid) {
            let result = [];
            if (!items[sid]) {
                return result;
            }
            for (let t of items[sid]) {
                // console.log(t);
                t.children = formatTree(items, t.uid)
                result.push(t);
            }
            return result;
        };
        let obj  =  getTrees(this.newArr,-1);
        this.data = obj;
        // console.log(this.data)
    },
    fol_cancel(){
        this.treeChecked = '';
    },
    fol_sure(){
        let that = this;
        // this.
        // http://127.0.0.1:8085/committeeSystem/jianliA01/findUidAllList?Nums=9&NowPage=1&UID=0000014
        // this.$emit('getTree',{tree :that.treeUid })

        // this.
    },


    





},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    // this.nationMethod();
    this.getData();
    this.dispose();

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
.el-tree{
    background-color:transparent;
}


.FilterBox_wrap{
    position: relative;
    display: flex;
    border: 1px solid #eeeeee;
    // border-right: 0;
    border-left:0; 
    z-index: 2000;
    position: absolute;
    width: 40%;
    height: 100%;
    right: 0;
    top: 0;
    opacity: .95;
    background: #eeeeee;
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
        // background-color: #eeeeee;
        padding-left: .2rem;
        .treeChecked{
            height: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
            .treeChecked_text{
                margin-right: .2rem;
            }
            .treeChecked_inputs{
                width: 80%;
                text-align: center;
                
            }
            // .treeChecked_inputs:display

        };
        .treeWarp{
            width: 99%;
            height: 80%;
            overflow-y: auto;
        }



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