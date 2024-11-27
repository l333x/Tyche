document.addEventListener("DOMContentLoaded", () => {
    const puntosTotales = document.getElementById("puntosTotales");
    const listaTransacciones = document.getElementById("listaTransacciones");
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");

    let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    let totalPuntos = 0;

    // Navegación
    const actividadesPorPagina = 10;
    let paginaActual = 1;

    const cargarTransacciones = () => {
        const inicio = (paginaActual - 1) * actividadesPorPagina;
        const fin = inicio + actividadesPorPagina;
        const actividadesPagina = actividades.slice(inicio, fin);

        listaTransacciones.innerHTML = "";

        actividadesPagina.forEach((actividad) => {
            const tr = document.createElement("tr");

            const tdNombre = document.createElement("td");
            tdNombre.textContent = actividad.nombre;

            const tdDia = document.createElement("td");
            tdDia.textContent = new Date().toLocaleDateString();

            const tdPuntos = document.createElement("td");
            tdPuntos.textContent = actividad.puntos;

            const tdEstado = document.createElement("td");
            tdEstado.textContent =
                actividad.estado === "completada"
                    ? "Completada"
                    : actividad.estado === "verificacion"
                    ? "En Verificación"
                    : "Pendiente";
            tdEstado.className =
                actividad.estado === "completada"
                    ? "estado-completada"
                    : actividad.estado === "verificacion"
                    ? "estado-verificacion"
                    : "";

            if (actividad.estado === "completada") {
                totalPuntos += actividad.puntos;
            }

            tr.appendChild(tdNombre);
            tr.appendChild(tdDia);
            tr.appendChild(tdPuntos);
            tr.appendChild(tdEstado);
            listaTransacciones.appendChild(tr);
        });

        puntosTotales.textContent = totalPuntos;

        // Actualizar botones de navegación
        btnAnterior.disabled = paginaActual === 1;
        btnSiguiente.disabled = fin >= actividades.length;
    };

    btnAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            cargarTransacciones();
        }
    });

    btnSiguiente.addEventListener("click", () => {
        if (paginaActual * actividadesPorPagina < actividades.length) {
            paginaActual++;
            cargarTransacciones();
        }
    });

    cargarTransacciones();
});
