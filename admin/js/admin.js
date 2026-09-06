// ---------- Datos de ejemplo: servicios ----------

const serviciosAdmin = [
  {
    codigo: 'SV001',
    nombre: 'Consulta general',
    categoria: 'Consultas',
    precio: 15000,
    stock: 40,
    stockCritico: 5,
    descripcion:
      'Revisión general del estado de salud de tu mascota, con orientación sobre cuidados y controles preventivos.',
  },
  {
    codigo: 'VA001',
    nombre: 'Vacuna antirrábica canina',
    categoria: 'Vacunación',
    precio: 12000,
    stock: 18,
    stockCritico: 10,
    descripcion:
      'Vacuna obligatoria por ley que protege a tu perro contra la rabia.',
  },
  {
    codigo: 'VA003',
    nombre: 'Vacuna bivalente felina',
    categoria: 'Vacunación',
    precio: 15000,
    stock: 6,
    stockCritico: 8,
    descripcion:
      'Refuerzo anual que protege a tu gato frente a las enfermedades virales felinas más comunes.',
  },
  {
    codigo: 'CI002',
    nombre: 'Esterilización macho canino',
    categoria: 'Cirugía',
    precio: 60000,
    stock: 12,
    stockCritico: 3,
    descripcion:
      'Cirugía de esterilización con anestesia incluida, realizada en pabellón propio.',
  },
  {
    codigo: 'DE002',
    nombre: 'Desparasitación interna mediana',
    categoria: 'Desparasitación',
    precio: 9500,
    stock: 25,
    stockCritico: 10,
    descripcion:
      'Tratamiento antiparasitario interno para perros de 10 a 25 kg.',
  },
  {
    codigo: 'EX003',
    nombre: 'Radiografía (1 proyección)',
    categoria: 'Exámenes',
    precio: 28000,
    stock: 2,
    stockCritico: 4,
    descripcion:
      'Imagen radiográfica de apoyo diagnóstico, entregada con informe del veterinario tratante.',
  },
  {
    codigo: 'OT001',
    nombre: 'Corte de uñas',
    categoria: 'Otros',
    precio: 5000,
    stock: 50,
    stockCritico: 5,
    descripcion: 'Servicio rápido de higiene para mascotas.',
  },
];

// ---------- Datos de ejemplo: usuarios ----------

const usuariosAdmin = [
  {
    run: '19873456K',
    nombre: 'María',
    apellidos: 'Soto Fernández',
    correo: 'maria.soto@duoc.cl',
    fechaNacimiento: '1985-03-12',
    tipoUsuario: 'Administrador',
    region: "Región del Libertador General Bernardo O'Higgins",
    comuna: 'Rancagua',
    direccion: 'Av. Libertador Bernardo O\'Higgins 1234, Rancagua',
  },
  {
    run: '176543213',
    nombre: 'Daniela',
    apellidos: 'Rojas Pinto',
    correo: 'daniela.rojas@gmail.com',
    fechaNacimiento: '1997-07-02',
    tipoUsuario: 'Recepcionista',
    region: "Región del Libertador General Bernardo O'Higgins",
    comuna: 'Machalí',
    direccion: 'Calle Los Aromos 456, Machalí',
  },
  {
    run: '203456786',
    nombre: 'Felipe',
    apellidos: 'Muñoz Araya',
    correo: 'felipe.munoz@profesor.duoc.cl',
    fechaNacimiento: '1990-11-23',
    tipoUsuario: 'Recepcionista',
    region: "Región del Libertador General Bernardo O'Higgins",
    comuna: 'Rengo',
    direccion: 'Pasaje Las Rosas 78, Rengo',
  },
  {
    run: '211987650',
    nombre: 'Carlos',
    apellidos: 'Pizarro Vega',
    correo: 'carlos.pizarro@gmail.com',
    fechaNacimiento: '2001-05-30',
    tipoUsuario: 'Dueño de mascota',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Maipú',
    direccion: 'Av. Pajaritos 3456, Maipú',
  },
];

// ---------- Datos de ejemplo: regiones y comunas (selects dependientes) ----------

const regionesComunas = {
  'Región de Arica y Parinacota': ['Arica', 'Camarones', 'Putre', 'General Lagos'],
  'Región de Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica'],
  'Región de Antofagasta': ['Antofagasta', 'Calama', 'Tocopilla', 'Mejillones'],
  'Región de Atacama': ['Copiapó', 'Vallenar', 'Chañaral', 'Caldera'],
  'Región de Coquimbo': ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'San Antonio'],
  'Región Metropolitana de Santiago': ['Santiago', 'Providencia', 'Las Condes', 'Maipú', 'Puente Alto'],
  "Región del Libertador General Bernardo O'Higgins": ['Rancagua', 'Rengo', 'San Fernando', 'Machalí'],
  'Región del Maule': ['Talca', 'Curicó', 'Linares', 'Constitución'],
  'Región de Ñuble': ['Chillán', 'Chillán Viejo', 'San Carlos', 'Bulnes'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'Coronel'],
  'Región de La Araucanía': ['Temuco', 'Villarrica', 'Angol', 'Pucón'],
  'Región de Los Ríos': ['Valdivia', 'La Unión', 'Panguipulli', 'Río Bueno'],
  'Región de Los Lagos': ['Puerto Montt', 'Osorno', 'Castro', 'Puerto Varas'],
  'Región de Aysén del General Carlos Ibáñez del Campo': ['Coyhaique', 'Puerto Aysén', 'Chile Chico', 'Cochrane'],
  'Región de Magallanes y de la Antártica Chilena': ['Punta Arenas', 'Puerto Natales', 'Porvenir', 'Puerto Williams'],
};

// ---------- Utilidades ----------

function formatearPrecioAdmin(valor) {
  return Number(valor).toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });
}

function buscarServicioPorCodigo(codigo) {
  return serviciosAdmin.find((servicio) => servicio.codigo === codigo);
}

function buscarUsuarioPorRun(run) {
  return usuariosAdmin.find((usuario) => usuario.run === run);
}

function esStockCritico(servicio) {
  return (
    servicio.stockCritico !== null &&
    servicio.stockCritico !== undefined &&
    servicio.stockCritico !== '' &&
    Number(servicio.stock) <= Number(servicio.stockCritico)
  );
}

// ---------- Mensajes de error junto a cada campo ----------

function mostrarError(campo, mensaje) {
  campo.classList.add('campo-error');
  const contenedorError = document.querySelector(`#error-${campo.id}`);
  if (contenedorError) {
    contenedorError.textContent = mensaje;
  }
}

function limpiarError(campo) {
  campo.classList.remove('campo-error');
  const contenedorError = document.querySelector(`#error-${campo.id}`);
  if (contenedorError) {
    contenedorError.textContent = '';
  }
}

function mostrarMensajeExito(contenedor, texto) {
  if (!contenedor) return;
  contenedor.textContent = texto;
  contenedor.classList.add('visible');
}

// ---------- Home del panel (admin/index.html) ----------

function renderizarResumenPanel() {
  const totalServicios = document.querySelector('#resumen-total-servicios');
  const totalUsuarios = document.querySelector('#resumen-total-usuarios');
  const totalAlertas = document.querySelector('#resumen-total-alertas');

  if (!totalServicios && !totalUsuarios && !totalAlertas) return;

  if (totalServicios) totalServicios.textContent = serviciosAdmin.length;
  if (totalUsuarios) totalUsuarios.textContent = usuariosAdmin.length;
  if (totalAlertas) {
    const alertas = serviciosAdmin.filter(esStockCritico).length;
    totalAlertas.textContent = alertas;
  }
}

// ---------- Tabla de servicios (admin/productos.html) ----------

function crearFilaServicio(servicio) {
  const fila = document.createElement('tr');
  if (esStockCritico(servicio)) {
    fila.classList.add('fila-alerta');
  }

  const insignia = esStockCritico(servicio)
    ? '<span class="insignia insignia--alerta">Stock crítico</span>'
    : '<span class="insignia insignia--ok">Normal</span>';

  fila.innerHTML = `
    <td>${servicio.codigo}</td>
    <td>${servicio.nombre}</td>
    <td>${servicio.categoria}</td>
    <td>${formatearPrecioAdmin(servicio.precio)}</td>
    <td>${servicio.stock}</td>
    <td>${insignia}</td>
    <td class="admin-tabla__acciones">
      <a class="boton boton--secundario boton--pequeno" href="producto-editar.html?codigo=${servicio.codigo}">Editar</a>
    </td>
  `;

  return fila;
}

function renderizarTablaServicios() {
  const cuerpoTabla = document.querySelector('#cuerpo-tabla-servicios');
  if (!cuerpoTabla) return;

  if (serviciosAdmin.length === 0) {
    cuerpoTabla.innerHTML =
      '<tr class="admin-tabla__vacio"><td colspan="7">Todavía no hay servicios registrados.</td></tr>';
    return;
  }

  serviciosAdmin.forEach((servicio) => {
    cuerpoTabla.appendChild(crearFilaServicio(servicio));
  });
}

// ---------- Tabla de usuarios (admin/usuarios.html) ----------

function crearFilaUsuario(usuario) {
  const fila = document.createElement('tr');

  fila.innerHTML = `
    <td>${usuario.run}</td>
    <td>${usuario.nombre} ${usuario.apellidos}</td>
    <td>${usuario.correo}</td>
    <td>${usuario.tipoUsuario}</td>
    <td>${usuario.comuna}</td>
    <td class="admin-tabla__acciones">
      <a class="boton boton--secundario boton--pequeno" href="usuario-editar.html?run=${usuario.run}">Editar</a>
    </td>
  `;

  return fila;
}

function renderizarTablaUsuarios() {
  const cuerpoTabla = document.querySelector('#cuerpo-tabla-usuarios');
  if (!cuerpoTabla) return;

  if (usuariosAdmin.length === 0) {
    cuerpoTabla.innerHTML =
      '<tr class="admin-tabla__vacio"><td colspan="6">Todavía no hay usuarios registrados.</td></tr>';
    return;
  }

  usuariosAdmin.forEach((usuario) => {
    cuerpoTabla.appendChild(crearFilaUsuario(usuario));
  });
}

// ---------- Selects dependientes de región / comuna ----------

function poblarSelectRegiones(selectRegion) {
  Object.keys(regionesComunas).forEach((region) => {
    const opcion = document.createElement('option');
    opcion.value = region;
    opcion.textContent = region;
    selectRegion.appendChild(opcion);
  });
}

function poblarSelectComunas(selectComuna, region, comunaSeleccionada) {
  selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';
  const comunas = regionesComunas[region] || [];

  comunas.forEach((comuna) => {
    const opcion = document.createElement('option');
    opcion.value = comuna;
    opcion.textContent = comuna;
    if (comuna === comunaSeleccionada) {
      opcion.selected = true;
    }
    selectComuna.appendChild(opcion);
  });

  selectComuna.disabled = comunas.length === 0;
}

function inicializarRegionComuna(selectRegion, selectComuna, regionSeleccionada, comunaSeleccionada) {
  poblarSelectRegiones(selectRegion);

  if (regionSeleccionada) {
    selectRegion.value = regionSeleccionada;
    poblarSelectComunas(selectComuna, regionSeleccionada, comunaSeleccionada);
  }

  selectRegion.addEventListener('change', () => {
    poblarSelectComunas(selectComuna, selectRegion.value, '');
  });
}

// ---------- Validación de RUN chileno (dígito verificador, módulo 11) ----------

function calcularDigitoVerificador(cuerpo) {
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i -= 1) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  if (resto === 11) return '0';
  if (resto === 10) return 'K';
  return String(resto);
}

function validarRun(runIngresado) {
  const run = runIngresado.trim().toUpperCase();

  if (/[.-]/.test(run)) return false;
  if (run.length < 7 || run.length > 9) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;
  if (!/^[0-9K]$/.test(dv)) return false;

  return calcularDigitoVerificador(cuerpo) === dv;
}

// ---------- Validación de correo institucional / gmail ----------

function validarCorreoAdmin(correo) {
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo.trim());
}

// ---------- Formulario de servicio (producto-nuevo.html / producto-editar.html) ----------

function inicializarFormularioServicio() {
  const formulario = document.querySelector('#formulario-servicio');
  if (!formulario) return;

  const campoCodigo = document.querySelector('#codigo');
  const campoNombre = document.querySelector('#nombre');
  const campoDescripcion = document.querySelector('#descripcion');
  const campoPrecio = document.querySelector('#precio');
  const campoStock = document.querySelector('#stock');
  const campoStockCritico = document.querySelector('#stock-critico');
  const campoCategoria = document.querySelector('#categoria');
  const campoImagen = document.querySelector('#imagen');
  const avisoCritico = document.querySelector('#aviso-stock-critico');
  const mensajeExito = document.querySelector('#mensaje-formulario');

  const parametros = new URLSearchParams(window.location.search);
  const codigo = parametros.get('codigo');

  if (codigo) {
    const servicio = buscarServicioPorCodigo(codigo);
    if (servicio) {
      campoCodigo.value = servicio.codigo;
      campoCodigo.readOnly = true;
      campoNombre.value = servicio.nombre;
      campoDescripcion.value = servicio.descripcion || '';
      campoPrecio.value = servicio.precio;
      campoStock.value = servicio.stock;
      campoStockCritico.value = servicio.stockCritico ?? '';
      campoCategoria.value = servicio.categoria;
    }
  }

  function actualizarAvisoCritico() {
    if (!avisoCritico) return;
    const stock = Number(campoStock.value);
    const critico = campoStockCritico.value;

    if (critico !== '' && !Number.isNaN(stock) && stock <= Number(critico)) {
      avisoCritico.textContent =
        'Con estos valores, el servicio quedará marcado como stock crítico en el listado.';
      avisoCritico.classList.add('visible');
    } else {
      avisoCritico.textContent = '';
      avisoCritico.classList.remove('visible');
    }
  }

  campoStock.addEventListener('input', actualizarAvisoCritico);
  campoStockCritico.addEventListener('input', actualizarAvisoCritico);
  actualizarAvisoCritico();

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let esValido = true;

    limpiarError(campoCodigo);
    if (campoCodigo.value.trim().length < 3) {
      mostrarError(campoCodigo, 'El código es obligatorio y debe tener al menos 3 caracteres.');
      esValido = false;
    }

    limpiarError(campoNombre);
    if (campoNombre.value.trim() === '') {
      mostrarError(campoNombre, 'El nombre del servicio es obligatorio.');
      esValido = false;
    } else if (campoNombre.value.trim().length > 100) {
      mostrarError(campoNombre, 'El nombre no puede superar los 100 caracteres.');
      esValido = false;
    }

    limpiarError(campoDescripcion);
    if (campoDescripcion.value.trim().length > 500) {
      mostrarError(campoDescripcion, 'La descripción no puede superar los 500 caracteres.');
      esValido = false;
    }

    limpiarError(campoPrecio);
    if (campoPrecio.value === '' || Number.isNaN(Number(campoPrecio.value))) {
      mostrarError(campoPrecio, 'El precio es obligatorio.');
      esValido = false;
    } else if (Number(campoPrecio.value) < 0) {
      mostrarError(campoPrecio, 'El precio no puede ser negativo.');
      esValido = false;
    }

    limpiarError(campoStock);
    if (campoStock.value === '' || Number.isNaN(Number(campoStock.value))) {
      mostrarError(campoStock, 'El stock es obligatorio.');
      esValido = false;
    } else if (!Number.isInteger(Number(campoStock.value)) || Number(campoStock.value) < 0) {
      mostrarError(campoStock, 'El stock debe ser un número entero igual o mayor a 0.');
      esValido = false;
    }

    limpiarError(campoStockCritico);
    if (campoStockCritico.value !== '') {
      if (
        !Number.isInteger(Number(campoStockCritico.value)) ||
        Number(campoStockCritico.value) < 0
      ) {
        mostrarError(campoStockCritico, 'El stock crítico debe ser un número entero igual o mayor a 0.');
        esValido = false;
      }
    }

    limpiarError(campoCategoria);
    if (campoCategoria.value === '') {
      mostrarError(campoCategoria, 'Debe seleccionar una categoría.');
      esValido = false;
    }

    if (campoImagen) {
      limpiarError(campoImagen);
    }

    if (esValido) {
      actualizarAvisoCritico();
      mostrarMensajeExito(
        mensajeExito,
        codigo
          ? 'Servicio actualizado correctamente.'
          : 'Servicio creado correctamente.'
      );
      formulario.reset();
      if (codigo) {
        campoCodigo.value = codigo;
        campoCodigo.readOnly = true;
      }
    }
  });
}

// ---------- Formulario de usuario (usuario-nuevo.html / usuario-editar.html) ----------

function inicializarFormularioUsuario() {
  const formulario = document.querySelector('#formulario-usuario');
  if (!formulario) return;

  const campoRun = document.querySelector('#run');
  const campoNombre = document.querySelector('#nombre');
  const campoApellidos = document.querySelector('#apellidos');
  const campoCorreo = document.querySelector('#correo');
  const campoFechaNacimiento = document.querySelector('#fecha-nacimiento');
  const campoTipoUsuario = document.querySelector('#tipo-usuario');
  const campoRegion = document.querySelector('#region');
  const campoComuna = document.querySelector('#comuna');
  const campoDireccion = document.querySelector('#direccion');
  const mensajeExito = document.querySelector('#mensaje-formulario');

  const parametros = new URLSearchParams(window.location.search);
  const run = parametros.get('run');
  let usuarioExistente = null;

  if (run) {
    usuarioExistente = buscarUsuarioPorRun(run);
  }

  inicializarRegionComuna(
    campoRegion,
    campoComuna,
    usuarioExistente ? usuarioExistente.region : '',
    usuarioExistente ? usuarioExistente.comuna : ''
  );

  if (usuarioExistente) {
    campoRun.value = usuarioExistente.run;
    campoRun.readOnly = true;
    campoNombre.value = usuarioExistente.nombre;
    campoApellidos.value = usuarioExistente.apellidos;
    campoCorreo.value = usuarioExistente.correo;
    campoFechaNacimiento.value = usuarioExistente.fechaNacimiento || '';
    campoTipoUsuario.value = usuarioExistente.tipoUsuario;
    campoDireccion.value = usuarioExistente.direccion;
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let esValido = true;

    limpiarError(campoRun);
    if (campoRun.value.trim() === '') {
      mostrarError(campoRun, 'El RUN es obligatorio.');
      esValido = false;
    } else if (/[.-]/.test(campoRun.value)) {
      mostrarError(campoRun, 'Ingrese el RUN sin puntos ni guion.');
      esValido = false;
    } else if (campoRun.value.trim().length < 7 || campoRun.value.trim().length > 9) {
      mostrarError(campoRun, 'El RUN debe tener entre 7 y 9 caracteres.');
      esValido = false;
    } else if (!validarRun(campoRun.value)) {
      mostrarError(campoRun, 'El dígito verificador del RUN no es válido.');
      esValido = false;
    }

    limpiarError(campoNombre);
    if (campoNombre.value.trim() === '') {
      mostrarError(campoNombre, 'El nombre es obligatorio.');
      esValido = false;
    } else if (campoNombre.value.trim().length > 50) {
      mostrarError(campoNombre, 'El nombre no puede superar los 50 caracteres.');
      esValido = false;
    }

    limpiarError(campoApellidos);
    if (campoApellidos.value.trim() === '') {
      mostrarError(campoApellidos, 'Los apellidos son obligatorios.');
      esValido = false;
    } else if (campoApellidos.value.trim().length > 100) {
      mostrarError(campoApellidos, 'Los apellidos no pueden superar los 100 caracteres.');
      esValido = false;
    }

    limpiarError(campoCorreo);
    if (campoCorreo.value.trim() === '') {
      mostrarError(campoCorreo, 'El correo es obligatorio.');
      esValido = false;
    } else if (campoCorreo.value.trim().length > 100) {
      mostrarError(campoCorreo, 'El correo no puede superar los 100 caracteres.');
      esValido = false;
    } else if (!validarCorreoAdmin(campoCorreo.value)) {
      mostrarError(
        campoCorreo,
        'El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.'
      );
      esValido = false;
    }

    if (campoFechaNacimiento) {
      limpiarError(campoFechaNacimiento);
    }

    limpiarError(campoTipoUsuario);
    if (campoTipoUsuario.value === '') {
      mostrarError(campoTipoUsuario, 'Debe seleccionar un tipo de usuario.');
      esValido = false;
    }

    limpiarError(campoRegion);
    if (campoRegion.value === '') {
      mostrarError(campoRegion, 'Debe seleccionar una región.');
      esValido = false;
    }

    limpiarError(campoComuna);
    if (campoComuna.value === '') {
      mostrarError(campoComuna, 'Debe seleccionar una comuna.');
      esValido = false;
    }

    limpiarError(campoDireccion);
    if (campoDireccion.value.trim() === '') {
      mostrarError(campoDireccion, 'La dirección es obligatoria.');
      esValido = false;
    } else if (campoDireccion.value.trim().length > 300) {
      mostrarError(campoDireccion, 'La dirección no puede superar los 300 caracteres.');
      esValido = false;
    }

    if (esValido) {
      mostrarMensajeExito(
        mensajeExito,
        usuarioExistente ? 'Usuario actualizado correctamente.' : 'Usuario creado correctamente.'
      );
      const runPrevio = usuarioExistente ? usuarioExistente.run : null;
      formulario.reset();
      if (runPrevio) {
        campoRun.value = runPrevio;
        campoRun.readOnly = true;
        poblarSelectComunas(campoComuna, '', '');
      }
    }
  });
}

// ---------- Arranque ----------

renderizarResumenPanel();
renderizarTablaServicios();
renderizarTablaUsuarios();
inicializarFormularioServicio();
inicializarFormularioUsuario();