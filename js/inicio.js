document.addEventListener("DOMContentLoaded", () => {
    const puntosTotales = document.getElementById("puntosTotales");
    const listaActividades = document.getElementById("listaActividades");
    const navegacion = document.getElementById("navegacion");

    const actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    const actividadesPorPagina = 3;
    let paginaActual = 1;

    let totalPuntos = 0;

    // Calcular puntos totales
    actividades.forEach((actividad) => {
        if (actividad.estado === "completada") {
            totalPuntos += actividad.puntos;
        }
    });

    puntosTotales.textContent = totalPuntos;

    function cargarActividades() {
        listaActividades.innerHTML = "";

        const inicio = (paginaActual - 1) * actividadesPorPagina;
        const fin = inicio + actividadesPorPagina;

        actividades.slice(inicio, fin).forEach((actividad) => {
            const div = document.createElement("div");
            div.className = `actividad ${actividad.estado}`;
            div.innerHTML = `
                <h4>${actividad.nombre}</h4>
                <p>${actividad.estado === "completada" ? "Completado" : actividad.estado === "verificacion" ? "En Verificación" : "Pendiente"}</p>
                <p>Puntos: ${actividad.puntos}</p>
            `;
            listaActividades.appendChild(div);
        });

        actualizarNavegacion();
    }

    function actualizarNavegacion() {
        navegacion.innerHTML = "";

        const totalPaginas = Math.ceil(actividades.length / actividadesPorPagina);

        const btnPrev = document.createElement("button");
        btnPrev.textContent = "Anterior";
        btnPrev.disabled = paginaActual === 1;
        btnPrev.addEventListener("click", () => {
            paginaActual--;
            cargarActividades();
        });

        const btnNext = document.createElement("button");
        btnNext.textContent = "Siguiente";
        btnNext.disabled = paginaActual === totalPaginas;
        btnNext.addEventListener("click", () => {
            paginaActual++;
            cargarActividades();
        });

        navegacion.appendChild(btnPrev);
        navegacion.appendChild(btnNext);
    }

    cargarActividades();
});
