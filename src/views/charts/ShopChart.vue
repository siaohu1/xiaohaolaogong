<template>
  <div>
    <Row>

      <Col :span="24">
      <chart :options="option" class="echarts"></chart>
      </Col>

    </Row>
    <Table :columns="columns8" :data="data7" size="small" ref="table" style="margin-top: 30px"></Table>
    <br>
    <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
    <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>
    <Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> Export custom data</Button>
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
var xData = function() {
    var data = [];
    for (var i = 1; i < 13; i++) {
        data.push(i + "月份");
    }
    return data;
}();


export default {
  data: function () {
    let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

    return {
      columns8: [
        {
          "title": "Name",
          "key": "name",
          "fixed": "left",
          "width": 200
        },
        {
          "title": "Show",
          "key": "show",
          "width": 150,
          "sortable": true,
          filters: [
            {
              label: 'Greater than 4000',
              value: 1
            },
            {
              label: 'Less than 4000',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.show > 4000;
            } else if (value === 2) {
              return row.show < 4000;
            }
          }
        },
        {
          "title": "Weak",
          "key": "weak",
          "width": 150,
          "sortable": true
        },
        {
          "title": "Signin",
          "key": "signin",
          "width": 150,
          "sortable": true
        },
        {
          "title": "Click",
          "key": "click",
          "width": 150,
          "sortable": true
        },
        {
          "title": "Active",
          "key": "active",
          "width": 150,
          "sortable": true
        },
        {
          "title": "7, retained",
          "key": "day7",
          "width": 150,
          "sortable": true
        },
        {
          "title": "30, retained",
          "key": "day30",
          "width": 150,
          "sortable": true
        },
        {
          "title": "The next day left",
          "key": "tomorrow",
          "width": 150,
          "sortable": true
        },
        {
          "title": "Day Active",
          "key": "day",
          "width": 150,
          "sortable": true
        },
        {
          "title": "Week Active",
          "key": "week",
          "width": 150,
          "sortable": true
        },
        {
          "title": "Month Active",
          "key": "month",
          "width": 150,
          "sortable": true
        }
      ],
      data7: [
        {
          "name": "Name1",
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



option : {
    backgroundColor: "#344b58",
    "title": {
        "text": "本年商场顾客男女人数统计",
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
    "tooltip": {
        "trigger": "axis",
        "axisPointer": {
            "type": "shadow",
            textStyle: {
                color: "#fff"
            }

        },
    },
    "grid": {
        "borderWidth": 0,
        "top": 110,
        "bottom": 95,
        textStyle: {
            color: "#fff"
        }
    },
    "legend": {
        x: '4%',
        top: '11%',
        textStyle: {
            color: '#90979c',
        },
        "data": ['女', '男', '平均']
    },
     

    "calculable": true,
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
        "data": xData,
    }],
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
    "series": [{
            "name": "女",
            "type": "bar",
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
                709,
                1917,
                2455,
                2610,
                1719,
                1433,
                1544,
                3285,
                5208,
                3372,
                2484,
                4078
            ],
        },

        {
            "name": "男",
            "type": "bar",
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
                327,
                1776,
                507,
                1200,
                800,
                482,
                204,
                1390,
                1001,
                951,
                381,
                220
            ]
        }, {
            "name": "总数",
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
                1036,
                3693,
                2962,
                3810,
                2519,
                1915,
                1748,
                4675,
                6209,
                4323,
                2865,
                4298
            ]
        },
    ]
}



    }
  }
}
</script>