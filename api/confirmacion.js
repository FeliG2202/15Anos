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
  if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
} 