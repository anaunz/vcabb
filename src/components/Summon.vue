<template>
  <div class="container">
    <div class="is-size-3 has-text-centered has-text-weight-semibold">Summon Cards Simulation</div>
    <div class="is-size-6 has-text-centered">** Please remain that these calculations are based on Summon Rates in the game, so the special rates after a summon won't be counted. **</div><br>
      <br>
      <div class="columns">
        <div class="column is-4">
          <a class="button is-outlined is-fullwidth is-loading" v-if="summonList.length == 0"></a>
          <a v-for="(summon, key) in summonList" :key="key" class="button is-fullwidth summonList" @click="selectSummon(key, $event)">{{summon.name}}</a>
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
          <div class="has-text-centered" v-if="showCards">
            <div class="is-divider" data-content="You've got"></div>
            <div v-if="getCards.length===0" class="button is-white is-loading"></div>
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
        <div class="columns field is-grouped is-grouped-multiline">
          <div class="column is-3" v-for="(summon, key) in summonList" :key="key">
            <article class="message">
              <div class="message-header has-background-primary">
                <p>{{summon.name}}</p>
              </div>
              <div class="message-body has-text-left" style="background-color: white">
                <p v-if="summon.splr !== undefined">• {{summon.splr.quantity}} Special LRs: {{(summon.splr.rate * 100).toFixed(3)}}%</p>
                <p>• {{summon.lr.quantity}} LRs: {{(summon.lr.rate * 100).toFixed(3)}}%</p>
                <p>• {{summon.ur.quantity}} URs: {{(summon.ur.rate * 100).toFixed(3)}}%</p>
                <p>• {{summon.sr.quantity}} SRs: {{(summon.sr.rate * 100).toFixed(3)}}%</p>
              </div>
              <div class="is-size-7 has-text-right"><small>*Last Update: {{timeStampToText(summon.updated._seconds*1000)}}</small></div>
            </article>
          </div>
          <div class="column is-3">
            <router-link to="/addsummon" style="text-decoration: none;">
              <article class="message tooltip is-tooltip-multiline"
              data-tooltip="Add a new summon list by entering some information in the following page (This action requires authentication and permission)">
                <div class="message-header has-background-primary">
                  <p>Add More Summon</p>
                </div>
                <div class="message-body has-text-centered" style="background-color: white">
                  <i class="fas fa-plus-circle is-size-1"></i>
                </div>
              </article>
            </router-link>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import firebase from '../firebase'
import { setTimeout } from 'timers';
export default {
  name: 'Summon',
  data () {
    return {
      lrrate: 'N/A',
      urrate: 'N/A',
      srrate: 'N/A',
      summonSelected: '',
      summonList: '',
      getCards: '',
      showCards: false,
      loading: false
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
    selectSummon (key, event) {
      document.querySelectorAll('.summonList').forEach(element => {
        element.classList.remove('is-light')
      })
      event.target.classList.add('is-light')
      this.summonSelected = key
      this.getCards = ''
      this.showCards = false
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
      if(this.loading === true) return false
      const key = this.summonSelected
      this.getCards = ''
      if(key === '') alert('Please select one of the summon lists on the left side.')
      else{
        this.showCards = true
        this.loading = true
        setTimeout(() => {
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
          this.loading = false
          this.getCards = summonedCards
        }, 700)
      }
    }
  }
}
</script>

