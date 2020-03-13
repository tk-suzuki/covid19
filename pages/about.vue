<template>
  <div class="About">
    <h2 class="About-Heading">
      当サイトについて
    </h2>
    <TextCard>
      当サイトは、道内の新型コロナウイルス感染症（COVID-19）に関する最新情報を提供するために作成されました。開発は、ICTエンジニアやデザイナーなどによって結成された「JUST道IT」が行っています。<br />
      <br />
      複製・改変が許されたオープンソースライセンスで公開されている、<a target="_blank" rel="noopener" href="https://stopcovid19.metro.tokyo.lg.jp/">東京都公式新型コロナウイルス対策サイト</a>の<a target="_blank" href="https://github.com/tokyo-metropolitan-gov/covid19" rel="noopener">仕組み</a>を利用しています。<br />
      <br />
      北海道による公式情報と客観的な数値をわかりやすく伝えることで、北海道にお住まいの方や、北海道内に拠点を持つ企業の方、北海道を訪れる方が、現状を把握して適切な対策を取れるようにすることを目的としています。
      <br />
      <br />
      紹介などに<a target="_blank" rel="noopener" href="https://stopcovid19.hokkaido.dev/print/info">こちら</a>のページをぜひご利用ください。
      <br />
      複製・配布は自由です。ご自由にコピーまたはプリントアウトしてご利用ください。

    </TextCard>
    <TextCard title="ブラウザ環境について">
      当サイトは以下の環境でご覧いただくことを推奨いたします。<br />
      <br />
      Microsoft Edge 最新版<br />
      Mozilla Firefox 最新版<br />
      Google Chrome 最新版 (Windows10以上)<br />
      Apple Safari (OS X) 最新版<br />
      Opera Software ASA Opera 最新版<br />
      <br />
      ※
      推奨環境以外で利用された場合や、推奨環境下でもご利用のブラウザの設定等によっては、正しく表示されない場合がありますのでご了承ください。
    </TextCard>
    <a id="data" name="data" />
    <TextCard title="データについて">
      当サイトのデータは、北海道および札幌市のオープンデータをAPIで取得することで情報を更新しています。<br />
      当取り組みに北海道および札幌市が協力し、オープンデータ化にご尽力してくださっていることから、現在、「HTMLのスクレイピング」から「オープンデータサイトからの取得」にデータソースの切り替えを進めております。<br />
      現在利用しているデータは以下の通りです。<br />
      <ul>
        <li>
          <a href="https://www.harp.lg.jp/opendata/dataset/1369.html" target="_blank" rel="noopener">
            新型コロナウイルス感染症に関するデータ
          </a>
          <ul>
            <li>陽性患者の属性 (patients)</li>
            <li>陽性患者数（日別） (patients_summary)</li>
            <li>日別患者増減数 (current_patients)</li>
            <li>治療修了者数 (discharges_summary)</li>
            <li>日別検査数 (inspections)</li>
          </ul>
        </li>
        <li>
          <a href="https://ckan.pf-sapporo.jp/dataset/covid_19_soudan" target="_blank" rel="noopener">
            札幌市窓口における新型コロナウイルス（COVID-19）に関する電話相談件数
          </a>
          <ul>
            <li>日別窓口相談件数（札幌市保健所） (contacts)</li>
            <li>日別電話相談件数 （札幌市保健所） (querents)</li>
          </ul>
        </li>
      </ul>
      行政の皆さまのご協力に感謝します。<br />
      <br />
      <a href="https://creativecommons.org/licenses/by/4.0/deed.ja" target="_blank" rel="noopener">
      <img src="/cc-by.svg" alt="CC BY 4.0" /><br />
      All data on this site under the CC Attribution license.<br />
      このサイトのすべてのデータは「クリエイティブ・コモンズ 表示 4.0 国際」にて提供されています。</a>
    </TextCard>
    <TextCard title="当サイトへのリンクについて">
      当サイトへのリンクは自由です。
    </TextCard>
    <TextCard title="JavaScriptについて">
      当サイトではJavaScriptを使用しております。<br />
      JavaScriptを無効にして使用された場合、各ページが正常に動作しない、または、表示されない場合がございます。<br />
      当サイトをご利用の際には、JavaScriptを有効にして頂きますようお願いいたします。
    </TextCard>
    <TextCard title="クッキー (Cookie) について">
      当サイトの一部ではクッキーを使用しています。<br />
      クッキーとは、Webコンテンツからの要求で利用者の手元の端末に一時的に保存されるデータのことで、当サイトでは利用状況の把握のためにクッキーを使用する場合があります。<br />
      <br />
      ブラウザに関する情報の収集を希望しない場合は、インターネット閲覧ソフト（ブラウザ）をご自身で設定することにより、クッキーの機能が働かないようにすることも可能です。<br />
      <br />
      ただし、クッキーを受け入れない設定をされている場合は、当サイトの機能が正常に動作しない場合がございます。
    </TextCard>
    <TextCard title="Google Analyticsの利用について">
      当サイトでは、サービス向上やWebサイトの改善のためにGoogle Inc.の提供するアクセス分析のツールであるGoogle Analyticsを利用した計測を行っております。<br />
      Google Analyticsは、当サイトが発行するクッキー(Cookie)を利用して、個人を特定する情報を含まずにWebサイトの利用データ（アクセス状況、トラフィック、閲覧環境など）を収集しております。クッキー(Cookie)の利用に関してはGoogleのプライバシーポリシーと規約に基づいております。<br />
      取得したデータはWebサイト利用状況の分析、サイト運営者へのレポートの作成、その他のサービスの提供に関わる目的に限り、これを使用します。<br />
      <br />
      Google Analyticsの利用規約及びプライバシーポリシーに関する説明については、Google Analyticsのサイトをご覧ください。<br />
      <ul>
        <li>
          <a href="https://marketingplatform.google.com/about/analytics/terms/jp" target="_blank" rel="noopener">
            Google Analytics利用規約
          </a>
        </li>
        <li>
          <a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noopener">
            Googleのプライバシーポリシー
          </a>
        </li>
        <li>
          <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener">
            Google Analyticsに関する詳細情報
          </a>
        </li>
      </ul>
    </TextCard>
    <TextCard title="免責事項">
      当サイトに掲載されている情報については、北海道または札幌市によって公開されたデータですが、北海道および札幌市、当サイトの開発者・関係者は、利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。<br />
      <br />
      また、利用者が当サイトを利用したことにより発生した利用者の損害及び利用者が第三者に与えた損害に対して、責任を負うものではありません。<br />
      <br />
      当サイトに掲載されている情報は、予告なしに変更又は削除することがあります。
    </TextCard>
    <TextCard title="JUST道ITへ参加したい">
      JUST道ITでの取り組みに共感し、開発・運営に参加を希望される方は、<a target="_blank" href="https://www.codeforsapporo.org/slack/" rel="noopener">Code for Sapporo Slack ワークグループ</a>よりご参加ください。
    </TextCard>
    <!-- カタログサイトリンクおよびお問い合わせ先は現時点では表示しない
    <TextCard title="データについて">
      当サイトで公表しているデータは、北海道オープンデータカタログサイト(準備中)より誰でも自由にダウンロードが可能です。
    </TextCard>
    -->
    <TextCard title="お問い合わせ先">
      当サイトについてのお問い合わせは<br />
      <a target="_blank" href="https://www.facebook.com/Justdouit19/" rel="noopener">JUST道IT Facebookページ</a>までお願いします。
    </TextCard>

    <TextCard title="">
      <img src="/ogp.png"/>
      Illustration by <a href="https://twitter.com/LITTLEKIT">LITTLEKIT</a> under <a href="https://creativecommons.org/licenses/by/4.0/deed.ja">CC BY 4.0</a>
    </TextCard>
  </div>
</template>

<script lang="ts">
import TextCard from '@/components/TextCard.vue'

export default {
  components: {
    TextCard
  },
  head() {
    return {
      title: '当サイトについて'
    }
  }
}
</script>

<style lang="scss" scoped>
.About {
  &-Heading {
    @include font-size(30);
    font-weight: normal;
    color: $gray-2;
    margin-bottom: 12px;
  }
}

a {
  @include text-link();
}
</style>
