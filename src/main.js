import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VeLine from 'v-charts/lib/line.common';
import VCharts from 'v-charts';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

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
