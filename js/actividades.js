document.addEventListener("DOMContentLoaded", () => {
    const listaActividades = document.getElementById("listaActividades");
    const actividadAsignada = document.getElementById("actividadAsignada");
    const btnAceptarActividad = document.getElementById("btnAceptarActividad");
    const inputEvidencia = document.getElementById("inputEvidencia");
    const btnVerMisPuntos = document.getElementById("btnVerMisPuntos");

    const actividadesAcademicas = Array.from({ length: 30 }, (_, i) => ({
        nombre: `Actividad Académica ${i + 1}`,
        descripcion: `Descripción de la actividad Académica ${i + 1}.`,
        puntos: Math.floor(Math.random() * 100) + 1,
        estado: "pendiente",
    }));

    const actividadesExtracurriculares = Array.from({ length: 30 }, (_, i) => ({
        nombre: `Actividad Extracurricular ${i + 1}`,
        descripcion: `Descripción de la actividad Extracurricular ${i + 1}.`,
        puntos: Math.floor(Math.random() * 100) + 1,
        estado: "pendiente",
    }));

    let actividadesActuales = [];
    let actividadSeleccionada = null;

    function cargarActividades(tipo) {
        actividadesActuales = tipo === "academicas" ? actividadesAcademicas : actividadesExtracurriculares;

        listaActividades.innerHTML = "";
        actividadesActuales.forEach((actividad, index) => {
            const div = document.createElement("div");
            div.className = `actividad ${actividad.estado}`;
            div.textContent = actividad.nombre;
            div.addEventListener("click", () => asignarActividad(actividad, index));
            listaActividades.appendChild(div);
        });
    }

    function asignarActividad(actividad, index) {
        actividadSeleccionada = index;
        actividadAsignada.innerHTML = `
            <h4>${actividad.nombre}</h4>
            <p>${actividad.descripcion}</p>
            <p>Puntos: ${actividad.puntos}</p>
        `;
        inputEvidencia.value = "";
        btnAceptarActividad.style.display = "block";
    }

    btnAceptarActividad.addEventListener("click", () => {
        if (!inputEvidencia.value) {
            alert("Por favor, suba un archivo como evidencia antes de aceptar la actividad.");
            return;
        }

        const actividad = actividadesActuales[actividadSeleccionada];
        actividad.estado = "en-proceso";
        cargarActividades(actividadesActuales === actividadesAcademicas ? "academicas" : "extracurriculares");
        alert("Evidencia enviada. Actividad marcada como 'En Proceso'.");
    });

    btnVerMisPuntos.addEventListener("click", () => {
        localStorage.setItem("actividades", JSON.stringify(actividadesActuales));
        window.location.href = "mispuntos.html";
    });

    document.getElementById("btnAcademicas").addEventListener("click", () => cargarActividades("academicas"));
    document.getElementById("btnExtracurriculares").addEventListener("click", () => cargarActividades("extracurriculares"));

    cargarActividades("academicas");
});
