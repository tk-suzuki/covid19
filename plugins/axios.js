export default function({ $axios, redirect }) {
  $axios.onResponse(config => {
    $axios.setHeader('Access-Control-Allow-Origin', 'https://codeforsapporo.github.io/covid19hokkaido_scraping/')
  })
}
