<template>
	<div class="breadcrumbwrap">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<template v-if="breadcrumb.undefinedpath">
				<el-breadcrumb-item v-for="item in breadcrumbListsCache" :key="item.index" >{{item.name}}</el-breadcrumb-item>
				<el-breadcrumb-item>
					{{breadcrumb.undefinedpath}}
				</el-breadcrumb-item>
			</template>
			<template v-else>
				<el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index" :to='breadcrumbLink(index)'>{{item.name}}</el-breadcrumb-item>
			</template>

			<!-- <template>
				<div>
					<span class="btn" @click="ExporttShen">报警省</span>
					<span class="btn" @click="ExportShi">报警市</span>
					<span class="btn" @click="sExporttShen">扫黑省</span>
					<span class="btn" @click="sExportShi">扫黑市</span>
				</div>
			</template> -->
		</el-breadcrumb>
		<!-- <h1></h1> -->
	</div>
</template>

<script>

	import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
	export default {
		props: ['breadcrumb'],
		data() {
			return {
				routeTest:'测试中哦！！！',
				searching:'',
				firstfalg:true,//第一次加载确定路由的开关
				breadcrumbListsCache:[],
			};
		},
		created(){
			this.breadcrumbListFirst();
//  	console.log(this.$route)
			this.getBreadcrumbHistory();
			this.getBreadcrumbHistory();
			// this.jk();
			// this.Export()
		},

		methods:{
			...mapMutations(['pushBreadcrumbHistory','spliceBreadcrumbHistory','statBreadcrumbHistory']),
			searchingfor(){
				this.$emit('searchingfor',this.searching,1)
			},
			backhome(){
//  		手动跳转
//			this.route_click();
				this.$router.push({ path: '/index/home' });
			},
			breadcrumbListFirst() {
				if(this.firstfalg){
					//	    	获取连接名按照"/"切分并反转
					var breadcrumbName=this.$route.name.split('/').reverse();
					//	       	 等待返回的面包屑名字对应路径的对象数组
					var breadcrumbLists=[];
					for(var i=0;i<breadcrumbName.length;i++){
						var breadcrumbItem={};
						//	        		获取名字
						breadcrumbItem.name=breadcrumbName[i];
						//	        		获取路径
						var breadcrumbPath=this.$route.fullPath.split('/');
						//	        		从后向前以"/"为节点裁掉/后面的路径并拼接回字符串

						// 第几个  截取几条
						breadcrumbPath.splice(-i,i);
						breadcrumbItem.path=breadcrumbPath.join('/');
						breadcrumbItem.index=i;
						breadcrumbLists.unshift(breadcrumbItem);
						// console.log(breadcrumbLists);
					}
					this.firstfalg=false;
					this.breadcrumbListsCache=breadcrumbLists;
					return breadcrumbLists;
				}else{
					return this.breadcrumbListsCache;
				}
			},
			getBreadcrumbHistory(){
				var name=this.$route.name;

				// console.log(name);
				var fullPath=this.$route.fullPath;
				// console.log(fullPath);
				// var res=name.match(/\//g).length;
				var res = '';


				//  增加一层判断     待调试确认    2020 - 02 - 26
				if(! name.match(/\//g)) return;

				if(name.match(/\//g).length){
					res=name.match(/\//g).length;
				}else{
					res=0;
				}
				var payload={};
				payload.name=name;
				payload.fullPath=fullPath;

				if(res<2){
//				console.log('重置历史记录')
					this.statBreadcrumbHistory();

				}
//			查询历史
				var is_set=this.breadcrumbHistory.some((item,index)=>{
					return item.name==name
				})
//			获取历史记录
				if(is_set){
					this.spliceBreadcrumbHistory(payload);
				}else{
//			新增历史
					this.pushBreadcrumbHistory(payload);
				}
//			console.log(this.breadcrumbHistory)
			},
			breadcrumbLink(index){
				if(index==0){
					return this.breadcrumbList[index].path
				}else if(index!==0){
					return this.breadcrumbHistory[index-1].fullPath
				}
			},


			// 测试
			jk(){
				// this.exportExcelURL+'?pId='+pId+'&sessionid='+this.Token;
				let start = new Date();
				console.log(start.getHours());
				// let end = new Date();2019-10-01


				this.$http.get(this.apiRoot +'baojingqingkuang/exportShenBaojing', {
					params: {
						startTime:'2019-09-01',
						endTime:'2019-10-01',
						sessionid : this.Token
					}
				})
						.then(function (response) {
							console.log(response);

						})
						.catch(function (error) {
							console.log(error);
						});

			},
			// 省   报警情况
			ExporttShen(){
				var loadiframe=document.getElementById('fordownload');
				console.log(loadiframe);
				loadiframe.src=this.apiRoot+'/baojingqingkuang/exportShenBaojing?tjyf=2019-09'+'&sessionid='+this.Token;
			},
			// 市  报警情况
			ExportShi(){
				var loadiframe=document.getElementById('fordownload');
				console.log(loadiframe);
				loadiframe.src=this.apiRoot+'/baojingqingkuang/exportShiBaojing?xzqh=太原&tjyf=2019-09'+'&sessionid='+this.Token;
			},
			// 省   扫黑
			sExporttShen(){
				var loadiframe=document.getElementById('fordownload');
				console.log(loadiframe);
				loadiframe.src=this.apiRoot+'/saoheichue/exportShenSaohei?tjyf=2019-09'+'&sessionid='+this.Token;
			},
			// 市 扫黑
			sExportShi(){
				var loadiframe=document.getElementById('fordownload');
				console.log(loadiframe);
				loadiframe.src=this.apiRoot+'/saoheichue/exportShiSaohei?xzqh=太原&tjyf=2019-09'+'&sessionid='+this.Token;
			}
		},
		computed: {
//  	...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask"]),
			...mapGetters(["libraryId","libraryName","userName","Token"]),
			...mapGetters(["breadcrumbHistory"]),
			breadcrumbList: function () {
//	    	获取连接名按照"/"切分并反转
				var breadcrumbName=this.$route.name.split('/').reverse();
//	       	 等待返回的面包屑名字对应路径的对象数组
				var breadcrumbLists=[];
				for(var i=0;i<breadcrumbName.length;i++){
					var breadcrumbItem={};
//	        		获取名字
					breadcrumbItem.name=breadcrumbName[i];
//	        		获取路径
					var breadcrumbPath=this.$route.fullPath.split('/');
//	        		从后向前以"/"为节点裁掉/后面的路径并拼接回字符串
					breadcrumbPath.splice(-i,i);
					breadcrumbItem.path=breadcrumbPath.join('/');
					breadcrumbItem.index=i;
					breadcrumbLists.unshift(breadcrumbItem);
				}
	        	// console.log(breadcrumbLists);
				return breadcrumbLists;
			}
		},
		mounted:function(){

		}
	}
</script>

<style lang='scss' scoped>
	.breadcrumbwrap{
		.el-breadcrumb{
			font-size: 16px;
			span{
				line-height: .26rem;
			}
		}

	}

	/*面包屑导航*/
	.el-breadcrumb__item{
		line-height: 0.34rem;
	}
	.el-breadcrumb__inner{
		color: #666666!important;
	}
	.el-breadcrumb>span:last-child>.el-breadcrumb__inner.is-link{
		color: #333333!important;
		/* font-weight: bold!important; */
	}
	.el-breadcrumb__inner.is-link{
		font-weight: normal!important;
	}
	.btn{
		display: inline-block;
		width: .8rem;
		height: .2rem;
		margin-right: .5rem;
		background-color: red;
		color: #ffffff;
		text-align: center;
		border-radius:4px;
		cursor: pointer;
		font-size: .15rem;
		line-height: .2rem;
	}
	.breadcrumbwrap h1{
		border-bottom: 1px solid  #dddddd ; 
	}
	
</style>