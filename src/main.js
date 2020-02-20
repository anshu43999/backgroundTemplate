import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './assets/style/common/common.css'
// import './assets/js/print'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/font/iconfont.css'
import ElementUI from 'element-ui'
import Router from 'vue-router'



// import VideoPlayer from 'vue-video-player'

// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')





// Vue.use(VideoPlayer)




Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
import axios from 'axios'

// Vue.prototype.apiRoot ='http://192.168.1.252:8086/committeeSystem/';//su
// Vue.prototype.apiRoot ='http://192.168.1.248:8085/committeeSystem/';  //kun


Vue.prototype.apiRoot ='http://127.0.0.1:8086/committeeSystem/';//su


// Vue.prototype.apiRoot ='http://my.ityyedu.com/committeeSystem/';




Vue.use(ElementUI);
Vue.prototype.$http=axios;


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
