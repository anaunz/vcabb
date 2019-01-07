import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import ABB from './components/ABB'
import Summon from './components/Summon'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/abb',
      name: 'ABB',
      component: ABB
    },
    {
      path: '/summon',
      name: 'Summon',
      component: Summon
    }
  ]
})
