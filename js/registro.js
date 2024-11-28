// Validar correo electrónico con expresión regular
function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(correo);
}

// Evento para crear una cuenta
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const cedula = document.getElementById('cedula').value.trim();
    const correo = document.getElementById('registerCorreo').value.trim();
    const contrasena = document.getElementById('registerContrasena').value.trim();
    const rol = document.getElementById('rol').value;

    if (!cedula || !correo || !contrasena || rol === "Seleccione una opcion") {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    if (!validarCorreo(correo)) {
        alert('Por favor, ingresa un correo válido.');
        return;
    }

    // Obtener los usuarios existentes del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Comprobar si el correo ya está registrado
    const usuarioExistente = usuarios.find(usuario => usuario.correo === correo);
    if (usuarioExistente) {
        alert('Este correo ya está registrado. Intenta con otro.');
        return;
    }

    // Guardar el nuevo usuario en localStorage
    usuarios.push({ cedula, correo, contrasena, rol });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cuenta creada exitosamente.');
    // Redirigir al perfil después de crear la cuenta
    window.location.href = 'perfil.html';
});

// Evento para iniciar sesión
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const correo = document.getElementById('loginCorreo').value.trim();
    const contrasena = document.getElementById('loginContrasena').value.trim();

    if (!correo || !contrasena) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (!validarCorreo(correo)) {
        alert('Por favor, ingresa un correo válido.');
        return;
    }

    // Obtener los usuarios existentes del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validar las credenciales
    const usuario = usuarios.find(
        usuario => usuario.correo === correo && usuario.contrasena === contrasena
    );

    if (!usuario) {
        alert('Correo o contraseña incorrectos.');
        return;
    }

    alert('Inicio de sesión exitoso.');
    // Guardar el usuario actual en localStorage
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));

    // Redirigir al perfil después de iniciar sesión
    window.location.href = 'perfil.html';
});
