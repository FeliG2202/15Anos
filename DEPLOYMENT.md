# 🚀 Guía de Despliegue en Vercel

## 📋 Pasos para Desplegar en Vercel

### 1. **Preparar el Repositorio**

Asegúrate de que tu código esté en un repositorio de GitHub, GitLab o Bitbucket.

### 2. **Configurar Variables de Entorno en Vercel**

1. **Ve a [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Crea un nuevo proyecto** o selecciona uno existente
3. **Conecta tu repositorio** de GitHub/GitLab/Bitbucket
4. **En la configuración del proyecto:**
   - Ve a **Settings** → **Environment Variables**
   - Agrega la siguiente variable:

   ```
   Nombre: FIREBASE_ADMIN_SDK_CONFIG
   Valor: [Ejecuta 'npm run prepare-vercel' para obtener el valor correcto]
   ```

5. **Selecciona todos los entornos:**
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

6. **Guarda la variable**

### 3. **Configuración del Proyecto**

1. **Framework Preset:** `Other`
2. **Build Command:** `npm install`
3. **Output Directory:** `public`
4. **Install Command:** `npm install`

### 4. **Desplegar**

1. **Haz clic en "Deploy"**
2. **Espera a que termine el despliegue**
3. **Tu aplicación estará disponible en:** `https://tu-proyecto.vercel.app`

### 5. **Verificar que Funciona**

1. **Visita tu aplicación:** `https://tu-proyecto.vercel.app`
2. **Prueba la API:** `https://tu-proyecto.vercel.app/api/test`
3. **Deberías ver:** `{"message":"Conexión con Firebase exitosa","mode":"firebase"}`

## 🔧 **Solución de Problemas**

### Error: "Cannot find module"
- Verifica que `package.json` esté en la raíz del proyecto
- Asegúrate de que todas las dependencias estén listadas

### Error: "Firebase authentication failed"
- Verifica que la variable `FIREBASE_ADMIN_SDK_CONFIG` esté configurada correctamente
- Asegúrate de que el JSON esté en una sola línea
- Verifica que las credenciales de Firebase sean válidas

### Error: "Port already in use"
- Este error solo ocurre en desarrollo local, no en Vercel
- En Vercel, el puerto se asigna automáticamente

## 📁 **Estructura del Proyecto para Vercel**

```
├── backend/
│   └── index.js              # Servidor Express
├── public/
│   ├── index.html            # Página principal
│   ├── styles.css            # Estilos
│   ├── script.js             # JavaScript
│   └── img/                  # Imágenes
├── package.json              # Dependencias
├── vercel.json               # Configuración de Vercel
└── .gitignore                # Archivos ignorados
```

## 🎯 **Comandos Útiles**

```bash
# Generar configuración para Vercel
npm run prepare-vercel

# Desarrollo local
npm start

# Verificar configuración
curl http://localhost:3000/api/test
```

## ✅ **Verificación Final**

Después del despliegue, verifica que:

- ✅ La página web se muestra correctamente
- ✅ Los estilos CSS se cargan
- ✅ Las imágenes se muestran
- ✅ El formulario de confirmación funciona
- ✅ La API responde correctamente
- ✅ Firebase está conectado

¡Tu aplicación estará lista para usar! 🎉 