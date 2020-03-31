<template>
  <v-app class="app-print">
    <div v-if="loading" class="loader">
      <img src="/logo.svg" alt="北海道" />
      <scale-loader color="#1268d8" />
    </div>
    <v-container v-else>
      <ul align="center" class="supplementHeaders PrintMeta">
        <li class="supplementHeader">
          <div class="PrintMeta-HeadingWrapper">
            <div class="PrintMeta-Logo">
              <img src="/logo.svg" alt="北海道" />
            </div>
            <h1 class="PrintMeta-Heading">
              <i18n
                path="新型コロナウイルス感染症{break}まとめサイト"
                tag="span"
              >
                <template #break>
                  <br />
                </template>
              </i18n>
            </h1>
          </div>
        </li>
        <li class="supplementHeader2">
          <v-card class="d-flex flex-row" flat tile color="transparent">
            <v-spacer />
            <v-card
              class="PrintMeta-QR flex-shrink-0"
              flat
              tile
              color="transparent"
            >
              <img src="/qrcode.svg" :alt="$t('QRコード')" />
            </v-card>
            <v-card class="flex-shrink-0" flat tile color="transparent">
              <p class="PrintMeta-Text">
                {{ $t('※最新の情報はWebページをご覧ください') }}
              </p>
              <p class="PrintMeta-Link">
                https://stopcovid19.hokkadio.dev/
              </p>
            </v-card>
          </v-card>
        </li>
      </ul>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
export default {
  components: {
    ScaleLoader
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.loading = false
    window.addEventListener('load', this.print)
  },
  beforeDestroy() {
    window.removeEventListener('load', this.print)
  },
  methods: {
    print() {
      window.print()
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `https://stopcovid19.hokkaido.dev/${this.$route.path}`
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.app-print {
  margin: 0 auto;
  background-color: inherit !important;
}
.loader {
  height: 200px;
  width: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  img {
    display: block;
    margin: 0 auto 20px;
  }
}
</style>

<style lang="scss" scoped>
.supplementHeaders {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  list-style-type: none;
}
.supplementHeader {
  width: 50%;
  text-align: left;
}
.supplementHeader2 {
  width: 50%;
}
.PrintMeta {
  margin-bottom: 1em;
  &-HeadingWrapper {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  &-Logo {
    margin: 0 16px 0 0;
    width: 110px;
  }
  &-Heading {
    font-size: 13px;
    color: #898989;
    padding: 0.5em 0;
    text-decoration: none;
  }
  &-QR {
    height: 60px;
    width: 60px;
    margin-right: 1em;
    img {
      max-width: 100%;
    }
  }
  &-Text {
    font-size: 13px;
    color: gray;
    margin-bottom: 0;
    padding-top: 1em;
    width: max-content;
  }
  &-Link {
    font-size: 13px;
    color: gray;
    margin-bottom: 0;
    width: max-content;
  }
}
</style>
