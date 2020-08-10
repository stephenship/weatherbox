import Vue from 'vue';
import App from './App.vue';
import Axios from 'axios';
import moment from 'moment';

Vue.config.productionTip = false;
Axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.prototype.$http = Axios;
Vue.prototype.$moment = moment;

new Vue({
  render: h => h(App),
}).$mount('#app');
