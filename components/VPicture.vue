<template>
  <picture>
    <source
      :srcset="'/' + filename + '.webp'"
      :width="width"
      :height="height"
      :alt="alt"
      :class="classname"
      type="image/webp"
    />
    <img
      :src="'/' + filename + '.png'"
      :width="width"
      :height="height"
      :class="classname"
      :alt="alt"
    />
  </picture>
</template>

<script>
export default {
  name: 'VPicture',
  props: {
    filename: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    classname: {
      type: String,
      default: ''
    }
  }
}
</script>
