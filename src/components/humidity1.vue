<template>
  <div>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{name}}</span>
    <el-text style="float: right; padding: 3px 0" type="text" disabled>{{status}}</el-text>
  <div>
  </div>
  </div>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">
        <span>{{unit}}</span>
        <el-text style="padding: 3px 0" type="text" disabled>
          {{level}}
        </el-text>
        </div>
      </el-col>
      <!-- <el-col :span="16"><div class="grid-content bg-purple"></div></el-col> -->
      <!-- <el-col :span="4"><div class="grid-content bg-purple-light">
        <span>{{batterypowerlabel}}</span>
          <el-text style="padding: 3px 0" type="text" disabled>
            {{batterypowerlevel}}
          </el-text>
      </div>
      </el-col> -->
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
  data() {
    this.chartSettings = {
      xAxisType: 'time',
    };
    return {
      batterypowerlabel: '電量',
      batterypowerlevel: 90,
      name: '溫度',
      status: '正常',
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
      console.log(formattedTime);
      return formattedTime;
    },
    getData() {
      const api = 'http://192.168.43.82:8082';
      this.axios.get(api).then((response) => {
        const theDataIgot = response.data.humidity1;
        const mytemp = [];
        theDataIgot.forEach((element) => {
          mytemp.push({
            received_at: this.timeStampconver(element.received_at),
            batteryLevel: element.batteryLevel * 100,
            humidityLevel: element.humidityLevel,
            temperatureLevel: element.temperatureLevel,
          });
        });
        this.chartData.rows = mytemp;
        console.log(this.chartData.rows);
      });
    },
  },
  beforeMount() {
    this.getData();
  }
  ,
};
</script>
