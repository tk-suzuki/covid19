<template>
  <div class="SideNavigation">
    <div class="SideNavigation-HeadingContainer sp-flex">
      <v-icon
        class="SideNavigation-HeadingIcon sp-inline-block"
        :aria-label="$t('Navi Open')"
        @click="openNavi"
      >
        mdi-menu
      </v-icon>
      <nuxt-link to="/" class="SideNavigation-HeadingLink">
        <div class="SideNavigation-Logo">
          <img src="/logo.svg" :alt="$t('Hokkaido')" />
        </div>
        <h1 class="SideNavigation-Heading">
          <span class="SideNavigation-HeadingTitle">
            {{ $t('Hokkaido') }}<br />
          </span>
          {{ $t('COVID-19') }}<br class="SideNavigation-HeadingMobileBreak" />{{
            $t('Measures site')
          }}
        </h1>
      </nuxt-link>
    </div>
    <v-divider class="SideNavigation-HeadingDivider" />
    <div class="sp-none" :class="{ open: isNaviOpen }">
      <v-icon
        class="SideNavigation-ListContainerIcon sp-inline-block"
        :aria-label="$t('Navi Close')"
        @click="closeNavi"
      >
        mdi-close
      </v-icon>
      <v-list :flat="true">
        <v-container
          v-for="(item, i) in items"
          :key="i"
          :class="(isClass(item), item.class)"
          class="SideNavigation-ListItemContainer"
          @click="closeNavi"
        >
          <ListItem :link="item.link" :icon="item.icon" :title="item.title" />
          <v-divider v-show="item.divider" class="SideNavigation-Divider" />
        </v-container>
      </v-list>
      <div class="SideNavigation-Footer">
        <div class="SideNavigation-SocialLinkContainer">
          <!-- <a href="https://line.me/R/ti/p/%40822sysfc" target="_blank" rel="noopener">
            <img src="/line.png" alt="LINE" />
          </a> -->
          <a
            href="https://twitter.com/Just_douit"
            target="_blank"
            rel="noopener"
          >
            <img
              src="/twitter.png"
              width="90px"
              height="90px"
              alt="Twitter"
            />
          </a>
          <a
            href="https://www.facebook.com/Justdouit19/"
            target="_blank"
            rel="noopener"
          >
            <img
              src="/facebook.png"
              width="90px"
              height="90px"
              alt="Facebook"
            />
          </a>
          <a
            href="https://github.com/codeforsapporo/covid19"
            target="_blank"
            rel="noopener"
          >
            <img
              src="/github.png"
              width="90px"
              height="90px"
              alt="GitHub"
            />
          </a>
        </div>
        <div class="SideNavigation-SponsorLinkContainer">
          Operations by:<br />
          <span class="image-title">JUST道IT</span>
          <img
            src="/justdouit.png"
            width="172px"
            height="42px"
            alt="JUST道IT"
          /><br />
          Powered by:<br />
          <a href="https://www.sakura.ad.jp/" target="_blank" rel="noopener">
            <span class="image-title">さくらインターネット</span>
            <img
              class="sakura-internet"
              src="/sakura.svg"
              width="172px"
              height="46.5px"
              alt="さくらインターネット"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "ja": {
    "Navi Open": "サイドメニュー項目を開く",
    "Navi Close": "サイドメニュー項目を閉じる",
    "Hokkaido": "北海道",
    "COVID-19": "新型コロナウイルス",
    "Measures site": "まとめサイト",
    "Hokkaido Metropolitan Government": "北海道",
    "Hokkaido COVID-19 Task Force": "新型コロナウイルス感染症対策本部",
    "The latest updates": "道内の最新感染動向",
    "If you have any symptoms": "感染予防と相談窓口",
    "for Families with children": "お子様をお持ちの皆様へ",
    "for Citizens": "道民の皆様へ",
    "for Enterprises and Employees": "企業の皆様・はたらく皆様へ",
    "Official statements from Task Force": "北海道感染症危機管理対策本部会議",
    "Government official website": "北海道公式ホームページ",
    "Message from Governor Suzuki": "知事からのメッセージ",
    "About us": "当サイトについて",
    "Government official Twitter": "北海道公式Twitter",
    "Tokyo-to Measures site": "東京都 新型コロナウイルス感染症対策サイト"
  }
}
</i18n>

<script>
import ListItem from '@/components/ListItem'

export default {
  components: {
    ListItem
  },
  props: {
    isNaviOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    items() {
      return [
        {
          icon: 'mdi-chart-timeline-variant',
          title: this.$t('The latest updates'),
          link: '/'
        },
        {
          icon: 'covid',
          title: this.$t('If you have any symptoms'),
          link:
            'http://www.pref.hokkaido.lg.jp/hf/kth/kak/singatakoronahaien.htm#道民へ',
          divider: true
        },
        {
          icon: 'parent',
          title: this.$t('for Families with children'),
          link: '/parent'
        },
        {
          icon: 'mdi-account-multiple',
          title: this.$t('for Citizens'),
          link: 'http://www.pref.hokkaido.lg.jp/ss/tkk/singatakoronahaien.htm'
        },
        {
          icon: 'mdi-domain',
          title: this.$t('for Enterprises and Employees'),
          link: '/worker',
          divider: true
        },
        {
          title: this.$t('Official statements from Task Force'),
          link:
            'http://www.pref.hokkaido.lg.jp/hf/kth/kak/singatakoronahaien.htm#対策本部'
        },
        // 【東京都主催等】中止または延期するイベント・説明会等
        // 道にまとまった情報がないので一旦コメントアウト
        // {
        //   title: this.$t('Cancelled public events'),
        //   link:
        //     'https://www.seisakukikaku.metro.tokyo.lg.jp/information/event02.html'
        // },
        {
          title: this.$t('Message from Governor Suzuki'),
          link:
            'http://www.pref.hokkaido.lg.jp/ss/tkk/hodo/pressconference/r1.htm'
        },
        {
          title: this.$t('About us'),
          link: '/about'
        },
        {
          title: this.$t('Government official website'),
          link: 'http://www.pref.hokkaido.lg.jp/index.htm'
        },
        {
          title: this.$t('Government official Twitter'),
          link: 'https://twitter.com/PrefHokkaido',
          divider: true
        },
        {
          title: this.$t('Tokyo-to Measures site'),
          link: 'https://stopcovid19.metro.tokyo.lg.jp/',
          divider: true
        },
      ]
    },
    isClass() {
      return item => (item.title.charAt(0) === '【' ? 'kerningLeft' : '')
    }
  },
  methods: {
    openNavi() {
      this.$emit('openNavi')
    },
    closeNavi() {
      this.$emit('closeNavi')
    }
  }
}
</script>

<style lang="scss" scoped>
.SideNavigation {
  position: relative;
  height: 100%;
  background: $white;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
  &-HeadingContainer {
    padding: 1.25em 0 1.25em 1.25em;
    align-items: center;
    @include lessThan($small) {
      padding: 7px 0 7px 20px;
    }
  }
  &-HeadingIcon {
    display: none;
    margin-right: 16px;
  }
  &-HeadingLink {
    @include lessThan($small) {
      display: flex;
      align-items: center;
    }
    text-decoration: none;
  }
  &-ListContainerIcon {
    display: none;
    margin: 24px 16px 0;
  }
  &-ListItemContainer {
    padding: 2px 20px;
  }
  &-Logo {
    margin: 20px 16px 0 0;
    width: 110px;
    @include lessThan($small) {
      margin-top: 0;
    }
  }
  &-Heading {
    margin-top: 8px;
    font-size: 13px;
    color: #898989;
    padding: 0.5em 0;
    text-decoration: none;
    @include lessThan($small) {
      margin-top: 0;
    }
  }
  &-HeadingTitle {
    @include lessThan($small) {
      display: none;
    }
  }
  &-HeadingMobileBreak {
    display: none;
    @include lessThan($small) {
      display: inline;
    }
  }
  &-HeadingDivider {
    margin: 0px 20px 4px;
    @include lessThan($small) {
      display: none;
    }
  }
  &-Divider {
    margin: 12px 0;
  }
  &-Footer {
    padding: 20px;
    background-color: $white;
  }
  &-SocialLinkContainer {
    display: flex;
    & img {
      width: 30px;
      &:first-of-type {
        margin-right: 10px;
      }
    }
  }
  &-SponsorLinkContainer {
    overflow: visible;
    padding-top: 6px;
    white-space: normal;
    font-size: 0.82rem;
    color: $gray-1;
    & img {
      width: 172px;
    }
    & img.sakura-internet {
      margin: -6px -10px;
    }
    & .image-title {
      display: inline-block;
      width: 0;
      height: 1.5rem;
      overflow: hidden;
    }
  }
  &-Copyright {
    display: block;
    margin-top: 10px;
    font-size: 8px;
    line-height: 1.2;
    color: $gray-1;
    font-weight: bold;
  }
}
.open {
  @include lessThan($small) {
    position: absolute;
    top: 0;
    left: 0;
    display: block !important;
    width: 100%;
    z-index: 100;
    background-color: $white;
  }
}
@include lessThan($small) {
  .sp-flex {
    display: flex;
  }
  .sp-inline-block {
    display: inline-block;
  }
  .sp-none {
    display: none;
  }
}
.kerningLeft {
  text-indent: -0.5em;
}
</style>
