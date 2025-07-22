// config/firebase.js
const admin = require('firebase-admin');
const path = require('path');

// Path to the service account key JSON file
const serviceAccount = path.join(__dirname, 'student-registration-service-account.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Firestore automatically uses the default database, no need for databaseURL
});

const db = admin.firestore();  // Reference to Firestore

module.exports = db;
