import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import mqtt from 'mqtt';
import VCharts from 'v-charts';
import VeLine from 'v-charts/lib/line.common';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

// Vue.use(mqtt);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(VCharts);
Vue.component(VeLine.name, VeLine);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
