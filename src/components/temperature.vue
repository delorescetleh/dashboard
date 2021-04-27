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
        columns: ['time', 'temperature'],
        rows: [{ time: 1, temperature: 20 },
          { time: 2, temperature: 21 },
          { time: 3, temperature: 22 },
          { time: 4, temperature: 20 },
          { time: 5, temperature: 23 }],
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
      const filename = 'data';
      fetch(`${filename}.json`)
        .then((r) => r.json())
        .then((json) => {
          const data = json;
          data.A.forEach((element) => {
            console.log(element.t, element.pL);
            // const temp = { 日期: this.timeStampconver(element.t), 電壓: element.b };
            // this.chartData.rows.push(temp);
          });
        },
        (response) => {
          console.log('Error loading json:', response);
        });

      console.log(this.chartData);
    },
  },
  beforeMount() {
    this.getData();
  }
  ,
};
</script>
