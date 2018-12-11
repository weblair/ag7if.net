<template>
  <div id="app">
    <Navbar id="nav" />
    <router-view :pos="pos" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      pos: null,
    };
  },
  methods: {
    setLocation(position) {
      this.pos = position;
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(this.setLocation);
  },
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';

h3 {
  padding: 10px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
</style>
