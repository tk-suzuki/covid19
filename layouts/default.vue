<template>
  <v-app class="app">
    <dev-environment-ribbon v-if="displayRibbon" />
    <div v-if="loading" class="loader">
      <img src="/logo.svg" :alt="$t('北海道')" />
      <scale-loader color="#1268d8" />
    </div>
    <div v-else class="appContainer">
      <div class="naviContainer">
        <SideNavigation
          :is-navi-open="isNaviOpen"
          :class="{ open: isNaviOpen }"
          @openNavi="showNavi"
          @closeNavi="hideNavi"
        />
      </div>
      <div class="mainContainer" :class="{ open: isNaviOpen }">
        <v-container class="px-4 py-8">
          <nuxt />
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import SideNavigation from '@/components/SideNavigation'
import DevEnvironmentRibbon from '@/components/DevEnvironmentRibbon'

export default {
  components: {
    ScaleLoader,
    SideNavigation,
    DevEnvironmentRibbon
  },
  data() {
    return {
      isNaviOpen: false,
      loading: true
    }
  },
  computed: {
    displayRibbon() {
      return process.env.NODE_ENV !== 'production'
    }
  },
  mounted() {
    this.loading = false
  },
  methods: {
    showNavi() {
      this.isNaviOpen = true
    },
    hideNavi() {
      this.isNaviOpen = false
    }
  },
  head() {
    const { htmlAttrs } = this.$nuxtI18nSeo()
    return {
      htmlAttrs,
      link: [
        {
          rel: 'canonical',
          href: `https://stopcovid19.hokkaido.dev${this.$route.path}`
        }
      ]
    }
  },
  computed: {
    displayRibbon() {
      return process.env.NODE_ENV !== 'production'
    }
  }
}
</script>
<style lang="scss">
.app {
  max-width: 1440px;
  margin: 0 auto;
  background-color: inherit !important;
}
.appContainer {
  position: relative;
  @include largerThan($small) {
    display: grid;
    grid-template-columns: 268px auto;
  }
  @include largerThan($huge) {
    grid-template-columns: 325px auto;
  }
}
@include largerThan($small) {
  .naviContainer {
    grid-column: 1/2;
    position: fixed;
    top: 0;
    overflow-y: auto;
    width: 268px;
    height: 100vh;
  }
}
@include largerThan($huge) {
  .naviContainer {
    width: 325px;
  }
}
.open {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
}
.mainContainer {
  grid-column: 2/3;
  overflow: hidden;
  @include lessThan($small) {
    .container {
      padding-top: 16px !important;
    }
  }
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
