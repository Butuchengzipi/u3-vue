<template>
    <div class="container">
        <div class="block">
        <span class="demonstration">周</span>
        <el-date-picker
            v-model="value1"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周">
        </el-date-picker>
      </div>
    <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    </div>

</template>

<script>
    export default {
        name: 'hello',
            data () {
            return {
              msg: 'Welcome！'
            }
        },
    }
</script>
