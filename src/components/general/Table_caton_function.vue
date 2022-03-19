<template>
	<div>
		<el-button type="primary" icon="el-icon-arrow-left" index="/Caton_Function" @click='prev' size="small" style="left: auto;">返回上一级</el-button>
		
		<el-button-group style="float:right">
			<el-button 
				type="primary" 
				icon="el-icon-arrow-left" 
				index="/Caton_Function" 
				@click="turnTo(pre_url)" 
				size="small"
				v-if="pre_url">进入上一页</el-button>
			
			<el-button 
				type="primary" 
				@click="turnTo(next_url)"
				size="small" 
				v-if="next_url">进入下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>		  
		</el-button-group>
		
		{{ pre_url}}
		{{ count }}
		
		<el-table
			:data="tableData"
			stripe
			style="width: 100%"
			:row-class-name="tableRowClassName"> // default-sort = "{prop: 'date', order: 'descending'}"

			<el-table-column
				prop="function"
				label="卡顿函数"
				width="319">
			</el-table-column>
			<el-table-column
				prop="frequency"
				label="卡顿次数"
				sortable
				align="center"
				width="100">
			</el-table-column>
			<el-table-column
				prop="delaytime"
				label="单次延时"
				sortable
				width="219">
			</el-table-column>
			<el-table-column
				prop="totalDelaytime"
				label="总延时"
				sortable
				width="219">
			</el-table-column>
			<el-table-column
				prop="profileFilename"
				label="文件名">
				<template slot-scope="scope">
					<el-button type="text" @click="preview(scope.row.filePath, scope.row.profileFilename)">{{ scope.row.profileFilename }}</el-button>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				prop="filePath"
				label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="down(scope.row.filePath, scope.row.profileFilename)">下载</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
	
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  export default {
    data() {
        return {
            tableData: [{
              date: '2016-05-03',
              function: '如果',
              frequency: '康到这个',
			  delaytime: '说明',
			  totalDelaytime: '木有找到',
			  profileFilename: '数据',
			  filePath: 'Down'			  
            }],
			pre_url : '',
			next_url : '',
			count : '',
			filePath : []
        }
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
	    tableRowClassName({row, rowIndex}) {
	        if (rowIndex === 1) {
	          return 'warning-row';
	        } else if (rowIndex === 3) {
	          return 'success-row';
	        }
	        return '';
	    },
		prev(){
			this.$router.back()
		},
		turnTo(url){
			console.log('转向中...')
			let self = this
			self.post_data = this.$route.params
			this.$axios.post(url, {post_data:self.post_data})
			.then(response => {
				console.log(response),
				console.log('请求成功')
				this.tableData = response.data.caton_function,
				this.pre_url = response.data.pre_url,
				this.next_url = response.data.next_url,
				this.count = response.data.count
				
			})
			.catch(function(error){
				console.log(error);
			})
		},
		preview(filePath, profileFilename){
			console.log('预览中...')
			console.log(filePath, profileFilename)
			this.$axios.post('/api/v1/transmission', {
				filePath: filePath, 
				profileFilename: profileFilename
			}).then(res => {
				if ( !res ){
					return
				}
				var filename = profileFilename
				var binaryData = []
				binaryData.push(res.data)
				let url = window.URL.createObjectURL(new Blob(binaryData, {type: 'image/svg+xml'}))
				let link = document.createElement('a')		// 链接-> 超链
				link.style.display = 'none'		//
				link.href = url
				link.setAttribute('download', filename)
				document.body.appendChild(link)
				window.open(link);
			})				
		},
		down(filePath, profileFilename){
			console.log('下载中...')
			console.log(filePath, profileFilename)			
			this.$axios.post('/api/v1/transmission', {
				filePath: filePath, 
				profileFilename: profileFilename
			}).then(res => {
				if ( !res ){
					return
				}
				var filename = profileFilename
				var binaryData = []
				binaryData.push(res.data)
				let url = window.URL.createObjectURL(new Blob(binaryData, {type: 'image/svg+xml'}))
				let link = document.createElement('a')		// 链接-> 超链
				link.style.display = 'none'		//
				link.href = url
				link.setAttribute('download', filename)
				document.body.appendChild(link)
				link.click();
			})
		}
	}

  }
</script>
