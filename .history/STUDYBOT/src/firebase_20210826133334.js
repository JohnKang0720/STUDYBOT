import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// const firebaseConfig = {
//     apiKey: "AIzaSyCFlLXLNEnUkDIoZMlz-eN6aLdxel5uBsk",
//     authDomain: "studybot-60277.firebaseapp.com",
//     projectId: "studybot-60277",
//     storageBucket: "studybot-60277.appspot.com",
//     messagingSenderId: "815831852711",
//     appId: "1:815831852711:web:6fb801b533d33eaccc5d82",
//     measurementId: "G-DT1FQXXZ3J"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCFlLXLNEnUkDIoZMlz-eN6aLdxel5uBsk",
    authDomain: "studybot-60277.firebaseapp.com",
    projectId: "studybot-60277",
    storageBucket: "studybot-60277.appspot.com",
    messagingSenderId: "815831852711",
    appId: "1:815831852711:web:6fb801b533d33eaccc5d82",
    measurementId: "G-DT1FQXXZ3J"
}
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;