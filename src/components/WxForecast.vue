<template>
  <div id="wxforecast" class="card">
    <h3 v-if="showTAFS">Local TAFs</h3>
    <h3 v-else>
      Forecast for Zone {{ this.zone.id }}
      ({{ this.zone.name }}, {{ this.zone.state }})
    </h3>
    <div v-if="showTAFS" class="btn-group" role="group">
      <button @click="setAF" type="button" class="btn btn-light">Zone</button>
      <button type="button" class="btn btn-dark">TAF</button>
    </div>
    <div v-else class="btn-group" role="group">
      <button type="button" class="btn btn-dark">Zone</button>
      <button @click="setTAF" type="button" class="btn btn-light">TAF</button>
    </div>
    <div v-if="showTAFS && tafs" id="tafList">
      <TAF
        v-for="taf in tafs"
        :key="taf.stationID"
        :taf="taf"
      />
    </div>
    <div v-else-if="!showTAFS && forecastPeriods">
      <ForecastPeriod
        v-for="period in forecastPeriods"
        :key="period.number"
        :period="period"
      />
    </div>
    <div v-else>Loading forecast&hellip;</div>
  </div>
</template>

<script>
import axios from 'axios';
import xml2js from 'xml2js';

import ForecastPeriod from '@/components/ForecastPeriod.vue';
import TAF from '@/components/TAF.vue';

export default {
  name: 'WxForecast',
  props: ['pos'],
  data() {
    return {
      forecastPeriods: null,
      tafs: [],
      showTAFS: false,
      zone: {},
    };
  },
  methods: {
    parseAF(data) {
      data.periods.map(p => p.detailedForecast.replace('\n', ' ').trim());
      this.zone = data.zone;
      this.forecastPeriods = data.periods;
    },
    parseTAF(data) {
      xml2js.parseString(data, (err, result) => {
        if (+result.response.data[0].$.num_results !== 0) {
          result.response.data[0].TAF.forEach((rawTAF) => {
            const taf = {
              stationID: rawTAF.station_id[0],
              rawText: rawTAF.raw_text[0],
            };
            this.tafs.push(taf);
          });
        } else {
          this.tafs.push({
            stationID: '$',
            rawText: 'No local TAFs found',
          });
        }
      });
    },
    setAF() {
      this.showTAFS = false;
    },
    setTAF() {
      this.showTAFS = true;
    },
  },
  created() {
    let url = 'https://www.ag7if.net/api/forecast';
    let params = {
      lat: this.pos.latitude,
      long: this.pos.longitude,
    };

    axios.get(url, { params })
      .then((response) => {
        this.parseAF(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    url = 'https://www.ag7if.net/api/adds/taf';
    params = {
      dist: '20',
      lat: this.pos.latitude,
      long: this.pos.longitude,
      hoursBeforeNow: '24',
    };

    axios.get(url, { params })
      .then((response) => {
        this.parseTAF(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: {
    ForecastPeriod,
    TAF,
  },
};
</script>

<style scoped lang="scss">
#wxforecast {
}

#tafList{
  text-align: left;
  padding: 1em;
}
</style>
