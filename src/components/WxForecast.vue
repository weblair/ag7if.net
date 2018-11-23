<template>
  <div id="wxforecast" class="card">
    <h3>Local Forecast</h3>
    <div v-if="forecastPeriods">
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
import ForecastPeriod from '@/components/ForecastPeriod.vue';

export default {
  name: 'WxForecast',
  props: ['pos'],
  data() {
    return {
      forecastPeriods: null,
    };
  },
  methods: {
    parseForecast(data) {
      data.periods.map(p => p.detailedForecast.replace('\n', ' ').trim());
      this.forecastPeriods = data.periods;
    },
  },
  created() {
    const url = 'https://www.ag7if.net/api/forecast';
    const params = {
      lat: this.pos.latitude,
      long: this.pos.longitude,
    };

    axios.get(url, { params })
      .then((response) => {
        this.parseForecast(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: {
    ForecastPeriod,
  },
};
</script>

<style scoped lang="scss">
#wxforecast {
}
</style>
