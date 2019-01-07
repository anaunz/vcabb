<template>
  <div id="app">
    <div class="modal">
      <div class="modal-background" @click="closeModal"></div>
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
    <section class="section">
      <router-view/>
    </section>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import { setTimeout } from 'timers';
export default {
  name: 'App',
  components: {
    Navbar
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
