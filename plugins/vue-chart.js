import Vue from 'vue'
import { Bar, mixins } from 'vue-chartjs'
import { useDayjsAdapter } from './chartjs-adapter-dayjs'
const { reactiveProp } = mixins
const VueChartPlugin = ({ app }) => {
  useDayjsAdapter(app.i18n)
  createCustomChart()
}

const createCustomChart = () => {
  Vue.component('bar', {
    extends: Bar,
    mixins: [reactiveProp],
    props: {
      options: {
        type: Object,
        default: () => {}
      }
    },
    watch: {
      options() {
        this.renderChart(this.chartData, this.options)
      }
    },
    mounted() {
      this.renderChart(this.chartData, this.options)
    }
  })
}

export default VueChartPlugin
