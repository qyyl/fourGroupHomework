<template>
  <div class="login">
    <!--表单-->
    <div>
      <h2>登录</h2>
      <p>欢迎来到后台管理系统</p>
      <p>请登录:</p>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="user">
          <el-input type="text" v-model="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="button" @click="submitForm">登录</el-button>
          <el-button  type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--图片-->
    <div>
      <img src="../assets/img/login.png" alt="">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'login',
  data () {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      // else {
      //   if (this.ruleForm.checkPass !== '') {
      //     this.$refs.ruleForm.validateField('checkPass')
      //   }
      //   callback()
      // }
    }
    return {
      ruleForm: {
        pass: '',
        user: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        // checkPass: [
        //   { validator: validatePass2, trigger: 'blur' }
        // ],
        user: [
          { validator: checkUser, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      // console.log(111)
      // console.log(this.ruleForm.user)
      // console.log('用户' + this.ruleForm.user)
      this.$axios.post('/admin/login', { name: this.ruleForm.user, password: this.ruleForm.pass },
        {
          headers: {
            'Content-type': 'application/json'
          }
        }
      ).then((response) => {
        console.log(response)
        if (response.data.code === 200) {
          // 将登录用户存储起来
          this.$alert('登录成功', '是否登录成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `${'登录成功'}`
              })
            }
          })
          this.$router.replace('Index')
          sessionStorage.setItem('user', response.data.data.name)
          sessionStorage.setItem('pwd', response.data.data.password)
        } else {
          this.$alert('登录失败请重登', '是否登录成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${'登录失败'}`
              })
            }
          })
          this.ruleForm.pass = ''
          this.ruleForm.user = ''
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {
    // HelloWorld
  }

}

</script>
<style scoped>
  .login{
    width:900px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 19px 1px rgba(69,47,133,0.2);
    margin: 0 auto;
  }
  .login{
    overflow: hidden;
  }
  .login>div{
    float: left;
  }
  .login>div:nth-of-type(1){
    width: 700px;
  }
  .login>div:nth-of-type(2){
    width: 200px;
  }
  .login>div:nth-of-type(2)>img{
    width: 200px;
  }

</style>
