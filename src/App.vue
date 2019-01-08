<template>
  <div id="app">
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Sorry for your inconvenience</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
            The website is currently renovating which causes the Alliance Battle Calculation not available for the moment.
            Sorry for your inconvenience
        </section>
        <footer class="modal-card-foot">
          <button class="button is-info" @click="closeModal">OK</button>
        </footer>
      </div>
    </div>
    <Navbar/>
    <div id="main">
      <section class="section">
        <router-view/>
      </section>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { setTimeout } from 'timers';
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  created () {
    setTimeout(() => {
      document.querySelector('.modal').classList.add('is-active')
      document.querySelector('html').classList.add('is-clipped')
    }, 1000)
  },
  methods: {
    closeModal () {
      document.querySelector('.modal').classList.remove('is-active')
      document.querySelector('html').classList.remove('is-clipped')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#main {
  flex: 1 0 auto;
}
</style>
