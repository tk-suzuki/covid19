<template>
  <div>
    <PictureLoader filename="ogp" :alt="$t('北海道アイキャッチ画像')" />
    <br />
    <br />
    <h1 class="sitename">
      {{ $t('北海道 新型コロナウイルス感染症まとめサイト') }}
    </h1>
    <br />
    <span>
      {{
        $t(
          '道内の新型コロナウイルス感染症（COVID-19）に関する最新情報を提供するサイトです。'
        )
      }}<br />
      {{
        $t(
          '北海道による公式情報と客観的な数値をわかりやすく伝えることで、北海道にお住まいの方や北海道内に拠点を持つ企業の方、北海道を訪れる方が現状を把握して適切な対策を取れるようにすることを目的としています。'
        )
      }}<br />
      {{
        $t(
          '開発・運営は、エンジニアやデザイナーなどによって結成された「JUST 道 IT」が行っています。'
        )
      }}<br />
      <v-icon class="icon" size="18">mdi-twitter</v-icon> :
      https://twitter.com/Just_douit<br />
      <v-icon class="icon" size="18">mdi-facebook</v-icon> :
      https://www.facebook.com/Justdouit19<br />
    </span>
    <br />
    <ul class="SponsorLinkContainer supplementHeaders">
      <li class="supplementHeader">
        {{ $t('Data by:') }}<br />
        <span class="no-image-title">{{ $t('北海道・札幌市') }}</span>
        <br />
        <i18n path="Under" tag="p" for="CC BY 4.0">
          <template #ccByImageTitle>
            <span class="image-title">{{ $t('CC BY 4.0') }}</span>
          </template>
          <template #ccByImage>
            <PictureLoader
              classname="cc-by-logo"
              src="cc-by-mini"
              width="85.3px"
              height="16px"
              :alt="$t('CC BY 4.0')"
            />
          </template>
        </i18n>
      </li>
      <li class="supplementHeader2">
        {{ $t('Operations by:') }}<br />
        <span class="image-title">{{ $t('JUST道IT') }}</span>
        <PictureLoader
          filename="justdouit"
          classname="justdoit-logo"
          width="132px"
          height="46.6px"
          :alt="$t('JUST道IT')"
        />
      </li>
      <li class="supplementHeader3">
        {{ $t('Powered by:') }}<br />
        <span class="image-title">{{ $t('さくらインターネット') }}</span>
        <PictureLoader
          classname="sakura-internet-logo"
          filename="sakura"
          width="176px"
          height="62px"
          :alt="$t('さくらインターネット')"
        />
      </li>
    </ul>
  </div>
</template>

<script>
const PictureLoader = () => import('@/components/PictureLoader')
export default {
  components: { PictureLoader },
  layout: 'print',
  head() {
    return {
      title: this.$t('新型コロナウイルス{mobileBreak}まとめサイト', {
        mobileBreak: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  -webkit-print-color-adjust: exact;
}
.icon {
  margin-top: -3px;
}
.sitename {
  text-align: center;
}
.supplementHeaders {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  list-style-type: none;
  width: 100%;
}
.supplementHeader {
  width: 33%;
  text-align: left;
}
.supplementHeader2 {
  width: 33%;
  text-align: left;
}
.supplementHeader3 {
  width: 33%;
  text-align: left;
}
.SponsorLinkContainer {
  overflow: visible;
  padding-top: 0.8rem;
  white-space: normal;
  font-size: 0.82rem;
  color: $gray-1;
  & a {
    color: #333;
    text-decoration: none;
  }
  & a:hover {
    opacity: 0.6;
  }
  & img {
    padding-bottom: 0.9rem;
  }
  & img.justdouit-logo {
    margin: 0 0 0 -3px;
    width: 132px;
  }
  & img.sakura-internet-logo {
    margin: -6px 0 0 -14px;
    width: 176px;
  }
  & .image-title {
    display: inline-block;
    width: 0;
    height: 1.5rem;
    overflow: hidden;
  }
  & .no-image-title {
    display: inline-block;
    line-height: 1.8rem;
    color: #444;
    font-size: 1.5rem;
    font-weight: 400;
  }
  & .cc-by-logo {
    width: auto;
    height: 1.8rem;
    vertical-align: text-top;
  }
  & a.license {
    display: inline-block;
    margin: -0.7rem 0 0.2rem 0;
  }
}
</style>
