<template>
  <div>
    <div id="login" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
          <button class="delete" aria-label="close" @click="untoggle"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input v-model="email" class="input" type="email" placeholder="Email" autocomplete="off">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="password" class="input" type="password" placeholder="Password" @keydown.enter="login">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <a class="button is-info is-fullwidth" @click="login">Login <i class="fas fa-sign-in-alt"></i></a>
        </section>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="untoggle"></button>
    </div>
    <div v-if="loginPage" class="container">
      <div class="is-size-4 has-text-weight-semibold has-text-centered">Login</div>
      <div class="column is-6 is-offset-3">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="email" class="input" type="email" placeholder="Email" autocomplete="off">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="password" class="input" type="password" placeholder="Password" @keydown.enter="login">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <a class="button is-info is-fullwidth" @click="login">Login <i class="fas fa-sign-in-alt"></i></a>
        <!--
        <router-link to="/register" style="text-decoration: none;">
          <div class="button is-primary is-fullwidth" @click="untoggle">Register <i class="fas fa-user-plus"></i></div>
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase'
import { setTimeout } from 'timers';
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      loginPage: false
    }
  },
  created () {
    if(this.$route.name === 'Login') this.loginPage = true
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
        this.untoggle()
        this.$router.go()
      },
      err => {
        alert(err.message)
      })
    },
    toggle () {
      document.querySelector('#login').classList.add('is-active')
      document.querySelector('html').classList.add('is-clipped')
    },
    untoggle () {
      document.querySelector('#login').classList.remove('is-active')
      document.querySelector('html').classList.remove('is-clipped')
    }
  }
}
</script>


