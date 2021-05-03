<template>
  <div>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>應用名 : {{join.applicationName}}</span><br>
    <span>上線時間戳 : {{join.receivedAt}}</span><br>
    <span>應用ID :{{join.applicationId}} </span><br>
    <span>裝置名 :{{deviceName}}</span><br>
    <span>電池狀態 : {{batteryStatus}} {{batteryLevel}}%(change battery when it below 20%)</span><br>
    <span>連線狀態: {{linkStatus}} {{margin}} 超過0的數值訊號都是好的，如果數值超過10)，系統可能會於調低下次傳送功率以減少功耗</span><br>
  <div>
  </div>
  </div>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">
        <span>狀態:{{lastTemperature}}</span><br>
        </div>
      </el-col>
    </el-row>
  <el-divider></el-divider>
  <div>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </div>
  </el-card>
  </div>
</template>

<script>

export default {
  props: {
    deviceName: String,
  },
  data() {
    this.chartSettings = {
      xAxisType: 'time',
    };
    return {
      join: {
        applicationName: 'here should show applcation name',
        applicationId: 'application ID',
        received_at: 0,
      },
      lastTemperature: 23,
      lastHumidity: 90,
      margin: 0,
      batteryLevel: 90,
      batteryStatus: '正常',
      linkStatus: '正常',
      unit: '攝氏',
      level: 24,
      chartData: {
        columns: ['received_at', 'batteryLevel', 'temperatureLevel', 'humidityLevel'],
        rows: [{ received_at: 1, batteryLevel: 20 }],
      },
    };
  },
  methods: {
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
    getData(deviceName, table) {
      const vm = this;
      const api = `http://192.168.43.82:8082?deviceName=${deviceName}&for=${table}`;
      this.axios.get(api).then((response) => {
        // console.log(response.data);
        const { status } = response.data;
        vm.join = response.data.join;
        vm.join.receivedAt = vm.timeStampconver(response.data.join.receivedAt);
        console.log(response.data.join.receivedAt);
        console.log(vm.join.receivedAt);
        const date = new Date(status.received_at * 1000);
        // console.log(date, Date.now(), Date.now() - date);
        vm.batteryLevel = status.batteryLevel;
        if (status.batteryLevel > 0.2) {
          vm.batteryStatus = '電池正常';
        } else {
          vm.batteryStatus = '電量不足20％';
        }
        vm.margin = status.margin;
        if ((Date.now() - date) < 60 * 7 * 1000) {
          vm.linkStatus = '連線正常';
        } else {
          vm.linkStatus = '連線異常';
        }
        const theDataIgot = response.data.upData;
        const mytemp = [];
        theDataIgot.forEach((element) => {
          // console.log(element);
          const receivedAt = element.received_at;
          const parseData = JSON.parse(element.object);
          // console.log(receivedAt, parseData, parseData.batteryLevel, typeof (parseData));
          mytemp.push({
            received_at: vm.timeStampconver(receivedAt),
            batteryLevel: parseData.batteryLevel * 100,
            humidityLevel: parseData.humidityLevel,
            temperatureLevel: parseData.temperatureLevel,
          });
        });
        vm.lastTemperature = mytemp[0].temperatureLevel;
        vm.lastHumidity = mytemp[0].humidityLevel;
        vm.chartData.rows = mytemp;
      });
    },
  },
  mounted() {
    this.getData(this.deviceName, 'upAndStatus');
  }
  ,
};
</script>
