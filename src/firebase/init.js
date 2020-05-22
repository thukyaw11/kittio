import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBac5NaU_4-4nxN7VQ-ORTloNMUhm30LXs",
    authDomain: "dev-meet-1a9ef.firebaseapp.com",
    databaseURL: "https://dev-meet-1a9ef.firebaseio.com",
    projectId: "dev-meet-1a9ef",
    storageBucket: "gs://dev-meet-1a9ef.appspot.com",
    messagingSenderId: "413274064631",
    appId: "1:413274064631:web:d47ee57dc4ed4b8ba675f2",
    measurementId: "G-5J8GMW2V60"
}

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;