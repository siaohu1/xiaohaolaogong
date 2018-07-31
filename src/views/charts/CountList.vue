<template>
    <div class="animated fadeIn">
        <Row>

            <Col :span="24">
            <chart :options="option" class="echarts"></chart>
            </Col>

        </Row>
        <Table :columns="columns8" :data="data7" size="small" ref="table" style="margin-top: 30px" border v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)"></Table>
        <br>
        <!--<Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>-->
        <!--<Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>-->
        <!--<Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> Export custom data</Button>-->
        <Page :total="totalCount" @on-change="getCaptialStatisticsList" style="display: flex;justify-content: center"></Page>
    </div>

</template>

<style scoped>
    .echarts {
        height: 500px;
        width: 100%;
        border-radius: 25px;
    }

</style>

<script>
    import * as apiRequest from '../../api/api'
    //月份
  // var xData = function() {
  //   var data = [];
  //   for (var i = 1; i < 13; i++) {
  //     data.push(i + "月份");
  //   }
  //   return data
  // }();


  export default {

    data: function () {
      let data = []
      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }
      return {
        loading:true,
        totalCount:0,
        page:1,
        size:10,
        columns8: [
          {
            "title": this.$t('m.currency'),
            "key": "currency",
            // "fixed": "left",
            // "width": 150,
            "align":'center'
          },
          {
            "title": this.$t('m.Recharge'),
            "key": "rechargeAmount",
            // "width": 150,
            "align":'center'
            // "sortable": true,
            // filters: [
            //   {
            //     label: 'Greater than 4000',
            //     value: 1
            //   },
            //   {
            //     label: 'Less than 4000',
            //     value: 2
            // filterMultiple: false,
            // filterMethod (value, row) {
            //   if (value === 1) {
            //     return row.show > 4000;
            //   } else if (value === 2) {
            //     return row.show < 4000;
            //   }
            // }
          },
          {
            "title": this.$t("m.Put_forward"),
            "key": "withdrawAmount",
            // "width": 150,
            "align":'center'
            // "sortable": true
          },
          // {
          //   "title": "赠币",
          //   "key": "signin",
          //   "width": 100,
          //   "align":'center'
          //   // "sortable": true
          // },
          {
            "title": this.$t("m.Purchase"),
            "key": "buyAmount",
            // "width": 150,
            "align":'center'
            // "sortable": true
          },
          {
            "title": this.$t("m.Service_Charge"),
            "key": "fee",
            // "width": 150,
            "align":'center'
          },
          {
            "title": this.$t("m.offtake"),
            "key": "sellAmount",
            // "width": 150,
            "align":'center'
          },
          {
            "title": this.$t("m.balance"),
            "key": "balance",
            // "width": 150,
            "align":'center'
          },
          // {
          //   "title": "冻结",
          //   "key": "tomorrow",
          //   "width": 100,
          //   "align":'center'
          // },
          // {
          //   "title": "提现中",
          //   "key": "day",
          //   "width": 100,
          // "align":'center'
          // },
          // {
          //   "title": "调帐使用",
          //   "key": "week",
          //   "width": 100,
          //   "align":'center'
          // },
          // {
          //   "title": "调帐支出",
          //   "key": "week",
          //   "width": 100,
          //   "align":'center'
          // },
          // {
          //   "title": "平账",
          //   "key": "month",
          //   "width": 100,
          //   "align":'center',
          //   "fixed": "right",
          // }
        ],
        data7:[],
        option : {
          backgroundColor: "#344b58",
          //标题组件
          "title": {
            "text": "本月统计",
            x: "4%",
            textStyle: {
              color: '#fff',
              fontSize: '22'
            },
            subtextStyle: {
              color: '#90979c',
              fontSize: '16',
            },
          },
          //提示框组件
          "tooltip": {
            "trigger": "axis",
            "axisPointer": {
              "type": "shadow",
              textStyle: {
                color: "#fff"
              }

            },
          },
          //直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制
          "grid": {
            "borderWidth": 0,
            "top": 110,
            "bottom": 95,
            textStyle: {
              color: "#fff"
            }
          },
          //图例组件
          "legend": {
            x: '4%',
            top: '11%',
            textStyle: {
              color: '#90979c',
            },
            "data": ['充值', '提现','手续费']
          },

          "calculable": true,
          //直角坐标系 grid 中的 x 轴
          "xAxis": [{
            "type": "category",
            "axisLine": {
              lineStyle: {
                color: '#90979c'
              }
            },
            "splitLine": {
              "show": false
            },
            "axisTick": {
              "show": false
            },
            "splitArea": {
              "show": false
            },
            "axisLabel": {
              "interval": 0,

            },
            "data": [],
          }],
          //直角坐标系 grid 中的 y 轴
          "yAxis": [{
            "type": "value",
            "splitLine": {
              "show": false
            },
            "axisLine": {
              lineStyle: {
                color: '#90979c'
              }
            },
            "axisTick": {
              "show": false
            },
            "axisLabel": {
              "interval": 0,

            },
            "splitArea": {
              "show": false
            },

          }],
          //用于区域缩放
          "dataZoom": [{
            "show": true,
            "height": 30,
            "xAxisIndex": [
              0
            ],
            bottom: 30,
            "start": 10,
            "end": 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle:{
              color:"#d3dee5",
            },
            textStyle:{
              color:"#fff"},
            borderColor:"#90979c"
          }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
          }],
          //系列列表。每个系列通过 type 决定自己的图表类型
          "series": [
            {
              "name": "充值",
              "type": "line",
              "stack": "总量",
              "itemStyle": {
                "normal": {
                  "color": "rgba(0,191,183,1)",
                  "barBorderRadius": 0,
                  "label": {
                    "show": true,
                    "position": "top",
                    formatter: function(p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              "data": [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,

              ]
            },
            {
              "name": "提现",
              "type": "line",
              "stack": "总量",
              symbolSize:10,
              symbol:'circle',
              "itemStyle": {
                "normal": {
                  "color": "rgba(252,230,48,1)",
                  "barBorderRadius": 0,
                  "label": {
                    "show": true,
                    "position": "top",
                    formatter: function(p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              "data": [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,

              ]
            },
            {
              "name": "手续费",
              "type": "line",
              "stack": "总量",
              "barMaxWidth": 35,
              "barGap": "10%",
              "itemStyle": {
                "normal": {
                  "color": "rgba(255,144,128,1)",
                  "label": {
                    "show": true,
                    "textStyle": {
                      "color": "#fff"
                    },
                    "position": "insideTop",
                    formatter: function(p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              "data": [
                '',
                '',
                '',
                '',
                '',
                '',
                1544,
                '',
                '',
                '',
                '',
                '',
              ],
            },
          ]
        },
        coinsNameList:[],
      }
    },
    mounted(){
      this.getCaptialStatisticsList();
      // this.xData();
    },
    methods:{
      xData(){
        var data = [];
        // var data1 = this.coinsNameList
        // console.log(data1)
        console.log(this.coinsNameList)
        for (var i = 1; i < 13; i++) {
          data.push(i + "月份");
        }
        // data = this.coinsNameList
        console.log(data)
        return data
      },
      //获取统计流水列表
      getCaptialStatisticsList(page = this.page,
                               size = this.size,){
        apiRequest.CaptialStatistics({
          token:'0e71691b48484bc55d2c483894914c58',
          page,
          size,
        }).then(
          data=>{
            if(data.code==0){
              this.loading = true
              this.data7 = data.data.list
              this.totalCount = data.data.totalCount
              let coinsList = []
              let ArrayList  = data.data.list.map( item=>{
                coinsList.push(item.currency)
                // console.log(coinsList)
                return coinsList
              })
              let coinsList1 = []
              let tastList = data.data.list.map( item=>{
                coinsList1.push(item.fee)
                // console.log(coinsList)
                return coinsList1
              })
              let coinsList2 = []
              let tastList2 = data.data.list.map( item=>{
                coinsList2.push(item.rechargeAmount)
                // console.log(coinsList)
                return coinsList2
              })
              let coinsList3 = []
              let tastList3 = data.data.list.map( item=>{
                coinsList3.push(item.withdrawAmount)
                // console.log(coinsList)
                return coinsList3
              })
              console.log(this.option)
              this.option.xAxis[0].data = coinsList
              console.log(this.option.series)
              // this.option.series[0].data = coinsList1
              console.log(coinsList1)
              this.option.series[0].data = coinsList2
              this.option.series[1].data = coinsList3
              this.option.series[2].data = coinsList1
              console.log(this.option.series[0].data)
              setTimeout(()=>{
                this.loading = false
              },1000)
            }else{
              alert(data.msg)
            }
          }
        )
      }
    }
  }
</script>