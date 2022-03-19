<template>
	<div>
		<el-form ref="selectform" :model="selectform" style="width: 100%">
			<el-form-item label="选择搜索方式" >
				<el-select v-model="selectform.search" placeholder="请选择搜索方式" clearable style="width: 319px;">
				  <el-option label="按时间筛选" value="date"></el-option>
				  <el-option label="按项目筛选" value="project"></el-option>
				  <el-option label="按分支筛选" value="branch"></el-option>				  
				  <el-option label="按机器筛选" value="model"></el-option>
				  <el-option label="按框架筛选" value="frame"></el-option>
				  <el-option label="按测试内容筛选" value="test_content"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		
		<el-form ref="form" :model="form">
			<el-form-item label="获取时间" 
				clearable 
				v-if="selectform.search === 'date' " >
				<el-date-picker 
					type="date" 
					placeholder="选择日期" 
					v-model="form.date" 
					style="width: 319px;"
					:label="form.date"
					value-format="yyyy-MM-dd"
					:picker-options="pickerOptions"></el-date-picker>
			</el-form-item>
		
			<el-form-item label="选择项目" v-if="selectform.search === 'project' " >
				<el-select v-model="form.project" placeholder="请选择测试项目" clearable style="width: 319px;">
				  <el-option label="U3" value="U3"></el-option>
				</el-select>
			</el-form-item>
		
			<el-form-item label="选择分支" v-if="selectform.search === 'branch' " >
				<el-select v-model="form.branch" placeholder="请选择测试分支" clearable style="width: 319px;">
				  <el-option label="weekly" value="weekly"></el-option>
				  <el-option label="Publish" value="Publish"></el-option>
				</el-select>
			</el-form-item>
		
			<el-form-item label="选择机器" v-if="selectform.search === 'model' " >
				<el-select v-model="form.model" placeholder="请选择测试机器" clearable style="width: 319px;">
				  <el-option label="A37" value="A37"></el-option>
				</el-select>
			</el-form-item>
		
			<el-form-item label="测试内容" v-if="selectform.search === 'test_content' " >
				<el-select v-model="form.test_content" placeholder="请选择测试内容" clearable style="width: 319px;">
				  <el-option label="第一章" value="第一章"></el-option>
				  <el-option label="第二章" value="第二章"></el-option>
				  <el-option label="战斗外" value="战斗外"></el-option>
				  
				</el-select>
			</el-form-item>
			
			<el-form-item label="选择框架" v-if="selectform.search === 'frame' " >
				<el-select v-model="form.frame" placeholder="请选择测试框架" clearable style="width: 319px;">
				  <el-option label="新框架" value="新框架"></el-option>
				  <el-option label="老框架" value="老框架"></el-option>
				  <el-option label="竞品" value="竞品"></el-option>
				  <el-option label="其他" value="其他"></el-option>
				</el-select>
			</el-form-item>
		
			<el-form-item label="确认数据">
				<el-switch v-model="delivery"
					active-value="true"
					inactive-value="false"></el-switch>
			</el-form-item>
		
			<el-form-item>
				<el-button type="primary" @click="onSearch(form)">确定</el-button>
				<el-button>取消</el-button>
				<el-button @click="resetForm(form)">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selectform: {
					search: ''
				},
				form: {
					date: '',
					project: '',
					branch: '',
					model: '',
					frame: '',
					test_content: '',
				},
				delivery: false,
				info_date: [],
				
				pickerOptions: {
					disabledDate: time => {
						for(var i in this.info_date){
							var tempDate = new Date(this.info_date[i].replace(/-/g,'/')).getTime()		// 一顿操作，将日期转换成时间戳
							if (time.getTime() == tempDate) {											// 判断是否存在
								return false
							}
						}
						return true
					}
				}
			}
		},
		
		beforeCreate() {
			this.$axios.get('/api/v1/search_perfdog_date')
			.then(response => {
				console.log(response)
				console.log('search_date')
				this.info_date = response.data.info_date
			})
			.catch(function(error){
				console.log(error);
			})
		},
		
		methods: {
			onSearch(form) {
				let selectform = this.selectform
				let delivery = this.delivery
				if (selectform.search.length === 0) {
					console.log('No!', selectform.search)
					this.$alert('你尚未选择搜索方式', 'Warning', {
						confirmButtonText: '确定',
					});
				}
				else {
					console.log('Yes', selectform.search)
					let postform = this.form
					if (this.delivery === 'true') {
						this.$loading()
						console.log('submit!', selectform.search)
						
						//简写
						this.$router.push({name:'Table_perfdog_data', params:{
							data: postform,
							type: selectform.search}
							})
					}
					else {
						console.log('No!', delivery)
						this.$alert('你尚未确认数据', 'Warning', {
							confirmButtonText: '确定',
						});
					}
				}
				
			},
			resetForm(formName) {
				console.log('reset!', formName);
				this.$refs[formName].resetFields();
			}
		}
	}
</script>