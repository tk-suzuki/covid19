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
        :headers="chartData.headers"
        :items="chartData.datasets"
        fixed-header
        disable-filtering
        height="375"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        :mobile-breakpoint="0"
        class="cardTable"
        :footer-props="{
          'items-per-page-options': [10, 20, 50, 100, -1],
          'items-per-page-text': $t('1ページ当たり')
        }"
      >
        <template slot="footer.page-text" slot-scope="props">
          {{
            $t('{itemsLength} 項目中 {pageStart} - {pageStop} ', {
              itemsLength: props.itemsLength,
              pageStart: props.pageStart,
              pageStop: props.pageStop
            })
          }}
        </template>
      </v-data-table>
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
.cardTable {
  &.v-data-table {
    th {
      padding: 8px 10px;
      height: auto;
      border-bottom: 1px solid $gray-4;
      white-space: nowrap;
      color: $gray-2;
      font-size: 12px;
    }
    tbody {
      tr {
        color: $gray-1;
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
    .v-select {
      margin-left: 10px;
    }
  }
  .v-data-footer__pagination {
    margin-left: 0;
    margin-right: 5px;
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
  }
}
</script>
