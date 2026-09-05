const servicios = [
  {
    codigo: 'SV001',
    categoria: 'Consultas',
    nombre: 'Consulta general',
    especie: 'Perro / Gato',
    duracion: '30 min',
    precio: 15000,
    descripcion:
      'Revisión general del estado de salud de tu mascota, con orientación sobre cuidados y controles preventivos.',
    imagen: 'img/consulta-general.jpg',
  },
  {
    codigo: 'VA001',
    categoria: 'Vacunación',
    nombre: 'Vacuna antirrábica canina',
    especie: 'Perro',
    duracion: '10 min',
    precio: 12000,
    descripcion:
      'Vacuna obligatoria por ley que protege a tu perro contra la rabia. Aplicación rápida, sin necesidad de ayuno previo.',
    imagen: 'img/vacuna-antirrabica.jpg',
  },
  {
    codigo: 'VA003',
    categoria: 'Vacunación',
    nombre: 'Vacuna bivalente felina',
    especie: 'Gato',
    duracion: '10 min',
    precio: 15000,
    descripcion:
      'Refuerzo anual que protege a tu gato frente a las enfermedades virales felinas más comunes.',
    imagen: 'img/vacuna-felina.jpg',
  },
  {
    codigo: 'CI002',
    categoria: 'Cirugía',
    nombre: 'Esterilización macho canino',
    especie: 'Perro',
    duracion: '60 min',
    precio: 60000,
    descripcion:
      'Cirugía de esterilización con anestesia incluida, realizada por nuestro equipo veterinario en pabellón propio.',
    imagen: 'img/cirugia-canina.jpg',
  },
  {
    codigo: 'DE002',
    categoria: 'Desparasitación',
    nombre: 'Desparasitación interna mediana',
    especie: 'Perro',
    duracion: '5 min',
    precio: 9500,
    descripcion:
      'Tratamiento antiparasitario interno para perros de 10 a 25 kg, recomendado cada tres meses.',
    imagen: 'img/desparasitacion.jpg',
  },
  {
    codigo: 'EX003',
    categoria: 'Exámenes',
    nombre: 'Radiografía (1 proyección)',
    especie: 'Perro / Gato',
    duracion: '20 min',
    precio: 28000,
    descripcion:
      'Imagen radiográfica de apoyo diagnóstico, entregada con informe del médico veterinario tratante.',
    imagen: 'img/radiografia.jpg',
  },
  {
    codigo: 'OT001',
    categoria: 'Otros',
    nombre: 'Corte de uñas',
    especie: 'Perro / Gato',
    duracion: '15 min',
    precio: 5000,
    descripcion:
      'Servicio rápido de higiene, recomendado cada 3 a 4 semanas para mascotas de vida principalmente interior.',
    imagen: 'img/corte-unas.jpg',
  },
  {
    codigo: 'OT003',
    categoria: 'Otros',
    nombre: 'Microchip de identificación',
    especie: 'Perro / Gato',
    duracion: '10 min',
    precio: 15000,
    descripcion:
      'Implante de microchip subcutáneo con registro incluido, para facilitar la identificación de tu mascota.',
    imagen: 'img/microchip.jpg',
  },
];

// Formateador de precios.
function formatearPrecio(valor) {
  return valor.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });
}

// Busca un servicio por su código. Devuelve undefined si no existe.
function buscarServicioPorCodigo(codigo) {
  return servicios.find((servicio) => servicio.codigo === codigo);
}

// ---------- Catálogo (productos.html) ----------

function crearTarjetaServicio(servicio) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'tarjeta-servicio';

  tarjeta.innerHTML = `
    <img class="tarjeta-servicio__imagen" src="${servicio.imagen}" alt="${servicio.nombre}">
    <div class="tarjeta-servicio__cuerpo">
      <p class="tarjeta-servicio__categoria">${servicio.categoria}</p>
      <h3 class="tarjeta-servicio__nombre">${servicio.nombre}</h3>
      <p class="tarjeta-servicio__precio">${formatearPrecio(servicio.precio)}</p>
    </div>
    <div class="tarjeta-servicio__acciones">
      <a class="boton boton--secundario" href="detalle-producto.html?codigo=${servicio.codigo}">Ver detalle</a>
      <button class="boton" type="button" data-codigo="${servicio.codigo}">Añadir</button>
    </div>
  `;

  return tarjeta;
}

function renderizarCatalogo() {
  const contenedor = document.querySelector('#grilla-servicios');
  if (!contenedor) return; 

  servicios.forEach((servicio) => {
    contenedor.appendChild(crearTarjetaServicio(servicio));
  });

  // Un solo listener en el contenedor (delegación de eventos),
  // en vez de uno por cada botón "Añadir".
  contenedor.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-codigo]');
    if (!boton) return;
    agregarAlCarrito(boton.dataset.codigo);
  });
}

// ---------- Detalle de servicio (detalle-producto.html) ----------

function renderizarDetalle() {
  const contenedor = document.querySelector('#detalle-servicio');
  if (!contenedor) return; 

  const parametros = new URLSearchParams(window.location.search);
  const codigo = parametros.get('codigo');
  const servicio = buscarServicioPorCodigo(codigo);

  if (!servicio) {
    contenedor.innerHTML =
      '<p>No encontramos el servicio solicitado. <a href="productos.html">Vuelve al catálogo</a>.</p>';
    return;
  }

  document.title = `${servicio.nombre} — Veterinaria San Marcos`;

  contenedor.innerHTML = `
    <img class="detalle-servicio__imagen" src="${servicio.imagen}" alt="${servicio.nombre}">
    <div>
      <p class="tarjeta-servicio__categoria">${servicio.categoria}</p>
      <h1>${servicio.nombre}</h1>
      <p class="detalle-servicio__precio">${formatearPrecio(servicio.precio)}</p>
      <p>${servicio.descripcion}</p>
      <ul class="detalle-servicio__ficha">
        <li><span>Especie recomendada</span><span>${servicio.especie}</span></li>
        <li><span>Duración aproximada</span><span>${servicio.duracion}</span></li>
      </ul>
      <button class="boton" type="button" id="boton-agregar-detalle">Añadir al carrito</button>
    </div>
  `;

  document
    .querySelector('#boton-agregar-detalle')
    .addEventListener('click', () => agregarAlCarrito(servicio.codigo));
}

// ---------- Carrito (localStorage), usado desde catálogo y detalle ----------

function agregarAlCarrito(codigo) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(codigo);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const contador = document.querySelector('#contador-carrito');
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  contador.textContent = carrito.length;
}


actualizarContadorCarrito();
renderizarCatalogo();
renderizarDetalle();
