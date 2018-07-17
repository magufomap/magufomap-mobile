import Vue from 'nativescript-vue'

import router from './router'
import store from './store'

import './styles.scss'

// Debug mode
Vue.config.silent = false

// Plugins
Vue.registerElement('MapboxView', () => require('nativescript-mapbox').MapboxView)

// App
const app = new Vue({
  router,
  store,
})

app.$start()
