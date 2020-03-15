<template>
  <div class="header mb-3">
    <h2 class="pageTitle">
      <v-icon size="40" class="mr-2">
        {{ icon }}
      </v-icon>
      {{ title }}
    </h2>
    <div class="date">
      <i18n path="最終更新 {updatedDate}" tag="span">
        <template #updatedDate>
          <time>{{ date }}</time>
        </template>
      </i18n>
    </div>
  </div>
</template>

<i18n src="./PageHeader.i18n.json"></i18n>

<script>
export default {
  props: ['title', 'icon', 'date']
}
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
}
.pageTitle {
  display: flex;
  align-items: center;
  font-size: 1.875rem;
  line-height: 1;
  font-weight: normal;
  margin: 0 0.5em 0 0;
  @include lessThan($small) {
    font-size: 1.25rem;
  }
}
.date {
  font-size: 0.875rem;
  color: $gray-3;
}
</style>
