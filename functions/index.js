const functions = require('firebase-functions')
const admin = require('firebase-admin')
var serviceAccount = require("./vcabb-93eed8f5a141.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vcabb-2ef34.firebaseio.com"
})

exports.calculation = functions.https.onCall((data, context) => {
  let missnull = 1
  let missrate = 1
  let enemyChance = 0.35 || data.enemyChance
  let cards = data.cards
  console.log(data.cards[0].hasSkills)
  for(card in cards){
    console.log(card)
    if(cards[card].hasSkills == 1){
      console.log('hi')
      if(cards[card].type != 'null') missrate *= 1 - cards[card].proc
      else if(cards[card].type == 'null') missnull *= 1 - cards[card].proc
    }
  }

  return {
    winrate: 1 - missrate,
    missnull: missnull,
    missrate: missrate
  }
})
