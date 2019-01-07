<template>
  <div class="container">
    <div class="is-size-3 has-text-centered">Welcome to VCABB website</div>
    <div class="is-size-4 has-text-centered">
      The website is currently renovating which causes the Alliance Battle Calculation not available for the moment.<br>
      Sorry for your inconvenience.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  created () {
    document.title = 'Home | VBABB'
  }
}
</script>
