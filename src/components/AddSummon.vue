<template>
  <div class="container">
    <div class="is-size-4 has-text-weight-semibold">Add a New Summon List</div>
    <br>
    <table class="table is-striped is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th width="25%">Column Name <i class="fas fa-columns"></i></th>
          <th colspan="2">Data Input <i class="fas fa-keyboard"></i></th>
          <th width="15%">Help <i class="fas fa-question-circle"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name of the Summon <span class="is-size-7 has-text-info">(required)</span></td>
          <td colspan="2"><input :disabled="loading" class="input" v-model="summon.name" type="text" placeholder="Name"></td>
          <td></td>
        </tr>
        <tr>
          <td>Special LR</td>
          <td width="45%"><input :disabled="loading" class="input" type="number" v-model="summon.splr.rate" placeholder="Special LR Rate (%)"></td>
          <td>
            <input :disabled="loading" class="input" type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="summon.splr.quantity" placeholder="Amount">
          </td>
          <td></td>
        </tr>
        <tr>
          <td>LR</td>
          <td><input :disabled="loading" class="input" type="number" v-model="summon.lr.rate" placeholder="LR Rate (%)"></td>
          <td><input :disabled="loading" class="input" type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="summon.lr.quantity" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
          <td>Special UR</td>
          <td><input :disabled="loading" class="input" type="number" v-model="summon.spur.rate" placeholder="Special UR Rate (%)"></td>
          <td><input :disabled="loading" class="input" type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57" pattern="\d+" v-model="summon.spur.quantity" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
          <td>UR <span class="is-size-7 has-text-info">(required)</span></td>
          <td><input :disabled="loading" class="input" type="number" v-model="summon.ur.rate" placeholder="UR Rate (%)"></td>
          <td><input :disabled="loading" class="input" type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="summon.ur.quantity" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
          <td>Special SR</td>
          <td><input :disabled="loading" class="input" type="number" v-model="summon.spsr.rate" placeholder="Special SR Rate (%)"></td>
          <td><input :disabled="loading" class="input" type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="summon.spsr.quantity" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
        <tr>
          <td>SR <span class="is-size-7 has-text-info">(required)</span></td>
          <td><input :disabled="loading" class="input" type="number" v-model="summon.sr.rate" placeholder="SR Rate (%)"></td>
          <td><input :disabled="loading" class="input" type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="summon.sr.quantity" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
          <td>Number of Cards per Summon <span class="is-size-7 has-text-info">(required)</span></td>
          <td colspan="2"><input :disabled="loading" class="input" onkeypress="return event.charCode >= 48 && event.charCode <= 57" max="15" v-model="summon.times" type="number" placeholder="Times"></td>
          <td></td>
        </tr>
        <tr>
          <td>Type of Summon <span class="is-size-7 has-text-info">(required)</span></td>
          <td colspan="2">
            <div class="select">
              <select v-model="summon.type" :disabled="loading">
                <option value="" disabled>Please Select Summon Type</option>
                <option value="normal">Standard Summon</option>
                <option value="slot">Slot Summon</option>
                <option value="chance">Chance Summon</option>
                <option value="box">Box Summon</option>
              </select>
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td class="has-text-danger" style="white-space: pre">{{errmsg}}</td>
          <th :disabled="loading" class="has-text-right"><a class="button is-info is-outlined" @click="addSummonList">Add Summon List</a></th>
          <th><a class="button is-dark is-outlined">Cancel</a></th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import firebase from '../firebase'
import { isObject } from 'util';
export default {
  name: 'AddSummon',
  data () {
    return {
      summon: {
        name: '',
        splr: {
          rate: '',
          quantity: ''
        },
        lr: {
          rate: '',
          quantity: ''
        },
        spur: {
          rate: '',
          quantity: ''
        },
        ur: {
          rate: '',
          quantity: ''
        },
        spsr: {
          rate: '',
          quantity: ''
        },
        sr: {
          rate: '',
          quantity: ''
        },
        times: 10,
        type: ''
      },
      loading: false,
      errmsg: ''
    }
  },
  created () {
    document.title = 'Add Summon List | VBABB'
  },
  methods: {
    addSummonList () {
      if(!this.loading){
        if(this.checkRequired()){
          this.loading = true
          const info = this.summon
          for(let key in info){
            if(isObject(info[key])) info[key].rate = info[key].rate / 100
          }
          const add = firebase.functions().httpsCallable('addSummonList')
          add(info).then(result => {
            if(result.data.success) this.$router.push('/summon')
            else{
              console.log(result.data.msg)
              this.loading = false
            }
          })
        }
        else alert('Please enter the information as the red text shown below')
      }
      else alert('Please wait...')
    },
    checkRequired () {
      const info = this.summon
      this.errmsg = ''
      const percentage = Number(info.splr.rate*info.splr.quantity) + Number(info.lr.rate*info.lr.quantity)
                         + Number(info.spur.rate*info.spur.quantity) + Number(info.ur.rate*info.ur.quantity)
                         + Number(info.spsr.rate*info.spsr.quantity) + Number(info.sr.rate*info.sr.quantity)
      if(info.name == '') this.errmsg += '*Please fill the name of the summon\n'
      if(percentage == 0) this.errmsg += '*Please fill the chance rate\n'
      if(percentage > 100) this.errmsg += '*Please check the rate of each rarity. It currently exceeds 100%\n'
      if(info.times > 15 || info.times < 5) this.errmsg += '*Number of Cards per Summon can be at the maximum of 15 and the minimum of 5\n'
      if(info.ur.rate == '' && info.ur.quantity == '') this.errmsg += '*Please fill UR rarity information\n'
      if(info.sr.rate == '' && info.sr.quantity == '') this.errmsg += '*Please fill SR rarity information\n'
      if(info.type == '') this.errmsg += '*Please select Summon\'s type\n'
      for(let key in info){
        if(isObject(info[key])){
          if(info[key].rate != '' && info[key].quantity == '') this.errmsg += '*Please fill the amount of the rarity ' + key.toUpperCase() + '\n'
          else if(info[key].rate == '' && info[key].quantity != '') this.errmsg += '*Please fill the rate of the rarity ' + key.toUpperCase() + '\n'
        }
      }
      if(this.errmsg == '') return true
      else false
    }
  }
}
</script>

