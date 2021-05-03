<template>
  <div>
    <div v-for="(item, index) in deviceList" :key="index">
      {{index}}.{{item.deviceName}}{{item.applicationName}}{{item.receivedAt}}
      <humidity :deviceName=item.deviceName :joinAt=item.receivedAt
      :applicationName="item.applicationName"
      v-if="showHumidity(item.applicationName)">
      </humidity>
    </div>
  </div>
</template>
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    /* color: #333; */
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    /* background-color: #D3DCE6; */
    /* color: #333; */
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    /* background-color: #E9EEF3; */
    /* color: #333; */
    text-align: center;
    /* line-height: 160px; */
  }
  .el-row {
    margin-bottom: 20px;
  }

</style>
<script>
// @ is an alias to /src
import humidity from '../components/humidity.vue';

export default {
  name: 'Home',
  data() {
    return {
      deviceName: 'crevotek2',
      deviceList: [],
    };
  },
  methods: {
    showHumidity(applicationName) {
      if (applicationName === 'humidity') return true;
      return false;
    },
    timeStampconver(timeStamp) {
      // const unix_timestamp = 1549312452;
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      const date = new Date(timeStamp * 1000);
      // Year part from the timestamp
      const year = date.getFullYear();
      // Month part from the timestamp
      const month = `0${date.getMonth() + 1}`;
      // Date part from the timestamp
      const day = `0${date.getDate()}`;
      // Hours part from the timestamp
      const hours = date.getHours();
      // Minutes part from the timestamp
      const minutes = `0${date.getMinutes()}`;
      // Seconds part from the timestamp
      const seconds = `0${date.getSeconds()}`;

      // Will display time in 10:30:23 format
      const formattedTime = `${year}-${month.substr(-2)}-${day.substr(-2)} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
      // console.log(formattedTime);
      return formattedTime;
    },
    getJoinData() {
      const vm = this;
      const api = 'http://192.168.43.82:8082?deviceName=fff&for=join';
      this.axios.get(api).then((response) => {
        // console.log(response.data.deviceList);
        const mytemp = [];
        response.data.deviceList.forEach((element) => {
          console.log(element);
          const myTempElement = element;
          myTempElement.receivedAt = vm.timeStampconver(element.receivedAt);
          mytemp.push(myTempElement);
        });
        console.log(mytemp);
        vm.deviceList = mytemp;
      });
    },
  },
  components: {
    humidity,
  },
  mounted() {
    // const client = this.$mqtt.connect('ws//192.168.43.82:8083');
    // console.log(client);
    this.getJoinData();
  },
};
</script>
