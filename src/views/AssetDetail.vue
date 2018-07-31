<template>
    <Row>
        币种：
        <el-select v-model="coins" filterable placeholder="请选择" style="margin-right: 20px">
            <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
            >
            </el-option>
        </el-select>
        选择交易所：
        <el-select v-model="exchange" filterable placeholder="请选择">
            <el-option
                    v-for="(item,index) in option1"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button @click="getAllAssetsDetail" style="margin-left: 20px">
            搜索
        </el-button>
        <Tabs type="card" style="margin-top: 30px" v-show="haveSearch">
            <TabPane label="充值">
                <Table v-loading="loading" border :columns="columns1" :data="data2"></Table>
                <Page :total="100" show-elevator style="display: flex;justify-content: center;margin-top: 10px" v-show="!hideCount"></Page>
            </TabPane>
            <TabPane label="提现">
                <Table border :columns="columns1" :data="data3" v-loading="loading"></Table>
                <Page :total="100" show-elevator style="display: flex;justify-content: center;margin-top: 10px" v-show="!hideCount"></Page>
            </TabPane>
            <TabPane label="买">
                <Table border :columns="columns1" :data="data4" v-loading="loading"></Table>
                <Page :total="100" show-elevator style="display: flex;justify-content: center;margin-top: 10px" v-show="!hideCount"></Page>
            </TabPane>
            <TabPane label="卖">
                <Table border :columns="columns1" :data="data5" v-loading="loading"></Table>
                <Page :total="100" show-elevator style="display: flex;justify-content: center;margin-top: 10px" v-show="!hideCount"></Page>
            </TabPane>
            <TabPane label="交易手续费">
                <Table border :columns="columns1" :data="data6" v-loading="loading"></Table>
                <Page :total="100" show-elevator style="display: flex;justify-content: center;margin-top: 10px" v-show="!hideCount"></Page>
            </TabPane>
        </Tabs>

    </Row>

</template>
<script>
    import * as apiRequest from '../api/api'
    import { FormatData } from '../api/time'
    import axios from 'axios'
    export default {
      data() {
        return {
          loading:true,
          haveSearch:false,
          exchange: '',
          coins: '',
          options: [],
          option1: [],
          value8: '',
          hideCount: true,
          columns1: [
            {
              title: '时间',
              key: 'createTime',
              align: 'center',
              render: function (h, params) {
                return h('div',
                  FormatData(new Date(this.row.createTime),'yyyy-MM-dd hh:mm:ss'))
                /*这里的this.row能够获取当前行的数据*/
              }
            },

            {
              title: '资金变动方向',
              key: 'side',
              align: 'center',
            },
            {
              title: '发生额',
              key: 'amount',
              align: 'center',
            },
            {
              title: '变动后的余额',
              key: 'balance',
              align: 'center',
            },
            {
              title: '类型',
              key: 'type',
              align: 'center',
            },
            {
              title: '备注',
              key: 'remark',
              align: 'center',
            }
          ],
          columns2: [
            {
              title: '时间',
              key: 'createTime',
              align: 'center',
              render: function (h, params) {
                return h('div',
                  FormatData(new Date(this.row.createTime),'yyyy-MM-dd hh:mm:ss'))
                /*这里的this.row能够获取当前行的数据*/
              }
            },

            {
              title: '资金变动方向',
              key: 'side',
              align: 'center',
            },
            {
              title: '发生额',
              key: 'amount',
              align: 'center',
            },
            {
              title: '变动后的余额',
              key: 'balance',
              align: 'center',
            },
            {
              title: '类型',
              key: 'type',
              align: 'center',
            },
            {
              title: '备注',
              key: 'remark',
              align: 'center',
            }
          ],
          columns3: [
            {
              title: '时间',
              key: 'createTime',
              align: 'center',
              render: function (h, params) {
                return h('div',
                  FormatData(new Date(this.row.createTime),'yyyy-MM-dd hh:mm:ss'))
                /*这里的this.row能够获取当前行的数据*/
              }
            },

            {
              title: '资金变动方向',
              key: 'side',
              align: 'center',
            },
            {
              title: '发生额',
              key: 'amount',
              align: 'center',
            },
            {
              title: '变动后的余额',
              key: 'balance',
              align: 'center',
            },
            {
              title: '类型',
              key: 'type',
              align: 'center',
            },
            {
              title: '备注',
              key: 'remark',
              align: 'center',
            }
          ],
          columns4: [
            {
              title: '时间',
              key: 'createTime',
              align: 'center',
              render: function (h, params) {
                return h('div',
                  FormatData(new Date(this.row.createTime),'yyyy-MM-dd hh:mm:ss'))
                /*这里的this.row能够获取当前行的数据*/
              }
            },

            {
              title: '资金变动方向',
              key: 'side',
              align: 'center',
            },
            {
              title: '发生额',
              key: 'amount',
              align: 'center',
            },
            {
              title: '变动后的余额',
              key: 'balance',
              align: 'center',
            },
            {
              title: '类型',
              key: 'type',
              align: 'center',
            },
            {
              title: '备注',
              key: 'remark',
              align: 'center',
            }
          ],
          columns5: [
            {
              title: '时间',
              key: 'createTime',
              align: 'center',
              render: function (h, params) {
                return h('div',
                  FormatData(new Date(this.row.createTime),'yyyy-MM-dd hh:mm:ss'))
                /*这里的this.row能够获取当前行的数据*/
              }
            },

            {
              title: '资金变动方向',
              key: 'side',
              align: 'center',
            },
            {
              title: '发生额',
              key: 'amount',
              align: 'center',
            },
            {
              title: '变动后的余额',
              key: 'balance',
              align: 'center',
            },
            {
              title: '类型',
              key: 'type',
              align: 'center',
            },
            {
              title: '备注',
              key: 'remark',
              align: 'center',
            }
          ],
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          data5: [],
          data6: [],
        }
      },
      mounted() {
        // this.initFormatter();
        this.resetFun();
        this.getCoinsList();
        this.getAllExchangeList();
        this.getAllAssetsDetail();
        // this.getAssetsDetail();
        // this.getAssetsDetail1();
        // this.getAssetsDetail2();
        // this.getAssetsDetail3();
        // this.getAssetsDetail4();
      },
      methods: {
        //初始化参数
        resetFun(){
          this.coins = this.$route.query.currency
          if(typeof (this.$route.query.exId)=='undefined'){
            this.exchange = ''
          }else{
            this.exchange = this.$route.query.exId + ''
          }
        },
        MyChange(){
          console.log(111111111)
        },
        //获取所有币种
        getCoinsList() {
          apiRequest.getAllCurrency({
            token: '0e71691b48484bc55d2c483894914c58'
          }).then(
            data => {
              console.log(data)
              if (data.code == 0) {
                this.options = data.data.map((item, index) => {
                  return {value: item, label: item}
                })
              }
            })
        },
        //获取所有交易所
        getAllExchangeList() {
          apiRequest.getAllExchange({
            token: '0e71691b48484bc55d2c483894914c58'
          }).then(
            data => {
              console.log(data)
              if (data.code == 0) {
                this.option1 = data.data.map(item => {
                  return {value: item.exId, label: item.exName}
                })
              }
            }
          )
        },
        //获取详情
        getAllAssetsDetail(){
          this.loading = true
          setTimeout(()=>{
            this.loading = false
          },1000)
          // if(this.coins.length==0){
          //   this.$message({
          //     type: 'error',
          //     message: '请选择币种!',
          //     center:true
          //   });
          //   return false
          // }else if(!this.exchange){
          //   this.$message({
          //     type: 'error',
          //     message: '请选择交易所!',
          //     center:true
          //   });
          //   return false
          // }
          // else{
            this.haveSearch = true
            this.getAssetsDetail1()
            this.getAssetsDetail2()
            this.getAssetsDetail3()
            this.getAssetsDetail4()
            this.getAssetsDetail5()
            setTimeout(()=>{
              this.loading = false
            },1500)
          // }

        },
        //查询详情
        getAssetsDetail1(currency = this.coins,exId = this.exchange) {
          apiRequest.AssetsDetail({
            token: '0e71691b48484bc55d2c483894914c58',
            type:0,
            currency:currency,
            exId:exId
          }).then(
            data => {
              this.data2 = data.data}
          )
        },
        getAssetsDetail2(currency = this.coins,exId = this.exchange) {
          apiRequest.AssetsDetail({
            token: '0e71691b48484bc55d2c483894914c58',
            type:1,
            currency:currency,
            exId:exId
          }).then(
            data => {
              this.data3 = data.data}
          )
        },
        getAssetsDetail3(currency = this.coins,exId = this.exchange) {
          apiRequest.AssetsDetail({
            token: '0e71691b48484bc55d2c483894914c58',
            type:2,
            currency:currency,
            exId:exId
          }).then(
            data => {
              this.data4 = data.data}
          )
        },
        getAssetsDetail4(currency = this.coins,exId = this.exchange) {
          apiRequest.AssetsDetail({
            token: '0e71691b48484bc55d2c483894914c58',
            type:3,
            currency:currency,
            exId:exId
          }).then(
            data => {
              this.data5 = data.data}
          )
        },
        getAssetsDetail5(currency = this.coins,exId = this.exchange) {
          apiRequest.AssetsDetail({
            token: '0e71691b48484bc55d2c483894914c58',
            type:4,
            currency:currency,
            exId:exId
          }).then(
            data => {
              this.data6 = data.data}
          )
        }
      }
    }
</script>
