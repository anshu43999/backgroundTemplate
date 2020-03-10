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




export default new Router({
    routes: [
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
                    path: "logManagement",
                    name: '日志管理',
                    component: () => import("../views/pages/logManagement"),
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
})
