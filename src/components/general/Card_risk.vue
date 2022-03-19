<template>
	<el-row>
		<el-card color="yellowgreen"  v-for="item in risk" :key="item">
			<p>{{ date }}</p>
			<el-divider content-position="center"> 测试内容 <el-divider direction="vertical"></el-divider> 备注 </el-divider>
			
			<p v-for="(key, value) in mix" :key="item">
				{{ value }} 
				<el-divider direction="vertical"></el-divider>
				{{ key }}
			</p>
			
			<el-divider content-position="center">本周风险</el-divider>
			<p style="white-space: pre-wrap;"><span>{{ item.this_weekly|enter }}</span></p>
			<el-divider content-position="center">上周修复</el-divider>
			<p style="white-space: pre-wrap;"><span>{{ item.last_weekly_repair|enter }}</span></p>
			<el-divider content-position="center">本周结论</el-divider>
			<p style="white-space: pre-wrap;"><span>{{ item.conclusion|enter }}</span></p>

		</el-card>
		
		<el-button 
			type="primary" 
			icon="el-icon-arrow-left" 
			@click='turnTo(pre_url)'
			circle
			style="left: auto;"
			v-if="pre_url"></el-button>
		
		<el-button-group style="float:right">
			<el-button
				type="primary" 
				@click="turnTo(next_url)"
				circle
				style="text-align:center;"
				v-if="next_url"><i class="el-icon-arrow-right el-icon--right" ></i></el-button>
		</el-button-group>
	</el-row>
</template>


<style>
	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
		text-align:center;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		  display: table;
		  content: "";
	}

	.clearfix:after {
		clear: both
	}
	.text-wrapper {
		white-space: pre-wrap;
	}
	
	.el-divider--vertical {
		display: inline-block;
		width: 1px;
		height: 1.2em;
		margin: 0 8px;
		vertical-align: middle;
		position: relative;
		color: #ff0000;
	}
	
</style>

<script>

export default {
	data() {
		return {
			currentDate: new Date(),
			risk: [],
			date: '',
			test_content: '',
			remark: '',
			mix: ''
		};
	},
	
	filters: {
		enter: function (value) {
			//替换所有的空格（中文空格、英文空格都会被替换）
			// value = value.replace(/\s/g,"&nbsp;");
			value = value.replace(/\s/g," ")
			
			// value = value.replace('\\n',"\r\n")	这个只能循环单个
			
			//替换所有的换行符
			value = value.replace(/\r\n/g,"\r\n")
			value = value.replace(/\n/g,"\r\n")
			
			value = value.replace(/\\n/g,"\r\n")
			
			// 有些编辑器会 区分 \r 和 \n，建议全搞成 \r\n 以便通用
			
			return value
		}
	},
	
	methods: {
		turnTo(url){
			console.log('转向中...')
			this.$axios.get(url)
			.then(response => {
				console.log('跳转成功'),
				this.risk = response.data.risk,
				this.pre_url = response.data.pre_url,
				this.next_url = response.data.next_url,
				this.page = response.data.page,
				this.count = response.data.count,
				this.date = response.data.date
				this.mix = response.data.mix
				
			})
			.catch(function(error){
				console.log(error);
			})
		}
	},
	
	mounted() {
		this.$axios.get('/api/v1/risk/')
		.then(response => {
			console.log('请求成功')
			this.risk = response.data.risk,
			this.pre_url = response.data.pre_url,
			this.next_url = response.data.next_url,
			this.page = response.data.page,
			this.count = response.data.count,
			this.date = response.data.date
			this.mix = response.data.mix
		})
		.catch(function(error){
			console.log(error);
		})
	}
}
</script>