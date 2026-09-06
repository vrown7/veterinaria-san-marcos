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
  const region = document.querySelector('#region');
  const comuna = document.querySelector('#comuna');
  const mensajeExito = document.querySelector('#mensaje-registro-exito');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    mensajeExito.textContent = '';
    let formularioValido = true;

    if (!run.value.trim()) {
      marcarError(run, 'error-run', 'El RUN es obligatorio.');
      formularioValido = false;
    } else if (!validarRun(run.value)) {
      marcarError(run, 'error-run', 'RUN inválido. Ingresa entre 7 y 9 caracteres, sin puntos ni guion (ej. 19011022K).');
      formularioValido = false;
    } else {
      limpiarError(run, 'error-run');
    }

    if (!nombre.value.trim()) {
      marcarError(nombre, 'error-nombre', 'El nombre es obligatorio.');
      formularioValido = false;
    } else if (nombre.value.trim().length > 50) {
      marcarError(nombre, 'error-nombre', 'El nombre no puede superar los 50 caracteres.');
      formularioValido = false;
    } else {
      limpiarError(nombre, 'error-nombre');
    }

    if (!apellidos.value.trim()) {
      marcarError(apellidos, 'error-apellidos', 'Los apellidos son obligatorios.');
      formularioValido = false;
    } else if (apellidos.value.trim().length > 100) {
      marcarError(apellidos, 'error-apellidos', 'Los apellidos no pueden superar los 100 caracteres.');
      formularioValido = false;
    } else {
      limpiarError(apellidos, 'error-apellidos');
    }

    if (!correo.value.trim()) {
      marcarError(correo, 'error-correo-registro', 'El correo es obligatorio.');
      formularioValido = false;
    } else if (correo.value.trim().length > 100) {
      marcarError(correo, 'error-correo-registro', 'El correo no puede superar los 100 caracteres.');
      formularioValido = false;
    } else if (!correoConDominioValido(correo.value)) {
      marcarError(correo, 'error-correo-registro', 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.');
      formularioValido = false;
    } else {
      limpiarError(correo, 'error-correo-registro');
    }

    if (!clave.value || clave.value.length < 4 || clave.value.length > 10) {
      marcarError(clave, 'error-clave', 'La contraseña debe tener entre 4 y 10 caracteres.');
      formularioValido = false;
    } else {
      limpiarError(clave, 'error-clave');
    }

    if (!claveConfirmar.value || claveConfirmar.value.length < 4 || claveConfirmar.value.length > 10) {
      marcarError(claveConfirmar, 'error-clave-confirmar', 'Confirma tu contraseña (entre 4 y 10 caracteres).');
      formularioValido = false;
    } else if (claveConfirmar.value !== clave.value) {
      marcarError(claveConfirmar, 'error-clave-confirmar', 'Las contraseñas no coinciden.');
      formularioValido = false;
    } else {
      limpiarError(claveConfirmar, 'error-clave-confirmar');
    }

    if (!region.value) {
      marcarError(region, 'error-region', 'Selecciona tu región.');
      formularioValido = false;
    } else {
      limpiarError(region, 'error-region');
    }

    if (!comuna.value) {
      marcarError(comuna, 'error-comuna', 'Selecciona tu comuna.');
      formularioValido = false;
    } else {
      limpiarError(comuna, 'error-comuna');
    }

    if (formularioValido) {
      mensajeExito.textContent = `¡Cuenta creada correctamente, ${nombre.value.trim()}! Ya puedes iniciar sesión.`;
      formulario.reset();
      comuna.disabled = true;
      comuna.innerHTML = '<option value="">Selecciona primero tu región</option>';
    }
  });
}

// ---------- Formulario de inicio de sesión ----------

function inicializarFormularioLogin() {
  const formulario = document.querySelector('#formulario-login');
  if (!formulario) return;

  const correo = document.querySelector('#correo-login');
  const clave = document.querySelector('#clave-login');
  const mensajeExito = document.querySelector('#mensaje-login-exito');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    mensajeExito.textContent = '';
    let formularioValido = true;

    if (!correo.value.trim()) {
      marcarError(correo, 'error-correo-login', 'El correo es obligatorio.');
      formularioValido = false;
    } else if (correo.value.trim().length > 100) {
      marcarError(correo, 'error-correo-login', 'El correo no puede superar los 100 caracteres.');
      formularioValido = false;
    } else if (!correoConDominioValido(correo.value)) {
      marcarError(correo, 'error-correo-login', 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.');
      formularioValido = false;
    } else {
      limpiarError(correo, 'error-correo-login');
    }

    if (!clave.value || clave.value.length < 4 || clave.value.length > 10) {
      marcarError(clave, 'error-clave-login', 'La contraseña debe tener entre 4 y 10 caracteres.');
      formularioValido = false;
    } else {
      limpiarError(clave, 'error-clave-login');
    }

    if (formularioValido) {
      mensajeExito.textContent = 'Inicio de sesión correcto. Bienvenido de vuelta.';
      formulario.reset();
    }
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

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    mensajeExito.textContent = '';
    let formularioValido = true;

    if (!nombre.value.trim()) {
      marcarError(nombre, 'error-nombre-contacto', 'El nombre es obligatorio.');
      formularioValido = false;
    } else if (soloEspacios(nombre.value)) {
      marcarError(nombre, 'error-nombre-contacto', 'El nombre no puede contener solo espacios.');
      formularioValido = false;
    } else if (nombre.value.trim().length > 100) {
      marcarError(nombre, 'error-nombre-contacto', 'El nombre no puede superar los 100 caracteres.');
      formularioValido = false;
    } else {
      limpiarError(nombre, 'error-nombre-contacto');
    }

    if (!correo.value.trim()) {
      marcarError(correo, 'error-correo-contacto', 'El correo es obligatorio.');
      formularioValido = false;
    } else if (correo.value.trim().length > 100) {
      marcarError(correo, 'error-correo-contacto', 'El correo no puede superar los 100 caracteres.');
      formularioValido = false;
    } else if (!correoConDominioValido(correo.value)) {
      marcarError(correo, 'error-correo-contacto', 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.');
      formularioValido = false;
    } else {
      limpiarError(correo, 'error-correo-contacto');
    }

    if (!comentario.value.trim()) {
      marcarError(comentario, 'error-comentario', 'El comentario es obligatorio.');
      formularioValido = false;
    } else if (comentario.value.length > 500) {
      marcarError(comentario, 'error-comentario', 'El comentario no puede superar los 500 caracteres.');
      formularioValido = false;
    } else {
      limpiarError(comentario, 'error-comentario');
    }

    if (formularioValido) {
      mensajeExito.textContent = '¡Gracias por tu comentario! Te responderemos a la brevedad.';
      formulario.reset();
      if (contadorComentario) contadorComentario.textContent = '0';
    }
  });
}

// ---------- Arranque ----------

poblarRegiones();
inicializarFormularioRegistro();
inicializarFormularioLogin();
inicializarFormularioContacto();
