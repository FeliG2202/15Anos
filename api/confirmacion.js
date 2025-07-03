const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG);

console.log('ENV:', {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: typeof process.env.FIREBASE_PRIVATE_KEY,
});

// Inicializar Firebase solo una vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    let { nombres, confirmacion, acompanante, total } = req.body;
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
}; 