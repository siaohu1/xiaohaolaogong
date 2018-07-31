<template>
    <div class="animated fadeIn">
        币对：
        <el-select v-model="coins" filterable placeholder="请选择" style="margin-right: 20px">
            <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        交易所：
        <el-select v-model="exchange1" filterable placeholder="请选择">
            <el-option
                    v-for="(item,index) in option1"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <el-button @click="getOrderList" style="margin-left: 30px">
            搜索
        </el-button>
        <!--选择币种：-->
        <!--<el-select v-model="value8" filterable placeholder="请选择" style="margin-right: 20px">-->
            <!--<el-option-->
                    <!--v-for="item in options"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
            <!--</el-option>-->
        <!--</el-select>-->
        <!--选择交易所：-->
        <!--<el-select v-model="value8" filterable placeholder="请选择">-->
            <!--<el-option-->
                    <!--v-for="item in options"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
            <!--</el-option>-->
        <!--</el-select>-->
        <div style="width: auto;clear: both;margin-top: 30px">
            <div style="width: auto;clear: both">
                <ul style="line-height: 40px;height: 40px;background: rgb(248,248,248);clear: both;font-size: 12px;font-weight: 700;color: #495060;" class="uul">
                    <li style="width: 200px;text-align: center">{{$t('m.Time')}}</li>
                    <li style="width: 100px;text-align: center">{{$t('m.Entrustment_type')}}</li>
                    <li style="width: 100px;text-align: center">{{$t('m.Trade')}}</li>
                    <li style="width: 100px;text-align: center">{{$t('m.Aspect')}}</li>
                    <li style="width: 100px;text-align: center">{{$t('m.Price')}}</li>
                    <li style="width: 100px;text-align: center">{{$t('m.Entrustment')}}</li>
                    <li style="width: 100px;text-align: center">{{$t('m.Turnover')}}</li>
                    <li style="width: 100px;text-align: center">{{$t('m.Average')}}</li>
                    <li style="width: 100px;text-align: center">{{$t('m.Status')}}</li>
                    <!--<li style="width: 100px;text-align: center">机构订单ID</li>-->
                    <!--<li style="width: 100px;text-align: center">机构用户ID</li>-->
                    <li style="width: 150px;text-align: center;"></li>
                </ul>
            </div>
            <div style="height: 50px;line-height: 50px;background: white;text-align: center" v-show="showg" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)">暂无数据</div>
            <ul style="clear: both" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)" v-if="!showg">
                <li style="width: 100%;height: auto;border-top: 1px solid #e9eaec;display: flex;flex-direction: column;background: white;clear: both" v-for="(list,index) in OrderLists">
                <div style="clear: both" >
                    <div style="width: auto;clear: both" >
                        <ul style="line-height: 50px;height: 50px;clear: both" class="uul">
                            <li style="width: 200px;text-align: center">{{list.create_time | dateFrm}}</li>
                            <li style="width: 100px;text-align: center">{{list.type==0?'limit'
                                :'market'}}</li>
                            <li style="width: 100px;text-align: center;color: #2d8cf0">{{list.symbol}}</li>
                            <li style="width: 100px;text-align: center;color: red" :class="{green:list.side==0}">{{list.side==0?$t('m.Purchase'):$t('m.Betray')}}</li>
                            <li style="width: 100px;text-align: center">{{list.price}}</li>
                            <li style="width: 100px;text-align: center">{{list.amount==null?0:list.amount}}</li>
                            <li style="width: 100px;text-align: center">{{list.deal_amount==null?0:list.deal_amount}}</li>
                            <li style="width: 100px;text-align: center">{{list.avg_price==null?0:list.avg_price}}</li>
                            <li style="width: 100px;text-align: center" v-if="list.status==0">{{$t('m.Initial_order')}}</li>
                            <!--<li style="width: 100px;text-align: center">878776</li>-->
                            <!--<li style="width: 100px;text-align: center">879985</li>-->
                            <li style="width: 150px;text-align: center;cursor: pointer;color: #0e83cd" @click="getItemOrderDetail(list.order_id,index,list)">{{$t('m.Details')}}
                                <i class="el-icon-arrow-down" :class="[list.nnn?'el-icon-arrow-up go':'el-icon-arrow-down aa']" style="color: #0e83cd"></i>
                            </li>
                        </ul>
                    </div>
                </div>
                    <div style="clear: both" >
                        <el-collapse-transition>
                            <div v-if="list.nnn" v-loading="list.loading">
                                <div style="background: rgb(248,248,248);height: 50px;line-height: 50px;text-align: center" v-if="list.llist.length==0">
                                    <p v-show="!list.loading">{{$t('m.noData')}}</p>
                                </div>
                                <ul style="display: flex;flex-direction: column;clear: both;background: rgb(248,248,248)" class="huzi-ul" v-if="list.llist.length>=1">
                                    <div v-show="!list.loading">
                                        <li>
                                            <ul style="display: flex;flex-direction: row;clear: both;">
                                                <li>时间</li>
                                                <li>价格</li>
                                                <li>数量</li>
                                                <li>成交额</li>
                                                <li>手续费</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul style="display: flex;flex-direction: row">
                                                <li>2018-07-04 16:27:47</li>
                                                <li>6530.5</li>
                                                <li>0.00001</li>
                                                <li>0.00001</li>
                                                <li>0.5678765BTC</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul style="display: flex;flex-direction: row">
                                                <li>2018-07-04 16:27:47</li>
                                                <li>6530.5</li>
                                                <li>0.00001</li>
                                                <li>0.00001</li>
                                                <li>0.5678765BTC</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul style="display: flex;flex-direction: row">
                                                <li>2018-07-04 16:27:47</li>
                                                <li>6530.5</li>
                                                <li>0.00001</li>
                                                <li>0.00001</li>
                                                <li>0.5678765BTC</li>
                                            </ul>
                                        </li>
                                    </div>

                                </ul>
                            </div>

                        </el-collapse-transition>
                    </div>

                </li>



            </ul>
        </div>
        <Page :total="totalCount"  style="display: flex;justify-content: center;margin-top: 20px;margin-bottom: 10px" v-show="morethan"></Page>
    </div>
</template>
<style scoped>
    li{
        list-style: none;
    }
    .uul li{
            float: left;
    }
    .uul li{
        transition: all .3s ease;
    }
    .uul:hover{
        background: #EDF8FE!important;
    }
    .huzi-ul li{
        width: 100%;

    }
    .huzi-ul{
        clear: both;
    }
    .aa{
        transition: all 2s;
    }
    .go{
        transform:rotateX(-45deg);
        transition: all 2s;
    }
    .green{
        color: #2ac56c!important;
    }
</style>
<script>
import * as apiRequest from '../api/api'
import {FormatData} from '../api/time'
import moment from 'moment'
  export default {
    data () {
      return {
        page:1,
        size:10,
        morethan:'',
        coinName:'',
        exchange1:'',
        coins:'',
        a:-1,
        b:-1,
        openArr:[],
        loading:true,
        totalCount:0,
        statusList:
      {
        0:'m.Initial_order',
        1:'向交易所提交之前撤单',
        2:'提交到交易所',
        3:'提交到交易所失败',
        4:'成功提交到交易所',
        5:'部分成交',
        6:'部分成交撤销',
        7:'完全成交',
        8:'没有成交撤销'
      }
        ,
        option1:[],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value8: '',
        columns8: [
          {
            "title": "时间",
            "key": "name",
            // "fixed": "left",
            "width": 170
          },
          {
            "title": "交易类型",
            "key": "show",
            "width": 100,
            // "sortable": true,
            // filters: [
            //   {
            //     label: 'Greater than 4000',
            //     value: 1
            //   },
            //   {
            //     label: 'Less than 4000',
            //     value: 2
            //   }
            // ],
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
            "title": "交易对",
            "key": "weak",
            "width": 100,
          },
          {
            "title": "方向",
            "key": "signin",
            "width": 100,
          },
          {
            "title": "价格",
            "key": "click",
            "width": 100,
          },
          {
            "title": "委托量",
            "key": "active",
            "width": 100,
          },
          {
            "title": "已成交",
            "key": "day7",
            "width": 100,
          },
          {
            "title": "成交均价",
            "key": "day30",
            "width": 100,
          },
          {
            "title": "状态",
            "key": "tomorrow",
            "width": 100,
          },
          // {
          //   "title": "机构订单ID",
          //   "key": "day",
          //   "width": 100,
          // },
          // {
          //   "title": "机构用户ID",
          //   "key": "week",
          //   "width": 100,
          // },
          {
            // "fixed": "right",
            key: 'action',
            width: 100,
            align: 'right',
            render: (h, params) => {
              return h('div', [
                h('p', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    textAlign:'right'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看详情'),
              ]);
            },
          },
          {
            type: 'expand',
            width: 20,
            align: 'left',
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                },
                style: {
                  textAlign: 'left'
                },
              },'查看详情')

            },
          },

        ],
        data7: [
          {
            "name": "2017.07.09 - 2018.02.02",
            "fav": 0,
            "show": 7302,
            "weak": 5627,
            "signin": 1563,
            "click": 4254,
            "active": 1438,
            "day7": 274,
            "day30": 285,
            "tomorrow": 1727,
            "day": 558,
            "week": 4440,
            "month": 5610
          },
          {
            "name": "Name2",
            "fav": 0,
            "show": 4720,
            "weak": 4086,
            "signin": 3792,
            "click": 8690,
            "active": 8470,
            "day7": 8172,
            "day30": 5197,
            "tomorrow": 1684,
            "day": 2593,
            "week": 2507,
            "month": 1537
          },
          {
            "name": "Name3",
            "fav": 0,
            "show": 7181,
            "weak": 8007,
            "signin": 8477,
            "click": 1879,
            "active": 16,
            "day7": 2249,
            "day30": 3450,
            "tomorrow": 377,
            "day": 1561,
            "week": 3219,
            "month": 1588
          },
          {
            "name": "Name4",
            "fav": 0,
            "show": 9911,
            "weak": 8976,
            "signin": 8807,
            "click": 8050,
            "active": 7668,
            "day7": 1547,
            "day30": 2357,
            "tomorrow": 7278,
            "day": 5309,
            "week": 1655,
            "month": 9043
          },
          {
            "name": "Name5",
            "fav": 0,
            "show": 934,
            "weak": 1394,
            "signin": 6463,
            "click": 5278,
            "active": 9256,
            "day7": 209,
            "day30": 3563,
            "tomorrow": 8285,
            "day": 1230,
            "week": 4840,
            "month": 9908
          },
          {
            "name": "Name6",
            "fav": 0,
            "show": 6856,
            "weak": 1608,
            "signin": 457,
            "click": 4949,
            "active": 2909,
            "day7": 4525,
            "day30": 6171,
            "tomorrow": 1920,
            "day": 1966,
            "week": 904,
            "month": 6851
          },
          {
            "name": "Name7",
            "fav": 0,
            "show": 5107,
            "weak": 6407,
            "signin": 4166,
            "click": 7970,
            "active": 1002,
            "day7": 8701,
            "day30": 9040,
            "tomorrow": 7632,
            "day": 4061,
            "week": 4359,
            "month": 3676
          },
          {
            "name": "Name8",
            "fav": 0,
            "show": 862,
            "weak": 6520,
            "signin": 6696,
            "click": 3209,
            "active": 6801,
            "day7": 6364,
            "day30": 6850,
            "tomorrow": 9408,
            "day": 2481,
            "week": 1479,
            "month": 2346
          },
          {
            "name": "Name9",
            "fav": 0,
            "show": 567,
            "weak": 5859,
            "signin": 128,
            "click": 6593,
            "active": 1971,
            "day7": 7596,
            "day30": 3546,
            "tomorrow": 6641,
            "day": 1611,
            "week": 5534,
            "month": 3190
          },
          {
            "name": "Name10",
            "fav": 0,
            "show": 3651,
            "weak": 1819,
            "signin": 4595,
            "click": 7499,
            "active": 7405,
            "day7": 8710,
            "day30": 5518,
            "tomorrow": 428,
            "day": 9768,
            "week": 2864,
            "month": 5811
          }
        ],
        OrderLists:[],
        showg:'',
      }
    },
    mounted(){
      this.getAllCoinD();
      this.getOrderList();
      this.getTradesList();
      this.getAllExchangeList();
    },
    methods: {
      //获取所有币对
      getAllCoinD(){
        apiRequest.getAllSymbol({
          token: '0e71691b48484bc55d2c483894914c58'
        }).then(
          data=>{
            console.log(data)
            if (data.code == 0) {
              this.options = data.data.map((item, index) => {
                return {value: item, label: item}
              })
            }

          }
        )
      },
      //获取所有币种
      // getCoinsList() {
      //   apiRequest.getAllCurrency({
      //     token: '0e71691b48484bc55d2c483894914c58'
      //   }).then(
      //     data => {
      //       console.log(data)
      //       if (data.code == 0) {
      //         this.options = data.data.map((item, index) => {
      //           return {value: item, label: item}
      //         })
      //       }
      //     })
      // },
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
      //loding
      setLoading(){
        setTimeout(()=>{
          this.loading = false
        },1500)
      },
      //获取订单详情
      getItemOrderDetail(id,index,list){
        apiRequest.Trades({
          orderId:id,
          token:'0e71691b48484bc55d2c483894914c58'
        }).then(
          data =>{
                this.OrderLists[index].llist = data.data.list
                console.log(this.OrderLists[index]);
                list.nnn = !list.nnn
            setTimeout(()=>{
              list.loading = false
            },1000)
          }
        )
      },
      //获取委托订单列表
      getOrderList(){
          apiRequest.Orders({
            token:'0e71691b48484bc55d2c483894914c58',
            symbol:this.coins,
            exId:this.exchange1
          }).then(
            data=>{
              this.loading = true
              setTimeout(()=>{
                this.loading = false
              },1500)
              if(data.data.list.length<1){
                this.showg = true
                this.morethan = false
                return false
              }
              this.showg = false
              this.totalCount = data.data.list.totalCount
              if(data.data.list.length>=10){
                this.morethan = true
              }
              let nnn1 = data.data.list.map((item,index)=>{
                item.nnn = false
                item.loading = true
                return item
              })
              this.OrderLists = nnn1
            }
          )
      },
      //获取成交记录
      getTradesList(){
        apiRequest.Trades({
          token:'0e71691b48484bc55d2c483894914c58'
        }).then(
          data=>{
            console.log(data)
          }
        )
      }
    },
    filters:{
      dateFrm :function (el) {
        return moment(el).format("YYYY.MM.DD")
      },
    }
  }
</script>