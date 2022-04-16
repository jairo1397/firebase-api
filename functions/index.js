const functions = require("firebase-functions");
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors({ origin: true }));

var serviceAccount = require("./crud-53510-firebase-adminsdk-ssb9w-599fa47b01.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://crud-53510-default-rtdb.firebaseio.com"
})
app.get('', (req, res) => {
    return res.status(200).json({ message: 'Bienvenido a la api del sistema de monitoreo' })
});

app.use(require('./routes/tutores.routes'));
app.use(require('./routes/alumnos.routes'));
app.use(require('./routes/tutorias.routes'));
app.use(require('./routes/acuerdos.routes'));
exports.app = functions.https.onRequest(app);
