//import { createApp } from 'vue'
//import App from './App.vue'

//createApp(App).mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store'; // Import the store
import * as VeeValidate from 'vee-validate'; // Import all exports from VeeValidate

const app = createApp(App); // Create a Vue app instance

app.use(VeeValidate); // Use VeeValidate as a Vue plugin
app.config.productionTip = false;

createApp(App)
  .use(router)
  .use(store) // Use the store
  .mount('#app');

