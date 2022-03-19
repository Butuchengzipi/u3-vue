<template>
	<div>
		<el-button type="primary" icon="el-icon-arrow-left" index="/Caton_Function" @click='prev' size="small" style="left: auto;">返回上一级</el-button>
		
		<el-button-group style="float:right">
			<el-button 
				type="info" 
				size="small"
				disabled>若密码失效或链接有误，请联系管理员————橙子皮</el-button>		  
		</el-button-group>
		
		<el-table
			:data="tableData"
			stripe
			style="width: 100%"
			:row-class-name="tableRowClassName"
			@selection-change="handleSelectionChange">
			<el-table-column
				prop="id"
				label="ID"
				width="39"
				type="selection">
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
			<el-table-column
				prop="operating"
				label="Operating"
				width="95">
				<template slot-scope="scope">
					<el-button
						plain 
						class="el-icon-edit" 
						@click="turnToChange(scope.row)" 
						style="padding: 5px;"></el-button>
					<el-button
						plain 
						class="el-icon-delete" 
						@click="dialogVisible = true, deleteID = scope.row.id" 
						style="padding: 5px;"></el-button>
				</template>
			</el-table-column>
			<el-dialog
				title="删除数据" 
				:visible.sync="dialogVisible"
				width="30%"
				center
				append-to-body="true"
				:close-on-click-modal=false>
				<el-form :model="deleteForm">
					<el-form-item label="提交秘钥">
						<el-input 
							v-model="deleteForm.secret_key" 
							placeholder="请输入提交秘钥"
							style="width: 319px;"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="tryToDelete(deleteID), dialogVisible = false">确 定</el-button>
					<el-button @click="dialogVisible = false">取 消</el-button>
				</div>
			</el-dialog>
			
		</el-table>
		
		<el-button
			type="primary"  
			@click="graph()" 
			size="big"
			v-if="">选取后，跳转生成图表界面</el-button>
		
	</div>
	
</template>

<style>
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
	
	.el-table td, .el-table th{
		text-align: center;
	}
</style>

<script>
	export default {
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
				pre_url : '',
				next_url : '',
				count : '',
				deleteForm: {
					secret_key: ''
				},
				dialogVisible : false,
				deleteID : '',
				toEchart: []
			}
		},
	
		mounted() {
			this.$loading()
			let self = this
			self.post_data = this.$route.params
			console.log(self.post_data)
			this.$axios.post('/api/v1/perfdog_data/', {post_data:self.post_data} )
			.then(response => {
				console.log(response),
				console.log('请求成功')
				this.tableData = response.data.perfdog_data,
				console.log("************tableData ", this.tableData, typeof(this.tableData))
			})
			.catch(function(error){
				console.log(error);
			})
			this.$loading().close()
		},
	
		methods: {
			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 1) {
					return 'warning-row';
				} else if (rowIndex === 3) {
					return 'success-row';
				}
				return '';
			},
			prev(){
				this.$router.go(-1)
			},
			turnTo(url) {
				window.open(url)	// 打开新的页面
			},
			copyPassword(pwd) {
				var Url2 = document.getElementById("password").innerText;
				console.log(pwd)

				var oInput = document.createElement("input");
				oInput.value = pwd;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				oInput.className = "oInput";
				oInput.style.display = "none";
				console.log("复制成功");
				this.$notify({
					title: '复制成功',
					message: '',
					type: 'success'
				});
			},
			turnToChange(row) {
				this.$router.push({name:'Form_change_perfdog', params:{
					id: row.id,
					date: row.date,
					project: row.project,
					branch: row.branch,
					model: row.model,
					test_content: row.test_content,
					frame: row.frame,
					remark: row.remark,
					avgFPS: row.avgFPS,
					varFPS: row.varFPS,
					dropFPS: row.dropFPS,
					jank: row.jank,
					bigJank: row.bigJank,
					avgMemory: row.avgMemory,
					avgCPU: row.avgCPU,
					link: row.link + 'Password:' + row.password}})
			},
			tryToDelete(id) {
				console.log("尝试删除")
				console.log(id)
				this.$loading()											// 开始loading
				let check = this.deleteForm
				// 判断秘钥逻辑
				if (check.secret_key.length == 0 ) {
					this.$alert('秘钥为空 ', 'Warning', {
						confirmButtonText: '确定',
					});
					return false
				}
				else {
					this.$loading()											// 开始loading
					this.$axios.post('/api/v1/secret_key', {secret_key: check.secret_key})
					.then(res => {
						// 判断秘钥是否正确
						if (res.data == 'True') {
							// 提交操作
							this.$axios.post('/api/v1/delete_perfdog', {id: id})
							.then(res => {
								console.log(res.data)
								console.log('开始删除...')
								if (res.data == 'True') {
									this.$notify({
										title: '删除成功',
										type: 'success'
									});
								}
								else { 
									console.log(res.data)
									this.$notify.error({
										title: '未知错误'
									});
								}
							})
							.catch(function(error){
								console.log(error);
							})
						}
						else {
							this.$alert('秘钥不正确 ', 'KeyError', {
								confirmButtonText: '确定',
							});
						}
					})
					.catch(function(error){
						console.log(error);
						this.$notify.error({
							title: '未知错误'
						});
					})
				}
				this.$loading().close()										// 关闭loading
			},
			graph() {
				// 判断 toEchart 的 长度 是否符合要求
				if (this.toEchart.length === 0) {
					this.$alert('必须选取数据 ', 'None', {
						confirmButtonText: '确定',
					});
					return false
				}else{
					// console.log(typeof(this.toEchart[0]))
					var arr = Object.keys(this.toEchart[0])
					var len = arr.length
					// console.log(len)
				}
				
				if (len === 1) {
					this.$alert('必须选取1组以上数据 ', 'Less', {
						confirmButtonText: '确定',
					});
				}else{
					this.$router.push({name:'Echarts_deal', params:{toEchart: this.toEchart}})
				}
			},
			
			handleSelectionChange (val) {
				this.toEchart = []															// 清空数组
				// console.log('toEchart***************', this.toEchart)
				// console.log('val***************', typeof(val), val, val.length)
				
				this.toEchart.push(val)														// 重新赋值		
				// for(var i=0; i < val.length ; i++){
				// 	console.log(this.toEchart.indexOf(val[i]))
				// 	if ( (this.toEchart.indexOf(val[i])) === -1 ) {
				// 		this.toEchart.push(val[i])
				// 	}
				// }
				// console.log('***************toEchart',this.toEchart)						// 打印太多 log 会影响效率

			}
		}

	}
</script>
