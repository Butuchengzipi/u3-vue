<template>
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="获取时间">
			<el-date-picker 
				type="date" 
				placeholder="选择日期" 
				v-model="form.date1" 
				style="width: 319px;"></el-date-picker>
		</el-form-item>
		
		<el-form-item label="选择框架">
			<el-select 
				v-model="form.region" 
				placeholder="请选择测试框架"
				style="width: 319px;">
				<el-option label="新框架" value="shanghai"></el-option>
				<el-option label="老框架" value="beijing"></el-option>
				<el-option label="竞品" value="beijing"></el-option>
				<el-option label="其他" value="beijing"></el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="FPS对比">
			<el-upload
				class="upload-demo"
				action="https://jsonplaceholder.typicode.com/posts/"
				:on-change="handleChange"
				:file-list="fileList">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</el-form-item>

		<el-form-item label="Memory">
			<el-upload
				class="upload-demo"
				action="https://jsonplaceholder.typicode.com/posts/"
				:on-change="handleChange"
				:file-list="fileList">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</el-form-item>

		<el-form-item label="CPU对比">
			<el-upload
				class="upload-demo"
				action="https://jsonplaceholder.typicode.com/posts/"
				:on-change="handleChange"
				:file-list="fileList">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
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
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>