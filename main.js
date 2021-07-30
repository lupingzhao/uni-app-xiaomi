import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import utils from "utils/utils.js"
import api from 'http/api.js'
import headNav from 'components/headNav.vue'
Vue.use(uView);
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.config.productionTip = false

Vue.prototype.$utils = utils
Vue.component('headNav', headNav)
// 懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./static/error.jpg'),
  loading: require('./static/imgLoading.gif'),
  attempt: 2,
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
