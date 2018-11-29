<template>
  <div id="location" class="card">
    Showing information for grid {{ this.maidenhead }} <br />
    {{ this.latitude }}, {{ this.longitude }} <br />
    Fetched on {{ this.fetchDate }} at {{ this.fetchTime }}
  </div>
</template>

<script>
export default {
  name: 'Location',
  props: ['pos'],
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    latitude() {
      let lat = null;
      let dir = null;
      if (this.pos.latitude < 0) {
        lat = this.pos.latitude * -1;
        dir = 'S';
      } else {
        lat = this.pos.latitude;
        dir = 'N';
      }

      const deg = Math.trunc(lat);
      const min = Math.trunc((lat - deg) * 60);
      const sec = (lat - deg - min / 60) * 3600;

      return `${deg}\u00B0${min}"${sec.toFixed(1)}'${dir}`;
    },
    longitude() {
      let long = null;
      let dir = null;
      if (this.pos.longitude < 0) {
        long = this.pos.longitude * -1;
        dir = 'W';
      } else {
        long = this.pos.longitude;
        dir = 'E';
      }

      const deg = Math.trunc(long);
      const min = Math.trunc((long - deg) * 60);
      const sec = (long - deg - min / 60) * 3600;

      return `${deg}\u00B0${min}"${sec.toFixed(1)}'${dir}`;
    },
    maidenhead() {
      // Longitude calculations
      const long = this.pos.longitude + 180;
      const longF = Math.floor(long / 20);
      const longField = String.fromCharCode(0x41 + longF);
      const longSquare = Math.floor((long - (longF * 20)) / 2);
      const longSSq = Math.floor((long - (longF * 20) - (longSquare * 2)) / 0.0833333);
      const longSubsquare = String.fromCharCode(0x61 + longSSq);

      // Latitude calculations
      const lat = this.pos.latitude + 90;
      const latF = Math.floor(lat / 10);
      const latField = String.fromCharCode(0x41 + latF);
      const latSquare = Math.floor(lat - (latF * 10));
      const latSSq = Math.floor((lat - Math.floor(lat)) / 0.0416667);
      const latSubsquare = String.fromCharCode(0x61 + latSSq);

      return longField
        + latField
        + longSquare
        + latSquare
        + longSubsquare
        + latSubsquare;
    },
    fetchDate() {
      const yr = this.date.getUTCFullYear();
      const mo = (this.date.getUTCMonth() + 1).toString().padStart(2, '0');
      const dy = this.date.getUTCDate().toString().padStart(2, '0');
      return `${yr}-${mo}-${dy}`;
    },
    fetchTime() {
      const hr = this.date.getUTCHours().toString().padStart(2, '0');
      const min = this.date.getUTCMinutes().toString().padStart(2, '0');
      return `${hr}${min}z`;
    },
  },
};
</script>

<style scoped lang="scss">
#location {
}
</style>
