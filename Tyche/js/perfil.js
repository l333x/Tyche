document.addEventListener("DOMContentLoaded", () => {
    const guardarPerfil = document.getElementById("guardarPerfil");
    const avatarOpciones = document.querySelectorAll(".avatar");

    // Cargar datos previos del almacenamiento local
    cargarPerfil();

    // Manejar selección de avatar
    avatarOpciones.forEach((avatar) => {
        avatar.addEventListener("click", () => {
            // Remover la clase "seleccionado" de todos los avatares
            avatarOpciones.forEach((opcion) => opcion.classList.remove("seleccionado"));

            // Agregar la clase "seleccionado" al avatar seleccionado
            avatar.classList.add("seleccionado");

            // Guardar la elección en el almacenamiento local
            const avatarSeleccionado = avatar.getAttribute("data-avatar");
            localStorage.setItem("avatarSeleccionado", avatarSeleccionado);
        });
    });

    // Guardar datos al hacer clic en el botón
    guardarPerfil.addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const carrera = document.getElementById("carrera").value.trim();
        const apodo = document.getElementById("apodo").value.trim();
        const avatarSeleccionado = localStorage.getItem("avatarSeleccionado") || "azul"; // Valor predeterminado

        // Validar campos vacíos
        if (!nombre || !apellido || !correo || !carrera || !apodo) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Crear un objeto con los datos
        const perfil = {
            nombre,
            apellido,
            correo,
            carrera,
            apodo,
            avatar: avatarSeleccionado, // Guardar el avatar seleccionado
            puntos: 100, // Simula puntos iniciales
            actividades: {
                realizadas: 5, // Ejemplo: actividades completadas
                noRealizadas: 3, // Ejemplo: actividades pendientes
            },
        };

        // Guardar en el almacenamiento local
        localStorage.setItem("perfil", JSON.stringify(perfil));
        alert("¡Perfil guardado exitosamente!");
        cargarPerfil(); // Recargar los datos para mostrar en la interfaz
    });

    function cargarPerfil() {
        const perfilGuardado = localStorage.getItem("perfil");
        const avatarSeleccionado = localStorage.getItem("avatarSeleccionado");

        if (perfilGuardado) {
            const perfil = JSON.parse(perfilGuardado);
            document.getElementById("nombre").value = perfil.nombre || "";
            document.getElementById("apellido").value = perfil.apellido || "";
            document.getElementById("correo").value = perfil.correo || "";
            document.getElementById("carrera").value = perfil.carrera || "";
            document.getElementById("apodo").value = perfil.apodo || "";
            document.getElementById("totalPuntos").textContent = perfil.puntos || 0;
            document.getElementById("actividadesRealizadas").textContent = perfil.actividades.realizadas || 0;
            document.getElementById("actividadesPendientes").textContent = perfil.actividades.noRealizadas || 0;

            // Seleccionar el avatar previamente guardado
            if (avatarSeleccionado) {
                avatarOpciones.forEach((avatar) => {
                    avatar.classList.remove("seleccionado");
                    if (avatar.getAttribute("data-avatar") === avatarSeleccionado) {
                        avatar.classList.add("seleccionado");
                    }
                });
            }
        }
    }
});
