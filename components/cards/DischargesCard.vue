<template>
  <v-col class="DataCard" cols="12" md="6">
    <time-bar-chart
      :chart-data="dischargesGraph"
      :date="convertToDateFromData(discharges_summary.last_update)"
      :default-data-kind="'cumulative'"
      :loaded="discharges_summary.loaded"
      :source-from="$t('北海道 オープンデータポータル')"
      :supplement="
        $t(
          '治療終了者数とは道発表の「陰性確認済累計」と同じものです。「陰性確認済累計」とは、陽性の患者が軽快してから48時間後の1回目のPCR検査で陰性が確認され、それから12時間後の2回目のPCR検査でも陰性が確認された方の累計のことです。（3/9 鈴木知事のツイートから引用）'
        )
      "
      :title="$t('治療終了者数')"
      title-id="discharges-summary"
      :unit="$t('人')"
      source-link="https://www.harp.lg.jp/opendata/dataset/1369.html"
    />
  </v-col>
</template>

<script>
import TimeBarChart from '@/components/TimeBarChart.vue'
import formatDischargesSummaryGraph from '@/utils/formatDischargesSummaryGraph'
import convertToDateFromData from '@/utils/convertToDateFromData'

export default {
  name: 'DischargesCard',
  components: {
    TimeBarChart
  },
  data() {
    return {
      discharges_summary: {
        loaded: false,
        last_update: ''
      },
      dischargesGraph: [],
      convertToDateFromData
    }
  },
  beforeCreate() {
    this.getDischargesSummaryGraphFromAPI()
  },
  methods: {
    // 治療終了者数グラフ
    async getDischargesSummaryGraphFromAPI() {
      await this.$axios
        .$get('/discharges_summary.json')
        .then(response => {
          this.dischargesGraph = formatDischargesSummaryGraph(response.data)
          this.discharges_summary.last_update = response.last_update
          this.discharges_summary.loaded = true
        })
        .catch(_ => {
          this.$emit('failed', '治療終了者数データ ')
        })
    }
  }
}
</script>
