<template>
  <div class='home'>
    <div class='row'>
      <div class='col-sm-1'></div>
      <Location v-if='pos' :pos='location' class='col-sm-10' />
    </div>
    <div class='row'>
      <div class='col-sm-1'></div>
      <CurrentWx v-if='pos' :pos='location' class='col-sm-4' />
    </div>
  </div>
</template>

<script>
import Location from '@/components/Location.vue';
import CurrentWx from '@/components/CurrentWx.vue';

export default {
  name: 'Home',
  components: {
    Location,
    CurrentWx,
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
