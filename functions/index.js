const functions = require('firebase-functions')
const admin = require('firebase-admin')
var serviceAccount = require("./vcabb-93eed8f5a141.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vcabb-2ef34.firebaseio.com"
})

const firestore = admin.firestore()
firestore.settings({
  timestampsInSnapshots: true
})

const summonFS = firestore.collection('summon')

exports.calculation = functions.https.onCall((data, context) => {
  let missnull = 1
  let missrate = 1
  let enemyChance = data.enemyChance || 0.35
  let cards = data.cards
  let unleashCount = 0
  let nullCount = 0
  let probability = []
  for(card in cards){
    if(cards[card].hasSkills == 1){
      if(cards[card].type == 'unleash') unleashCount++
      if(cards[card].type != 'null') missrate *= 1 - cards[card].proc/100
      else if(cards[card].type == 'null'){
        missnull *= 1 - cards[card].proc/100
        nullCount++
      }
    }
  }
  if(unleashCount + nullCount == 5) return [{winrate: 0}]
  let enemyMiss = combinations(nullCount) * Math.pow(enemyChance, nullCount) * Math.pow(1 - enemyChance, 5 - nullCount)
  let rate = 1 - missrate
  for(let i = 0; i < 5; i++){
    probability.push(rate)
    rate += missrate * (1 - missrate) * enemyMiss
  }
  return probability
})

function combinations(i){
  const fact = [1, 5, 10, 10, 5, 1]
  return fact[i]
}

exports.getSummonList = functions.https.onCall(() => {
  return summonFS.orderBy('updated', 'desc').get().then(querySnapShot => {
    let temp = []
    querySnapShot.forEach(doc => {
      temp.push(doc.data())
    })
    return temp
  })
})





