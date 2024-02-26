import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

import "bootstrap/dist/css/bootstrap.min.css";



import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";


// createApp(App).mount('#app')
createApp(App).use(router).use(Antd).mount("#app");


  