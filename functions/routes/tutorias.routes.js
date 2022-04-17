const { Router } = require('express');
const router = Router()
const admin = require('firebase-admin')


const db = admin.firestore()

router.get('/api/tutorias', async (req, res) => {
    try {
        const query = db.collection("tutorias");
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            id: doc.id,
            tutor: doc.data().tutor,
            alumno: doc.data().alumno,
            fecha: doc.data().fecha,
            hora: doc.data().hora,
            reunion: doc.data().reunion,
            grabacion: doc.data().grabacion,
            acuerdos: doc.data().acuerdos,
        }));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json();
    }
})

router.post('/api/tutorias', async (req, res) => {
    try {
        const { tutor, alumno, fecha, hora, reunion, grabacion, acuerdos } = req.body;
        const doc = await db.collection("tutorias").add({
            tutor,
            alumno,
            fecha,
            hora,
            reunion,
            grabacion,
            acuerdos,
        });
        return res.status(200).json({
            id: doc.id,
            tutor,
            alumno,
            fecha,
            hora,
            reunion,
            grabacion,
            acuerdos,
        });
    } catch (error) {
        return res.status(500).json();
    }

})

router.get('/api/tutorias/:tutoria_id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection("tutorias").doc(req.params.tutoria_id);
            const nombre = await doc.get()
            return res.status(200).json({ tutoria: nombre.data() });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al obtener tutoria' });
        }

    })();
})

router.put('/api/tutorias/:tutoria_id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection("tutorias").doc(req.params.alumno_id);
            await doc.update({ tutor: req.body.tutor, alumno: req.body.alumno, fecha: req.body.fecha, hora: req.body.hora, reunion: req.body.reunion, grabacion: req.body.grabacion, acuerdos: req.body.acuerdos });
            return res.status(200).json({ message: 'Tutoria actualizado' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al actualizar la tutoria' });
        }

    })();
})




module.exports = router;