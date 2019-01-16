<template>
  <div id="app">
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
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  created () {
    setTimeout(() => {
      document.querySelector('#announce').classList.add('is-active')
      document.querySelector('html').classList.add('is-clipped')
    }, 1000)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#main {
  flex: 1 0 auto;
}
</style>
