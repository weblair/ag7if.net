<template>
  <div id='astrodata' class='card'>
    <h3 v-if='astroData'>Sun and Moon Data</h3>
    <div v-else>Loading sun and moon data&hellip;</div>
  </div>
</template>

<script>
export default {
  name: 'AstroData',
  props: ['pos'],
  data() {
    return {
      astroData: null,
    };
  },
};
</script>

<style scoped lang="scss">
#astrodata {
}
</style>
