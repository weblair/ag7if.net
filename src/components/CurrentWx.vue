<template>
  <div id="currentWX" class="card">
    <h3 v-if="metars">Current Weather</h3>
    <div v-else>
      Fetching METARS&hellip;
    </div>
    <div id="wxControls">
      <div v-if="decoded" class="btn-group" role="group">
        <button @click="setRaw" type="button" class="btn btn-light">Raw</button>
        <button type="button" class="btn btn-dark">Decoded</button>
      </div>
      <div v-else class="btn-group" role="group">
        <button type="button" class="btn btn-dark">Raw</button>
        <button @click="setDecoded" type="button" class="btn btn-light">Decoded</button>
      </div>
      <div v-if="decoded && units.useF" class="btn-group" role="group">
        <button @click="setC" type="button" class="btn btn-light">&deg;C</button>
        <button type="button" class="btn btn-dark">&deg;F</button>
      </div>
      <div v-else-if="decoded && !units.useF" class="btn-group" role="group">
        <button type="button" class="btn btn-dark">&deg;C</button>
        <button @click="setF" type="button" class="btn btn-light">&deg;F</button>
      </div>
      <div v-if="decoded && units.useMPH" class="btn-group" role="group">
        <button @click="setKT" type="button" class="btn btn-light">kt</button>
        <button type="button" class="btn btn-dark">MPH</button>
      </div>
      <div v-else-if="decoded && !units.useMPH" class="btn-group" role="group">
        <button type="button" class="btn btn-dark">kt</button>
        <button @click="setMPH" type="button" class="btn btn-light">MPH</button>
      </div>
      <div v-if="decoded && units.useInHg" class="btn-group" role="group">
        <button type="button" class="btn btn-dark">InHg</button>
        <button @click="setMB" type="button" class="btn btn-light">mb</button>
      </div>
      <div v-else-if="decoded && !units.useInHg" class="btn-group" role="group">
        <button @click="setInHg" type="button" class="btn btn-light">InHg</button>
        <button type="button" class="btn btn-dark">mb</button>
      </div>
    </div>
    <table v-if="metars && decoded" id="metarTable">
      <tr>
        <th class="station" >Station</th>
        <th>Temp</th>
        <th>Dewpoint</th>
        <th>Wind Direction</th>
        <th>Wind Speed</th>
        <th>Pressure</th>
      </tr>
      <METAR
        v-for="metar in metars"
        :key="metar.stationID"
        :metar="metar"
        :decoded="decoded"
        :units="units"
      />
    </table>
    <ul v-else-if="metars && !decoded" id="metarList">
      <METAR
        v-for="metar in metars"
        :key="metar.stationID"
        :metar="metar"
        :decoded="decoded"
        :units="units"
      />
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import xml2js from 'xml2js';

import METAR from '@/components/METAR.vue';

export default {
  name: 'CurrentWx',
  props: ['pos'],
  data() {
    return {
      decoded: false,
      metars: [],
      units: {
        useF: true,
        useMPH: true,
        useInHg: true,
      },
    };
  },
  methods: {
    parseMETARs(data) {
      xml2js.parseString(data, (err, result) => {
        result.response.data[0].METAR.forEach((rawMETAR) => {
          const metar = {
            stationID: rawMETAR.station_id[0],
            rawText: rawMETAR.raw_text[0],
            tempC: +rawMETAR.temp_c[0],
            dewpointC: +rawMETAR.dewpoint_c[0],
            windDirDegrees: +rawMETAR.wind_dir_degrees[0],
            windSpeedKT: +rawMETAR.wind_speed_kt[0],
            altimInHg: +rawMETAR.altim_in_hg[0],
            slpMB: +rawMETAR.sea_level_pressure_mb,
          };
          this.metars.push(metar);
        });
      });
    },
    setDecoded() {
      this.decoded = true;
    },
    setRaw() {
      this.decoded = false;
    },
    setC() {
      this.units.useF = false;
    },
    setF() {
      this.units.useF = true;
    },
    setKT() {
      this.units.useMPH = false;
    },
    setMPH() {
      this.units.useMPH = true;
    },
    setMB() {
      this.units.useInHg = false;
    },
    setInHg() {
      this.units.useInHg = true;
    },
  },
  components: {
    METAR,
  },
  created() {
    const url = 'https://www.ag7if.net/api/adds/metar';
    const params = {
      dist: '20',
      lat: this.pos.latitude,
      long: this.pos.longitude,
      hoursBeforeNow: '6',
    };

    axios.get(url, { params })
      .then((response) => {
        this.parseMETARs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped lang="scss">
#currentWX {
}
#metarList {
  text-align: left;
  padding: 1em;
}
#metarTable {
  padding: 1em;
}
th {
  padding: 10px;
}
td {
  text-align: right;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
#wxControls {
  display: flex;
  justify-content: space-between;
}
</style>
