# Veterinaria San Marcos

Sitio web de tienda en línea y panel administrativo para la clínica veterinaria San Marcos.

Proyecto desarrollado para la **Evaluación Parcial N.º 1 (30%)** de la asignatura
**DSY1104 — Desarrollo Fullstack II**, Duoc UC.

---

## Cómo ejecutar el proyecto

No requiere instalación, dependencias ni servidor. Basta con clonar el repositorio y
abrir `index.html` en el navegador:


El panel administrador está en `admin/index.html`. En esta etapa no existe login real
ni protección de rutas, por lo que se accede directamente por su URL.

---

## Estructura del proyecto

```
veterinaria-san-marcos/
├── index.html                  Página principal (hero, video institucional, destacados)
├── productos.html              Catálogo de servicios veterinarios
├── detalle-producto.html       Detalle de un servicio + añadir al carrito
├── nosotros.html               Historia, equipo profesional y desarrolladores
├── carrito.html                Carrito de compras
├── registro.html               Registro de usuario
├── login.html                  Inicio de sesión
├── contacto.html               Formulario de contacto
├── blogs.html                  Listado de publicaciones
├── blog-detalle-1.html         Detalle de publicación #1
├── blog-detalle-2.html         Detalle de publicación #2
│
├── admin/                      Panel administrador (menú lateral vertical)
│   ├── index.html              Home del panel con resumen de totales
│   ├── productos.html          Listado de servicios + botón "Nuevo servicio"
│   ├── producto-nuevo.html     Alta de servicio
│   ├── producto-editar.html    Edición de servicio (mismo formulario)
│   ├── usuarios.html           Listado de usuarios + botón "Nuevo usuario"
│   ├── usuario-nuevo.html      Alta de usuario
│   └── usuario-editar.html     Edición de usuario (mismo formulario)
│
├── css/
│   ├── estilos.css             Hoja principal. Declara la paleta como variables :root
│   └── admin.css               Estilos del panel. Reutiliza las variables de estilos.css
│
├── js/
│   ├── servicios.js            Arreglo de servicios, render de catálogo/detalle y carrito
│   ├── cuentas.js              Validaciones de registro, login y contacto
│   └── admin.js                Datos de ejemplo, tablas y validaciones del panel
│
└── img/                        Imágenes del sitio
```

---

## Distribución del trabajo

El equipo se organizó en tres módulos independientes. Cada integrante trabajó sobre
sus propios archivos y registró sus commits en el repositorio remoto.

### Nicolás Ortega — Tienda pública: navegación y catálogo

| Archivo | Aporte |
|---|---|
| `index.html` | Página principal: menú de navegación con logo y carrito, componente hero con información e imagen de la clínica, video institucional embebido, listado de servicios destacados y pie de página. |
| `productos.html` | Vista de catálogo con la grilla completa de servicios y botón de añadir. |
| `detalle-producto.html` | Vista de detalle de un servicio, con descripción extendida, selector de cantidad y añadir al carrito. |
| `nosotros.html` | Historia de la clínica, equipo profesional y desarrolladores. |
| `carrito.html` | Carrito de compras con líneas, cantidades y total. |
| `css/estilos.css` | Hoja de estilos principal de todo el sitio: define la paleta como variables `:root`, la tipografía, el layout responsivo y los estados de error de formulario que reutilizan los demás módulos. |
| `js/servicios.js` | Arreglo de servicios veterinarios, render dinámico del catálogo y del detalle, y lógica completa del carrito con persistencia en `localStorage`. |

### Martin Vasquez — Tienda pública: cuentas y contacto

| Archivo | Aporte |
|---|---|
| `registro.html` | Formulario de registro de usuario, con etiquetas asociadas, atributos `autocomplete` y contenedores de error por campo. |
| `login.html` | Vista de inicio de sesión con logo y nombre de la empresa. |
| `contacto.html` | Formulario de contacto con contador de caracteres del comentario. |
| `blogs.html` | Listado de publicaciones con imagen, título y descripción corta. |
| `blog-detalle-1.html`, `blog-detalle-2.html` | Dos publicaciones de detalle con contenido extendido. |
| `js/cuentas.js` | Validaciones de los tres formularios: cálculo del dígito verificador del RUN por módulo 11, restricción de dominios de correo, longitudes máximas, confirmación de contraseña, selects dependientes de región y comuna, y mensajes de error personalizados junto a cada campo. |

### Justin Galleguillos — Panel administrador

| Archivo | Aporte |
|---|---|
| `admin/index.html` | Home del panel: menú lateral vertical presente en todas las vistas admin, saludo al administrador y tarjetas de resumen (servicios, usuarios y alertas de stock crítico). |
| `admin/productos.html` | Tabla de servicios con código, nombre, categoría, precio, stock, estado y acciones, más el botón "Nuevo servicio". |
| `admin/producto-nuevo.html`, `admin/producto-editar.html` | Formulario reutilizable de servicio (mismos `id`, distinto encabezado y texto de botón). |
| `admin/usuarios.html` | Tabla de usuarios con RUN, nombre, correo, tipo, comuna y acciones. |
| `admin/usuario-nuevo.html`, `admin/usuario-editar.html` | Formulario reutilizable de usuario. |
| `css/admin.css` | Estilos del panel: layout de menú lateral, tablas, insignias de estado, tarjetas y adaptación responsiva. Reutiliza las variables de color de `estilos.css` para mantener consistencia con la tienda. |
| `js/admin.js` | Arreglos de servicios y usuarios de ejemplo, render de ambas tablas, alerta de stock crítico en vivo, selects dependientes de las 16 regiones de Chile y validación completa de ambos formularios. |

---
