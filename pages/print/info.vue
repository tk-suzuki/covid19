<template>
  <div>
    <img src="/ogp.png" alt="北海道アイキャッチ画像" />
    <br />
    <br />
    <h1 class="sitename">北海道 新型コロナウイルス感染症まとめサイト</h1>
    <br />
    <span>
      道内の新型コロナウイルス感染症（COVID-19）に関する最新情報を提供するサイトです。<br />
      北海道による公式情報と客観的な数値をわかりやすく伝えることで、北海道にお住まいの方や北海道内に拠点を持つ企業の方、北海道を訪れる方が現状を把握して適切な対策を取れるようにすることを目的としています。<br />
      開発・運営は、エンジニアやデザイナーなどによって結成された「JUST 道 IT」が行っています。<br />
      <v-icon class="icon" size="18">mdi-twitter</v-icon> : https://twitter.com/Just_douit<br />
      <v-icon class="icon" size="18">mdi-facebook</v-icon> : https://www.facebook.com/Justdouit19<br />

    </span>
    <br />
    <ul class="SponsorLinkContainer supplementHeaders">
      <li class="supplementHeader">
        Data by:<br />
          <span class="no-image-title">北海道・札幌市</span>
        <br />
        Under
        <span class="image-title">CC BY 4.0</span>
        <img
          class="cc-by-logo"
          src="/cc-by-mini.svg"
          width="85.3px"
          height="16px"
          alt="CC BY 4.0"
        />
      </li>
      <li class="supplementHeader2">
        Operations by:<br />
        <span class="image-title">JUST道IT</span>
        <img
          class="justdoit-logo"
          src="/justdouit.png"
          width="132px"
          height="46.6px"
          alt="JUST道IT"
        />
      </li>
      <li class="supplementHeader3">
        Powered by:<br />
        <span class="image-title">さくらインターネット</span>
        <img
          class="sakura-internet-logo"
          src="/sakura.svg"
          width="176px"
          height="62px"
          alt="さくらインターネット"
        />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    layout: 'print',
    head() {
      return {
        title: '新型コロナウイルス感染症まとめサイト'
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
    padding-top: .8rem;
    white-space: normal;
    font-size: 0.82rem;
    color: $gray-1;
    & a {
      color: #333;
      text-decoration: none;
    }
    & a:hover {
      opacity: .6;
    }
    & img {
      padding-bottom: .9rem;
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
      margin: -.7rem 0 .2rem 0;
    }
  }
</style>
