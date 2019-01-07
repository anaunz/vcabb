<template>
  <div class="container">
    hi
  </div>
</template>

<script>
import firebase from '../firebase'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  created () {
    let cards = [
      {hasSkills: 1, type: 'dmgall', proc: 0.35},
      {hasSkills: 1, type: 'dmgall', proc: 0.35},
      {hasSkills: 1, type: 'dmgall', proc: 0.35},
      {hasSkills: 1, type: 'dmgall', proc: 0.35},
      {hasSkills: 1, type: 'dmgall', proc: 0.35},
    ]
    const test = firebase.functions().httpsCallable('calculation')
    test({cards: cards}).then(result => {
      console.log(result)
    })
  }
}
</script>
