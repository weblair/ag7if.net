<template>
  <div id="alerts">
    <div v-if="fetched && alerts.length !== 0">
      <div v-for="alert in alerts" :key="alert.id" class="row">
        <div class="col-sm-1"></div>
        <Alert
          :alert="alert"
          class="card col-sm-10"
        />
      </div>
    </div>
    <div v-else-if="fetched && alerts.length === 0">
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="card col-sm-10">
          <h5 class="card-title">
            No alerts have been issued for your area.
          </h5>
        </div>
      </div>
    </div>
    <div v-else>
      Loading alerts...
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Alert from '@/components/Alert.vue';

export default {
  name: 'Alerts',
  components: {
    Alert,
  },
  data() {
    return {
      pos: null,
      fetched: false,
      alerts: [],
    };
  },
  methods: {
    parseAlerts(rawAlerts) {
      this.fetched = true;
      rawAlerts.features.forEach((raw) => {
        const alert = {
          id: raw.properties.id,
          issuer: raw.properties.senderName,
          severity: raw.properties.severity,
          event: raw.properties.event,
          expires: raw.properties.expires,
          description: raw.properties.description.replace('\n', ' ').trim(),
          instruction: raw.properties.instruction.replace('\n', ' ').trim(),
        };
        this.alerts.push(alert);
      });
    },
    setLocation(position) {
      this.location = position;

      const url = 'https://www.ag7if.net/api/alerts';
      const params = {
        lat: this.location.latitude,
        long: this.location.longitude,
      };

      axios.get(url, { params })
        .then((response) => {
          this.parseAlerts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    location: {
      get() {
        return {
          latitude: this.pos.coords.latitude,
          longitude: this.pos.coords.longitude,
        };
      },
      set(pos) {
        this.pos = pos;
      },
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(this.setLocation);
  },
};
</script>

<style scoped lang="scss">
#alerts {
}
</style>
