<template>
  <tr v-if="decoded" id="metar">
    <td class="station">{{ this.metar.stationID }}</td>
    <td v-if="units.useF">
      {{ this.toF(this.metar.tempC).toFixed(1) }}&deg;F
    </td>
    <td v-else>
      {{ this.metar.tempC.toFixed(1) }}&deg;C
    </td>
    <td v-if="units.useF">
      {{ this.toF(this.metar.dewpointC).toFixed(1) }}&deg;F
    </td>
    <td v-else>
      {{ this.metar.dewpointC.toFixed(1) }}&deg;C
    </td>
    <td>
      {{ this.metar.windDirDegrees }}&deg;
    </td>
    <td v-if="units.useMPH">
      {{ this.toMPH(this.metar.windSpeedKT).toFixed(0) }} MPH
    </td>
    <td v-else>
      {{ this.metar.windSpeedKT }}kt
    </td>
    <td v-if="units.useInHg">
      {{ this.metar.altimInHg.toFixed(2) }} inHg
    </td>
    <td v-else>
      {{ this.mb.toFixed(1) }} mb
    </td>
  </tr>
  <li v-else>
    {{ this.metar.rawText }}
  </li>
</template>

<script>
export default {
  name: 'METAR',
  props: ['metar', 'decoded', 'units'],
  computed: {
    mb() {
      if (this.metar.slpMB) {
        return this.metar.slpMB;
      }

      return this.metar.altimInHg * 33.864;
    },
  },
  methods: {
    toF(C) {
      return C * 9 / 5 + 32;
    },
    toMPH(kt) {
      return kt * 1.151;
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
