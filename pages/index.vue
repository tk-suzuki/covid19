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
      :text="$t('北海道発表の新型コロナウイルス感染症に関する情報はこちら')"
    />

    <v-row class="DataBlock">
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :title="$t('現在患者数')"
          :chart-data="currentPatientsGraph"
          :date="convertToDateFromData(current_patients.last_update)"
          :sourceFrom="$t('北海道 オープンデータポータル')"
          sourceLink="https://www.harp.lg.jp/opendata/dataset/1369.html"
          :loaded="current_patients.loaded"
          :unit="$t('人')"
          :defaultDataKind="'cumulative'"
          :supplement="$t('現在患者数とは、陽性患者数から治療終了者数と死亡者数を除いた人数です。なお、ご覧いただいている時間によっては累計されている日付が違う場合がありますのでご注意ください。死亡者数は北海道のホームページを参照してください。')"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :title="$t('治療終了者数')"
          :chart-data="dischargesGraph"
          :date="convertToDateFromData(discharges_summary.last_update)"
          :sourceFrom="$t('北海道 オープンデータポータル')"
          sourceLink="https://www.harp.lg.jp/opendata/dataset/1369.html"
          :unit="$t('人')"
          :loaded="discharges_summary.loaded"
          :defaultDataKind="'cumulative'"
          :supplement="
            $t('治療終了者数とは道発表の「陰性確認済累計」と同じものです。「陰性確認済累計」とは、陽性の患者が軽快してから48時間後の1回目のPCR検査で陰性が確認され、それから12時間後の2回目のPCR検査でも陰性が確認された方の累計のことです。（3/9 鈴木知事のツイートから引用）')
          "
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :title="$t('陽性患者数')"
          :chart-data="patientsGraph"
          :date="convertToDateFromData(patients_summary.last_update)"
          :sourceFrom="$t('北海道 オープンデータポータル')"
          sourceLink="https://www.harp.lg.jp/opendata/dataset/1369.html"
          :unit="$t('人')"
          :loaded="patients_summary.loaded"
          :defaultDataKind="'cumulative'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <data-table
          :title="$t('陽性患者の属性')"
          :chart-data="patientsTable"
          :chart-option="{}"
          :date="convertToDateFromData(patients.last_update)"
          :sourceFrom="$t('北海道 オープンデータポータル')"
          :loaded="patients.loaded"
          sourceLink="https://www.harp.lg.jp/opendata/dataset/1369.html"
          :sortBy="'日付'"
          :sortDesc="true"
          :info="sumInfoOfPatients"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :title="$t('検査数')"
          :chart-data="inspectionsGraph"
          :date="convertToDateFromData(inspections.last_update)"
          :sourceFrom="$t('北海道 オープンデータポータル')"
          sourceLink="https://www.harp.lg.jp/opendata/dataset/1369.html"
          :unit="$t('人')"
          :loaded="inspections.loaded"
          :defaultDataKind="'cumulative'"
          :showButton="false"
          :supplement="
            $t('3月3日以前のデータが公開されていないため、グラフは3月3日以降となります。')
          "
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :title="$t('新型コロナコールセンター相談件数(札幌市保健所値)')"
          :chart-data="contactsGraph"
          :date="convertToDateFromData(contacts.last_update)"
          :sourceFrom="$t('DATA-SMART CITY SAPPORO')"
          sourceLink="https://ckan.pf-sapporo.jp/dataset/covid_19_soudan"
          :loaded="contacts.loaded"
          :unit="$t('件')"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :title="$t('帰国者・接触者電話相談センター相談件数(札幌市保健所値)')"
          :chart-data="querentsGraph"
          :date="convertToDateFromData(querents.last_update)"
          :sourceFrom="$t('DATA-SMART CITY SAPPORO')"
          sourceLink="https://ckan.pf-sapporo.jp/dataset/covid_19_soudan"
          :loaded="querents.loaded"
          :unit="$t('件')"
        />
      </v-col>
    </v-row>
    <v-dialog v-model="failed" flat>
      <v-alert type="error">
        データの取得に失敗しました。<br>
        後ほど再度お試しいただき、改善しない場合には「JUST 道 IT」までご連絡ください。<br>
        取得に失敗したデータ： {{failed_datas}}
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import TimeBarChart from '@/components/TimeBarChart.vue'
import TimeStackedBarChart from '@/components/TimeStackedBarChart.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import StaticInfo from '@/components/StaticInfo.vue'
import DataTable from '@/components/DataTable.vue'
import formatGraph from '@/utils/formatGraph'
import formatTable from '@/utils/formatTable'
import SvgCard from '@/components/SvgCard.vue'
import convertToDateFromData from '@/utils/convertToDateFromData'
import DataView from '../components/DataView'
import formatCurrentPatientsGraph from "@/utils/formatCurrentPatientsGraph";
import formatDischargesSummaryGraph from "@/utils/formatDischargesSummaryGraph";
import formatInspectionsGraph from "@/utils/formatInspectionsGraph";
import formatPatientsSummaryGraph from "@/utils/formatPatientsSummaryGraph";

const axiosOptions = {}

export default {
  components: {
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
      contacts: {
        loaded: false,
        last_update: "",
      },
      current_patients: {
        loaded: false,
        last_update: "",
      },
      discharges_summary: {
        loaded: false,
        last_update: "",
      },
      inspections: {
        loaded: false,
        last_update: "",
      },
      patients: {
        loaded: false,
        last_update: "",
      },
      patients_summary: {
        loaded: false,
        last_update: "",
      },
      querents: {
        loaded: false,
        last_update: "",
      },
      /**
       * 全体の最終更新日
       */
      last_update: "",
      /**
       * 各グラフ系のデータ整理後のデータ
       */
      patientsTable: {},
      patientsGraph: [],
      contactsGraph: [],
      querentsGraph: [],
      currentPatientsGraph: [],
      dischargesGraph: [],
      inspectionsGraph: [],
      failed: false,
      failed_datas: "",
      sumInfoOfPatients: {
        lText: '',
        sText: '',
        unit: ''
      },
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: this.$t('道内の最新感染動向'),
        date: ''
      },
      option: {
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
      title: this.$t('道内の最新感染動向')
    }
  },
  methods: {
    // 現在患者数グラフ
    async getCurrentPatientsGraphFromAPI() {
      await this.$axios.$get('/current_patients.json', axiosOptions).then(response => {
        this.currentPatientsGraph = formatCurrentPatientsGraph(response.data);
        this.current_patients.last_update = response.last_update;
        this.current_patients.loaded = true;
      }).catch(err => {
        this.failed = true;
        this.failed_datas += '現在患者数データ ';
      });
    },
    // 感染者数グラフ
    async getPatientsSummaryGraphFromAPI() {
      await this.$axios.$get('/patients_summary.json',axiosOptions).then(response => {
        this.patientsGraph = formatPatientsSummaryGraph(response.data)
        this.patients_summary.last_update = response.last_update
        this.patients_summary.loaded = true
        this.sumInfoOfPatients = {
          lText: this.patientsGraph[
          this.patientsGraph.length - 1
            ].cumulative.toLocaleString(),
          sText: this.$t('{date}の累計', {date: this.patientsGraph[this.patientsGraph.length - 1].label}),
          unit: this.$t('人')
        }
      }).catch(err => {
        this.failed = true;
        this.failed_datas += '陽性患者数データ ';
      });
    },
    // 感染者
    async getPatientsTableFromAPI() {
      await this.$axios.$get('/patients.json', axiosOptions).then(response => {
        this.patientsTable = formatTable(response.data);
        // 陽性患者の属性 ヘッダー翻訳
        for (const header of this.patientsTable.headers) {
          header.text =
            header.value === '退院' ? this.$t('退院※') : this.$t(header.value)
        }
        // 陽性患者の属性 中身の翻訳
        for (const row of this.patientsTable.datasets) {
          row['居住地'] = this.$t(row['居住地'])
          row['性別'] = this.$t(row['性別'])
          row['退院'] = this.$t(row['退院'])
          if (row['性別'] === '非公表性'){
            row['性別'] = this.$t('非公表')
          }
          const match = row['年代'].match(/^([0-9]+)代$/)
          if (match) {
            row['年代'] = this.$t('{age}代', { age: match[1] })
          }
          else {
            row['年代'] = this.$t(row['年代'])
          }
        }
        this.patients.last_update = response.last_update;
        this.patients.loaded = true
      }).catch(err => {
        this.failed = true;
        this.failed_datas += '陽性患者の属性データ ';
      });
    },
    // 治療終了者数グラフ
    async getDischargesSummaryGraphFromAPI() {
      await this.$axios.$get('/discharges_summary.json', axiosOptions).then(response => {
        this.dischargesGraph = formatDischargesSummaryGraph(response.data)
        this.discharges_summary.last_update = response.last_update
        this.discharges_summary.loaded = true
      }).catch(err => {
        this.failed = true;
        this.failed_datas += '治療終了者数データ ';
      });
    },
    // 検査数グラフ
    async getInscpectionsGraphFromAPI() {
      await this.$axios.$get('/inspections.json', axiosOptions).then(response => {
        this.inspectionsGraph = formatInspectionsGraph(response.data)
        this.inspections.last_update = response.last_update
        this.inspections.loaded = true
        return true
      }).catch(err => {
        this.failed = true;
        this.failed_datas += '検査数データ ';
      });
    },
    // 相談件数グラフ
    async getContactsGraphFromAPI() {
      await this.$axios.$get('/contacts.json', axiosOptions).then(response => {
        this.contactsGraph = formatGraph(response.data)
        this.contacts.last_update = response.last_update
        this.contacts.loaded = true
      }).catch(err => {
        this.failed = true;
        this.failed_datas += '新型コロナコールセンター相談件数データ ';
      });
    },
    // 帰国者・接触者電話相談センター相談件数グラフ
    async getQuerentsGraphFromAPI() {
      await this.$axios.$get('/querents.json', axiosOptions).then(response => {
        this.querentsGraph = formatGraph(response.data)
        this.querents.last_update = response.last_update
        this.querents.loaded = true
      }).catch(err => {
        this.failed = true;
        this.failed_datas += '帰国者・接触者電話相談センター相談件数データ ';
      });
    },
    async getLastUpdateFromAPI() {
      await this.$axios.$get('/last_update.json', axiosOptions).then(response => {
        this.headerItem = {
          icon: 'mdi-chart-timeline-variant',
          title: this.$t('道内の最新感染動向'),
          date: response
        }
      }).catch(err => {
        console.log(err)
        this.failed = true;
        this.failed_datas += '最終更新日データ ';
      });
    }
  },
  created() {
    this.getContactsGraphFromAPI()
    this.getCurrentPatientsGraphFromAPI()
    this.getDischargesSummaryGraphFromAPI()
    this.getInscpectionsGraphFromAPI()
    this.getLastUpdateFromAPI()
    this.getPatientsTableFromAPI()
    this.getPatientsSummaryGraphFromAPI()
    this.getQuerentsGraphFromAPI()
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
