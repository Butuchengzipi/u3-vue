<template>
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="获取时间">
			<el-col :span="5">
				<el-date-picker 
					label-width="50px" 
					type="date" 
					placeholder="选择日期" 
					v-model="form.date" 
					style="width: 319px;"
					value-format="yyyy-MM-dd"
					disabled></el-date-picker>
			</el-col>
		</el-form-item>
		<el-form-item label="选择项目">
			<el-select 
				v-model="form.project" 
				placeholder="请选择测试项目"
				filterable
				allow-create
				clearable
				style="width: 319px;"
				disabled>
				<el-option label="U3" value="U3"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="选择分支">
			<el-select 
				v-model="form.branch" 
				placeholder="请选择测试分支"
				filterable
				allow-create
				clearable
				style="width: 319px;"
				disabled>
				<el-option label="Weekly" value="Weekly"></el-option>
				<el-option label="Publish" value="Publish"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="选择机器">
			<el-select 
				v-model="form.model" 
				placeholder="请选择测试机器, 如: OPPO A37" 
				filterable
				allow-create
				clearable
				style="width: 319px;"
				disabled>
				<el-option label="OPPO A37" value="OPPO A37"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="选择框架">
			<el-select 
				v-model="form.frame" 
				placeholder="请选择测试框架"
				filterable
				allow-create
				clearable
				style="width: 319px;"
				disabled>
				<el-option label="新框架" value="新框架"></el-option>
				<el-option label="老框架" value="老框架"></el-option>
				<el-option label="竞品" value="竞品"></el-option>
				<el-option label="其他" value="其他"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="测试内容">
			<el-select 
				v-model="form.test_content" 
				placeholder="请选择测试内容" 
				filterable
				allow-create
				clearable
				style="width: 319px;"
				disabled>
				<el-option label="第一章" value="第一章"></el-option>
				<el-option label="战斗外" value="战斗外"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="输入备注">
			<el-input 
				v-model="form.remark" 
				placeholder="请输入相关备注" 
				style="width: 319px;"
				disabled></el-input>
		</el-form-item>


		<el-form-item label="Avg(FPS)">
			<el-input 
				v-model="form.avgFPS" 
				placeholder="请输入Avg(FPS)"
				style="width: 319px;"></el-input>
		</el-form-item>
		<el-form-item label="Var(FPS)">
			<el-input 
				v-model="form.varFPS" 
				placeholder="请输入Var(FPS)"
				style="width: 319px;"></el-input>
		</el-form-item>
		<el-form-item label="Drop(FPS)">
			<el-input
				v-model="form.dropFPS" 
				placeholder="请输入Drop(FPS) [/h]"
				style="width: 319px;"></el-input>
		</el-form-item>
		<el-form-item label="Jank">
			<el-input 
				v-model="form.jank" 
				placeholder="请输入Jank (/10min)"
				style="width: 319px;"></el-input>
		</el-form-item>
		<el-form-item label="BigJank">
			<el-input 
				v-model="form.bigJank" 
				placeholder="请输入BigJank (/10min)"
				style="width: 319px;"></el-input>
		</el-form-item>
		<el-form-item label="Memory">
			<el-input 
				v-model="form.avgMemory" 
				placeholder="请输入Avg(Memory)[MB]"
				style="width: 319px;"></el-input>
		</el-form-item>
		<el-form-item label="CPU">
			<el-input 
				v-model="form.avgCPU" 
				placeholder="请输入Avg(AppCPU)[%]"
				style="width: 319px;"></el-input>
		</el-form-item>
		<el-form-item label="链接/密码">
			<el-input 
				v-model="form.link" 
				placeholder="请输入链接和密码"
				style="width: 319px;"></el-input>
		</el-form-item>
		<el-form-item label="提交秘钥">
			<el-input 
				v-model="form.secret_key" 
				placeholder="请输入提交秘钥"
				style="width: 319px;"></el-input>
		</el-form-item>
		
		<el-form-item label="确认数据">
			<el-switch 
				v-model="form.delivery"></el-switch>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="change">修改</el-button>
			<el-button @click="prev">返回</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					id: '',
					date: '',
					project: '',
					branch: '',
					model: '',
					frame: '',
					test_content: '',
					remark: '',
					secret_key: '',
					avgFPS: '',
					varFPS: '',
					dropFPS: '',
					jank: '',
					bigJank: '',
					avgMemory: '',
					avgCPU: '',
					link: '',
					delivery: false
				}
			}
		},
		
		mounted() {
			console.log('跳转啦...................')
			console.log(this.$route.params)
			console.log(this.$route.params.id)
			this.form.id = this.$route.params.id
			this.form.date = this.$route.params.date
			this.form.project = this.$route.params.project
			this.form.branch = this.$route.params.branch
			this.form.model = this.$route.params.model
			this.form.frame = this.$route.params.frame
			this.form.test_content = this.$route.params.test_content
			this.form.remark = this.$route.params.remark
			this.form.avgFPS = this.$route.params.avgFPS
			this.form.varFPS = this.$route.params.varFPS
			this.form.dropFPS = this.$route.params.dropFPS
			this.form.jank = this.$route.params.jank
			this.form.bigJank = this.$route.params.bigJank
			this.form.avgMemory = this.$route.params.avgMemory
			this.form.avgCPU = this.$route.params.avgCPU
			this.form.link = this.$route.params.link

		},
		
		mounted() {
			let self = this
			// 简写
			self.post_data = this.$route.params
			console.log(self.post_data)
			this.$axios.post('/api/v1/caton_function', {post_data:self.post_data} )
			.then(response => {
				console.log(response),
				console.log('请求成功')
				this.tableData = response.data.caton_function,
				this.pre_url = response.data.pre_url,
				this.next_url = response.data.next_url,
				this.count = response.data.count,
				this.filePath = response.data.caton_function.filePath
				console.log(response.data.pre_url)
				console.log(response.data.next_url)
				console.log(response.data.count)
				console.log(this.filePath)
				
			})
			.catch(function(error){
				console.log(error);
			})
		},
		
		methods: {
			change() {
				let check = this.form
				if (check.delivery === true) {
					// 判断秘钥逻辑
					if (check.secret_key.length == 0 ) {
						this.$alert('秘钥为空 ', 'Warning', {
							confirmButtonText: '确定',
						});
						return false
					}
					else {
						this.$loading()											// 开始loading
						this.$axios.post('/api/v1/secret_key', {
							secret_key: check.secret_key})
						.then(res => {
							// 判断秘钥是否正确
							if (res.data == 'True') {
								// 判断 是否有空白项
								if (check.date.length == 0 | check.project.length == 0 | check.branch.length == 0 | check.model.length == 0 | check.frame.length == 0 | check.test_content.length == 0 | check.remark.length == 0 | check.avgFPS.length == 0 | check.varFPS.length == 0 | check.dropFPS.length == 0 | check.jank.length == 0 | check.bigJank.length == 0 | check.avgMemory.length == 0 | check.avgCPU.length == 0 | check.link.length == 0) {
									this.$alert('有空白输入项 ', 'KeyError', {
										confirmButtonText: '确定',
									});
								}
								else {
									// 提交操作
									this.$axios.post('/api/v1/change_perfdog', {postform:this.form})
									.then(res => {
										console.log(res.data)
										console.log('请求成功')
										if (res.data == 'True') {
											this.$alert('数据上传成功', 'Success', {
												confirmButtonText: '确定',
											});
										}
										else { 
											console.log(res.data)
											this.$alert('未知错误...', 'Unknown Error', {
												confirmButtonText: '确定',
											});
										}
									})
									.catch(function(error){
										console.log(error);
									})
								}
							}
							else {
								this.$alert('秘钥不正确 ', 'KeyError', {
									confirmButtonText: '确定',
								});
							}
						})
						.catch(function(error){
							console.log(error);
							this.$alert('未知错误...', 'Unknown Error', {
								confirmButtonText: '确定',
							});
						})
					}
					this.$loading().close()										// 关闭loading
				}
				else {
					console.log('No!', check.delivery)
					this.$alert('你尚未确认数据', 'Warning', {
						confirmButtonText: '确定',
					});
				}
			},
			prev(){
				this.$router.back()
			}
		}
	}
</script>