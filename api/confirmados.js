import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

const serviceAccountPath = join(process.cwd(), 'backend', 'serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'itza15anos',
  });
}
const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method === 'GET') {
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
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
} 