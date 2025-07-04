# Invitación XV Años - Itza

Aplicación web para la invitación de XV años de Itza Valentina Gavilan Castaño.

## 🚀 Configuración Rápida

### Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar el servidor:**
   ```bash
   npm start
   ```

3. **Acceder a la aplicación:**
   - Abre tu navegador en: `http://localhost:3000`

### Despliegue en Vercel

1. **Preparar configuración de Firebase:**
   ```bash
   npm run prepare-vercel
   ```

2. **Configurar variable de entorno en Vercel:**
   - Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
   - En la sección "Settings" → "Environment Variables"
   - Agrega la variable: `FIREBASE_ADMIN_SDK_CONFIG`
   - Como valor, copia el JSON que se muestra al ejecutar `npm run prepare-vercel`

3. **Desplegar:**
   - Conecta tu repositorio a Vercel
   - El despliegue se realizará automáticamente

## 🔧 Configuración Detallada

### Firebase Setup

La aplicación está configurada para usar Firebase Firestore para almacenar las confirmaciones de asistencia.

**Para desarrollo local:**
- El archivo `backend/serviceAccountKey.json` ya está configurado
- El servidor usará automáticamente este archivo

**Para producción (Vercel):**
- Usa la variable de entorno `FIREBASE_ADMIN_SDK_CONFIG`
- Ejecuta `npm run prepare-vercel` para obtener el valor correcto

### Estructura del Proyecto

```
├── backend/
│   ├── index.js                 # Servidor Express + API
│   └── serviceAccountKey.json   # Credenciales Firebase (solo desarrollo)
├── public/
│   ├── index.html              # Página principal
│   ├── styles.css              # Estilos CSS
│   ├── script.js               # JavaScript del frontend
│   └── img/                    # Imágenes
├── scripts/
│   └── prepare-vercel.js       # Script para preparar configuración Vercel
├── package.json                # Dependencias y scripts
├── vercel.json                 # Configuración de Vercel
└── README.md                   # Este archivo
```

## 📡 API Endpoints

- `POST /api/confirmacion` - Guardar confirmación de asistencia
- `GET /api/confirmados` - Obtener lista de confirmaciones
- `GET /api/test` - Probar conexión con Firebase

### Ejemplo de uso de la API:

```javascript
// Guardar confirmación
fetch('/api/confirmacion', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombres: 'Juan Pérez',
    confirmacion: 'Sí',
    acompanante: 'Sí',
    total: 2
  })
});

// Obtener confirmaciones
fetch('/api/confirmados')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 🎨 Características

- ✅ Página de invitación elegante y responsiva
- ✅ Contador regresivo para el evento
- ✅ Galería de fotos con modal
- ✅ Formulario de confirmación de asistencia
- ✅ Integración con Firebase Firestore
- ✅ Soporte para desarrollo local y producción
- ✅ Configuración automática para Vercel
- ✅ API RESTful para confirmaciones
- ✅ Diseño moderno y animaciones

## 🛠️ Scripts Disponibles

- `npm start` - Iniciar servidor de desarrollo
- `npm run dev` - Alias para `npm start`
- `npm run prepare-vercel` - Generar configuración para Vercel

## 🔍 Solución de Problemas

### Error de autenticación de Firebase
Si ves el error "UNAUTHENTICATED: Request had invalid authentication credentials":

1. **En desarrollo local:** Verifica que `backend/serviceAccountKey.json` existe y es válido
2. **En Vercel:** Verifica que la variable `FIREBASE_ADMIN_SDK_CONFIG` está configurada correctamente

### La página no se muestra
1. Verifica que el servidor está ejecutándose: `npm start`
2. Accede a `http://localhost:3000`
3. Revisa los logs del servidor para errores

### API no responde
1. Verifica que las rutas de la API están antes de los archivos estáticos
2. Prueba el endpoint de test: `http://localhost:3000/api/test`
3. Revisa la configuración de Firebase

## 📝 Notas de Despliegue

- El archivo `vercel.json` está configurado para manejar correctamente las rutas de la API
- Las credenciales de Firebase están protegidas en `.gitignore`
- La aplicación funciona tanto en desarrollo local como en producción 