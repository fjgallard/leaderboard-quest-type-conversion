const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://leaderboard-79b77.firebaseio.com"
});

// 1. Get PlayerQuest Collection
let db = admin.firestore();
let playerQuests = db.collection('playerQuests');
// 2. Set Types depending on required property
playerQuests.get().then(snapshot => {
  snapshot.forEach(doc => {
    const required = doc.get('required');
    const type = doc.get('type');
    if (type) {
      return;
    }
    else {
      doc.ref.update({
        type: required ? 'Required' : 'Additional'
      })
    }
  })
});
