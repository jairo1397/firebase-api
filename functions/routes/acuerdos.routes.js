const { Router } = require('express');
const router = Router()
const admin = require('firebase-admin')


const db = admin.firestore()

router.get('/api/acuerdos', async (req, res) => {
    try {
        const query = db.collection("acuerdos");
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            id: doc.id,
            descripcion: doc.data().descripcion,
        }));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json();
    }
})

router.post('/api/acuerdos', async (req, res) => {
    try {
        const { descripcion } = req.body;
        const doc = await db.collection("acuerdos").add({
            descripcion,
        });
        return res.status(200).json({
            id: doc.id,
            descripcion,
        });
    } catch (error) {
        return res.status(500).json();
    }
})




module.exports = router;