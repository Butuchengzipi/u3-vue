<template>
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="获取时间">
			<el-date-picker 
				type="date" 
				placeholder="选择日期" 
				v-model="form.date" 
				style="width: 319px;"
				value-format="yyyy-MM-dd"></el-date-picker>
		</el-form-item>
		
		<el-form-item label="选择项目">
			<el-select 
				v-model="form.project" 
				placeholder="请选择测试项目"
				filterable
				allow-create
				clearable
				style="width: 319px;">
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
				style="width: 319px;">
				<el-option label="Weekly" value="Weekly"></el-option>
				<el-option label="Publish" value="Publish"></el-option>
			</el-select>
		</el-form-item>
		
		<el-form-item label="本周风险">
			<el-input 
				v-model="form.this_weekly" 
				placeholder="请输入本周风险" 
				style="width: 519px;"></el-input>
		</el-form-item>

		<el-form-item label="上周修复">
			<el-input
				v-model="form.last_weekly_repair" 
				placeholder="请输入上周修复" 
				style="width: 519px;"></el-input>
		</el-form-item>

		<el-form-item label="本周结论">
			<el-input 
				v-model="form.conclusion" 
				placeholder="请输入本周结论" 
				style="width: 519px;"></el-input>
		</el-form-item>
		
		<el-form-item label="提交秘钥">
			<el-input 
				v-model="form.secret_key" 
				placeholder="请输入提交秘钥"
				style="width: 319px;"></el-input>
		</el-form-item>
		
		<el-form-item label="确认数据">
			<el-switch v-model="form.delivery"></el-switch>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit">提交</el-button>
			<el-button>取消</el-button>
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
					this_weekly: '',
					last_weekly_repair: '',
					conclusion: '',
					secret_key: '',
					delivery: false
				}
			}
		},
		methods: {
			onSubmit() {
				let check = this.form
				if (check.delivery === true) {
					// 判断秘钥逻辑
					if (check.secret_key.length == 0 ) {
						this.$alert('秘钥为空 ', 'Warning', {
							confirmButtonText: '确定',
						});
					}
					else {
						this.$loading()
						this.$axios.post('/api/v1/secret_key', {
							secret_key: check.secret_key})
						.then(res => {
							// 判断秘钥是否正确
							if (res.data == 'True') {
								// 判断 是否有空白项
								if (check.date.length == 0 | check.project.length == 0 | check.branch.length == 0 | check.this_weekly.length == 0 | check.last_weekly_repair.length == 0 | check.conclusion.length == 0) {
									this.$alert('有空白输入项 ', 'KeyError', {
										confirmButtonText: '确定',
									});
								}
								else {
									// 提交 风险
									this.$axios.post('/api/v1/commit_risk', {postform:this.form})
									.then(res => {
										console.log(res.data)
										console.log('请求成功')
										if (res.data == 'True') {
											this.$alert('数据上传成功', 'Success', {
												confirmButtonText: '确定',
											});
										}
										else if (res.data == 'Have') {
											this.$alert('风险信息已提交 ', 'Risk already commit ', {
												confirmButtonText: '确定',
											});
										}
										else if (res.data == 'NotFound') {
											this.$alert('所选日期无提交 ', 'NotFound ', {
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
					this.$loading().close()
				}
				else {
					console.log('No!', check.delivery)
					this.$alert('你尚未确认数据', 'Warning', {
						confirmButtonText: '确定',
					});
				}
			}
		}
	}
</script>