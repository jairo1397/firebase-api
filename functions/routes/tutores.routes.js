const { Router } = require('express');
const router = Router()
const admin = require('firebase-admin')


const db = admin.firestore()

router.get('/api/tutores', async (req, res) => {
    try {
        const query = db.collection("tutores");
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            id: doc.id,
            nombres: doc.data().nombres,
            apellidos: doc.data().apellidos,
        }));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json();
    }
})



router.get('/api/tutores/:tutor_id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection("tutores").doc(req.params.tutor_id);
            const nombre = await doc.get()
            return res.status(200).json({ tutor: nombre.data() });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al obtener tutor' });
        }

    })();
})





module.exports = router;