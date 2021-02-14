import Vue from 'vue'
import router from './router'
import firebase from "firebase";
import {BootstrapVue} from 'bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'

import './app.scss'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

const firebaseConfig = {
    apiKey: "AIzaSyCp3pebgWUQjlCnJhXRR3HlsocDkt1kpJs",
    authDomain: "koala-tea-software.firebaseapp.com",
    projectId: "koala-tea-software",
    storageBucket: "koala-tea-software.appspot.com",
    messagingSenderId: "28802874231",
    appId: "1:28802874231:web:639d40817d4af856247f72",
    measurementId: "G-K4H800XM0V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
