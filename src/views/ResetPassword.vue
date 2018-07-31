<template>
  <section class="container animated fadeIn">
    <div class="container_box">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <section class="submit"  @click="submitForm('ruleForm2')">确定</section>
          <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
  import * as apiRequest from '../api/api'
  export default {
    data() {
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          if (this.ruleForm2.oldPass !== '') {
            this.$refs.ruleForm2.validateField('pass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          oldPass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' },
            // { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' },
            // { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ],
          oldPass: [
            { validator: validatePass1, trigger: 'blur' }
          ]
        }
      };
    },
    computed:{
    },
    methods: {
      // ...mapMutations(['delUserData']),
      open() {
        this.$message({
          type: 'info',
          message: '密码修改成功！3秒后跳转到登录页面'
        });
      },
      submitForm(formName) {
        console.log(this.token)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            apiRequest.ChangePwd({
              oldPassword:this.ruleForm2.oldPass,
              newPassword:this.ruleForm2.pass,
            }).then(
              data=>{
                if(data.code ==0){
                  this.open()
                  setTimeout(()=>{
                    // this.delUserData();
                    this.$router.push('/login')
                  },3000)

                }
              }
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // }
    }
  }
</script>

<style scoped lang="less">
  .el-input__inner{
    border-radius: 30px!important;
  }
  .container{
    display: flex;
    justify-content: center;
    .container_box{
      width: 375px;
      padding-top: 40px;
    }
  }
  .submit{
    margin-top: 30px;
    width:375px;
    height:40px;
    background:rgb(122, 152, 247);
    border-radius: 8px;
    text-align: center;
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    cursor: pointer;
  }
  .el-form-item {
    margin-bottom: 8px;
  }
</style>
