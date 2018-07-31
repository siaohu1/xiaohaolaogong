import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
//Mock js
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js' 
import './ui.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'

Vue.use(ElementUI);
Vue.use(VueI18n) // 通过插件的形式挂载

const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/zh'),   // 中文语言包
    'en-US': require('./common/lang/en')    // 英文语言包
  }
})
Vue.config.productionTip = false;
var vm=new Vue({
  el: '#app',
  router,
  i18n,  // 不要忘记
  store,
  template: '<App/>',
  components: { App }
})


