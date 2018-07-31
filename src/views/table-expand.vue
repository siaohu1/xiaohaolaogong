<!--table-expand.vue-->
<template>
    <div>
        <!--<Row class="expand-row">-->
            <Table :show-header="false"   :columns="columns7" :data="data6"></Table>
        <!--</Row>-->
    </div>
</template>
<script>
  export default {
    // props: {
    //   row: Object
    // },
    data () {
      return {
        columns7: [
          {
            title: ' ',
            key: 'id',
            width:50,
          },
          {
            title: ' ',
            key: '',
          },
          {
            title: ' ',
            key: 'name',
            // render: (h, params) => {
            //   return h('div', [
            //     // h('Icon', {
            //     //   props: {
            //     //     type: 'person'
            //     //   }
            //     // }),
            //     h('strong', params.row.name)
            //   ]);
            // }
          },
          {
            title: ' ',
            key: 'age'
          },
          {
            title: ' ',
            key: 'freeze'
          },
          {
            title: ' ',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看记录'),
              ]);
            }
          }
        ],
        data6: [
          {
            id:'1',
            name: '币安',
            age: 18,
            freeze: '10'
          },
          {
            id:'2',
            name: '火币',
            age: 24,
            freeze: '10'
          },
          {
            id:'3',
            name: 'OKEX',
            age: 30,
            freeze: '10'
          },
          {
            id:'4',
            name: 'GATE',
            age: 26,
            freeze: '10'
          }
        ]
      }
    },
    methods: {
      show (index) {
        this.$router.push('/');
        // this.$Modal.info({
        //   title: 'User Info',
        //   content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        // })
      },
      remove (index) {
        this.data6.splice(index, 1);
      }
    }
  };
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>