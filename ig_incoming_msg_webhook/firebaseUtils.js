const serviceAccount = require('./googleServiceAccountKey.json');

function initializeFirebaseApp(admin) {
  // Initialize the Firebase app with the service account key
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
}

module.exports = {
  initializeFirebaseApp
};