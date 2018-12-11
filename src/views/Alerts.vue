<template>
  <div id="alerts">
    <div v-if="pos">
      <AlertList :pos="pos" />
    </div>
    <div v-else>
      Loading alerts...
    </div>
  </div>
</template>

<script>
import AlertList from '@/components/AlertList.vue';

export default {
  name: 'Alerts',
  components: {
    AlertList,
  },
  props: ['pos'],
  computed: {
    location() {
      return {
        latitude: this.pos.coords.latitude,
        longitude: this.pos.coords.longitude,
      };
    },
  },
};
</script>

<style scoped lang="scss">
#alerts {
}
</style>
