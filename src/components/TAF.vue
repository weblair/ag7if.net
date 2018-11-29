<template>
  <li id="taf">
    {{ this.taf.rawText }}
  </li>
</template>

<script>
export default {
  name: 'TAF',
  props: ['taf'],
};
</script>

<style scoped lang="scss">
#taf {
}
</style>
