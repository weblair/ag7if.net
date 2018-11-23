<template>
  <div id="forecastperiod">
    <dt>{{ this.period.name }}</dt>
    <dd>{{ this.period.detailedForecast }}</dd>
  </div>
</template>

<script>
export default {
  name: 'ForecastPeriod',
  props: ['period'],
};
</script>

<style scoped lang="scss">
#forecastperiod {
}
</style>
