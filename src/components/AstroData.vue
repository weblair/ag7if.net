<template>
  <div id="astrodata" class="card">
    <h3 v-if="astroData">Sun and Moon Data</h3>
    <div v-else>Loading sun and moon data&hellip;</div>
    <table v-if="astroData">
      <tr>
        <td></td>
        <th class="title">Sun</th>
        <th class="title">Moon</th>
      </tr>
      <tr>
        <th>Phase</th>
        <td></td>
        <td>{{ this.astroData.moondata.phase }}</td>
      </tr>
      <tr>
        <th>Begin of Civil Twilight</th>
        <td>{{ this.astroData.sundata.twilightStart }}</td>
        <td></td>
      </tr>
      <tr>
        <th>Rise</th>
        <td>{{ this.astroData.sundata.rise }}</td>
        <td>{{ this.astroData.moondata.rise }}</td>
      </tr>
      <tr>
        <th>Transit</th>
        <td>{{ this.astroData.sundata.transit }}</td>
        <td>{{ this.astroData.moondata.transit }}</td>
      </tr>
      <tr>
        <th>Set</th>
        <td>{{ this.astroData.sundata.set }}</td>
        <td>{{ this.astroData.moondata.set }}</td>
      </tr>
      <tr>
        <th>End of Civil Twilight</th>
        <td>{{ this.astroData.sundata.twilightEnd }}</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AstroData',
  props: ['pos'],
  data() {
    return {
      astroData: null,
    };
  },
  methods: {
    parseTime(date, time) {
      const dateStr = `${date}T${time}Z`;
      const t = new Date(dateStr);
      const hr = t.getHours().toString().padStart(2, '0');
      const min = t.getMinutes().toString().padStart(2, '0');
      return `${hr}:${min}`;
    },
    parseData(data) {
      const date = `${data.year}-${data.month}-${data.day}`;
      const sundata = {
        twilightStart: null,
        rise: null,
        transit: null,
        set: null,
        twilightEnd: null,
      };
      data.sundata.forEach((d) => {
        switch (d.phen) {
          case 'BC':
            sundata.twilightStart = this.parseTime(date, d.time);
            break;
          case 'R':
            sundata.rise = this.parseTime(date, d.time);
            break;
          case 'U':
            sundata.transit = this.parseTime(date, d.time);
            break;
          case 'S':
            sundata.set = this.parseTime(date, d.time);
            break;
          case 'EC':
            sundata.twilightEnd = this.parseTime(date, d.time);
            break;
          default:
            break;
        }
      });

      const moondata = {
        rise: null,
        transit: null,
        set: null,
        phase: data.curphase,
      };
      data.moondata.forEach((d) => {
        switch (d.phen) {
          case 'R':
            moondata.rise = this.parseTime(date, d.time);
            break;
          case 'U':
            moondata.transit = this.parseTime(date, d.time);
            break;
          case 'S':
            moondata.set = this.parseTime(date, d.time);
            break;
          default:
            break;
        }
      });

      this.astroData = {
        sundata,
        moondata,
      };
    },
  },
  created() {
    const url = 'http://api.usno.navy.mil/rstt/oneday';
    const params = {
      date: 'today',
      coords: `${this.pos.latitude},${this.pos.longitude}`,
    };

    axios.get(url, { params })
      .then((response) => {
        this.parseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped lang="scss">
#astrodata {
}
table {
  width: 60%;
}
th {
  text-align: left;
}
th.title {
  text-align: right;
}
td {
  text-align: right;
}
</style>
