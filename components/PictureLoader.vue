<template>
  <picture>
    <source
      :srcset="'/' + filename + '.webp'"
      :width="width"
      :height="height"
      :alt="alt"
      :class="classname"
      decoding="async"
      loading="lazy"
      type="image/webp"
    />
    <img
      :src="'/' + filename + '.png'"
      :width="width"
      :height="height"
      :class="classname"
      :alt="alt"
      loading="lazy"
      decoding="async"
    />
  </picture>
</template>

<script>
export default {
  name: 'PictureLoader',
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
