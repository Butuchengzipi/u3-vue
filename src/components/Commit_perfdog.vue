<template>
	<div class="app">
		<el-container style="border: 0px solid #fff">
			<el-aside width="219px" style="background-color: rgb(255, 255, 255)">
				<Navigation :nav_tab="currentNav" :default-openeds="Commit"/>
			</el-aside>

			<el-container>
				<el-header style="text-align: right; font-size: 16px">
				<el-dropdown>
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>查看</el-dropdown-item>
						<el-dropdown-item>新增</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
					<span>王小虎</span>
				</el-header>

				<el-main>
					<Form_commit_perfdog/>
				</el-main>
			</el-container>

		</el-container>
		
		<Footer/>
	  
  </div>
</template>

<script>
import Navigation from './general/Navigation.vue'
import Form_commit_perfdog from './general/Form_commit_perfdog.vue'
import Footer from './general/Footer'

export default {
	name: 'App',
	components: {
		Navigation,
		Form_commit_perfdog,
		Footer
	},
	data() {
		return {
			currentNav: '/Commit_perfdog',
			Commit:[
				{name:'/Commit_profile',commitItem:'Commit profile'},
				{name:'/Compressed_file',commitItem:'Compressed file'},
				{name:'/Commit_perfdog',commitItem:'Commit perfdog'},
				{name:'/Commit_curve_graph',commitItem:'Commit curve_graph'},
				{name:'/Commit_risk',commitItem:'Commit risk'},
				{name:'/Generate_report',commitItem:'Generate report'},
			]
		}
	}
}
</script>


<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #fff;
	}

	html,body{height: 100%; margin: 0rem;}  /* margin */
		.app{
		display: flex;
		flex-direction: column;
		min-height: 100%;
		position:absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
	}
</style>
