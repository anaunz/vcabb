import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import ABB from './components/ABB'
import Summon from './components/Summon'
import AddSummon from './components/AddSummon'
import Login from './components/Login'
import firebase from './firebase'

Vue.use(Router)

const router = new Router({
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
    },
    {
      path: '/addsummon',
      name: 'AddSummon',
      component: AddSummon,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else next()
  }
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else next()
  }
  else next()
})

export default router
