// Validar correo electrónico con expresión regular
function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(correo);
}

// Evento para el formulario de Inicio de Sesión
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const correo = document.getElementById('loginCorreo').value.trim();
    const contrasena = document.getElementById('loginContrasena').value.trim();

    if (!correo || !contrasena) {
        alert('Por favor, completa todos los campos.');
    } else if (!validarCorreo(correo)) {
        alert('Por favor, ingresa un correo válido.');
    } else {
        fetch('login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ correo, contrasena })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                if (data.rol === 'profesor') {
                    window.location.href = 'perfil_profesor.html'; // Ejemplo: redirigir al perfil del profesor
                } else {
                    window.location.href = 'perfil_estudiante.html'; // Ejemplo: redirigir al perfil del estudiante
                }
            } else {
                alert(data.message);
            }
        });
    }
});

// Evento para el formulario de Crear Cuenta
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const cedula = document.getElementById('cedula').value.trim();
    const correo = document.getElementById('registerCorreo').value.trim();
    const contrasena = document.getElementById('registerContrasena').value.trim();
    const rol = document.getElementById('rol').value;

    if (!cedula || !correo || !contrasena || !rol) {
        alert('Por favor, completa todos los campos.');
    } else if (!validarCorreo(correo)) {
        alert('Por favor, ingresa un correo válido.');
    } else {
        fetch('registro.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ cedula, correo, contrasena, rol })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.href = 'perfil.html'; // Redirige al perfil
            } else {
                alert(data.message);
            }
        });
    }
});
