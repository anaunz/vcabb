import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from './firebase'

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      router,
      render: function (h) { return h(App) }
    }).$mount('#app')
  }
})
