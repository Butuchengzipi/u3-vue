import Vue from 'vue'																						//引入Vue

import VueRouter from 'vue-router'																			//引入vue-router

import App from '.././App.vue'


Vue.use(VueRouter)																							//Vue全局使用Router


const routes = [																							// 配置路由，这里是个数组
	{																										// 每个链接都是一个对象
		path: '/',																							// 链接路径
		name: 'Home',																						// 路由名称
		component: () => import(/* webpackChunkName: "about" */ '@/components/Home.vue')					// 对应的组件模板
    }, {
		path: '/Profile_Archive',
		name: 'Profile_Archive',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Profile_Archive.vue')
    }, {
		path: '/Caton_Function',
		name: 'Caton_Function',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Caton_Function.vue')
    },{
		path: '/Perfdog_Data',
		name: 'Perfdog_Data',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Perfdog_Data.vue')
    },{
		path: '/Curve_graph',
		name: 'Curve_graph',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Curve_graph.vue')
    },{
		path: '/View_csv',
		name: 'View_csv',
		component: () => import(/* webpackChunkName: "about" */ '@/components/View_csv.vue')
    },{
		path: '/User',
		name: 'User',
		component: () => import(/* webpackChunkName: "about" */ '@/components/User.vue')
    },{
		path: '/Your_Tips',
		name: 'Your_Tips',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Your_Tips.vue')
    },{
		path: '/Commit_profile',
		name: 'Commit_profile',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Commit_profile.vue')
    },{
		path: '/Compressed_file',
		name: 'Compressed_file',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Compressed_file.vue')
    },{
		path: '/Commit_perfdog',
		name: 'Commit_perfdog',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Commit_perfdog.vue')
    },{
		path: '/Commit_curve_graph',
		name: 'Commit_curve_graph',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Commit_curve_graph.vue')
    },{
		path: '/Commit_risk',
		name: 'Commit_risk',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Commit_risk.vue')
    },{
		path: '/Generate_report',
		name: 'Generate_report',
		component: () => import(/* webpackChunkName: "about" */ '@/components/Generate_report.vue')
    },
	
	// general 目录下
	{
		path: '/Table_caton_function',
		name: 'Table_caton_function',
		component: () => import(/* webpackChunkName: "about" */ '@/components/general/Table_caton_function.vue'),
		meta: {keepAlive: true}
	},
	{
		path: '/Form_caton_function',
		name: 'Form_caton_function',
		component: () => import(/* webpackChunkName: "about" */ '@/components/general/Form_caton_function')
	},
	{
		path: '/Table_perfdog_data',
		name: 'Table_perfdog_data',
		component: () => import(/* webpackChunkName: "about" */ '@/components/general/Table_perfdog_data'),
		meta: {keepAlive: true}
	},
	{
		path: '/Form_change_perfdog',
		name: 'Form_change_perfdog',
		component: () => import(/* webpackChunkName: "about" */ '@/components/general/Form_change_perfdog')
	},
	{
		path: '/Echarts_deal',
		name: 'Echarts_deal',
		component: () => import(/* webpackChunkName: "about" */ '@/components/general/Echarts_deal')
	}
]


const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
