<template>
	<div id="navigation">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 5px;">
			<el-radio-button :label="false" class="el-icon-s-fold">展开</el-radio-button>
			<el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group>

		<el-menu
			router
			collapse-transition=false
			:default-active="activeIndex"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose"
			:collapse="isCollapse"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b"
			:default-openeds=Commit>
			
			<el-menu-item index="/">
				<i class="el-icon-s-home"></i>
				<span slot="title">Home</span>
			</el-menu-item>

			<el-menu-item index="/Profile_Archive">
				<i class="el-icon-download"></i>
				<span slot="title">Profile Archive</span>
			</el-menu-item>

			<el-menu-item index="/Caton_Function">
				<i class="el-icon-document"></i>
				<span slot="title">Caton Function</span>
			</el-menu-item>

			<el-menu-item index="/Perfdog_Data">
				<i class="el-icon-s-data"></i>
				<span slot="title">Perfdog Data</span>
			</el-menu-item>

			<el-menu-item index="/Curve_graph">
				<i class="el-icon-picture"></i>
				<span slot="title">Curve Graph</span>
			</el-menu-item>
			
			<el-menu-item index="/View_csv">
				<i class="el-icon-s-order"></i>
				<span slot="title">View report</span>
			</el-menu-item>
			
			<el-menu-item index="/Your_Tips">
				<i class="el-icon-s-comment"></i>
				<span slot="title">Your Tips</span>
			</el-menu-item>

			<el-menu-item index="/User">
				<i class="el-icon-user-solid"></i>
				<span slot="title">User</span>
			</el-menu-item>

			<el-submenu index="Commmit">
				<template slot="title">
					<i class="el-icon-upload2"></i>
					<span slot="title">Commit</span>
				</template>

				<el-menu-item 
					v-for="(item,i) in Commit" 
					:key="i" 
					:index="item.name">
					<span>{{ item.commitItem }}</span>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>

</template>


<script>
	export default {
		props: {
			nav_tab: {
				type: String,
				required: true
			}
		},
		
		data() {
			return {
				// activeIndex: '/',
				activeIndex: this.nav_tab,		// 重新定义数据
				isCollapse: false,
				Commit_show: [
					'Commit profile', 
					'Compressed file',
					'Commit perfdog',
					'Commit curve_graph',
					'Commit risk',
					'Generate report',
				],
				Commit:[
					{name:'/Commit_profile',commitItem:'Commit profile'},
					{name:'/Compressed_file',commitItem:'Compressed file'},
					{name:'/Commit_perfdog',commitItem:'Commit perfdog'},
					{name:'/Commit_curve_graph',commitItem:'Commit curve_graph'},
					{name:'/Commit_risk',commitItem:'Commit risk'},
					{name:'/Generate_report',commitItem:'Generate report'},
				]
			};
		},
		
		computed: {
		    switchStatus: function () {
		        return this.nav_tab			// 直接监听props里的status状态
		    }
		},
		
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
