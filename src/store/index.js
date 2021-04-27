import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
  },
  mutations: {
    GETDATAFROMJSON(state, payload) {
      state.data = payload;
      // console.log(state.data);
      // this.getDataFromJson(state);
    },
  },
  actions: {
    getDataFromJson(context) {
      const filename = 'suvery';
      fetch(`${filename}.json`)
        .then((r) => r.json())
        .then((json) => {
          const data = json;
          // state.data = data.data;
          // console.log(state.data);
          context.commit('GETDATAFROMJSON', data);
        },
        (response) => {
          console.log('Error loading json:', response);
        });
    },
  },
  modules: {
  },
});
