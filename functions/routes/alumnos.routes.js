const { Router } = require('express');
const router = Router()
const admin = require('firebase-admin')


const db = admin.firestore()

router.get('/api/alumnos', async (req, res) => {
    try {
        const query = db.collection("alumnos");
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            id: doc.id,
            nombre: doc.data().nombre,
            apellido: doc.data().apellido,
            edad: doc.data().edad,
            genero: doc.data().genero,
            promedio_pond: doc.data().promedio_pond,
        }));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json();
    }
})


router.post('/api/alumnos', async (req, res) => {
    try {
        const { nombre, apellido, edad, genero, promedio_pond } = req.body;
        const doc = await db.collection("alumnos").add({
            nombre,
            apellido,
            edad,
            genero,
            promedio_pond,
        });
        return res.status(200).json({
            id: doc.id,
            nombre,
            apellido,
            edad,
            genero,
            promedio_pond,
        });
    } catch (error) {
        return res.status(500).json();
    }
})

router.get('/api/alumnos/:alumno_id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection("alumnos").doc(req.params.alumno_id);
            const nombre = await doc.get()
            return res.status(200).json({ alumno: nombre.data() });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al obtener alumno' });
        }

    })();
})

router.delete('/api/alumnos/:alumno_id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection("alumnos").doc(req.params.alumno_id);
            await doc.delete();
            return res.status(200).json({ message: 'Alumno eliminado' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al eliminar alumno' });
        }

    })();
})

router.put('/api/alumnos/:alumno_id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection("alumnos").doc(req.params.alumno_id);
            await doc.update({ nombre: req.body.nombre, apellido: req.body.apellido, edad: req.body.edad, genero: req.body.genero, promedio_pond: req.body.promedio_pond });
            return res.status(200).json({ message: 'Alumno actualizado' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al actualizar alumno' });
        }

    })();
})

module.exports = router;