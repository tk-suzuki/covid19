<template>
  <data-view
    :title="title"
    :loaded="loaded"
    :date="date"
    :source-from="sourceFrom"
    :source-link="sourceLink"
    :title-id="titleId"
  >
    <template v-slot:button>
      <span />
    </template>
    <v-overlay absolute :value="!loaded" justify-center align-center>
      <scale-loader color="#1268d8" />
    </v-overlay>
    <v-layout :class="{ loading: !loaded }" column>
      <v-data-table
        id="virtual-scroll-table"
        v-scroll:#virtual-scroll-table="onScroll"
        :headers="chartData.headers"
        :items="chartData.datasets"
        disable-pagination
        hide-default-footer
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        :mobile-breakpoint="0"
        class="cardTable"
      />
    </v-layout>
    <template v-slot:infoPanel>
      <data-view-basic-info-panel
        :l-text="info ? info.lText : ''"
        :s-text="info ? info.sText : ''"
        :unit="info ? info.unit : ''"
      />
    </template>
  </data-view>
</template>

<style lang="scss">
#virtual-scroll-table {
  position: relative;
}
.cardTable {
  &.v-data-table {
    width: 100%;
    thead {
      display: block;
      width: 100%;
      tr {
        width: 100%;
        th {
          padding: 8px 10px;
          height: auto;
          border-bottom: 1px solid $gray-4;
          white-space: nowrap;
          color: $gray-2;
          font-size: 12px;
        }
      }
    }

    tbody {
      display: block;
      overflow-y: scroll;
      height: 300px;
      width: 100%;
      tr {
        color: $gray-1;
        width: 100%;
        td {
          padding: 8px 10px;
          height: auto;
          font-size: 12px;
        }
        &:nth-child(odd) {
          td {
            background: rgba($gray-4, 0.3);
          }
        }
        &:not(:last-child) {
          td:not(.v-data-table__mobile-row) {
            border: none;
          }
        }
      }
    }
  }
}

.loading {
  visibility: hidden;
}
</style>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
const DataView = () => import('@/components/DataView.vue')
const DataViewBasicInfoPanel = () =>
  import('@/components/DataViewBasicInfoPanel.vue')

export default {
  components: { DataView, DataViewBasicInfoPanel, ScaleLoader },
  props: {
    title: {
      type: String,
      default: ''
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    date: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      required: false,
      default: () => {}
    },
    sourceFrom: {
      type: String,
      required: false,
      default: ''
    },
    sourceLink: {
      type: String,
      required: false,
      default: ''
    },
    loaded: {
      type: Boolean,
      required: true,
      default: false
    },
    sortBy: {
      type: String,
      required: false,
      default: ''
    },
    sortDesc: {
      type: Boolean,
      required: false,
      default: false
    },
    titleId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      start: 0,
      timeout: null,
      rowHeight: 24,
      perPage: 25
    }
  },
  computed: {
    dessertsLimited() {
      return this.chartData.datasets.slice(
        this.start,
        this.perPage + this.start
      )
    },
    startHeight() {
      return this.start * this.rowHeight - 32
    },
    endHeight() {
      return this.rowHeight * (this.chartData.datasets.length - this.start)
    }
  },
  methods: {
    onScroll(e) {
      this.timeout && clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        const { scrollTop } = e.target
        const rows = Math.ceil(scrollTop / this.rowHeight)

        this.start =
          rows + this.perPage > this.chartData.datasets.length
            ? this.chartData.datasets.length - this.perPage
            : rows

        this.$nextTick(() => {
          e.target.scrollTop = scrollTop
        })
      }, 20)
    }
  }
}
</script>
