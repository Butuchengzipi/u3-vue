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
					secret_key: '',
					delivery: false
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
				let check = this.form
				if (check.delivery === true) {
					this.$loading()
					// 判断秘钥逻辑
					if (check.secret_key.length == 0 ) {
						this.$alert('秘钥为空 ', 'Warning', {
							confirmButtonText: '确定',
						});
						return false
					}
					else {
						this.$loading()
						this.$axios.post('/api/v1/secret_key', {
							secret_key: check.secret_key})
						.then(res => {
							// 判断秘钥是否正确
							if (res.data == 'True') {
								// 判断 是否有空白项
								if (check.date.length == 0) {
									this.$alert('有空白输入项 ', 'KeyError', {
										confirmButtonText: '确定',
									});
									return false
								}
								else {
									this.$axios.post('/api/v1/compressed_file', {
										date: check.date})
									.then(res => {
										// 判断返回是否正确
										if (res.data == 'True') {
											this.$alert('文件打包成功 ', 'Success', {
												confirmButtonText: '确定',
											});
										}
										else if (res.data == 'Have') {
											this.$alert('打包文件已存在 ', 'File already exists ', {
												confirmButtonText: '确定',
											});
										}
										else if (res.data == 'NotFound') {
											this.$alert('所选日期无提交 ', 'NotFound ', {
												confirmButtonText: '确定',
											});
										}
										else {
											this.$alert('未知错误...', 'Unknown Error', {
												confirmButtonText: '确定',
											});
										}
									})
									.catch(function(error){
										console.log(error);
										this.$alert('未知错误...', 'Unknown Error', {
											confirmButtonText: '确定',
										});
										return false
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
					return false
				}
			}
		}
  }
</script>