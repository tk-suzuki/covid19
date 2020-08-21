<template>
  <data-view
    :title="title"
    :date="date"
    :source-from="sourceFrom"
    :source-link="sourceLink"
  >
    <img class="CardImg" :src="srcUrl" />
  </data-view>
</template>

<style lang="scss">
.CardImg {
  width: 100%;
}
</style>

<script>
const DataView = () => import('@/components/DataView.vue')

export default {
  components: { DataView },
  props: {
    title: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    srcUrl: {
      type: String,
      default: ''
    },
    sourceFrom: {
      type: String,
      default: ''
    },
    sourceLink: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
