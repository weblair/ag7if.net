<template>
  <div id="alert">
    <h5 class="card-title">
      {{ this.alert.issuer }} has issued a {{ this.alert.severity }}
      {{ this.alert.event }} until {{ this.until }}.
    </h5>
    <div id="alertText">
      <p>{{ this.alert.description }}</p>
      <p>{{ this.alert.instruction }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['alert'],
  computed: {
    until() {
      const date = new Date(this.alert.expires);

      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    },
  },
};
</script>

<style scoped lang="scss">
#alert {
}

#alertText {
  text-align:left;
}
</style>
