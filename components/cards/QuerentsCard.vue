<template>
  <v-col class="DataCard" cols="12" md="6">
    <time-bar-chart
      :chart-data="contactsGraph"
      :date="convertToDateFromData(contacts.last_update)"
      :loaded="contacts.loaded"
      :source-from="$t('DATA-SMART CITY SAPPORO')"
      :title="$t('新型コロナコールセンター相談件数(札幌市保健所値)')"
      :unit="$t('件')"
      source-link="https://ckan.pf-sapporo.jp/dataset/covid_19_soudan"
    />
  </v-col>
</template>

<script>
import TimeBarChart from '@/components/TimeBarChart.vue'
import formatGraph from '@/utils/formatGraph'
import convertToDateFromData from '@/utils/convertToDateFromData'

export default {
  name: 'QuerentsCard',
  components: {
    TimeBarChart
  },
  data() {
    return {
      querents: {
        loaded: false,
        last_update: ''
      },
      querentsGraph: [],
      convertToDateFromData
    }
  },
  created() {
    this.getQuerentsGraphFromAPI()
  },
  methods: {
    async getQuerentsGraphFromAPI() {
      await this.$axios
        .$get('/querents.json')
        .then(response => {
          this.querentsGraph = formatGraph(response.data)
          this.querents.last_update = response.last_update
          this.querents.loaded = true
        })
        .catch(_ => {
          this.$emit('failed', '帰国者・接触者電話相談センター相談件数データ ')
        })
    }
  }
}
</script>
