<template>
  <div>
    <humidity1></humidity1>
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
import humidity1 from '../components/humidity1.vue';

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    humidity1,
  },
  beforeMount() {
    this.$store.dispatch('getDataFromJson');
    // const client = this.$mqtt.connect('ws//****:8083');
    // console.log(client);
  },
};
</script>
