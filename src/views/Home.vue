<template>
  <div>
    <temperature></temperature>
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
import temperature from '../components/temperature.vue';

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    temperature,
  },
  beforeMount() {
    this.$store.dispatch('getDataFromJson');
  }
  ,
};
</script>
