//"""
//全局脚本文件， 项目入口
//"""
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'

// import axios 用于发送请求  --  axios 专门用于发送请求的一个***
import axios from 'axios'


Vue.use(ElementUI) // 导入全部 
// {Card, Footer, Form, Navigation, Pagination, Slider, Table, Select, Input, DatePicker}
// Vue.use(Card)
// Vue.use(Footer)
// Vue.use(Form)
// Vue.use(Navigation)
// Vue.use(Pagination)
// Vue.use(Slider)
// Vue.use(Table)
// Vue.use(Select)
// Vue.use(Input)
// Vue.use(DatePicker)


axios.defaults.baseURL = '/api'
axios.defaults.timeout = 0
Vue.prototype.$axios = axios

// Vue.use(Element, { size: 'small', zIndex: 3000 });

// 只有当实例被创建时就已经存在于 data 中的 property 才是响应式的
// 这里唯一的例外是使用 Object.freeze()，这会阻止修改现有的 property，也意味着响应系统无法再追踪变化。
//  var obj = {
//  foo: 'bar'
//  }
//  Object.freeze(obj)

import echarts from "echarts"
Vue.prototype.$echarts = echarts

new Vue({   //初始化//
	router,
	render: h => h(App)
}).$mount('#app')

var env = process.env.NODE_ENV
console.log(env)
