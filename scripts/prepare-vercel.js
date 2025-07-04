#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Leer el archivo de credenciales de Firebase
const serviceAccountPath = path.join(__dirname, '../backend/serviceAccountKey.json');

try {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  
  // Convertir a una sola línea JSON para Vercel
  const singleLineJson = JSON.stringify(serviceAccount);
  
  console.log('=== CONFIGURACIÓN PARA VERCEL ===');
  console.log('');
  console.log('1. Ve a tu proyecto en Vercel Dashboard');
  console.log('2. En Settings → Environment Variables');
  console.log('3. Agrega la siguiente variable:');
  console.log('');
  console.log('   Nombre: FIREBASE_ADMIN_SDK_CONFIG');
  console.log('   Valor: (copia la línea de abajo)');
  console.log('');
  console.log('='.repeat(80));
  console.log(singleLineJson);
  console.log('='.repeat(80));
  console.log('');
  console.log('4. Selecciona todos los entornos (Production, Preview, Development)');
  console.log('5. Guarda la variable');
  console.log('');
  console.log('=== INSTRUCCIONES ADICIONALES ===');
  console.log('');
  console.log('Para verificar que funciona:');
  console.log('1. Despliega tu aplicación en Vercel');
  console.log('2. Visita: https://tu-app.vercel.app/api/test');
  console.log('3. Deberías ver un JSON con la confirmación de conexión');
  console.log('');
  
} catch (error) {
  console.error('Error al leer el archivo de credenciales:', error.message);
  console.log('');
  console.log('Asegúrate de que el archivo backend/serviceAccountKey.json existe');
  process.exit(1);
} 