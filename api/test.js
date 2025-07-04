const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG);

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
    const testDoc = await db.collection('test').doc('connection').get();
    res.status(200).json({
      message: 'Conexión con Firebase exitosa',
      timestamp: new Date().toISOString(),
      projectId: serviceAccount.project_id,
      mode: 'firebase'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 