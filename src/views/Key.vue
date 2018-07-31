<template>
  <div class="animated fadeIn">


<Row>
    <Col :md="24">
        <div class="key-container" style="width: 100%;min-height: 740px;">
            <div style="display: flex;flex-direction: column">
                <div style="background: white">
                    <div style="height: 50px;line-height: 50px;">
                        <span style="font-size: 16px;color: #232a4a;font-family: PingFang SC;margin-left: 20px">Public Key</span>
                    </div>
                    <div style="height: 8px">
                        <img src="../../static/img/xian.png" alt="" style="width: 100%;height: 100%;opacity: .4 ">
                    </div>
                    <div style="height: 50px;line-height: 50px;padding-left: 20px">
                        我的Public Key: <span style="width: 16px;color: #0e83cd;cursor: pointer" @click="getPublicApi">点击获取</span>
                    </div>
                </div>
                <el-collapse-transition>
                <div style="height: 528px;display: flex;flex-direction: column;background: white;margin-top: 20px" v-show="ifEditor">
                    <div style="height: 50px;line-height: 50px;">
                        <span style="font-size: 16px;color: #232a4a;font-family: PingFang SC;margin-left: 20px">编辑API Key</span>

                    </div>
                    <div style="height: 8px">
                        <img src="../../static/img/xian.png" alt="" style="width: 100%;height: 100%;opacity: .4 ">
                    </div>
                    <div style="display: flex;flex-direction: row;height: 500px">

                        <div style="width: 45%;padding: 20px;position: relative">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" label-position="top">
                                <el-form-item label="Public Key" prop="key">
                                <el-input v-model="ruleForm.key" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="备注" prop="remark">
                                    <el-input v-model="ruleForm.remark"></el-input>
                                </el-form-item>
                                <el-form-item label="绑定IP地址（选填）" prop="ip">
                                    <el-input v-model="ruleForm.ip"></el-input>
                                </el-form-item>
                                <el-button style="background-color: #7a98f7;
    color: #fff;    height: 48px;
    border-radius: 3px;
    border: none;
    min-width: 200px;
    font-size: 16px;" @click="submitForm('ruleForm')">保存</el-button>
                                <el-button style="background-color: #E67470;
    color: #fff;    height: 48px;
    border-radius: 3px;
    border: none;
    min-width: 200px;
    font-size: 16px;" @click="cancel">取消</el-button>
                            </el-form>

                        </div>
                        <div style="width: 55%;padding: 35px 50px;">
                            <h6 style="color: #9194a4;font-family: PingFang SC;font-size: 12px;line-height: 25px">提示</h6>
                            <ul style="color: #9194a4;font-family: PingFang SC;font-size: 12px;line-height: 25px">
                                <li>LinkChain为您提供了强大的API，您可以通过 API 使用行情查询、自动交易等服务。通过 API 文档 查看如何使用。</li>
                                <li>每个用户最多创建5组API Key</li>
                                <li><span style="color: #232a4a;">请不要泄露您的API Key，以免造成资产损失。</span>出于安全考虑，建议为API Key绑定IP，每个API Key最多绑定4个IP。 单个地址直接填写，多个IP地址用半角逗号分隔，如：192.168.1.1,192.168.1.2,192.168.1.3 。</li>
                            </ul>
                        </div>
                    </div>

                </div>
                </el-collapse-transition>
                <div style="min-height: 160px;background: white;margin-top: 20px">
                    <div style="display: flex;flex-direction: column">
                        <div style="height: 50px;line-height: 50px;">
                            <span style="font-size: 16px;color: #232a4a;font-family: PingFang SC;margin-left: 20px">我的API Key</span>
                        </div>
                        <div style="height: 8px">
                            <img src="../../static/img/xian.png" alt="" style="width: 100%;height: 100%;opacity: .4;margin-bottom: 8px ">
                        </div>
                        <div>
                            <el-table
                                    :data="tableData"
                                    style="width: 100%"

                            >
                                <el-table-column
                                        prop="createTime"
                                        label="创建时间"
                                        width="250"
                                        header-align="center"
                                        :formatter="dateFormat"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="remark"
                                        label="备注"
                                        width="200"
                                        header-align="center"
                                        align="center"

                                >
                                </el-table-column>
                                <el-table-column
                                        prop="accessKey"
                                        label="Access Key"
                                        width="280"
                                        header-align="center"
                                        align="center"

                                >
                                </el-table-column>
                                <el-table-column
                                        prop="bindIp"
                                        label="绑定IP地址	"
                                        width="250"
                                        header-align="center"
                                        align="center"

                                >
                                </el-table-column>
                                <el-table-column label="操作"  prop="name"
                                                 width="200"
                                                 header-align="center"
                                                 align="center">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Col>
</Row>





  </div>
</template>

<script>
import * as apiRequest from '../api/api'
import  {FormatData} from '../api/time'

export default {
  name: 'dashboard',
        data () {
            return {
              ifEditor:false,
              haveApi:false,
              tableData: [],
              itemId:'',
              ruleForm: {
                key:'',
                remark:'',
                ip:''
              },
              rules: {

              },
                value1: 0,
                value2: 0,
                value3: 0,
                speed:10000,
            }
        },
        methods:{
          cancel(){
            this.ifEditor = false
            this.ruleForm = {}
            this.itemId = ''
          },
          //编辑API key
          handleEdit(index, row) {
            this.ifEditor = true;
            this.ruleForm.key = row.accessKey;
            this.ruleForm.remark = row.remark==null?'':row.remark;
            this.ruleForm.ip = row.bindIp = null?'':row.bindIp
            this.itemId = row.id
          },
          //删除API key
          handleDelete(index, row) {
            this.itemId = row.id
            this.$confirm('是否删除此条记录', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.delApi();
              this.$message({
                type: 'success',
                message: '删除成功!',
                center:true
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
                center:true
              });
            });
          },
          //删除API
          delApi(){
            apiRequest.DeleteApi({
              apiId:this.itemId
            }).then(
              data=>{
                this.itemId = ''
                console.log(data)
                this.getApiInfoList()
              }
            )
          },
          //时间格式化
          dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
              return "";
            }
            // return moment(date).format("YYYY-MM-DD HH:mm:ss");
            return FormatData(new Date(date),'yyyy-MM-dd hh:mm:ss')
          },
          //创建public API
          getPublicApi(){
            apiRequest.CreateApiKey()
              .then(
                data=>{
                  if(data.code==0){
                    console.log()
                    this.ruleForm.key = data.data.accessKey
                    this.$alert('您的公钥是：'+data.data.accessKey+'------'+'您的私钥是：'+data.data.secretKey+'---------'+'私钥只展示一次，请您保管好您的私钥！', '提示', {
                      confirmButtonText: '确定',
                      center: true,
                    }).then(()=>{
                      console.log(data)
                      // this.$message({
                      //   message: '获取成功！',
                      //   type: 'success',
                      //   center: true
                      // });
                      this.getApiInfoList();
                    })
                  }
                }

              )
          },
          //获取当前机构API列表/指定API
          getApiInfoList(){
            apiRequest.ApiInfo().then(
              data=>{
                if(data.code == 0){
                  if(data.data!==null){
                    this.haveApi = true
                    this.tableData = data.data
                  }else{
                    this.haveApi = true
                  }
                }else{
                  alert(data.msg)
                }
              }
            )
          },
          //表单验证
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                //完善API
                apiRequest.CompleteApi({
                  apiId:this.itemId,
                  bindIP:this.ruleForm.ip,
                  remark:this.ruleForm.remark
                }).then(
                  data=>{
                    if(data.code == 0){
                      this.$message({
                        message: '保存成功！',
                        type: 'success',
                        center: true
                      });
                      this.ifEditor = false
                      this.ruleForm = {}
                      this.$refs[formName].resetFields();
                      this.itemId = ''
                      this.getApiInfoList();
                    }
                  }
                )
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
        },
        mounted(){
          this.getApiInfoList();
                // const token=this.$store.getters.token;
                
            
        }
}
</script>


<style type="text/css" scoped>
    .el-form--label-top .el-form-item__label {
          padding: 0!important;
      }
 .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }
.dashboard_feature{
  text-align:center;
}
  .demo-carousel{
     height: 600px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #506b9e;
  }
  .demo-carousel img{
      height: 100%;
      width: 100%;
  }
  h3,h4,h5 {
      margin:12px;
  }
  h3{
    margin-bottom: 20px;
  }
  p{
    margin: 12px;
  }
  .row-margin-top {
    margin-top:30px;
  }
</style>