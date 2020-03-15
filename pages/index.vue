<template>
  <div class="MainPage">
    <page-header
      :icon="headerItem.icon"
      :title="headerItem.title"
      :date="convertToDateFromData(headerItem.date)"
    />
    <whats-new
      class="mb-4"
      date=""
      url="http://www.pref.hokkaido.lg.jp/ss/tkk/singatakoronahaien.htm"
      text="北海道発表の新型コロナウイルス感染症に関する情報はこちら"
    />

    <v-row class="DataBlock">
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          title="現在患者数"
          :chart-data="currentPatientsGraph"
          :date="convertToDateFromData(current_patients.last_update)"
          sourceFrom="北海道 オープンデータポータル"
          sourceLink="https://www.harp.lg.jp/opendata/dataset/1369.html"
          :unit="'人'"
          :defaultDataKind="'cumulative'"
          :supplement="'現在患者数とは、陽性患者数から治療終了者数と死亡者数を除いた人数です。なお、ご覧いただいている時間によっては累計されている日付が違う場合がありますのでご注意ください。死亡者数は北海道のホームページを参照してください。'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          title="治療終了者数"
          :chart-data="dischargesGraph"
          :date="convertToDateFromData(discharges_summary.last_update)"
          sourceFrom="北海道 オープンデータポータル"
          sourceLink="https://www.harp.lg.jp/opendata/dataset/1369.html"
          :unit="'人'"
          :defaultDataKind="'cumulative'"
          :supplement="'治療終了者数とは道発表の「陰性確認済累計」と同じものです。「陰性確認済累計」とは、陽性の患者が軽快してから48時間後の1回目のPCR検査で陰性が確認され、それから12時間後の2回目のPCR検査でも陰性が確認された方の累計のことです。（3/9 鈴木知事のツイートから引用）'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          title="陽性患者数"
          :chart-data="patientsGraph"
          :date="convertToDateFromData(patients.last_update)"
          sourceFrom="北海道 オープンデータポータル"
          sourceLink="https://www.harp.lg.jp/opendata/dataset/1369.html"
          :unit="'人'"
          :defaultDataKind="'cumulative'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <data-table
          :title="'陽性患者の属性'"
          :chart-data="patientsTable"
          :chart-option="{}"
          :date="convertToDateFromData(patients.last_update)"
          sourceFrom="北海道 オープンデータポータル"
          sourceLink="https://www.harp.lg.jp/opendata/dataset/1369.html"
          :info="sumInfoOfPatients"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          title="検査数"
          :chart-data="inspectionsGraph"
          :date="convertToDateFromData(inspections.last_update)"
          sourceFrom="北海道 オープンデータポータル"
          sourceLink="https://www.harp.lg.jp/opendata/dataset/1369.html"
          :unit="'人'"
          :defaultDataKind="'cumulative'"
          :showButton="false"
          :supplement="'3月3日以前のデータが公開されていないため、グラフは3月3日以降となります。'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          title="新型コロナコールセンター相談件数(札幌市保健所値)"
          :chart-data="contactsGraph"
          :date="convertToDateFromData(contacts.last_update)"
          sourceFrom="DATA-SMART CITY SAPPORO"
          sourceLink="https://ckan.pf-sapporo.jp/dataset/covid_19_soudan"
          :unit="'件'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          title="帰国者・接触者電話相談センター相談件数(札幌市保健所値)"
          :chart-data="querentsGraph"
          :date="convertToDateFromData(querents.last_update)"
          sourceFrom="DATA-SMART CITY SAPPORO"
          sourceLink="https://ckan.pf-sapporo.jp/dataset/covid_19_soudan"
          :unit="'件'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import TimeBarChart from '@/components/TimeBarChart.vue'
import TimeStackedBarChart from '@/components/TimeStackedBarChart.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import StaticInfo from '@/components/StaticInfo.vue'
/*
import lastUpdate from '@/data/last_update.json'
import patientsSummary from '@/data/patients_summary.json'
import patients from '@/data/patients.json'
import contacts from '@/data/contacts.json'
import querents from '@/data/querents.json'
import currentPatients from '@/data/current_patients.json'
import dischargesSummary from '@/data/discharges_summary.json'
import inspections from '@/data/inspections.json'
 */
import DataTable from '@/components/DataTable.vue'
import formatGraph from '@/utils/formatGraph'
import formatTable from '@/utils/formatTable'
import SvgCard from '@/components/SvgCard.vue'
import convertToDateFromData from '@/utils/convertToDateFromData'
import DataView from "../components/DataView";
import ConfiremCasesTable from "@/components/ConfiremCasesTable"
import axios from "axios";
import formatCurrentPatientsGraph from "@/utils/formatCurrentPatientsGraph";
import formatDischargesSummaryGraph from "@/utils/formatDischargesSummaryGraph";
import formatInspectionsGraph from "@/utils/formatInspectionsGraph";
import formatPatientsSummaryGraph from "@/utils/formatPatientsSummaryGraph";

export default {
  components: {
    ConfiremCasesTable,
    DataView,
    PageHeader,
    TimeBarChart,
    TimeStackedBarChart,
    WhatsNew,
    StaticInfo,
    DataTable,
    SvgCard
  },
  data() {
    const data = {
      patientsTable: {},
      patientsGraph: [],
      contactsGraph: [],
      querentsGraph: [],
      currentPatientsGraph: [],
      dischargesGraph: [],
      inspectionsGraph: [],
      sumInfoOfPatients: {
        lText: 0,
        sText: ' の累計',
        unit: '人'
      },
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: '道内の最新感染動向',
        date: ''
      },
      option: {
        tooltips: {
          displayColors: false,
          callbacks: {
            label(tooltipItem) {
              const labelText = tooltipItem.value + '人'
              return labelText
            }
          }
        },
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false
              },
              ticks: {
                fontSize: 10,
                maxTicksLimit: 20,
                fontColor: '#808080'
              }
            }
          ],
          yAxes: [
            {
              location: 'bottom',
              stacked: true,
              gridLines: {
                display: true,
                color: '#E5E5E5'
              },
              ticks: {
                suggestedMin: 0,
                maxTicksLimit: 8,
                fontColor: '#808080'
              }
            }
          ]
        }
      },
      convertToDateFromData
    }
    return data
  },
  head() {
    return {
      title: '道内の最新感染動向'
    }
  },
  methods: {
    getDataFromAPIData() {
      console.log(this)
      // 現在患者数グラフ
      this.currentPatientsGraph= formatCurrentPatientsGraph(this.current_patients.data)
      // 感染者数グラフ
      this.patientsGraph = formatPatientsSummaryGraph(this.patients_summary.data)
      // 感染者数
      this.patientsTable = formatTable(this.patients.data)
      // 陰性確認数グラフ
      this.dischargesGraph = formatDischargesSummaryGraph(this.discharges_summary.data)
      // 検査数グラフ
      this.inspectionsGraph = formatInspectionsGraph(this.inspections.data)
      // 相談件数
      this.contactsGraph = formatGraph(this.contacts.data)
      // 帰国者・接触者電話相談センター相談件数
      this.querentsGraph = formatGraph(this.querents.data)

      this.sumInfoOfPatients = {
        lText: this.patientsGraph[
        this.patientsGraph.length - 1
          ].cumulative.toLocaleString(),
        sText: this.patientsGraph[this.patientsGraph.length - 1].label + 'の累計',
        unit: '人'
      }

      this.headerItem= {
          icon: 'mdi-chart-timeline-variant',
          title: '道内の最新感染動向',
          date: this.last_update
      }
    }
  },
  mounted() {
    this.getDataFromAPIData()
  },
  asyncData({ params, error}) {
    return Promise.all([
      axios.get('https://raw.githubusercontent.com/kanahiro/covid19hokkaido_scraping/gh-pages/contacts.json'),
      axios.get('https://raw.githubusercontent.com/kanahiro/covid19hokkaido_scraping/gh-pages/current_patients.json'),
      axios.get('https://raw.githubusercontent.com/kanahiro/covid19hokkaido_scraping/gh-pages/discharges_summary.json'),
      axios.get('https://raw.githubusercontent.com/kanahiro/covid19hokkaido_scraping/gh-pages/inspections.json'),
      axios.get('https://raw.githubusercontent.com/kanahiro/covid19hokkaido_scraping/gh-pages/last_update.json'),
      axios.get('https://raw.githubusercontent.com/kanahiro/covid19hokkaido_scraping/gh-pages/patients.json'),
      axios.get('https://raw.githubusercontent.com/kanahiro/covid19hokkaido_scraping/gh-pages/patients_summary.json'),
      axios.get('https://raw.githubusercontent.com/kanahiro/covid19hokkaido_scraping/gh-pages/querents.json')
    ]).then(result => {
      return {
        contacts: result[0].data,
        current_patients: result[1].data,
        discharges_summary: result[2].data,
        inspections: result[3].data,
        last_update: result[4].data,
        patients: result[5].data,
        patients_summary: result[6].data,
        querents: result[7].data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.MainPage {
  .DataBlock {
    margin: 20px -12px;
    .DataCard {
      margin-bottom: 20px;
    }
  }
}
</style>
