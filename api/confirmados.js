const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG);

// Inicializar Firebase solo una vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const snapshot = await db.collection('confirmaciones')
      .orderBy('timestamp', 'desc')
      .get();
    const confirmados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(confirmados);
  } catch (error) {
    console.error('Error detallado al obtener confirmados:', error);
    res.status(500).json({ error: error.message, fullError: error.toString() });
  }
}; 