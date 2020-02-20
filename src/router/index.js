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
                    path: "home",
                    name: '首页',
                    component: () => import("../views/Home"),
                },
                {
                    path: "filtrate",
                    name: '信息筛选',
                    component: () => import("../views/Home"),
                },
                {
                    path: "filtrate/publicSecurity",
                    name: '信息筛选/公安局',
                    component: () => import("../views/filtrate/publicSecurity"),
                },
                {
                    path: "filtrate/procuratorate",
                    name: '信息筛选/检察院',
                    component: () => import("../views/filtrate/procuratorate"),
                },
                {
                    path: "filtrate/court",
                    name: '信息筛选/法院',
                    component: () => import("../views/filtrate/court"),
                },
                {
                    path: "filtrate/justiceBureau",
                    name: '信息筛选/司法局',
                    component: () => import("../views/filtrate/justiceBureau"),
                },
                {
                    path: "filtrate/Committee",
                    name: '信息筛选/政法委员会',
                    component: () => import("../views/filtrate/Committee"),
                },
                
                

                {
                    path: "analysis",
                    name: '数据分析',
                    component: () => import("../views/analysis/publicSecurity"),
                },
                {
                    path: "analysis/publicSecurity",
                    name: '数据分析/公安局',
                    component: () => import("../views/analysis/publicSecurity"),
                },
                {
                    path: "analysis/procuratorate",
                    name: '数据分析/检察院',
                    component: () => import("../views/analysis/procuratorate"),
                },
                {
                    path: "analysis/court",
                    name: '数据分析/法院',
                    component: () => import("../views/analysis/court"),
                },
                {
                    path: "analysis/justiceBureau",
                    name: '数据分析/司法局',
                    component: () => import("../views/analysis/justiceBureau"),
                },
                {
                    path: "analysis/Committee",
                    name: '数据分析/政法委员会',
                    component: () => import("../views/analysis/Committee"),
                },
                

            ]
        },
        {
            path: "/filtrate/print",
            name: '信息筛选/打印',
            component: () => import("../views/filtrate/print"),
        },
        {
            path: "/filtrate/printTable",
            name: '信息筛选/打印',
            component: () => import("../views/filtrate/printTable"),
        },
    ]
})
