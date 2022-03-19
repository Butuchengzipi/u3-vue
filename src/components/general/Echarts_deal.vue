<template>
	<div id="app">
		<el-table
			:data="tableData"
			stripe
			style="width: 100%">
			<el-table-column
				prop="id"
				label="ID"
				width="39">
			</el-table-column>
			<el-table-column
				prop="date"
				label="日期"
				width="99">
			</el-table-column>
			<el-table-column
				prop="project"
				label="项目"
				width="59">
			</el-table-column>
			<el-table-column
				prop="branch"
				label="分支"
				width="79">
			</el-table-column>
			<el-table-column
				prop="model"
				label="测试机"
				width="109">
			</el-table-column>
			<el-table-column
				prop="test_content"
				label="测试内容"
				width="109">
			</el-table-column>
			<el-table-column
				prop="frame"
				label="框架"
				width="89">
			</el-table-column>
			<el-table-column
				prop="remark"
				label="备注"
				width="99">
			</el-table-column>
			<el-table-column
				prop="avgFPS"
				label="Avg(FPS)"
				width="85"
				align="center">
			</el-table-column>
			<el-table-column
				prop="varFPS"
				label="Var(FPS)"
				width="85">
			</el-table-column>
			<el-table-column
				prop="dropFPS"
				label="Drop(FPS)[/h]"
				width="119">
			</el-table-column>
			<el-table-column
				prop="jank"
				label="Jank(/10min)"
				width="115">
			</el-table-column>
			<el-table-column
				prop="bigJank"
				label="BigJank(/10min)"
				width="139">
			</el-table-column>
			<el-table-column
				prop="avgMemory"
				label="Avg(Memory)[MB]"
				width="159">
			</el-table-column>
			<el-table-column
				prop="avgCPU"
				label="Avg(AppCPU)[%]"
				width="149">
			</el-table-column>
			<el-table-column
				prop="link"
				label="Link">
				<template slot-scope="scope">
					<el-button type="text" @click="turnTo(scope.row.link)">{{ scope.row.link }}</el-button>
				</template>
			</el-table-column>
			<el-table-column
				prop="password"
				label="Password"
				width="129">
				<template slot-scope="scope">
					<el-button type="text" id="password">{{ scope.row.password }}</el-button>
					<el-button
						plain 
						class="el-icon-document-copy" 
						@click="copyPassword(scope.row.password)" 
						style="padding: 5px;"></el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="选择X轴">
				<el-select 
					v-model="form.xAxis" 
					placeholder="请选择X轴"
					filterable
					clearable
					style="width: 319px;"
					class="filter-item">
					<el-option label="日期" value="date"></el-option>
					<el-option label="测试内容" value="test_content"></el-option>
				</el-select>
			</el-form-item>
				
			<el-form-item label="选择Y轴">
				<el-select
					v-model="form.yAxis" 
					placeholder="请选择Y轴"
					filterable
					clearable
					style="width: 319px;"
					class="filter-item">
					<el-option label="Avg(FPS)" value="avgFPS"></el-option>
					<el-option label="Var(FPS)" value="varFPS"></el-option>
					<el-option label="Drop(FPS)[/h]" value="dropFPS"></el-option>
					<el-option label="Jank(/10min)" value="jank"></el-option>
					<el-option label="BigJank(/10min)" value="bigJank"></el-option>
					<el-option label="Avg(Memory)[MB]" value="avgMemory"></el-option>
					<el-option label="Avg(AppCPU)[%]" value="avgCPU"></el-option>
				</el-select>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="drawChart(form.xAxis, form.yAxis)">生成</el-button>
			</el-form-item>
		</el-form>
		<div id="main" style="width: 1200px;height:600px;"></div>
	</div>
</template>

<script>
export default {
	name: "app",
	data() {
		return {
			tableData: [{
				id: '',
				date: '2016-05-03',
				project: '如',
				branch: '果',
				model: '康到这个',
				test_content: '说明',
				frame: '木有找到',
				avgFPS: '数据',
				varFPS: '',
				dropFPS: '',
				jank: '',
				bigJank: '',
				avgMemory: '1',
				avgCPU: '2',
				link: '',
				password: 'ASDFGH'
			}],
			id : [],
			date : [],
			test_content : [],
			avgFPS : [],
			varFPS : [],
			dropFPS : [],
			jank : [],
			bigJank : [],
			avgMemory : [],
			avgCPU : [],
			form: [{
				xAxis: '',
				yAxis: ''
			}]
		}
	},
	
	mounted() {
		let self = this
		// 简写
		self.post_data = this.$route.params
		this.tableData = self.post_data.toEchart[0]											// 数据处理的问题，这里选数组的第一个元素，有机会后续在优化结构部分
		// console.log("*********************post_data ", self.post_data)
		// console.log("*********************tableData ", this.tableData, typeof(this.tableData))
		
		for(var i=0; i < this.tableData.length ; i++){
			// console.log("********id", this.tableData[i].id)
			this.id.push(this.tableData[i].id)
			// console.log("*********this.id", this.id)
			this.date.push(this.tableData[i].date)
			this.test_content.push(this.tableData[i].test_content)
			this.avgFPS.push(this.tableData[i].avgFPS)
			this.varFPS.push(this.tableData[i].varFPS)
			this.dropFPS.push(this.tableData[i].dropFPS)
			this.jank.push(this.tableData[i].jank)
			this.bigJank.push(this.tableData[i].bigJank)
			this.avgMemory.push(this.tableData[i].avgMemory)
			this.avgCPU.push(this.tableData[i].avgCPU)
		}
		
		// this.drawChart();
	},
	
	methods: {
		drawChart(xAxis, yAxis) {
			console.log(" ****************** X Y 轴", xAxis, yAxis)
			var X, Y, Unit
			if (xAxis === 'date'){
				X = this.date
			}else if (xAxis === 'test_content'){
				X = this.test_content
			}else {
				X = this.date
			}
			
			if (yAxis === 'avgFPS'){
				Y = this.avgFPS
				Unit = '单位：FPS'
			}else if (yAxis === 'varFPS'){
				Y = this.varFPS
				Unit = '单位：FPS'
			}else if (yAxis === 'dropFPS'){
				Y = this.dropFPS
				Unit = '单位：FPS/h'
			}else if (yAxis === 'jank'){
				Y = this.jank
				Unit = '单位：/10min'
			}else if (yAxis === 'bigJank'){
				Y = this.bigJank
				Unit = '单位：/10min'
			}else if (yAxis === 'avgMemory'){
				Y = this.avgMemory
				Unit = '单位：MB'
			}else if (yAxis === 'avgCPU'){
				Y = this.avgCPU
				Unit = '单位：%'
			}else {
				Y = this.avgFPS
				Unit = '单位：FPS'
			}
			// console.log(X, Y)
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(document.getElementById("main"));
			
			// 指定图表的配置项和数据		
			let option = {
				// 图表名字
				title: {
					text: "性能数据 示例"
				},
				
				// 
				tooltip: {},
				
				// 使用名字
				legend: {
					data: xAxis
				},
				
				// X轴
				xAxis: {
					data: X
				},
				
				// y轴
				yAxis: {},
				
				// 数据
				series: [{
					name: Unit,
					type: "line",
					data: Y
				}]
			};
			
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			
		}
	}
};
</script>