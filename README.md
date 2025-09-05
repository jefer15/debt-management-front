# Debt Management Front

Frontend de la aplicación **Gestión de Deudas**, desarrollado en **Angular 17**.  
Permite a los usuarios **registrarse, iniciar sesión, listar deudas, crear nuevas, ver detalles, editarlas, eliminarlas y marcarlas como pagadas**.  

---

## Tecnologías utilizadas

- **Angular 17**  
- **TailwindCSS** – estilos modernos y responsivos  
- **Angular Material** – componentes UI listos para producción  
- **SweetAlert2** – alertas y notificaciones  
- **RxJS** – manejo de estados y observables  

---

## Estructura del proyecto

```
src/
├── app
│   ├── core
│   │   ├── guard/          # Guards de autenticación
│   │   ├── interceptor/    # Interceptores HTTP
│   │   ├── models/         # Modelos (auth, debt)
│   │   └── services/       # Servicios (auth, debt)
│   └── features
│       ├── auth            # Módulo de autenticación
│       │   ├── login       # Pantalla de login
│       │   └── register    # Pantalla de registro
│       └── debt            # Módulo de gestión de deudas
│           ├── debt-detail # Vista detalle de deuda
│           └── debt-form   # Formulario de deuda
├── assets/                 # Recursos estáticos
└── environments/           # Configuración de entornos
```

---

## Instalación y ejecución local

### Clonar el repositorio
```bash
git clone https://github.com/jefer15/debt-management-front.git
cd debt-management-front
```

### Instalar dependencias
```bash
npm install
```

### Ejecutar en modo desarrollo
```bash
npm start
```
---

## Funcionalidades principales

✔️ Pantalla de **Login/Registro**  
✔️ **Listado de deudas** con filtros (pendientes/pagadas)  
✔️ **Formulario** para crear/editar deudas  
✔️ **Vista de detalle** de una deuda  
✔️ Marcar una deuda como **pagada**  
✔️ UI moderna, minimalista y responsiva  

---

## Decisiones técnicas

- **Arquitectura modular**: separación entre `core` (servicios, guards, modelos) y `features` (funcionalidades).  
- **Lazy loading de componentes**: mejora rendimiento cargando solo lo necesario.  
- **Guards de autenticación**: protección de rutas.  
- **Servicios centralizados**: manejo de autenticación y deudas desacoplado de la UI.  
- **TailwindCSS + Angular Material**: combinación para lograr una UI moderna y productiva.  
