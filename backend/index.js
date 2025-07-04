const express = require('express');
const cors = require('cors');
const path = require('path');

// Configuración de Firebase - Soporta tanto desarrollo local como producción
let serviceAccount;
let db = null;
let admin = null;
let firebaseEnabled = false;

try {
  if (process.env.FIREBASE_ADMIN_SDK_CONFIG) {
    // Para producción (Vercel) - usar variable de entorno
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG);
    console.log('Usando configuración de Firebase desde variables de entorno');
  } else {
    // Para desarrollo local - usar archivo JSON
    serviceAccount = require('./serviceAccountKey.json');
    console.log('Usando configuración de Firebase desde archivo local');
  }

  // Inicializar Firebase Admin SDK
  admin = require('firebase-admin');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id || "itza15anos",
  });
  console.log('Firebase Admin SDK inicializado correctamente');
  db = admin.firestore();
  firebaseEnabled = true;
} catch (error) {
  console.error('Error al cargar configuración de Firebase:', error.message);
  console.log('⚠️  Modo sin Firebase activado - Las confirmaciones se guardarán en memoria');
  console.log('💡 Para habilitar Firebase, verifica las credenciales en backend/serviceAccountKey.json');
  firebaseEnabled = false;
}

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTANTE: Las rutas de la API deben ir ANTES de servir archivos estáticos

// Almacenamiento temporal en memoria (solo para desarrollo sin Firebase)
let confirmacionesTemp = [];

// Endpoint para guardar confirmación
app.post('/api/confirmacion', async (req, res) => {
  try {
    let { nombres, confirmacion, acompanante, total } = req.body;
    // Forzar a string 'Sí' o 'No' por si el frontend envía booleanos
    confirmacion = confirmacion === true ? 'Sí' : (confirmacion === false ? 'No' : confirmacion);
    acompanante = acompanante === true ? 'Sí' : (acompanante === false ? 'No' : acompanante);
    
    const confirmacionData = {
      nombres,
      confirmacion,
      acompanante,
      total,
      timestamp: new Date().toISOString()
    };

    if (firebaseEnabled && db) {
      try {
        // Usar Firebase si está disponible
        const docRef = await db.collection('confirmaciones').add({
          ...confirmacionData,
          timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('Confirmación guardada en Firebase con ID:', docRef.id);
        res.status(200).json({ message: 'Confirmación guardada exitosamente en Firebase', id: docRef.id });
        return;
      } catch (firebaseError) {
        console.error('Error de Firebase, usando modo temporal:', firebaseError.message);
        firebaseEnabled = false;
      }
    }
    
    // Usar almacenamiento temporal
    const id = Date.now().toString();
    confirmacionesTemp.push({ id, ...confirmacionData });
    console.log('Confirmación guardada en memoria con ID:', id);
    res.status(200).json({ 
      message: 'Confirmación guardada exitosamente (modo temporal)', 
      id: id,
      warning: 'Los datos se guardan en memoria temporal. Configura Firebase para persistencia.'
    });
  } catch (error) {
    console.error('Error al guardar confirmación:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener confirmados
app.get('/api/confirmados', async (req, res) => {
  try {
    if (firebaseEnabled && db) {
      try {
        // Usar Firebase si está disponible
        const snapshot = await db.collection('confirmaciones')
          .orderBy('timestamp', 'desc')
          .get();
        
        const confirmados = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          timestamp: doc.data().timestamp ? doc.data().timestamp.toDate().toISOString() : null
        }));
        
        console.log(`Se obtuvieron ${confirmados.length} confirmaciones de Firebase`);
        res.status(200).json(confirmados);
        return;
      } catch (firebaseError) {
        console.error('Error de Firebase, usando modo temporal:', firebaseError.message);
        firebaseEnabled = false;
      }
    }
    
    // Usar almacenamiento temporal
    const confirmados = confirmacionesTemp.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    console.log(`Se obtuvieron ${confirmados.length} confirmaciones de memoria temporal`);
    res.status(200).json(confirmados);
  } catch (error) {
    console.error('Error detallado al obtener confirmados:', error);
    res.status(500).json({ error: error.message, fullError: error.toString() });
  }
});

// Endpoint de prueba para verificar conexión
app.get('/api/test', async (req, res) => {
  try {
    if (firebaseEnabled && db) {
      try {
        // Probar Firebase si está disponible
        const testDoc = await db.collection('test').doc('connection').get();
        res.status(200).json({ 
          message: 'Conexión con Firebase exitosa',
          timestamp: new Date().toISOString(),
          projectId: serviceAccount.project_id,
          mode: 'firebase'
        });
        return;
      } catch (firebaseError) {
        console.error('Error de Firebase, usando modo temporal:', firebaseError.message);
        firebaseEnabled = false;
      }
    }
    
    // Modo sin Firebase
    res.status(200).json({ 
      message: 'Servidor funcionando en modo temporal (sin Firebase)',
      timestamp: new Date().toISOString(),
      mode: 'temporary',
      warning: 'Configura Firebase para funcionalidad completa'
    });
  } catch (error) {
    console.error('Error en test de conexión:', error);
    res.status(500).json({ 
      error: error.message,
      mode: 'error',
      suggestion: 'Verifica las credenciales de Firebase'
    });
  }
});

// Servir archivos estáticos desde el directorio public
app.use(express.static(path.join(__dirname, '../public')));

// Redireccionar la ruta raíz a la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Manejar todas las demás rutas para SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  if (firebaseEnabled && db) {
    console.log(`🔥 Firebase conectado - Proyecto: ${serviceAccount.project_id}`);
  } else {
    console.log(`⚠️  Modo temporal activado - Sin Firebase`);
    console.log(`💡 Ejecuta 'npm run prepare-vercel' para configurar Firebase`);
  }
});

module.exports = app; 