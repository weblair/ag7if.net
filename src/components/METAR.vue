<template>
  <li v-if='decoded' id='metar'>
    Station: {{ this.metar.stationID }} <br />
    <div v-if='useF'>
      Temperature: {{ this.toF(this.metar.tempC).toFixed(1) }}&deg;F <br />
    </div>
    <div v-else>
      Temperature: {{ this.metar.tempC }}&deg;C <br />
    </div>
    <div v-if='useF'>
      Dewpoint: {{ this.toF(this.metar.dewpointC).toFixed(1) }}&deg;F <br />
    </div>
    <div v-else>
      Dewpoint: {{ this.metar.dewpointC }}&deg;C <br />
    </div>
    Wind: {{ this.metar.windDirDegrees }}&deg; {{ this.metar.windSpeedKT }}kt <br />
    Pressure: {{ this.metar.altimInHg.toFixed(2) }} inHg
  </li>
  <li v-else>
    {{ this.metar.rawText }}
  </li>
</template>

<script>
export default {
  name: 'METAR',
  props: ['metar', 'decoded', 'useF'],
  methods: {
    toF(C) {
      return C * 9 / 5 + 32;
    },
  },
};
</script>

<style scoped lang="scss">
#metar {
}
</style>
