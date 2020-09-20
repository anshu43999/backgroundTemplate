import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
import Login from "../views/Login";
import Layout from "../components/common/layout/Layout";


const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};


Vue.use(Router);
Vue.use(ElementUI);


const routes =[
    {
        path: '/',
        redirect: '/login',
        name: '',
    },
    {
        path: '/login',
        name: '登录',
        component: Login,
        meta: {title: "登录"}
    },
    {
        path: '/index',
        component: Layout,
        children: [
            {
                path: "test",
                name: '测试',
                component: () => import("../views/pages/Test"),
            },
            {
                path: "logManagement/logDetails",
                name: '日志管理/日志详情',
                component: () => import("../views/pages/logDetails"),
            },
            {
                path: "parameterDeploy",
                name: '参数配置',
                component: () => import("../views/pages/parameterDeploy"),
            },
            {
                path: "visitTest",
                name: '访问测试',
                component: () => import("../views/pages/visitTest"),
            },

        ]
    },
    {
        path: "/printTable",
        name: '打印',
        component: () => import("../views/pages/printTable"),
    },

]


const router = new Router({ routes })


//通过全局导航守卫检查权限？
// router.beforeEach((to, from, next) => {
//     var userAuth = router.app.$store.getters.userAuth
//     //	验证登录状态
//     if (!userAuth && to.path !== '/login') {
//         console.log('没登陆')
//         next({
//             path: '/login',//离线时屏蔽
//             //query: { redirect: to.fullPath }// 考虑登录成功之后可以根据query中的内容跳转回原来的路由(页面)
//         })
//     } else if (userAuth && to.path == '/index') {
//         //		验证用户权限制定不同首页地址重定向
//         //		userAuth=userAuth.split(',');
//         //	  	if (userAuth.includes('新建扦样登记表')) {
//         //
//         //	    	next({path: '/index/grainDepot'})
//         //	  	}else{
//         //	  		next({path: '/index/sampling'})
//         //	  	}
//         next()
//     } else if (to.matched.some(record => record.meta.needAuth)) {
//         //		验证用户权限
//         //		console.log('needAuth')
//         userAuth = userAuth.split(',');
//         if (!userAuth.includes(to.meta.needAuth)) {
//             console.log('没权限')
//             next({
//                 path: '/index/error403'
//             })
//         } else {
//             next()
//         }
//     } else {
//         //		console.log('最终')
//         next()
//     }
// })




export default router;
