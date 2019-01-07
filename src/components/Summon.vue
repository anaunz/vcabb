<template>
  <div class="container">
    <div class="is-size-3 has-text-centered has-text-weight-semibold">Summon Cards Simulation</div>
    <div class="is-size-6 has-text-centered">** Please remain that these calculations are based on Summon Rates in the game, so the special rates after a summon won't be counted. **</div><br>
      <br>
      <div class="columns">
        <div class="column is-4">
          <a class="button is-outlined is-fullwidth is-loading" v-if="summonList.length == 0"></a>
          <a v-for="(summon, key) in summonList" :key="key" class="button is-outlined is-fullwidth" @click="selectSummon(key)">{{summon.name}}</a>
        </div>
        <div class="column">
          <div class="notification has-text-centered">
            <img src="../assets/lr.png">
            LR Rate: {{(lrrate * 100).toFixed(3)}}%
            <br>
            <img src="../assets/ur.png">
            UR Rate: {{(urrate * 100).toFixed(3)}}%
            <br>
            <img src="../assets/sr.png">
            SR Rate: {{(srrate * 100).toFixed(3)}}%
          </div>
          <div class="has-text-centered" v-if="getCards!==''">
            <div class="is-divider" data-content="You've got"></div>
            <span v-for="(card, key) in getCards" :key="key">
              <img v-if="card==='lr'" src="../assets/lr.png">
              <img v-if="card==='ur'" src="../assets/ur.png">
              <img v-if="card==='sr'" src="../assets/sr.png">
              <img v-if="card==='r'" src="../assets/r.png">
            </span>
            <div class="is-divider"></div>
          </div>
          <a class="button is-primary is-fullwidth" @click="summonCards">Summon</a>
        </div>
      </div>
      <div class="is-size-4 has-text-weight-semibold">Summon Rates</div>
      <div class="notification">
        <div class="columns">
          <div class="column is-3" v-for="(summon, key) in summonList" :key="key">
            <article class="message">
              <div class="message-header">
                <p>{{summon.name}}</p>
              </div>
              <div class="message-body" style="background-color: white">
                <p v-if="summon.splr !== undefined">• {{summon.splr.quantity}} Special LRs: {{(summon.splr.rate * 100).toFixed(3)}}%</p>
                <p>• {{summon.lr.quantity}} LRs: {{(summon.lr.rate * 100).toFixed(3)}}%</p>
                <p>• {{summon.ur.quantity}} URs: {{(summon.ur.rate * 100).toFixed(3)}}%</p>
                <p>• {{summon.sr.quantity}} SRs: {{(summon.sr.rate * 100).toFixed(3)}}%</p>
              </div>
              <div class="is-size-7 has-text-right"><small>*Last Update: {{timeStampToText(summon.updated._seconds*1000)}}</small></div>
            </article>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from '../firebase'
export default {
  name: 'Summon',
  data () {
    return {
      lrrate: 'N/A',
      urrate: 'N/A',
      srrate: 'N/A',
      summonSelected: '',
      summonList: '',
      getCards: ''
    }
  },
  created () {
    document.title = 'Summon Cards Simulation | VBABB'
    const summon = firebase.functions().httpsCallable('getSummonList')
    summon().then(result => {
      this.summonList = result.data
    })
  },
  methods: {
    timeStampToText (time) {
      let timeStamp = new Date(time)
      let Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return timeStamp.getDate() + ' ' + Month[timeStamp.getMonth()]  + ' ' + timeStamp.getFullYear()
    },
    selectSummon (key) {
      this.summonSelected = key
      this.getCards = ''
      const time = this.summonList[key].numberOfSummon
      const splrRate = (this.summonList[key].splr !== undefined) ? this.summonList[key].splr.rate : 0
      const splrQuan = (this.summonList[key].splr !== undefined) ? this.summonList[key].splr.quantity : 0
      const spurRate = (this.summonList[key].spur !== undefined) ? this.summonList[key].spur.rate : 0
      const spurQuan = (this.summonList[key].spur !== undefined) ? this.summonList[key].spur.quantity : 0
      const spsrRate = (this.summonList[key].spsr !== undefined) ? this.summonList[key].spsr.rate : 0
      const spsrQuan = (this.summonList[key].spsr !== undefined) ? this.summonList[key].spsr.quantity : 0
      
      this.lrrate = 1 - Math.pow(Math.pow(1 - this.summonList[key].lr.rate, this.summonList[key].lr.quantity) * Math.pow(1 - splrRate, splrQuan), time)
      this.urrate = 1 - Math.pow(Math.pow(1 - this.summonList[key].ur.rate, this.summonList[key].ur.quantity) * Math.pow(1 - spurRate, spurQuan), time)
      this.srrate = 1 - Math.pow(Math.pow(1 - this.summonList[key].sr.rate, this.summonList[key].sr.quantity) * Math.pow(1 - spsrRate, spsrQuan), time)
    },
    summonCards () {
      const key = this.summonSelected
      if(key === '') alert('Please select one of the summon lists on the left side.')
      else{
        const limit = this.summonList[key].numberOfSummon
        const splrRate = (this.summonList[key].splr !== undefined) ? this.summonList[key].splr.rate : 0
        const splrQuan = (this.summonList[key].splr !== undefined) ? this.summonList[key].splr.quantity : 0
        const spurRate = (this.summonList[key].spur !== undefined) ? this.summonList[key].spur.rate : 0
        const spurQuan = (this.summonList[key].spur !== undefined) ? this.summonList[key].spur.quantity : 0
        const spsrRate = (this.summonList[key].spsr !== undefined) ? this.summonList[key].spsr.rate : 0
        const spsrQuan = (this.summonList[key].spsr !== undefined) ? this.summonList[key].spsr.quantity : 0
        const getLR = ((this.summonList[key].lr.rate * this.summonList[key].lr.quantity + splrRate * splrQuan) * 100).toFixed(3)
        const getUR = ((this.summonList[key].ur.rate * this.summonList[key].ur.quantity + spurRate * spurQuan) * 100).toFixed(3)
        const getSR = ((this.summonList[key].sr.rate * this.summonList[key].sr.quantity + spsrRate * spsrQuan) * 100).toFixed(3)

        let summonedCards = []

        for(let i = 0; i < limit; i++){
          let rand = Math.random() * 100
          let temp = (rand < getLR) ? 'lr' : (rand > getLR && rand < getUR) ? 'ur' : (rand > getUR && rand < getSR) ? 'sr' : 'r';
          summonedCards.push(temp)
        }
        this.getCards = summonedCards
      }
    }
  }
}
</script>

