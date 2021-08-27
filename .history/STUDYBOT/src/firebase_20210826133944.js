import firebase from 'firebase'

// const firebaseConfig = {
//     apiKey: "AIzaSyCFlLXLNEnUkDIoZMlz-eN6aLdxel5uBsk",
//     authDomain: "studybot-60277.firebaseapp.com",
//     projectId: "studybot-60277",
//     storageBucket: "studybot-60277.appspot.com",
//     messagingSenderId: "815831852711",
//     appId: "1:815831852711:web:6fb801b533d33eaccc5d82",
//     measurementId: "G-DT1FQXXZ3J"
// };


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCFlLXLNEnUkDIoZMlz-eN6aLdxel5uBsk",
    authDomain: "studybot-60277.firebaseapp.com",
    projectId: "studybot-60277",
    storageBucket: "studybot-60277.appspot.com",
    messagingSenderId: "815831852711",
    appId: "1:815831852711:web:6fb801b533d33eaccc5d82",
    measurementId: "G-DT1FQXXZ3J"
})

const db = firebaseApp.firestore()

export default db;