const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://leaderboard-79b77.firebaseio.com"
});

// 1. Get PlayerQuest Collection
let db = admin.firestore();
let playerQuests = db.collection('playerQuests');

// 2. For every playerquest, remove the required property
playerQuests.get().then(snapshot => {
  snapshot.forEach(doc => {

    doc.ref.update({
      required: admin.firestore.FieldValue.delete()
    });
  });
});
