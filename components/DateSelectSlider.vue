<template>
  <v-range-slider v-model="sliderValue" :max="sliderMax" :min="0">
    <template v-slot:thumb-label="props">
      {{ getSliderLabels(props.value) }}
    </template>
  </v-range-slider>
</template>

<script>
export default {
  name: 'DateSelectSlider',
  props: {
    chartData: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    sliderMax: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data() {
    return {
      sliderValue: this.value
    }
  },
  watch: {
    sliderMax() {
      this.sliderValue = [0, this.sliderMax]
    },
    sliderValue() {
      this.$emit('sliderInput', this.sliderValue)
    }
  },
  methods: {
    getSliderLabels(id) {
      if (!this.chartData || this.chartData.length === 0) {
        return 1
      }
      return this.$moment(this.chartData[id].label).format('M/D')
    }
  }
}
</script>
