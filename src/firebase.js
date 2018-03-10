import firebase from 'firebase'

const config = {
    apiKey: "YOU API KEY",
    authDomain: "DOMAIN",
    databaseURL: "DATABASE URL",
    projectId: "PROJECT ID",
    storageBucket: "STORAGE BUCKET",
    messagingSenderId: "ID"
}
firebase.initializeApp(config)

export default firebase