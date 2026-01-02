const admin = require('firebase-admin');
(async function () {
    try {
        const serviceAccount = process.env.firebaseserviceAC
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
    } catch (err) {
        console.error(err);
    }

})();

module.exports = admin;


