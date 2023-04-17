const firebase = require('firebase');
const config = require('./config');
const dbFirebase = firebase.initializeApp(config.firebaseConfig);
module.exports = dbFirebase;