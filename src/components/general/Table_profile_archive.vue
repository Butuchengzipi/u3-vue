<template>
	<div>
		<el-card>最新数据</el-card>
		<el-table
			:data="this_week"
			style="width: 100%">
			<el-table-column
				prop="date"
				label="日期"
				sortable>
			</el-table-column>
			<el-table-column
				prop="project"
				label="项目">
			</el-table-column>
			<el-table-column
				prop="branch"
				label="分支">
			</el-table-column>
			<el-table-column
				prop="model"
				label="测试机">
			</el-table-column>
			<el-table-column
				prop="remark"
				label="备注">
			</el-table-column>
			<el-table-column
				prop="date"
				label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="down(scope.row.date, scope.row.project, scope.row.branch)">下载</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<el-card style="margin-top:19px;">历史数据</el-card>
		<el-table
			:data="tableData"
			style="width: 100%"
			:row-class-name="tableRowClassName">
		
			<el-table-column
				prop="date"
				label="日期"
				sortable>
			</el-table-column>
			<el-table-column
				prop="project"
				label="项目">
			</el-table-column>
			<el-table-column
				prop="branch"
				label="分支">
			</el-table-column>
			<el-table-column
				prop="model"
				label="测试机">
			</el-table-column>
			<el-table-column
				prop="remark"
				label="备注">
			</el-table-column>
			<el-table-column
				fixed="right"
				prop="date"
				label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="down(scope.row.date, scope.row.project, scope.row.branch)">下载</el-button>
				</template>
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


<style>
	.el-table .warning-row {
		background: oldlace;
	}
	.el-table .success-row {
		background: #f0f9eb;
	}
	.el-input-number {
		text-align: center;
	}
</style>

<script>
	export default {
		data() {
			return {
				tableData : [{
					date: '2016-05-03',
					project: '如果',
					branch: '康到这个',
					model: '木有找到',
					remark: '说明',
					down: 'some'
				}],
				pre_url : '',
				next_url : '',
				page : '', 
				count : '',
				this_week : [{
					date: '2016-05-03',
					project: '如果',
					branch: '康到这个',
					model: '木有找到',
					remark: '说明',
					down: 'some'
				}]
        }
    },
	mounted(){
		this.$axios.get('/api/v1/archive/')
		.then(response => {
			this.tableData = response.data.archive,
			this.pre_url = response.data.pre_url,
			this.next_url = response.data.next_url,
			this.page = response.data.page,
			this.count = response.data.count,
			this.this_week = response.data.this_week
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
		turnTo(url){
			console.log('转向中...')
			this.$axios.get(url)
			.then(response => {
				console.log(response),
				console.log('请求成功')
				this.tableData = response.data.archive,
				this.pre_url = response.data.pre_url,
				this.next_url = response.data.next_url,
				this.page = response.data.page,
				this.count = response.data.count,
				this.this_week = response.data.this_week
			})
			.catch(function(error){
				console.log(error);
			})
		},
		turnToPage(url, page){
			console.log('转向中...')
			this.$axios.get('/api/v1/archive/?page=' + this.page)
			.then(response => {
				console.log(response),
				console.log('请求成功')
				this.tableData = response.data.archive,
				this.pre_url = response.data.pre_url,
				this.next_url = response.data.next_url,
				this.page = response.data.page,
				this.count = response.data.count,
				this.this_week = response.data.this_week
			})
			.catch(function(error){
				console.log(error);
			})
		},
		down(date, project, branch){
			console.log('下载中...')
			this.$axios({
				method : 'post',
				url : '/api/v1/transmission_rar',
				data:{
					date : date,
					project : project,
					branch : branch
					},
				responseType : 'blob'
			}).then(res => {
				// 判断返回值 和 返回 size，用于文件下载或提醒
				// && res.data.size < 19
				// res.data = 'only perfdog data'
				// 注意页面缓存
				if (res.data.size < 19) {
					this.$alert('当日只有 Perfdog 数据...', 'Warning', {
						confirmButtonText: '确定',
					});
				}else {
					if ( !res ){
						return
					}
					var filename = date + ' ' + project + ' ' + branch + '.zip'
					
					var binaryData = []
					binaryData.push(res.data)
					
					let url = window.URL.createObjectURL(new Blob(binaryData, {type: 'application/zip'}))
					let link = document.createElement('a')		// 链接-> 超链
					link.style.display = 'none'		//
					link.href = url
					link.setAttribute('download', filename)
					document.body.appendChild(link)
					link.click();
				}
			})
			.catch(function(error){
				console.log(error);
				this.$alert('未知错误...', 'Unknown Error', {
					confirmButtonText: '确定',
				});
			})
		}
	}
  }
</script>