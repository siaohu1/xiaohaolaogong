<template>
    <Row>
        币对：
        <el-select v-model="coins" filterable placeholder="请选择币对" style="margin-right: 20px">
            <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
            >
            </el-option>
        </el-select>
        交易所：
        <el-select v-model="exchange" filterable placeholder="请选择交易所" style="margin-right: 20px">
            <el-option
                    v-for="(item,index) in option1"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <!--<br>-->
            时间：
            <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择开始时间"
                    style="width: 150px"
            >
            </el-date-picker>
            一
            <el-date-picker
                    v-model="value2"
                    type="date"
                    placeholder="选择结束时间"
                    style="width: 150px"
            >
            </el-date-picker>
            <el-button @click="getOrderDetailList" style="margin-left: 20px">
                搜索
            </el-button>


        <div style="margin-top: 30px">
            <Table border :columns="columns1" :data="data" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)"></Table>
            <Page :total="totalCount"  style="display: flex;justify-content: center;margin-top: 20px;margin-bottom: 10px" v-show="morethan" @on-change="getOrderDetailList"></Page>
        </div>

    </Row>

</template>
<script>
  import * as apiRequest from '../api/api'
  import { FormatData } from '../api/time'
  import axios from 'axios'
  export default {
    data() {
      return {
        value1:'',
        value2:'',
        totalCount:0,
        morethan:'',
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
            key: 'statisticsDate',
            align: 'center',
            render: function (h, params) {
              return h('div',
                FormatData(new Date(this.row.statisticsDate
                ),'yyyy-MM-dd hh:mm:ss'))
              /*这里的this.row能够获取当前行的数据*/
            }
          },

          {
            title: '币对',
            key: 'symbol',
            align: 'center',
          },
          {
            title: '成交量',
            key: 'dealAmount',
            align: 'center',
          },
          {
            title: '成交额',
            key: 'dealCashAmount',
            align: 'center',
          },
          {
            title: '订单数量',
            key: 'orderAmount',
            align: 'center',
          },
          {
            title: '废单率',
            key: 'scrapRate',
            align: 'center',
          }
        ],
        data: [],
        page:1,
        size:10,
      }
    },
    mounted() {
      this.getCoinsList();
      this.getAllExchangeList();
      this.getOrderDetailList();
    },
    methods: {
      //获取所有币种
      getCoinsList(symbol = this.coins) {
        apiRequest.getAllSymbol({
          token: '0e71691b48484bc55d2c483894914c58',
          symbol
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
      //订单明细
      getOrderDetailList(){
        let data1 = FormatData(new Date(this.value1),'yyyy-MM-dd')
        let data2 = FormatData(new Date(this.value2),'yyyy-MM-dd')
        if(data1 == 'NaN-aN-aN'){
          data1 = ''
        }
        if(data2 == 'NaN-aN-aN'){
          data2 = ''
        }
        apiRequest.OrderStatistics({
          token: '0e71691b48484bc55d2c483894914c58',
          symbol:this.coins,
          page:this.page,
          size:this.size,
          startTime:data1,
          endTime:data2,
        }).then(data=>{
          this.loading = true
          setTimeout(()=>{
            this.loading = false
          },1000)
          console.log(data);
          console.log('1111111111111')
          this.data = data.data.list
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
    }
  }
</script>
