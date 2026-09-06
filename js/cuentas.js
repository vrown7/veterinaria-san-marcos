// ---------- Datos: regiones y comunas (selects dependientes) ----------

const regionesComunas = {
  'Región Metropolitana de Santiago': [
    'Santiago', 'San Bernardo', 'Puente Alto', 'Maipú', 'La Florida', 'Ñuñoa',
  ],
  "Región del Libertador Gral. Bernardo O'Higgins": [
    'Rancagua', 'San Fernando', 'Rengo', 'Machalí', 'Graneros',
  ],
  'Región de Valparaíso': [
    'Valparaíso', 'Viña del Mar', 'Quilpué', 'San Antonio', 'Quillota',
  ],
  'Región del Biobío': [
    'Concepción', 'Talcahuano', 'Los Ángeles', 'Chillán', 'Coronel',
  ],
};

// ---------- Utilidades de validación ----------

// Calcula el dígito verificador de un RUN chileno (sin el propio DV).
function calcularDigitoVerificador(cuerpoRun) {
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpoRun.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpoRun[i], 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const resto = 11 - (suma % 11);
  if (resto === 11) return '0';
  if (resto === 10) return 'K';
  return String(resto);
}

// Valida formato (7 a 9 caracteres, sin puntos ni guion) y dígito verificador.
function validarRun(valor) {
  const run = valor.trim().toUpperCase();

  if (!/^[0-9]+[0-9K]$/.test(run)) return false;
  if (run.length < 7 || run.length > 9) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  return calcularDigitoVerificador(cuerpo) === dv;
}

// Solo se permiten estos tres dominios de correo.
function correoConDominioValido(valor) {
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(valor.trim());
}

function soloEspacios(valor) {
  return valor.trim().length === 0;
}

// Una fecha de nacimiento no puede estar en el futuro ni ser irreal.
function fechaNacimientoValida(valor) {
  const fecha = new Date(`${valor}T00:00:00`);
  if (Number.isNaN(fecha.getTime())) return false;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (fecha > hoy) return false;

  const limiteAntiguo = new Date('1900-01-01T00:00:00');
  return fecha >= limiteAntiguo;
}

// ---------- Helpers para mostrar/ocultar errores ----------

function marcarError(input, idError, mensaje) {
  input.classList.add('campo-error');
  const elementoError = document.getElementById(idError);
  if (elementoError) elementoError.textContent = mensaje;
}

function limpiarError(input, idError) {
  input.classList.remove('campo-error');
  const elementoError = document.getElementById(idError);
  if (elementoError) elementoError.textContent = '';
}

// ---------- Motor de validación reutilizable ----------

// Ejecuta la regla de un campo y pinta (o limpia) su mensaje de error.
// Devuelve true si el campo es válido.
function revisarCampo(campo) {
  const mensaje = campo.regla();

  if (mensaje) {
    marcarError(campo.input, campo.idError, mensaje);
    return false;
  }

  limpiarError(campo.input, campo.idError);
  return true;
}


function revisarFormulario(campos) {
  let esValido = true;

  campos.forEach((campo) => {
    if (!revisarCampo(campo)) esValido = false;
  });

  return esValido;
}

// Validación en tiempo real
function activarValidacionEnVivo(campos) {
  campos.forEach((campo) => {
    const evento = campo.input.tagName === 'SELECT' ? 'change' : 'blur';
    campo.input.addEventListener(evento, () => revisarCampo(campo));

    // Si el campo ya está marcado en rojo, lo revalidamos mientras
    // el usuario escribe para que el error desaparezca al corregirlo.
    campo.input.addEventListener('input', () => {
      if (campo.input.classList.contains('campo-error')) revisarCampo(campo);
    });
  });
}

// ---------- Regiones y comunas dependientes ----------

function poblarRegiones() {
  const selectRegion = document.querySelector('#region');
  const selectComuna = document.querySelector('#comuna');
  if (!selectRegion || !selectComuna) return;

  Object.keys(regionesComunas).forEach((nombreRegion) => {
    const opcion = document.createElement('option');
    opcion.value = nombreRegion;
    opcion.textContent = nombreRegion;
    selectRegion.appendChild(opcion);
  });

  selectRegion.addEventListener('change', () => {
    const comunas = regionesComunas[selectRegion.value] || [];

    selectComuna.innerHTML = '';

    if (comunas.length === 0) {
      selectComuna.disabled = true;
      const opcionVacia = document.createElement('option');
      opcionVacia.value = '';
      opcionVacia.textContent = 'Selecciona primero tu región';
      selectComuna.appendChild(opcionVacia);
      return;
    }

    selectComuna.disabled = false;

    const opcionInicial = document.createElement('option');
    opcionInicial.value = '';
    opcionInicial.textContent = 'Selecciona tu comuna';
    selectComuna.appendChild(opcionInicial);

    comunas.forEach((nombreComuna) => {
      const opcion = document.createElement('option');
      opcion.value = nombreComuna;
      opcion.textContent = nombreComuna;
      selectComuna.appendChild(opcion);
    });

    limpiarError(selectComuna, 'error-comuna');
  });
}

// ---------- Formulario de registro ----------

function inicializarFormularioRegistro() {
  const formulario = document.querySelector('#formulario-registro');
  if (!formulario) return;

  const run = document.querySelector('#run');
  const nombre = document.querySelector('#nombre');
  const apellidos = document.querySelector('#apellidos');
  const correo = document.querySelector('#correo-registro');
  const clave = document.querySelector('#clave');
  const claveConfirmar = document.querySelector('#clave-confirmar');
  const fechaNacimiento = document.querySelector('#fecha-nacimiento');
  const region = document.querySelector('#region');
  const comuna = document.querySelector('#comuna');
  const direccion = document.querySelector('#direccion');
  const mensajeExito = document.querySelector('#mensaje-registro-exito');

  // Reglas de negocio del registro (idénticas a las del panel administrador).
  const campos = [
    {
      input: run,
      idError: 'error-run',
      regla: () => {
        if (!run.value.trim()) return 'El RUN es obligatorio.';
        if (!validarRun(run.value)) {
          return 'RUN inválido. Ingresa entre 7 y 9 caracteres, sin puntos ni guion (ej. 190110222).';
        }
        return '';
      },
    },
    {
      input: nombre,
      idError: 'error-nombre',
      regla: () => {
        if (!nombre.value.trim()) return 'El nombre es obligatorio.';
        if (nombre.value.trim().length > 50) return 'El nombre no puede superar los 50 caracteres.';
        return '';
      },
    },
    {
      input: apellidos,
      idError: 'error-apellidos',
      regla: () => {
        if (!apellidos.value.trim()) return 'Los apellidos son obligatorios.';
        if (apellidos.value.trim().length > 100) return 'Los apellidos no pueden superar los 100 caracteres.';
        return '';
      },
    },
    {
      input: correo,
      idError: 'error-correo-registro',
      regla: () => {
        if (!correo.value.trim()) return 'El correo es obligatorio.';
        if (correo.value.trim().length > 100) return 'El correo no puede superar los 100 caracteres.';
        if (!correoConDominioValido(correo.value)) {
          return 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        }
        return '';
      },
    },
    {
      input: clave,
      idError: 'error-clave',
      regla: () => {
        if (!clave.value || clave.value.length < 4 || clave.value.length > 10) {
          return 'La contraseña debe tener entre 4 y 10 caracteres.';
        }
        return '';
      },
    },
    {
      input: claveConfirmar,
      idError: 'error-clave-confirmar',
      regla: () => {
        if (!claveConfirmar.value || claveConfirmar.value.length < 4 || claveConfirmar.value.length > 10) {
          return 'Confirma tu contraseña (entre 4 y 10 caracteres).';
        }
        if (claveConfirmar.value !== clave.value) return 'Las contraseñas no coinciden.';
        return '';
      },
    },
    {
      // Campo opcional: si viene vacío es válido, pero si trae valor debe ser una fecha real.
      input: fechaNacimiento,
      idError: 'error-fecha-nacimiento',
      regla: () => {
        if (!fechaNacimiento.value) return '';
        if (!fechaNacimientoValida(fechaNacimiento.value)) {
          return 'Ingresa una fecha de nacimiento válida y anterior a hoy.';
        }
        return '';
      },
    },
    {
      input: region,
      idError: 'error-region',
      regla: () => (region.value ? '' : 'Selecciona tu región.'),
    },
    {
      input: comuna,
      idError: 'error-comuna',
      regla: () => (comuna.value ? '' : 'Selecciona tu comuna.'),
    },
    {
      input: direccion,
      idError: 'error-direccion',
      regla: () => {
        if (!direccion.value.trim()) return 'La dirección es obligatoria.';
        if (direccion.value.trim().length > 300) return 'La dirección no puede superar los 300 caracteres.';
        return '';
      },
    },
  ];

  activarValidacionEnVivo(campos);

  // Al cambiar la contraseña, revisamos de nuevo la confirmación
  // para que no quede un "no coinciden" desactualizado en pantalla.
  clave.addEventListener('blur', () => {
    if (claveConfirmar.value) {
      revisarCampo(campos.find((campo) => campo.input === claveConfirmar));
    }
  });

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    mensajeExito.textContent = '';

    if (!revisarFormulario(campos)) return;

    mensajeExito.textContent = `¡Cuenta creada correctamente, ${nombre.value.trim()}! Ya puedes iniciar sesión.`;
    formulario.reset();
    comuna.disabled = true;
    comuna.innerHTML = '<option value="">Selecciona primero tu región</option>';
  });
}

// ---------- Formulario de inicio de sesión ----------

function inicializarFormularioLogin() {
  const formulario = document.querySelector('#formulario-login');
  if (!formulario) return;

  const correo = document.querySelector('#correo-login');
  const clave = document.querySelector('#clave-login');
  const mensajeExito = document.querySelector('#mensaje-login-exito');

  const campos = [
    {
      input: correo,
      idError: 'error-correo-login',
      regla: () => {
        if (!correo.value.trim()) return 'El correo es obligatorio.';
        if (correo.value.trim().length > 100) return 'El correo no puede superar los 100 caracteres.';
        if (!correoConDominioValido(correo.value)) {
          return 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        }
        return '';
      },
    },
    {
      input: clave,
      idError: 'error-clave-login',
      regla: () => {
        if (!clave.value || clave.value.length < 4 || clave.value.length > 10) {
          return 'La contraseña debe tener entre 4 y 10 caracteres.';
        }
        return '';
      },
    },
  ];

  activarValidacionEnVivo(campos);

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    mensajeExito.textContent = '';

    if (!revisarFormulario(campos)) return;

    mensajeExito.textContent = 'Inicio de sesión correcto. Bienvenido de vuelta.';
    formulario.reset();
  });
}

// ---------- Formulario de contacto ----------

function inicializarFormularioContacto() {
  const formulario = document.querySelector('#formulario-contacto');
  if (!formulario) return;

  const nombre = document.querySelector('#nombre-contacto');
  const correo = document.querySelector('#correo-contacto');
  const comentario = document.querySelector('#comentario');
  const contadorComentario = document.querySelector('#contador-comentario');
  const mensajeExito = document.querySelector('#mensaje-contacto-exito');

  if (contadorComentario) {
    comentario.addEventListener('input', () => {
      contadorComentario.textContent = comentario.value.length;
    });
  }

  const campos = [
    {
      input: nombre,
      idError: 'error-nombre-contacto',
      regla: () => {
        if (!nombre.value.trim()) return 'El nombre es obligatorio.';
        if (soloEspacios(nombre.value)) return 'El nombre no puede contener solo espacios.';
        if (nombre.value.trim().length > 100) return 'El nombre no puede superar los 100 caracteres.';
        return '';
      },
    },
    {
      input: correo,
      idError: 'error-correo-contacto',
      regla: () => {
        if (!correo.value.trim()) return 'El correo es obligatorio.';
        if (correo.value.trim().length > 100) return 'El correo no puede superar los 100 caracteres.';
        if (!correoConDominioValido(correo.value)) {
          return 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        }
        return '';
      },
    },
    {
      input: comentario,
      idError: 'error-comentario',
      regla: () => {
        if (!comentario.value.trim()) return 'El comentario es obligatorio.';
        if (comentario.value.length > 500) return 'El comentario no puede superar los 500 caracteres.';
        return '';
      },
    },
  ];

  activarValidacionEnVivo(campos);

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    mensajeExito.textContent = '';

    if (!revisarFormulario(campos)) return;

    mensajeExito.textContent = '¡Gracias por tu comentario! Te responderemos a la brevedad.';
    formulario.reset();
    if (contadorComentario) contadorComentario.textContent = '0';
  });
}

// ---------- Arranque ----------

poblarRegiones();
inicializarFormularioRegistro();
inicializarFormularioLogin();
inicializarFormularioContacto();
