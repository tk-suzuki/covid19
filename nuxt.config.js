/* eslint-disable */
module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s | 北海道 新型コロナウイルスまとめサイト',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '北海道内の新型コロナウイルス感染症 (COVID-19) に関する、感染者数、患者数などの最新統計情報（随時更新）'
      },
      {
        hid: 'keyword',
        name: 'keyword',
        content: 'JUST道IT, 北海道, 札幌市, 新型コロナウイルス, COVID-19, 感染者数, 患者数'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: '北海道 新型コロナウイルスまとめサイト'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://stopcovid19.hokkaido.dev'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: '北海道 新型コロナウイルスまとめサイト'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '当サイトは、道内の新型コロナウイルス感染症（COVID-19）に関する最新情報を提供するために作成されました。開発は、ICTエンジニアやデザイナーなどによって結成された「JUST道IT」が行っています。複製・改変が許されたオープンソースライセンスで公開されている、東京都公式新型コロナウイルス対策サイト（https://stopcovid19.metro.tokyo.lg.jp/）の仕組みを利用しています。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://stopcovid19.hokkaido.dev/ogp.png'
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '503748220262414'
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: '@just_douit'
      },
      {
        hid: 'twitter:player',
        property: 'twitter:player',
        content: '@just_douit'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon-precomposed.png' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~assets/global.scss',
    '~~/font/dist/css/materialdesignicons.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/vue-chart.js',
      ssr: true
    },
    '@/plugins/datetime-formatter.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify', '@nuxt/typescript-build', '@nuxtjs/google-analytics'],
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['@nuxtjs/moment', ['ja']],
    [
      'nuxt-i18n',
      {
        strategy: 'no_prefix',
        locales: [
          {
            code: 'ja',
            iso: 'ja_JP'
          }
        ],
        defaultLocale: 'ja',
        vueI18n: {
          fallbackLocale: 'ja',
          formatFallbackMessages: true
        },
        vueI18nLoader: true
      }
    ],
    'nuxt-svg-loader'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {},
    defaultAssets: false
  },
  googleAnalytics: {
    id: 'UA-159982743-1'
  },
   /*
  ** Build configuration
  */
  // build: {
  //   /*
  //   ** You can extend webpack config here
  //   */
  //   extend (config, ctx) {
  //   }
  // },
  manifest: {
    "name": "北海道 新型コロナウイルスまとめサイト",
    "theme_color": "#1268d8",
    "background_color": "#ffffff",
    "display": "standalone",
    "Scope": "/",
    "start_url": "/",
    "splash_pages": null
  },
  generate: {
    fallback: true
  },
  // /*
  // ** hot read configuration for docker
  // */
  watchers: {
    webpack: {
      poll: true
    }
  }
}
