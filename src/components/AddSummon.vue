<template>
  <div class="container">
    <div class="is-size-4 has-text-weight-semibold">Add a New Summon List</div>
    <br>
    <table class="table is-striped is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Column Name <i class="fas fa-columns"></i></th>
          <th colspan="2">Data Input <i class="fas fa-keyboard"></i></th>
          <th>Help <i class="fas fa-question-circle"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name of the Summon</td>
          <td colspan="2"><input class="input" v-model="summon.name" type="text" placeholder="Name"></td>
          <td></td>
        </tr>
        <tr>
          <td>Special LR</td>
          <td><input class="input" type="number" v-model="summon.splr.rate" placeholder="Special LR Rate"></td>
          <td><input class="input" type="number" v-model="summon.splr.quan" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
          <td>LR</td>
          <td><input class="input" type="number" v-model="summon.lr.rate" placeholder="LR Rate"></td>
          <td><input class="input" type="number" v-model="summon.lr.quan" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
          <td>Special UR</td>
          <td><input class="input" type="number" v-model="summon.spur.rate" placeholder="Special UR Rate"></td>
          <td><input class="input" type="number" v-model="summon.spur.quan" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
          <td>UR</td>
          <td><input class="input" type="number" v-model="summon.ur.rate" placeholder="UR Rate"></td>
          <td><input class="input" type="number" v-model="summon.ur.quan" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
          <td>Special SR</td>
          <td><input class="input" type="number" v-model="summon.spsr.rate" placeholder="Special SR Rate"></td>
          <td><input class="input" type="number" v-model="summon.spsr.quan" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
        <tr>
          <td>SR</td>
          <td><input class="input" type="number" v-model="summon.sr.rate" placeholder="SR Rate"></td>
          <td><input class="input" type="number" v-model="summon.sr.quan" placeholder="Amount"></td>
          <td></td>
        </tr>
        <tr>
          <td>R</td>
          <td colspan="2"><input class="input" v-model="summon.rrate" type="number" placeholder="R Rate"></td>
          <td></td>
        </tr>
        <tr>
          <td>Number of Cards per Summon</td>
          <td colspan="2"><input class="input" v-model="summon.times" type="number" placeholder="Times"></td>
          <td></td>
        </tr>
        <tr>
          <td>Type of Summon</td>
          <td colspan="2">
            <div class="select">
              <select v-model="summon.type">
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
          <th colspan="2"></th>
          <th class="has-text-right"><a class="button is-info is-outlined">Add Summon List</a></th>
          <th><a class="button is-dark is-outlined">Cancel</a></th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AddSummon',
  data () {
    return {
      summon: {
        name: '',
        splr: {
          rate: '',
          quan: ''
        },
        lr: {
          rate: '',
          quan: ''
        },
        spur: {
          rate: '',
          quan: ''
        },
        ur: {
          rate: '',
          quan: ''
        },
        spsr: {
          rate: '',
          quan: ''
        },
        sr: {
          rate: '',
          quan: ''
        },
        rrate: '',
        times: 10,
        type: 'normal'
      }
    }
  },
  created () {
    document.title = 'Add Summon List | VBABB'
  },
  methods: {
    addSummonList () {
      const add = firebase.functions().httpsCallable('addSummonList')
      add(this.summon).then(result => {
        console.log(result)
      })
    }
  }
}
</script>

