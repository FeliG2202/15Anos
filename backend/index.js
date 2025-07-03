const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "itza15anos",
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para guardar confirmación
app.post('/api/confirmacion', async (req, res) => {
  try {
    let { nombres, confirmacion, acompanante, total } = req.body;
    // Forzar a string 'Sí' o 'No' por si el frontend envía booleanos
    confirmacion = confirmacion === true ? 'Sí' : (confirmacion === false ? 'No' : confirmacion);
    acompanante = acompanante === true ? 'Sí' : (acompanante === false ? 'No' : acompanante);
    await db.collection('confirmaciones').add({
      nombres,
      confirmacion,
      acompanante,
      total,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(200).json({ message: 'Confirmación guardada' });
  } catch (error) {
    console.error('Error al guardar confirmación:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener confirmados
app.get('/api/confirmados', async (req, res) => {
  try {
    // Traer todas las confirmaciones, sin filtrar
    const snapshot = await db.collection('confirmaciones')
      .orderBy('timestamp', 'desc')
      .get();
    const confirmados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(confirmados);
  } catch (error) {
    console.error('Error detallado al obtener confirmados:', error); // Aquí, imprime el objeto 'error' completo
    res.status(500).json({ error: error.message, fullError: error.toString() }); // Envía más info si es necesario
  }
});


// Servir frontend (opcional)
app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 