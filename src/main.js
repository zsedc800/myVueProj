// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'

import './utils/rem'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


import api from './api'

import 'font-awesome/css/font-awesome.min.css'

Vue.prototype.$http = api

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  ...App
  // render: h => h(App)
  // template: `<App/>`,
  // components: {
  //       App
  // }
})


