<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(item, index) in list">
      <span class="active" v-if="isLast(index)">{{ $t(showName(item)) }}</span>
      <a href="javascript:;" v-else-if="item.path!==''">{{ $t(showName(item) )}}</a>
      <a href="javascript:;" v-else-if="item.path===''">{{ $t(showName(item) )}}</a>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    separator: String
  },
  methods: {
    isLast (index) {
      return index === this.list.length - 1
    },
    showName (item) {
      console.log(this.list)
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label
      }
      if (item.name) {
        item = item.name
      }
      return item
    }
  }
}
</script>
