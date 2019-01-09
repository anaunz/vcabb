<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item is-size-4">VCABB</router-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/abb" class="navbar-item">
          ABB Calculation
        </router-link>
        <router-link to="/summon" class="navbar-item">
          Summon Cards
        </router-link>
      </div>
    </div>
    <div class="navbar-end">
      <a v-if="isLoggedIn" class="navbar-item">{{email}}</a>
      <div class="navbar-item">
        <div class="buttons">
          <a v-if="!isLoggedIn" class="button is-light" @click="loginModal">
            Login
          </a>
          <a v-if="isLoggedIn" class="button is-light" @click="logout">
            Logout
          </a>
        </div>
      </div>
      <Login v-if="currentRouteName!=='Login'"/>
    </div>
  </nav>
</template>

<script>
import firebase from '../firebase'
import Login from './Login'
export default {
  components: {
    Login
  },
  data () {
    return {
      isLoggedIn: false,
      email: ''
    }
  },
  created () {
    const user = firebase.auth().currentUser
    if(user) {
      this.isLoggedIn = true
      this.email = user.email
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(noData => {
        this.$router.go()
      })
    },
    loginModal () {
      Login.methods.toggle()
    }
  }
}
</script>

