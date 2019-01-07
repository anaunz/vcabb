import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'

const config = {
  apiKey: "AIzaSyCSMZDXaPaxWBfqJ3d7xZbIex6JNrdgOrU",
  authDomain: "vcabb-2ef34.firebaseapp.com",
  databaseURL: "https://vcabb-2ef34.firebaseio.com",
  projectId: "vcabb-2ef34",
  storageBucket: "vcabb-2ef34.appspot.com",
  messagingSenderId: "649981047220"
}

const firebaseApp = firebase.initializeApp(config)

firebase.firestore().settings({
  timestampsInSnapshots: true
})

export default firebaseApp
