<template>
  <div class="home">
    <Location v-if="pos" :pos="location" />
  </div>
</template>

<script>
import Location from '@/components/Location.vue';

export default {
  name: 'Home',
  components: {
    Location,
  },
  data() {
    return {
      pos: null,
    };
  },
  methods: {
    setLocation(position) {
      this.location = position;
    },
  },
  computed: {
    location: {
      get() {
        return {
          latitude: this.pos.coords.latitude,
          longitude: this.pos.coords.longitude,
        };
      },
      set(pos) {
        this.pos = pos;
      },
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(this.setLocation);
  },
};
</script>
