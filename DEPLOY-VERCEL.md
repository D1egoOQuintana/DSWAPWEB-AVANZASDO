# 🚀 Guía de Despliegue en Vercel

## Opción 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Subir el código a GitHub

```bash
# En la carpeta del proyecto
cd c:\Users\Luis\next-shadcn-ui

# Inicializar git (si no está inicializado)
git init

# Agregar archivos
git add .

# Commit
git commit -m "Dashboard completo con shadcn/ui"

# Crear repositorio en GitHub
# Ve a github.com y crea un nuevo repositorio llamado "dashboard-shadcn-ui"

# Agregar remote y push
git remote add origin https://github.com/TU-USUARIO/dashboard-shadcn-ui.git
git branch -M main
git push -u origin main
```

### Paso 2: Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Add New Project"
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio "dashboard-shadcn-ui"
5. Vercel detectará automáticamente que es Next.js
6. Haz clic en "Deploy"
7. Espera 1-2 minutos
8. ✅ ¡Listo! Copia tu URL de producción

**Tu app estará en**: `https://dashboard-shadcn-ui-tu-usuario.vercel.app`

---

## Opción 2: Despliegue con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login en Vercel

```bash
vercel login
```

### Paso 3: Desplegar

```bash
# En la carpeta del proyecto
cd c:\Users\Luis\next-shadcn-ui

# Desplegar a preview
vercel

# Desplegar a producción
vercel --prod
```

Sigue las instrucciones en la terminal y ¡listo!

---

## 📝 Configuración Adicional (Opcional)

### Variables de Entorno

Si necesitas agregar variables de entorno:

1. En Vercel Dashboard → Tu proyecto → Settings → Environment Variables
2. Agrega tus variables (ejemplo: `DATABASE_URL`, `API_KEY`)
3. Redeploy el proyecto

### Dominio Personalizado

1. En Vercel Dashboard → Tu proyecto → Settings → Domains
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones de Vercel

---

## 🔄 Actualizaciones Automáticas

Una vez conectado con GitHub:
- Cada `git push` desplegará automáticamente a preview
- Cada merge a `main` desplegará a producción
- Vercel crea URLs únicas para cada commit (preview deployments)

---

## ✅ Verificación Post-Despliegue

Después del despliegue, verifica:

1. **Página principal carga**: Abre `/dashboard`
2. **Crear proyecto funciona**: Botón "Nuevo Proyecto"
3. **Navegación tabs funciona**: Cambia entre secciones
4. **CRUD funciona**: Crea, edita, elimina en todas las secciones
5. **Responsive funciona**: Abre en móvil

---

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
# Reinstalar dependencias y desplegar
npm install
vercel --prod
```

### Error de Build
- Revisa los logs en Vercel Dashboard
- Asegúrate que no hay errores de TypeScript: `npm run build`

### Componentes no se muestran
- Verifica que todos los archivos `.tsx` estén committeados
- Revisa que la carpeta `src/components/ui` esté completa

---

## 📦 Archivos Necesarios para Vercel

Asegúrate que estos archivos estén en tu repo:

```
✅ package.json
✅ next.config.ts
✅ tsconfig.json
✅ components.json
✅ src/ (toda la carpeta)
```

**NO subir**:
```
❌ node_modules/
❌ .next/
❌ .env.local (si tienes secrets)
```

---

## 🎉 ¡Listo!

Tu dashboard estará disponible en línea 24/7 de forma gratuita en Vercel.

**Comparte tu URL**:
```
https://tu-proyecto.vercel.app/dashboard
```

---

## 📱 Ejemplo de URL Final

```
Repositorio: https://github.com/tu-usuario/dashboard-shadcn-ui
Aplicación: https://dashboard-shadcn-ui.vercel.app/dashboard
```

---

**Nota**: Vercel ofrece hosting gratis para proyectos personales con:
- Despliegues ilimitados
- SSL automático
- CDN global
- Builds automáticos
