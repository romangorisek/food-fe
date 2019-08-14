import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store/Index";

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

const moment = require('moment')
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})
Vue.use(require('vue-moment'), {
  moment
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
