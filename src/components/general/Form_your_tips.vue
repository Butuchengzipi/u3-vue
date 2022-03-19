<template>
	<div>
		<el-form ref="form" :model="form" style="width: 100%">
			<el-form-item label="你的建议">
				<el-input type="text" v-model="form.body"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即提交</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
		
		<el-table
			:data="post_data"
			style="width: 100%"
			stripe
			:row-class-name="tableRowClassName">

			<el-table-column
				prop="body"
				label="意见">
			</el-table-column>
			<el-table-column
				prop="timestamp"
				label="发布时间"
				sortable>
			</el-table-column>
		</el-table>
		
		<el-main>
			<el-input-number 
				v-model="page"
				size="mini"
				center
				:min="1"></el-input-number>
			<el-button
				type="success" 
				icon="el-icon-s-promotion" 
				@click="turnToPage(pre_url, page)" 
				size="small"
				style="float:right; height:27.5px;">前往</el-button>	
		</el-main>
		
		<el-button
			type="primary" 
			icon="el-icon-arrow-left" 
			@click="turnTo(pre_url)" 
			size="small"
			style="float:left"
			v-if="pre_url">进入上一页</el-button>			
		
		<el-button 
			type="primary" 
			@click="turnTo(next_url)"
			size="small" 
			style="float:right"
			v-if="next_url">进入下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				form: {
					body: '',			
				},
				post_data : [{
					body: '康到这个',
					timestamp: '木有找到'
				}],
				pre_url : '',
				next_url : '',
				count : ''
			}
		},
		mounted(){
			this.$axios.get('/api/v1/posts')
			.then(response => {
				console.log(response),
				console.log('请求成功'),
				this.post_data = response.data.posts,
				this.pre_url = response.data.pre_url,
				this.next_url = response.data.next_url,
				this.page = response.data.page,			
				this.count = response.data.count
			})
			.catch(function(error){
				console.log(error);
			})
		},
		methods: {
			onSubmit() {
				console.log('submit!');
				let check = this.form
				this.$loading()											// 开始loading
				// 判断 是否有空白项
				if (check.body == 0 ) {
					this.$alert('有空白输入项 ', 'KeyError', {
						confirmButtonText: '确定',
					});
				}
				else {
					// 提交操作
					this.$axios.post('/api/v1/create_post', {body:check.body})
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
				this.$loading().close()										// 关闭loading
				this.$router.go(0)
			},
			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 1) {
				  return 'warning-row';
				} else if (rowIndex === 3) {
				  return 'success-row';
				}
				return '';
			},
			turnTo(url){
				console.log('转向中...')
				
				this.$axios.get(url)
				.then(response => {
					console.log(response),
					console.log('请求成功')
					this.post_data = response.data.posts,
					this.pre_url = response.data.pre_url,
					this.next_url = response.data.next_url,
					this.page = response.data.page,
					this.count = response.data.count,
					this.this_weekly = response.data.this_weekly
					
				})
				.catch(function(error){
					console.log(error);
				})
			},
			turnToPage(url, page){
				console.log('转向中...')
				
				this.$axios.get('/api/v1/posts?page=' + this.page)
				.then(response => {
					console.log(response),
					console.log('请求成功')
					this.post_data = response.data.posts,
					this.pre_url = response.data.pre_url,
					this.next_url = response.data.next_url,
					this.page = response.data.page,
					this.count = response.data.count,
					this.this_weekly = response.data.this_weekly
									
				})
				.catch(function(error){
					console.log(error);
				})
			}
		}
	}
</script>

<style>
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
</style>
