<template>
<div class="tfoot">
	<div class="tfoot_btns" v-if='page.tfootbtns.btns'>
		<p v-if='page.tfootbtns.leading_out' class='leading_out' @click="leading_out_checked">
			<span>导出EXCEL表格</span>		
		</p>

   		<p v-if='page.tfootbtns.connect' class='leading_out' @click="handoverPrint">
      		<span>打印样品领取交接单</span>
    	</p>
		<p v-if='page.tfootbtns.checkPrint' class='leading_out' @click="checkPrint">
      		<span>{{page.tfootbtns.btnText?page.tfootbtns.btnText:'打印样品检验单'}}</span>
    	</p>
    	<p v-if='page.tfootbtns.btnfree' class='leading_out' @click="btnfree">
      		<span>{{page.tfootbtns.btnfree}}</span>
    	</p>
	</div>
    <el-pagination class="actionList" v-show='page.show' @size-change="sizeChange" @current-change="currentChange" :current-page.sync="page.currentPage" :page-size="page.size" layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total="page.total">
    </el-pagination>
</div>
</template>
<script>
// import "@/assets/style/common/Pagination.css"
  export default {
    props: ['page'],
    methods: {
//    create_newdata(){
//    	this.$emit('paginationEvent','create')
//    },  
	  btnfree(){
      	this.$emit('paginationEvent','btnfree')
	  },
	  handoverPrint(){
      	this.$emit('paginationEvent','printHandover')
	  },
	  checkPrint(){
      	this.$emit('paginationEvent','PrintCheck')
	  },
      leading_out_checked(){
      	this.$emit('paginationEvent','leading_out')
      },
      sizeChange(){
//    	console.log(this.currentPage,this.page.size);
      },
      currentChange(){
//    	console.log(this.currentPage,this.page.size);
		this.$emit('getCurrentPage',this.page.currentPage);
      },
    },
    data() {
      return {

      };
    }
  }
</script>
<style>
	div.tfoot{
		/*border: none;*/
		/*background-color: #ffffff;*/
		width: 100%;
		overflow: hidden;
	}
	/*表格底部按钮*/
	.tfoot_btns{
		float:left;
		height:0.4rem;
		padding:0.3rem;
	}
	div.tfoot .tfoot_btns p.leading_out{
		float:left;
		height:0.4rem;
		line-height: 0.33rem;
		margin:0rem;
		font-size: 0.24rem;
		cursor: pointer;
		background-color: #4c90db;
		border-radius: 0.05rem;
		box-sizing: border-box;
		padding:0.04rem;
		color:#ffffff;
	}
	div.tfoot .tfoot_btns p.leading_out span{
		border:1px solid #FFFFFF;
		border-radius:0.04rem;
		padding:0 0.2rem;
		font-weight: 500;
	}
	/*表格底部分页*/
	div.tfoot .el-pagination.actionList{
		float:right;
		padding-top:0.36rem;
		padding-bottom: 0;
	}
	div.tfoot .el-pagination.actionList .btn-next{
		height:0.3rem;
		line-height:0.3rem;
		width:0.7rem;
		background:#ffffff;
		margin-left:0.16rem;
		text-align:center;
		min-width:0;
		padding:0;
		color: #4c90db;
		font-size:0.14rem;
		border:0.01rem solid #d5d5d5;
	}
	div.tfoot .el-pagination.actionList .btn-prev{
		height:0.3rem;
		line-height:0.3rem;
		width:0.7rem;
		background:#ffffff;
		margin-right:0.12rem;
		text-align:center;
		min-width:0;
		padding:0;
		color: #4c90db;
		font-size:0.14rem;
		border:0.01rem solid #d5d5d5;
	}
	div.tfoot .el-pagination.actionList .btn-prev span,div.tfoot .el-pagination .btn-next span{
		line-height:0.3rem!important;
		/*padding:0 0.1rem;*/
	}
	div.tfoot .el-pager li{
		height:0.3rem;
		width:0.3rem;
		background:rgba(255,255,255,0);
		border:0.01rem solid #d5d5d5;
		line-height: 0.28rem;
		text-align: center;
		font-size: 0.18rem;
		color:#4c90db;
		margin-left:0.04rem;
		text-align:center;
		min-width:0;
		padding:0;
	}
	/*div.tfoot .el-pagination button:hover{
        color:white;
        background:#4c90db;
    }*/
	/*div.tfoot .el-pagination button.disabled{
        color:white;
        background:rgb(55,141,248);
    }*/
	div.tfoot .el-pager li.active{
		color:white;
		background:#4c90db;
		/*border-color:white;*/
	}
	/*div.tfoot .el-pagination span:not([class*=suffix]){
        margin-left:0.05rem;
        text-align: center;
        font-size: 0.17rem;
        color:rgb(0,0,0);
        height:0.22rem;
        line-height: 0.22rem;
    }*/
	/*div.tfoot .el-pagination__editor.el-input{
        height:0.22rem;
        width:0.27rem;
        border-radius: 0.04rem;
        background:rgba(255,255,255,0);
        border:0.01rem solid rgb(236,210,200);
        margin:0 0.08rem;
        text-align: center;
        font-size: 0.17rem;
        color:rgb(0,0,0);
        padding:0;
        line-height:0.2rem;
    }*/
	/*div.tfoot .el-pagination__editor.el-input .el-input__inner{
        width:100%;
        height:100%;
        padding:0;
        line-height:0.2rem;
        background:rgba(255,255,255,0);
        border:none;
    }*/
</style>