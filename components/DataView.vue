<template>
  <v-card class="DataView">
    <div class="DataView-Inner">
      <div class="DataView-Header">
        <h3
          class="DataView-Title"
          :class="!!$slots.infoPanel ? 'with-infoPanel' : ''"
        >
          {{ title }}
        </h3>
        <slot name="infoPanel" />
        <slot name="button" />
      </div>
      <div class="DataView-CardText">
        <slot />
      </div>
      <div class="DataView-Footer">
        <div class="Footer-Left">
          <div>
            <v-footer v-if="!loaded" class="DataView-Footer" />
            <v-footer v-else class="DataView-Footer">
              <a
                class="DataView-Footer"
                target="_blank"
                rel="noopener"
                :href="sourceLink"
                >{{ $t('出典: {sourceFrom}', { sourceFrom: sourceFrom }) }}
                <v-icon size="15">mdi-open-in-new</v-icon></a
              >
            </v-footer>
          </div>
          <div v-if="!loaded">
            <a class="Permalink" />
          </div>
          <div v-else>
            <a class="Permalink">
              {{ $t('{date} 更新', { date: date }) }}
            </a>
          </div>
        </div>
        <div v-if="this.$route.query.embed !== 'true'" class="Footer-Right">
          <button class="DataView-Share-Opener" @click="toggleShareMenu">
            <v-icon>
              mdi-share-variant
            </v-icon>
          </button>
          <div
            v-if="displayShare"
            class="DataView-Share-Buttons py-2"
            @click="stopClosingShareMenu"
          >
            <div class="Close-Button">
              <v-icon :aria-label="$t('閉じる')" @click="closeShareMenu">
                mdi-close
              </v-icon>
            </div>

            <h4>{{ $t('埋め込み用コード') }}</h4>

            <div class="EmbedCode">
              <v-icon
                v-if="isCopyAvailable()"
                class="EmbedCode-Copy"
                :aria-label="$t('クリップボードにコピー')"
                @click="copyEmbedCode"
              >
                mdi-content-copy
              </v-icon>
              {{ graphEmbedValue }}
            </div>

            <div class="Buttons">
              <button
                :aria-label="$t('シェアリンクをコピー', { title })"
                @click="copyLink"
              >
                <PictureLoader
                  filename="link"
                  alt="link"
                  classname="icon-resize link"
                />
              </button>

              <button
                :aria-label="$t('LINEで{title}のグラフをシェア', { title })"
                @click="line"
              >
                <PictureLoader
                  filename="line"
                  alt="LINE"
                  classname="icon-resize line"
                />
              </button>

              <button
                :aria-label="$t('Twitterで{title}のグラフをシェア', { title })"
                @click="twitter"
              >
                <PictureLoader
                  filename="twitter"
                  alt="Twitter"
                  classname="icon-resize twitter"
                />
              </button>

              <button
                :aria-label="$t('facebookで{title}のグラフをシェア', { title })"
                @click="facebook"
              >
                <PictureLoader
                  filename="facebook"
                  alt="facebook"
                  classname="icon-resize facebook"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showOverlay" class="overlay">
      <div class="overlay-text">
        {{ overlayContent }}
      </div>
      <v-footer class="DataView-Footer">
        <time :datetime="date">{{ $t('{date} 更新', { date }) }}</time>
        <slot name="footer" />
      </v-footer>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

const PictureLoader = () => import('~/components/PictureLoader.vue')

export default Vue.extend({
  components: { PictureLoader },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    info: {},
    loaded: {
      type: Boolean,
      default: false
    },
    sourceFrom: {
      type: String,
      default: ''
    },
    sourceLink: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      openGraphEmbed: false,
      displayShare: false,
      showOverlay: false,
      overlayContent: ''
    }
  },
  computed: {
    graphEmbedValue(): string {
      const graphEmbedValue =
        '<iframe width="560" height="315" src="' +
        this.permalink(true, true) +
        '" frameborder="0"></iframe>'
      return graphEmbedValue
    }
  },
  watch: {
    displayShare(isShow: boolean) {
      if (isShow) {
        document.documentElement.addEventListener('click', this.toggleShareMenu)
      } else {
        document.documentElement.removeEventListener(
          'click',
          this.toggleShareMenu
        )
      }
    }
  },
  methods: {
    toggleShareMenu(e: Event) {
      e.stopPropagation()
      this.displayShare = !this.displayShare
    },
    closeShareMenu() {
      this.displayShare = false
    },
    isCopyAvailable() {
      return !!navigator.clipboard
    },
    copyLink() {
      const self = this
      navigator.clipboard.writeText(this.permalink(true, false)).then(() => {
        self.closeShareMenu()
        self.overlayContent = this.$t('シェアリンクをコピーしました') as string
        self.showOverlay = true
        setTimeout(() => {
          self.showOverlay = false
        }, 2000)
      })
    },
    copyEmbedCode() {
      const self = this
      navigator.clipboard.writeText(this.graphEmbedValue).then(() => {
        self.closeShareMenu()
        self.overlayContent = this.$t(
          '埋め込み用コードをコピーしました'
        ) as string
        self.showOverlay = true
        setTimeout(() => {
          self.showOverlay = false
        }, 2000)
      })
    },
    stopClosingShareMenu(e: Event) {
      e.stopPropagation()
    },
    permalink(host: boolean = false, embed: boolean = false) {
      const timestamp = new Date().getTime()
      let permalink = '/cards/' + this.titleId
      if (embed) {
        permalink = permalink + '?embed=true'
      } else {
        permalink = permalink + '?t=' + timestamp
      }
      permalink = this.localePath(permalink)
      if (host) {
        permalink = location.protocol + '//' + location.host + permalink
      }
      return permalink
    },
    twitter() {
      const url =
        'https://twitter.com/intent/tweet?text=' +
        this.title +
        ' / ' +
        this.$t('北海道') +
        ' ' +
        this.$t('新型コロナウイルス{mobileBreak}まとめサイト', {
          mobileBreak: ''
        }) +
        '&url=' +
        this.permalink(true) +
        '&' +
        'hashtags=JUST道IT,StopCovid19JP,COVID19Japan'
      window.open(url)
    },
    facebook() {
      const url =
        'https://www.facebook.com/sharer.php?u=' + this.permalink(true)
      window.open(url)
    },
    line() {
      const url =
        'https://social-plugins.line.me/lineit/share?url=' +
        this.permalink(true)
      window.open(url)
    }
  }
})
</script>

<style lang="scss">
.DataView {
  @include card-container();

  height: 100%;
  &-Header {
    display: flex;
    align-items: flex-start;
    flex-flow: column;
    padding: 0 10px;
    @include largerThan($medium) {
      padding: 0 5px;
    }
    @include largerThan($large) {
      width: 100%;
      flex-flow: row;
      flex-wrap: wrap;
      padding: 0;
    }
  }
  &-DataInfo {
    &-summary {
      color: $gray-2;
      font-family: Hiragino Sans, sans-serif;
      font-style: normal;
      font-size: 30px;
      line-height: 30px;
      white-space: nowrap;
      &-unit {
        font-size: 0.6em;
        width: 100%;
      }
    }
    &-date {
      font-size: 12px;
      line-height: 12px;
      color: $gray-3;
      width: 100%;
      display: inline-block;
    }
  }
  &-Inner {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 22px;
    height: 100%;
  }
  &-Title {
    width: 100%;
    margin-bottom: 10px;
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: normal;
    color: $gray-2;
    @include largerThan($large) {
      width: 50%;
      margin-bottom: 0;
    }
  }
  &-CardText {
    margin: 16px 0;
  }
  &-CardTextForXS {
    margin-bottom: 46px;
    margin-top: 70px;
  }
  &-Embed {
    background-color: $gray-5;
  }
  &-Footer {
    @include font-size(12);

    padding: 0 !important;
    display: flex;
    justify-content: space-between;
    color: $gray-3 !important;
    text-align: right;
    text-decoration: none;
    background-color: $white !important;
    .Permalink {
      color: $gray-3 !important;
    }
    .OpenDataLink {
      text-decoration: none;
      .ExternalLinkIcon {
        vertical-align: text-bottom;
      }
    }
    .Footer-Left {
      text-align: left;
    }
    .Footer-Right {
      position: relative;
      display: flex;
      align-items: flex-end;
      .DataView-Share-Opener {
        cursor: pointer;
        margin-right: 6px;
        > svg {
          width: auto !important;
        }
      }
      .DataView-Share-Buttons {
        position: absolute;
        padding: 8px;
        right: -4px;
        bottom: 1.5em;
        width: 240px;
        border: solid 1px $gray-4;
        background: $white !important;
        border-radius: 8px;
        text-align: left;
        font-size: 1rem;
        z-index: 1;
        > * {
          padding: 4px 0;
        }
        > .Close-Button {
          display: flex;
          justify-content: flex-end;
          color: $gray-3;
        }
        > .EmbedCode {
          position: relative;
          padding: 4px;
          padding-right: 30px;
          color: rgb(3, 3, 3);
          border: solid 1px #eee;
          border-radius: 8px;
          font-size: 12px;
          .EmbedCode-Copy {
            position: absolute;
            top: 0.3em;
            right: 0.3em;
            color: $gray-3;
          }
        }
        > .Buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
          .icon-resize {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            font-size: 30px;
            margin-left: 4px;
            margin-right: 4px;
            &.twitter {
              color: #fff;
              background: #2a96eb;
            }
            &.facebook {
              color: #364e8a;
            }
            &.line {
              color: #1cb127;
            }
            &.b-link {
              color: #000;
            }
          }
        }
      }
    }
  }
  .overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    opacity: 0.8;
    > .overlay-text {
      text-align: center;
      padding: 2em;
      width: 60%;
      background: $gray-2;
      border-radius: 8px;
      color: $white !important;
    }
  }
}
textarea {
  font: 400 11px system-ui;
  width: 100%;
  height: 2.4rem;
}
</style>
