import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('datetimeFormatter', function(value) {
  const date = dayjs(value)
  return date.format('YYYY/MM/DD(ddd) HH:MM')
})
