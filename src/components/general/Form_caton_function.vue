<template>
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="获取时间">
			<el-date-picker 
				type="date" 
				placeholder="选择日期" 
				v-model="form.date" 
				style="width: 319px;"
				value-format="yyyy-MM-dd"
				@change="dateChange(form.date)"
				:label="form.date"
				:picker-options="pickerOptions"></el-date-picker>
		</el-form-item>
		<el-form-item label="选择项目">
			<el-select 
				v-model="form.project" 
				placeholder="请选择测试项目"
				filterable
				allow-create
				clearable
				style="width: 319px;"
				class="filter-item">
				<el-option
					v-for="item in info_project"
					:key="item" 
					:value="item" 
					:label="item"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="选择分支">
			<el-select 
				v-model="form.branch" 
				placeholder="请选择测试分支"
				filterable
				allow-create
				clearable
				style="width: 319px;">
				<el-option 
					label="Weekly" 
					value="Weekly"
					v-for="item in info_branch"
					:key="item" 
					:value="item" 
					:label="item"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="选择机器">
			<el-select 
				v-model="form.model" 
				placeholder="请选择测试机器, 如: OPPO A37" 
				filterable
				allow-create
				clearable
				style="width: 319px;">
				<el-option 
					v-for="item in info_model"
					:key="item" 
					:value="item" 
					:label="item"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="选择框架">
			<el-select 
				v-model="form.frame" 
				placeholder="请选择测试框架"
				filterable
				allow-create
				clearable
				style="width: 319px;">
				<el-option
					v-for="item in info_frame"
					:key="item" 
					:value="item" 
					:label="item"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="测试内容">
			<el-select 
				v-model="form.test_content" 
				placeholder="请选择测试内容" 
				filterable
				allow-create
				clearable
				style="width: 319px;">
				<el-option
					v-for="item in info_test_content"
					:key="item" 
					:value="item" 
					:label="item"></el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="确认数据">
			<el-switch v-model="form.delivery"
				active-value="true"
				inactive-value="false"></el-switch>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSearch(form)">确定</el-button>
			<el-button>取消</el-button>
			<el-button @click="resetForm(form)">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					date: '',
					project: '',
					branch: '',
					model: '',
					frame: '',
					test_content: '',
					delivery: false
				},
				info_date: [],
				info_project: {},
				info_branch: {},
				info_model: {},
				info_frame: {},
				info_test_content: {},
				
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
			this.$axios.get('/api/v1/search_profile_date')
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
				let postform = this.form
				if (postform.delivery === 'true') {
					console.log('submit!', postform.delivery);
					console.log(postform.date)
					console.log(postform.project)				
					console.log(postform.branch)				
					console.log(postform.model)				
					console.log(postform.frame)				
					console.log(postform.test_content)
					
					//简写
					this.$router.push({name:'Table_caton_function', params:{
						date: postform.date,
						project: postform.project,
						branch: postform.branch,
						model: postform.model,
						frame: postform.frame,
						test_content: postform.test_content}})
				}
				else {
					console.log('No!', postform.delivery)
					this.$alert('你尚未确认数据', 'Warning', {
						confirmButtonText: '确定',
					});
				}
			},
			resetForm(formName) {
				console.log('reset!', formName);
				this.$refs[formName].resetFields();
			},
			
			dateSearch() {
				this.$axios.get('/api/v1/search_date')
				.then(response => {
					console.log(response)
					console.log('创建...')
					this.info_date = response.data.info_date
					return info_date
				})
				.catch(function(error){
					console.log(error);
				})
			},
			
			dateChange(date) {
				console.log(date)
				this.$axios.post('/api/v1/date_change', {date:date})
				.then(response => {
					console.log(response)
					console.log('请求成功')
					this.info_project = response.data.info_project
					this.info_branch = response.data.info_branch
					this.info_model = response.data.info_model
					this.info_frame = response.data.info_frame
					this.info_test_content = response.data.info_test_content
				})
				.catch(function(error){
					console.log(error);
				})
			}
		}
  }
</script>