import firebase from 'firebase'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCFlLXLNEnUkDIoZMlz-eN6aLdxel5uBsk",
    authDomain: "studybot-60277.firebaseapp.com",
    projectId: "studybot-60277",
    storageBucket: "studybot-60277.appspot.com",
    messagingSenderId: "815831852711",
    appId: "1:815831852711:web:1249cacb441b28edcc5d82",
    measurementId: "G-0XHKVQ6DG6"
})

const db = firebaseApp.firestore()

export default db;