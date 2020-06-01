<template>
  <div class="addProduct">
    <el-row>
      <div class="grid-content bg-purple-dark"><h1>添加商品</h1></div>
    </el-row>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品分类" prop="catId" hide-required-asterisk="true">
        <el-input v-model="ruleForm.catId"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="ruleForm.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="goodsTitle">
        <el-input v-model="ruleForm.goodsTitle"></el-input>
      </el-form-item>
      <el-form-item label="关键字" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌" prop="brandId">
        <el-input v-model="ruleForm.brandId"></el-input>
      </el-form-item>
      <el-form-item label="商品介绍" prop="goodsDetail" hide-required-asterisk="false">
        <el-input type="textarea" v-model="ruleForm.goodsDetail"></el-input>
      </el-form-item>
      <el-form-item label="商品货号" prop="productSize">
        <el-input v-model="ruleForm.productSize"></el-input>
      </el-form-item>
      <el-form-item label="商品售价" prop="goodsPrice">
        <el-input v-model="ruleForm.goodsPrice"></el-input>
      </el-form-item>
      <el-form-item label="市场价" prop="marketPrice">
        <el-input v-model="ruleForm.marketPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="goodsStore">
        <el-input v-model="ruleForm.goodsStore"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="goodsDanWei">
        <el-input v-model="ruleForm.goodsDanWei"></el-input>
      </el-form-item>
      <el-form-item label="商品重量" prop="goodsWeight">
        <el-input v-model="ruleForm.goodsWeight"></el-input>
      </el-form-item>
      <!--<el-form-item label="排序" prop="goodsSort">-->
        <!--<el-input v-model="ruleForm.goodsSort"></el-input>-->
      <!--</el-form-item>-->
      <h3>填写商品促销</h3>
      <el-form-item label="赠送积分" prop="goodsScore">
        <el-input v-model="ruleForm.goodsScore"></el-input>
      </el-form-item>
      <el-form-item label="预告商品" prop="prePro">
        <el-switch v-model="ruleForm.prePro"></el-switch>
      </el-form-item>
      <el-form-item label="商品推荐" prop="goodsRecom">
        <el-input v-model="ruleForm.goodsRecom"></el-input>
      </el-form-item>
      <h3>填写商品属性</h3>
      <el-form-item label="属性类型" prop="proType" hide-required-asterisk="true">
        <el-select v-model="ruleForm.proType" placeholder="请选择" size="medium">
          <el-option label="田米" value="tianmi">田米</el-option>
          <el-option label="小蜜蜂" value="xiaomifeng">小蜜蜂</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品参数" prop="goodsCan">
        <el-input v-model="ruleForm.goodsCan"></el-input>
      </el-form-item>
      <el-form-item label="商品相册" prop="goodsImgs">
        <el-input v-model="ruleForm.goodsImgs"></el-input>
      </el-form-item>
        <!--富文本-->
      <el-form-item label="规格参数" prop="words">
          <div class="edit_container">
            <el-card ></el-card>
            <quill-editor v-model="ruleForm.words" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)"  style="height: 400px;">
            </quill-editor>
          </div>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'addProduct',
  data () {
    return {
      ruleForm: {
        goodsName: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        goodsRecom: '',
        type: [],
        resource: '',
        desc: '',
        catId: '',
        goodsTitle: '',
        brandId: '',
        goodsDetail: '',
        productSize: '',
        goodsPrice: '',
        marketPrice: '',
        goodsStore: '',
        goodsDanWei: '',
        goodsWeight: '',
        goodsSort: '',
        goodsScore: '',
        prePro: false,
        serve: '',
        proType: '',
        goodsCan: '',
        goodsImgs: '',
        content: '',
        keywords: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      //   富文本
      editorOption: {}
    }
  },
  methods: {
    submitForm () {
      this.$axios.post('/goods/add', {
        brandId: this.ruleForm.brandId,
        catId: this.ruleForm.catId,
        goodsDetail: this.ruleForm.goodsDetail,
        goodsImgs: this.ruleForm.goodsImgs,
        goodsName: this.ruleForm.goodsName,
        goodsScore: this.ruleForm.goodsScore,
        goodsTitle: this.ruleForm.goodsTitle,
        keywords: this.ruleForm.keywords,
        recommend: this.ruleForm.goodsRecom,
        status: 1
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message(res.data.msg)
        } else {
          this.$message(res.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    //   上传图片
    handleAvatarSuccess (res, file) {
      console.log('上传的文件为')
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log('上传的图片为')
      console.log(this.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    //   图片上传失败
    imgUploadError (err, file, fileList) { // 图片上传失败调用
      console.log(err)
      this.$message.error('上传图片失败!')
    },

    //   富文本修改图片
    updateData (e = '') {
      const c1 = e.replace(/<img width="100%"/g, '<img')
      const c2 = c1.replace(/<img/g, '<img width="100%"')
      this.content = c2
      console.log(this.content)
    },
    onEditorReady (editor) {
    }
  },
  components: {
    quillEditor
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>

<style scoped>
/*上传开始*/
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
  /*上传结束*/
/*富文本开始*/
.rich-text-test{
  margin-top: 40px;
}
  /*富文本结束*/
</style>
