<template>
  <v-btn-toggle
    :value="value"
    @change="$emit('input', $event)"
    class="DateSelector"
    mandatory
  >
    <v-btn class="DateSelector-Button" v-ripple="false" value="all">
      {{ $t('全期間') }}
    </v-btn>
    <v-btn class="DateSelector-Button" v-ripple="false" value="2weeks">
      {{ $t('２週間') }}
    </v-btn>
  </v-btn-toggle>
</template>

<style lang="scss">
.DateSelector {
  margin-top: 3px;
  border: 1px solid $gray-4;
  background-color: $white;
  &-Button {
    border: none !important;
    margin: 2px;
    border-radius: 4px !important;
    height: 24px !important;
    font-size: 12px !important;
    color: $gray-1 !important;
    background-color: $white !important;
    &::before {
      background-color: inherit;
    }
  }

  & .v-btn--active {
    background-color: $gray-2 !important;
    color: $white !important;
  }
}
</style>

<script>
export default {
  name: 'DateSelector',
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
