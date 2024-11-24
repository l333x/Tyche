// Validar correo electrónico con expresión regular
function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(correo);
}

// Evento para el formulario de Inicio de Sesión
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const correo = document.getElementById('loginCorreo').value.trim();
    const contrasena = document.getElementById('loginContrasena').value.trim();

    if (!correo || !contrasena) {
        alert('Por favor, completa todos los campos.');
    } else if (!validarCorreo(correo)) {
        alert('Por favor, ingresa un correo válido.');
    } else {
        alert('Inicio de sesión exitoso. Redirigiendo al inicio...');
        window.location.href = 'inicio.html'; // Redirige al archivo Inicio.html
    }
});

// Evento para el formulario de Crear Cuenta
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('registerCorreo').value.trim();
    const contrasena = document.getElementById('registerContrasena').value.trim();

    if (!nombre || !correo || !contrasena) {
        alert('Por favor, completa todos los campos.');
    } else if (!validarCorreo(correo)) {
        alert('Por favor, ingresa un correo válido.');
    } else {
        // Guardar información en localStorage para usar en perfil.html
        const usuario = { nombre, correo };
        localStorage.setItem('usuario', JSON.stringify(usuario));

        alert('Cuenta creada exitosamente. Redirigiendo al inicio...');
        window.location.href = 'inicio.html'; // Redirige al archivo Inicio.html
    }
});
