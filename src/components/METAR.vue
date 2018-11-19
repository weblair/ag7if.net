<template>
  <tr v-if='decoded' id='metar'>
    <td class='station'>{{ this.metar.stationID }}</td>
    <td v-if='useF'>
      {{ this.toF(this.metar.tempC).toFixed(1) }}&deg;F
    </td>
    <td v-else>
      {{ this.metar.tempC.toFixed(1) }}&deg;C
    </td>
    <td v-if='useF'>
      {{ this.toF(this.metar.dewpointC).toFixed(1) }}&deg;F
    </td>
    <td v-else>
      {{ this.metar.dewpointC.toFixed(1) }}&deg;C
    </td>
    <td>
      {{ this.metar.windDirDegrees }}&deg;
    </td>
    <td>
      {{ this.metar.windSpeedKT }}kt
    </td>
    <td>
      {{ this.metar.altimInHg.toFixed(2) }} inHg
    </td>
  </tr>
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

#decodedData {
}
</style>
