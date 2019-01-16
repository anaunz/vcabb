<template>
  <div class="container">
    <div class="is-size-3 has-text-centered has-text-weight-semibold">Summon Cards Simulation</div>
    <div class="is-size-6 has-text-centered">** Please remain that these calculations are based on Summon Rates in the game, so the special rates after a summon won't be counted. **</div><br>
      <br>
      <div class="columns">
        <div class="column is-4">
          <a class="button is-outlined is-fullwidth is-loading" v-if="summonList.length == 0"></a>
          <a v-for="(summon, key) in summonList" :key="key" class="button is-fullwidth summonList" @click="selectSummon(key, $event)">{{summon.data.name}}</a>
        </div>
        <div class="column">
          <div class="notification has-text-centered">
            Rate of getting at least 1 <img src="../assets/lr.png" width="25"> : {{(lrrate * 100).toFixed(3)}}%
            <br>
            Rate of getting at least 1 <img src="../assets/ur.png" width="25"> : {{(urrate * 100).toFixed(3)}}%
            <br>
            Rate of getting at least 1 <img src="../assets/sr.png" width="25"> : {{(srrate * 100).toFixed(3)}}%
          </div>
          <div class="has-text-centered" v-if="showCards">
            <div class="is-divider" data-content="You've got"></div>
            <div v-if="getCards.length===0" class="button is-white is-loading"></div>
            <span v-for="(card, key) in getCards" :key="key">
              <span v-if="card==='lr'"><img src="../assets/lr.png"></span>
              <span class="is-size-7" v-if="card==='splr'">(Special)<img src="../assets/lr.png"></span>
              <span v-if="card==='ur'"><img src="../assets/ur.png"></span>
              <span class="is-size-7" v-if="card==='spur'">(Special)<img src="../assets/ur.png"></span>
              <span v-if="card==='sr'"><img src="../assets/sr.png"></span>
              <span class="is-size-7" v-if="card==='spsr'">(Special)<img src="../assets/sr.png"></span>
              <span v-if="card==='r'"><img src="../assets/r.png"></span>
            </span>
            <div class="is-divider"></div>
          </div>
          <a :disabled="loading" class="button is-primary is-fullwidth" @click="summonCards">Summon</a>
        </div>
      </div>
      <div class="is-size-4 has-text-weight-semibold">Summon Rates</div>
      <div class="notification">
        <div class="columns field is-grouped is-grouped-multiline">
          <div class="column is-3" v-for="(summon, key) in summonList" :key="key">
            <article class="message">
              <div class="message-header has-background-primary">
                <p>{{summon.data.name}}</p>
                <a v-if="summon.data.deletable && isAdmin">
                  <i v-if="!loading" class="fas fa-trash-alt" @click="deleteSummon(summon.id)"></i>
                  <i v-if="loading" class="fas fa-minus"></i>
                </a>
              </div>
              <div class="message-body has-text-left" style="background-color: white">
                <p v-if="summon.data.splr.rate !== 0">• {{summon.data.splr.quantity}} Special LRs: {{(summon.data.splr.rate * 100).toFixed(3)}}%</p>
                <p v-if="summon.data.lr.rate !== 0">• {{summon.data.lr.quantity}} LRs: {{(summon.data.lr.rate * 100).toFixed(3)}}%</p>
                <p v-if="summon.data.spur.rate !== 0">• {{summon.data.spur.quantity}} Special URs: {{(summon.data.spur.rate * 100).toFixed(3)}}%</p>
                <p>• {{summon.data.ur.quantity}} URs: {{(summon.data.ur.rate * 100).toFixed(3)}}%</p>
                <p v-if="summon.data.spsr.rate !== 0">• {{summon.data.spsr.quantity}} Special SRs: {{(summon.data.spsr.rate * 100).toFixed(3)}}%</p>
                <p>• {{summon.data.sr.quantity}} SRs: {{(summon.data.sr.rate * 100).toFixed(3)}}%</p>
              </div>
              <div class="is-size-7 has-text-right"><small>*Last Update: {{timeStampToText(summon.data.updated._seconds*1000)}}</small></div>
            </article>
          </div>
          <div class="column is-3">
            <router-link to="/addsummon" style="text-decoration: none;" >
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
      loading: true,
      isAdmin: false
    }
  },
  created () {
    document.title = 'Summon Cards Simulation | VBABB'
    this.render()
  },
  methods: {
    render () {
      const summon = firebase.functions().httpsCallable('getSummonList')
      const auth = firebase.auth().currentUser
      summon().then(result => {
        this.summonList = result.data
        if(auth) if(auth.uid == 'gocGLUUD6oRpAIiHLIpekuTWL1Q2') this.isAdmin = true
        this.loading = false
      }).catch(err => {
        console.log('Error happened when calling getSummonList function: ' + err)
        this.loading = false
      })
    },
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
      const time = this.summonList[key].data.numberOfSummon
      const splrRate = (this.summonList[key].data.splr !== undefined) ? this.summonList[key].data.splr.rate : 0
      const splrQuan = (this.summonList[key].data.splr !== undefined) ? this.summonList[key].data.splr.quantity : 0
      const spurRate = (this.summonList[key].data.spur !== undefined) ? this.summonList[key].data.spur.rate : 0
      const spurQuan = (this.summonList[key].data.spur !== undefined) ? this.summonList[key].data.spur.quantity : 0
      const spsrRate = (this.summonList[key].data.spsr !== undefined) ? this.summonList[key].data.spsr.rate : 0
      const spsrQuan = (this.summonList[key].data.spsr !== undefined) ? this.summonList[key].data.spsr.quantity : 0
      
      this.lrrate = 1 - Math.pow(Math.pow(1 - this.summonList[key].data.lr.rate, this.summonList[key].data.lr.quantity) * Math.pow(1 - splrRate, splrQuan), time)
      this.urrate = 1 - Math.pow(Math.pow(1 - this.summonList[key].data.ur.rate, this.summonList[key].data.ur.quantity) * Math.pow(1 - spurRate, spurQuan), time)
      this.srrate = 1 - Math.pow(Math.pow(1 - this.summonList[key].data.sr.rate, this.summonList[key].data.sr.quantity) * Math.pow(1 - spsrRate, spsrQuan), time)
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
          const summoning = this.summonList[key].data
          const limit = summoning.numberOfSummon
          const getLR = Number(((summoning.lr.rate * summoning.lr.quantity) * 100).toFixed(3))
          const getSPLR = getLR + Number(((summoning.splr.rate * summoning.splr.quantity) * 100).toFixed(3))
          const getUR = getSPLR + Number(((summoning.ur.rate * summoning.ur.quantity) * 100).toFixed(3))
          const getSPUR = getUR + Number(((summoning.spur.rate * summoning.spur.quantity) * 100).toFixed(3))
          const getSR = getSPUR + Number(((summoning.sr.rate * summoning.sr.quantity) * 100).toFixed(3))
          const getSPSR = getSR + Number(((summoning.spsr.rate * summoning.spsr.quantity) * 100).toFixed(3))
          let summonedCards = []

          for(let i = 0; i < limit; i++){
            const rand = Math.floor(Math.random() * 100000) / 1000
            let temp = (rand <= getLR) ? 'lr' : (rand > getLR && rand <= getSPLR) ? 'splr' : (rand > getSPLR && rand <= getUR) ? 'ur' : (rand > getUR && rand <= getSPUR) ? 'spur' : (rand > getSPUR && rand <= getSR) ? 'sr' : (rand > getSR && rand <= getSPSR) ? 'spsr' : 'r'
            summonedCards.push(temp)
          }
          this.loading = false
          this.getCards = summonedCards
        }, 700)
      }
    },
    deleteSummon (id) {
      if(!this.loading){
        this.loading = true
        if(confirm('Are you sure to delete this summon?')){
          const deleteSummon = firebase.functions().httpsCallable('deleteSummonList')
          deleteSummon({id: id}).then(result => {
            if(result.data.success) this.render()
            else{
              console.log(result.data.msg)
              this.loading = false
            }
          })
        }
        else this.loading = false
      }
      else alert('Please wait...')
    }
  }
}
</script>

