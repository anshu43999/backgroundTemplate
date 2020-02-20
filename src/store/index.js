import Vue from "vue";
import Vuex from "vuex"


Vue.use(Vuex);

const state = {
  breadcrumbHistory:[],
  userName:'',//用户名
  roleName:'',//用户角色
  userId:'',//用户id
  userAuth:'',//用户权限逗号隔开的字符串
  permissions:'',//用户可操作按钮逗号隔开的字符串
  Token:'',//用户token后台鉴权,
  userBSF : '',
};

const mutations= {
  setUserInfo(state,payload){
    state.userName=payload.userName;
    state.userId=payload.userId;
    state.userAuth=payload.userAuth;
    state.Token=payload.Token;
    state.roleName=payload.roleName;
    state.permissions=payload.permissions;
    sessionStorage.setItem('userName', payload.userName);
    sessionStorage.setItem('userId', payload.userId);
    sessionStorage.setItem('userAuth', payload.userAuth);
    sessionStorage.setItem('Token', payload.Token);
    sessionStorage.setItem('permissions', payload.permissions);
    sessionStorage.setItem('roleName', payload.roleName);
  },
  getBSF(state,payload){
    sessionStorage.setItem('userBSF', payload.userBSF);

  },


  logout(state){
    state.userBSF='';
    state.userName='';
    state.userId='';
    state.userAuth='';
    state.roleName='';
    state.Token='';
    state.permissions='';
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userAuth');
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('permissions');
    sessionStorage.removeItem('breadcrumbHistory');
    sessionStorage.removeItem('roleName');
  },
  // // 权限
  // slideToggle(state){
  //   state.isCollapse=!state.isCollapse;
  //   //  	mutations.route_click(state);
  // },
  route_click(state){
    var current=mutations.find_current_modal(state)
    if(current){
      current.show=!current.show;
      state.mask=false;
      var payload={id:current.id,type:current.type,title:current.title}
      mutations.hid_modal(state,payload)
    }
  },
  find_current_modal(state){

  },
  create_modal_id(state){
    state.modal_id_number+=1;
  },

  // 面包屑 新增历史
  pushBreadcrumbHistory(state,payload){
    //		payload栗子{name:'',fullPath:''}
    state.breadcrumbHistory.push(payload)
    sessionStorage.setItem('breadcrumbHistory', JSON.stringify(state.breadcrumbHistory));
  },
  // 面包屑  获取历史记录
  spliceBreadcrumbHistory(state,payload){
    var startIndex=state.breadcrumbHistory.findIndex((item)=>{
      return item.fullPath==payload.fullPath
    });
    if(startIndex>-1){
      state.breadcrumbHistory.splice(startIndex+1,state.breadcrumbHistory.length)
    }
    sessionStorage.setItem('breadcrumbHistory', JSON.stringify(state.breadcrumbHistory));
  },
  // 重置面包屑
  statBreadcrumbHistory(state){
    state.breadcrumbHistory=[];
    sessionStorage.setItem('breadcrumbHistory', JSON.stringify(state.breadcrumbHistory));
  },

}
const actions ={
  addAction(context){
    context.commit('create_modal_id')
  },
  userName:function(state){
    if(state.userName){
      return state.userName;
    }else{
      return sessionStorage.getItem("userName");
    }
  },
  roleName:function(state){
    if(state.roleName){
      return state.roleName;
    }else{
      return sessionStorage.getItem("roleName");
    }
  },
  userAuth:function(state){
    if(state.userAuth){
      return state.userAuth;
    }else{
      return sessionStorage.getItem("userAuth");
    }
  },
  permissions:function(state){
    if(state.permissions){
      return state.permissions;
    }else{
      return sessionStorage.getItem("permissions");
    }
  },
  userId:function(state){
    if(state.userId){
      return state.userId;
    }else{
      return sessionStorage.getItem("userId");
    }
  },
  Token:function(state){
    if(state.Token){
      return state.Token;
    }else{
      return sessionStorage.getItem("Token");
    }
  },
  userBSF:function(state){
    if(state.Token){
      return state.Token;
    }else{
      return sessionStorage.getItem("Token");
    }
  },
}

const getters ={
  // 面包屑
  breadcrumbHistory:function(state){
    if(state.breadcrumbHistory.length){
      return state.breadcrumbHistory;
    }else{
      return state.breadcrumbHistory=JSON.parse(sessionStorage.getItem("breadcrumbHistory"));
    }
  },


  modal_id:function(state){
    return 'Modal'+state.modal_id_number;
  },
  stateList:function(state){
    return state.stateList;
  },

  informTypeList:function(state){
    return state.informTypeList;
  },
  userName:function(state){
    if(state.userName){
      return state.userName;
    }else{
      return sessionStorage.getItem("userName");
    }
  },
  roleName:function(state){
    if(state.roleName){
      return state.roleName;
    }else{
      return sessionStorage.getItem("roleName");
    }
  },
  userAuth:function(state){
    if(state.userAuth){
      return state.userAuth;
    }else{
      return sessionStorage.getItem("userAuth");
    }
  },
  permissions:function(state){
    if(state.permissions){
      return state.permissions;
    }else{
      return sessionStorage.getItem("permissions");
    }
  },
  userId:function(state){
    if(state.userId){
      return state.userId;
    }else{
      return sessionStorage.getItem("userId");
    }
  },
  Token:function(state){
    if(state.Token){
      return state.Token;
    }else{
      return sessionStorage.getItem("Token");
    }
  },
  userBSF:function(state){
    if(state.userBSF){
      return state.userBSF;
    }else{
      return sessionStorage.getItem("userBSF");
    }
  },
}








export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})