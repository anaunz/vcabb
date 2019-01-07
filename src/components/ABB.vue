<template>
  <div class="container">
    <div class="is-size-3 has-text-centered">This page is currently renovating. Sorry for your inconvenience.</div>
    <!--
    <div class="is-size-3 has-text-centered has-text-weight-semibold">Alliance Battle Winrate Calculation</div>
    <div class="is-size-7 has-text-centered">**YOUR CALCULATION WILL BE COLLECTED INTO A DATABASE TO FIND AN AVERAGE PROC IN THE FUTURE**</div>
    <br>
    <div class="columns">
      <div class="column is-5 is-offset-1">
        <div class="is-size-4 has-text-weight-semibold">Enemy's Proc Chance on Average</div>
        <div class="control">
          <label class="radio">
            <input type="radio" name="foobar" disabled>
            30%
          </label>
          <label class="radio">
            <input type="radio" name="foobar" checked disabled>
            35%
          </label>
          <label class="radio">
            <input type="radio" name="foobar" disabled>
            40%
          </label>
          <label class="radio">
            <input type="radio" name="foobar" disabled>
            45%
          </label>
        </div>
        <br>
        <div class="is-size-4 has-text-weight-semibold">
          Your Cards
        </div>
        <div class="field">
          Your Card#1:
          <div class="control">
            <div class="select is-info">
              <select v-model="cards[0].type">
                <option value="" disabled>Card's Type</option>
                <option value="dmgall">DMG to all enemies</option>
                <option value="dmgallsb">DMG to all enemies (Start Battle)</option>
                <option value="unleash">Unleasher</option>
                <option value="null">Nullification</option>
              </select>
            </div>
          </div>
          <br v-if="cards[0].type == ''">
          <div class="column" v-if="cards[0].type != ''">
            <div class="field has-addons">
              <span class="button is-static">
                Skill Proc:
              </span>
              <p class="control">
                <input v-model="cards[0].proc" class="input" type="number" min="5" max="70" onKeyPress="if(this.value.length>=2) return false;">
              </p>
              <div class="button is-static">
                %
              </div>
            </div>
          </div>
          Your Card#2:
          <div class="control">
            <div class="select is-info">
              <select v-model="cards[1].type">
                <option value="" disabled>Card's Type</option>
                <option value="dmgall">DMG to all enemies</option>
                <option value="dmgallsb">DMG to all enemies (Start Battle)</option>
                <option value="unleash">Unleasher</option>
                <option value="null">Nullification</option>
              </select>
            </div>
          </div>
          <br v-if="cards[1].type == ''">
          <div class="column" v-if="cards[1].type != ''">
            <div class="field has-addons">
              <span class="button is-static">
                Skill Proc:
              </span>
              <p class="control">
                <input v-model="cards[1].proc" class="input" type="number" min="5" max="70" onKeyPress="if(this.value.length>=2) return false;">
              </p>
              <div class="button is-static">
                %
              </div>
            </div>
          </div>
          Your Card#3:
          <div class="control">
            <div class="select is-info">
              <select v-model="cards[2].type">
                <option value="" disabled>Card's Type</option>
                <option value="dmgall">DMG to all enemies</option>
                <option value="dmgallsb">DMG to all enemies (Start Battle)</option>
                <option value="unleash">Unleasher</option>
                <option value="null">Nullification</option>
              </select>
            </div>
          </div>
          <br v-if="cards[2].type == ''">
          <div class="column" v-if="cards[2].type != ''">
            <div class="field has-addons">
              <span class="button is-static">
                Skill Proc:
              </span>
              <p class="control">
                <input v-model="cards[2].proc" class="input" type="number" min="5" max="70" onKeyPress="if(this.value.length>=2) return false;">
              </p>
              <div class="button is-static">
                %
              </div>
            </div>
          </div>
          Your Card#4:
          <div class="control">
            <div class="select is-info">
              <select v-model="cards[3].type">
                <option value="" disabled>Card's Type</option>
                <option value="dmgall">DMG to all enemies</option>
                <option value="dmgallsb">DMG to all enemies (Start Battle)</option>
                <option value="unleash">Unleasher</option>
                <option value="null">Nullification</option>
              </select>
            </div>
          </div>
          <br v-if="cards[3].type == ''">
          <div class="column" v-if="cards[3].type != ''">
            <div class="field has-addons">
              <span class="button is-static">
                Skill Proc:
              </span>
              <p class="control">
                <input v-model="cards[3].proc" class="input" type="number" min="5" max="70" onKeyPress="if(this.value.length>=2) return false;">
              </p>
              <div class="button is-static">
                %
              </div>
            </div>
          </div>
          Your Card#5:
          <div class="control">
            <div class="select is-info">
              <select v-model="cards[4].type">
                <option value="" disabled>Card's Type</option>
                <option value="dmgall">DMG to all enemies</option>
                <option value="dmgallsb">DMG to all enemies (Start Battle)</option>
                <option value="unleash">Unleasher</option>
                <option value="null">Nullification</option>
              </select>
            </div>
          </div>
          <br v-if="cards[4].type == ''">
          <div class="column" v-if="cards[4].type != ''">
            <div class="field has-addons">
              <span class="button is-static">
                Skill Proc:
              </span>
              <p class="control">
                <input v-model="cards[4].proc" class="input" type="number" min="5" max="70" onKeyPress="if(this.value.length>=2) return false;">
              </p>
              <div class="button is-static">
                %
              </div>
            </div>
          </div>
          <a class="button is-info is-outlined" @click="calculation">Calculate</a>
        </div>
      </div>
      <div class="column is-5">
        <table class="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>Turn</th>
              <th>Winrate</th>
            </tr>
          </thead>
          <tbody v-for="rate in winrate" :key="rate">
            <tr>
              <td></td>
              <td>{{rate}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> !-->
  </div>
</template>

<script>
import firebase from '../firebase'
export default {
  name: 'ABB',
  data () {
    return {
      cards: [
        {hasSkills: 1, type: '', proc: ''},
        {hasSkills: 1, type: '', proc: ''},
        {hasSkills: 1, type: '', proc: ''},
        {hasSkills: 1, type: '', proc: ''},
        {hasSkills: 1, type: '', proc: ''}
      ],
      winrate: null
    }
  },
  created () {
    document.title = 'Alliance Battle Calculation | VBABB'
  },
  methods: {
    calculation () {
      const cal = firebase.functions().httpsCallable('calculation')
      cal({cards: this.cards}).then(result => {
        this.winrate = result
      })
    }
  }
}
</script>


