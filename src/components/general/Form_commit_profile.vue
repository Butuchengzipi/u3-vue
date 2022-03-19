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

		<el-form-item label="选择机器">
			<el-select 
				v-model="form.model" 
				placeholder="请选择测试机器, 如: OPPO A37" 
				filterable
				allow-create
				clearable
				style="width: 319px;">
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
				style="width: 319px;">
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
				style="width: 319px;">
				<el-option label="第一章" value="第一章"></el-option>
				<el-option label="战斗外" value="战斗外"></el-option>
			</el-select>
		</el-form-item>
		
		<el-form-item label="输入备注">
			<el-input 
				v-model="form.remark" 
				placeholder="请输入相关备注" 
				style="width: 319px;"></el-input>
		</el-form-item>

		<el-form-item label="上传文件">
			<el-upload
				ref="uploadProfile"
				class="upload-demo"
				action="/api/api/v1/receive_profile"
				:on-change="handleChange"
				:on-success="handleSuccess"
				:on-remove="handleRemove"
				:on-error="handleError"
				:on-exceed="handleExceed"
				:before-upload="beforeUpload"
				:multiple=false
				accept=".rar"
				:auto-upload=false
				:limit="1"
				:file-list="debug_output">
				<el-button size="small" type="primary">点击选择</el-button>
				<div slot="tip" class="el-upload__tip">上传debug_output压缩包</div>
			</el-upload>
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
					model: '',
					frame: '',
					test_content: '',
					remark: '',
					file: '',
					secret_key: '',
					delivery: false
				},
				debug_output: []
			}
		},
		methods: {
			// onSubmit 只提交文件，提交完后触发 on_Success 处理文件
			onSubmit() {
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
						this.$axios.post('/api/v1/secret_key', {
							secret_key: check.secret_key})
						.then(res => {
							// 判断秘钥是否正确
							if (res.data == 'True') {
								// 判断 是否有空白项
								if (check.date.length == 0 | check.project.length == 0 | check.branch.length == 0 | check.model.length == 0 | check.frame.length == 0 | check.test_content.length == 0 | check.remark.length == 0) {
									this.$alert('有空白输入项 ', 'KeyError', {
										confirmButtonText: '确定',
									});
									return false
								}
								else {
									// 提交操作
									this.$refs.uploadProfile.submit()
								}
							}
							else {
								this.$alert('秘钥不正确 ', 'KeyError', {
									confirmButtonText: '确定',
								});
								return false
							}
						})
						.catch(function(error){
							console.log(error);
							this.$alert('未知错误...', 'Unknown Error', {
								confirmButtonText: '确定',
							});
							return false
						})
						// 这里需要一层 false ,否则会继续执行
						return false
					}
					
				}
				else {
					console.log('No!', check.delivery)
					this.$alert('你尚未确认数据', 'Warning', {
						confirmButtonText: '确定',
					});
					return false
				}
				
			},
			handleChange(file, debug_output) {										// 文件变化后执行的函数
				this.debug_output = debug_output.slice(-3);
				//this.debug_output.push({name: 'debug_output', url:''});
				console.log('change')
				console.log(file)
				this.form.file = file.raw
				console.log(this.form.file)
				console.log(debug_output)
			},
			handleSuccess() {														// 上传成功后执行的函数
				this.$loading()
				let postform = this.form
				
				console.log('submit!', postform.delivery);
				console.log(postform.date)
				console.log(postform.project)
				console.log(postform.branch)
				console.log(postform.model)
				console.log(postform.frame)
				console.log(postform.remark)
				console.log(postform.test_content)
				console.log(postform.secret_key)
				//简写
				this.$axios.post('/api/v1/commit_profile', {postform:this.form})
				.then(res => {
					console.log(res.data)
					console.log('请求成功')
					if (res.data == 'True') {
						this.$alert('文件上传成功', 'Success', {
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
				
				this.$loading().close()
			},
			handleRemove() {														// 移除文件后执行的函数
				this.$alert('文件移除成功', 'Success', {
					confirmButtonText: '确定',
				});
			},
			handleError() {															// 上传失败执行
				this.$alert('文件上传失败，请联系管理员--橙子皮', 'Warning', {
					confirmButtonText: '确定',
				});
				this.$loading().close()
			},
			handleExceed(){															// 文件数量超出执行
				this.$alert('文件数量超出限制，当前最大允许数：1 ', 'Warning', {
					confirmButtonText: '确定',
				});
			},
			beforeUpload(file){												// 上传前执行，用于检测文件类型，配合 el-upload 中的格式
				
				console.log(this.debug_output, '**********',file)
				
				let extension = file.name.substring(file.name.lastIndexOf('.')+1)
				let size = file.size / 1024 / 1024
				
				if (extension !== 'rar') {
					return false
					this.$alert('上传格式必须为 .rar ', 'Warning', {
						confirmButtonText: '确定',
					});
				}
				if ( size > 100 ){
					return false
					this.$alert('文件大小超出 100MB，请联系管理员--橙子皮', {
						confirmButtonText: '确定',
					});
				}
			}
			
		}
	}
</script>