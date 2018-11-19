<template>
  <div id="location" class="card">
    Showing information for grid {{this.maidenhead}} <br />
    {{this.latitude}}, {{this.longitude}}
  </div>
</template>

<script>
export default {
  name: 'Location',
  props: ['pos'],
  computed: {
    latitude() {
      if (this.pos.latitude >= 0) {
        return `${this.pos.latitude} N`;
      }

      return `${this.pos.latitude * -1} S`;
    },
    longitude() {
      if (this.pos.longitude >= 0) {
        return `${this.pos.longitude} E`;
      }

      return `${this.pos.longitude * -1} W`;
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
  },
};
</script>

<style scoped lang="scss">
#location {
}
</style>
