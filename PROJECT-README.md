# Dashboard de Proyectos - shadcn/ui

## 🚀 Proyecto Completo Implementado

### Tecnologías
- Next.js 15 + TypeScript
- Tailwind CSS v4
- shadcn/ui (17 componentes)
- React Context para estado global
- date-fns para fechas

### ✅ Funcionalidades Implementadas

#### 📦 Componentes shadcn/ui Usados
- Spinner, Alert, Calendar, Pagination
- Button, Card, Dialog, Table, Badge, Avatar
- Form, Input, Label, Select, Switch
- Alert Dialog, Popover, Tabs, Checkbox

#### 1. Menú Resumen
✅ Métricas dinámicas (proyectos, tareas, horas, miembros)  
✅ Feed de actividad reciente

#### 2. Menú Proyectos
✅ Crear proyecto con selección de miembros del equipo  
✅ Ver detalles completos en modal  
✅ Eliminar con confirmación  
✅ Barra de progreso animada

#### 3. Menú Equipo (CRUD Completo)
✅ Crear miembro: userId, role, name, email, position, birthdate, phone, projectId, isActive  
✅ Calendar para fecha de nacimiento  
✅ Editar miembro  
✅ Eliminar con confirmación  
✅ Switch para estado activo/inactivo

#### 4. Menú Tareas (CRUD Completo + Paginación)
✅ Crear tarea: description, projectId, status, priority, userId, deadline  
✅ Calendar para fecha límite  
✅ Editar tarea  
✅ Eliminar con confirmación  
✅ Paginación (5 tareas por página)  
✅ Badges dinámicos de prioridad

#### 5. Menú Configuración
✅ Nombre del sitio, idioma, zona horaria, tema  
✅ Notificaciones (email, push) con Switches  
✅ Auto-guardado  
✅ Alert de éxito al guardar

### 🎨 Tema Personalizado
- Degradado índigo → púrpura → rosa
- Cards semi-transparentes con backdrop-blur
- Barras de progreso con degradado
- Efectos hover y transiciones suaves

### 🏗️ Arquitectura
- Context API para estado global
- TypeScript con interfaces completas
- Simulación de API con setTimeout
- Validaciones robustas
- Relaciones entre entidades

## 📦 Instalación

```bash
cd next-shadcn-ui
npm install
npm run dev
```

Abrir: **http://localhost:3000/dashboard**

## 🌐 Despliegue en Vercel

```bash
npm i -g vercel
vercel --prod
```

O conectar GitHub en [vercel.com](https://vercel.com)

## 📂 Estructura

```
src/
├── app/dashboard/page.tsx          # Dashboard principal
├── components/
│   ├── ui/                         # 17 componentes shadcn/ui
│   ├── ProjectFormNew.tsx
│   ├── ProjectDetails.tsx
│   ├── TeamMemberForm.tsx
│   ├── TaskForm.tsx
│   ├── TasksTableNew.tsx
│   └── SettingsForm.tsx
├── context/AppContext.tsx          # Estado global
└── types/index.ts                  # Interfaces
```

## 🔗 Enlaces

- **Repositorio GitHub**: [Agregar tu enlace]
- **Demo Vercel**: [Agregar tu enlace]

---

**Servidor corriendo en**: http://localhost:3001/dashboard  
**Fecha**: Noviembre 2025
