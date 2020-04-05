<!--https://simonwhitaker.github.io/github-fork-ribbon-css/-->

<template>
  <div class="github-ribbon">
    <span>
      {{ environmentName }}
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    environmentName() {
      if (process.client && location) {
        if (location.hostname.includes('deploy-preview')) {
          return 'preview'
        }
      }
      return process.env.NODE_ENV
    }
  }
}
</script>

<style scoped>
.github-ribbon {
  position: fixed;
  right: 0;
  top: 0;
  width: 150px;
  height: 150px;
  overflow: hidden;
  z-index: 9999999;
}
.github-ribbon span {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  padding: 3px 0;
  text-align: center;
  transform: rotate(45deg);
  text-decoration: none;
  color: rgb(255, 255, 255);
  position: inherit;
  top: 20px;
  right: -75px;
  border-width: 1px 0;
  border-style: dotted;
  border-color: rgba(255, 255, 255, 0.7);
  font: 700 10px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  box-shadow: rgba(0, 0, 0, 0.5) 0 2px 3px 0;
  background-color: rgb(170, 0, 0);
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
}
</style>
