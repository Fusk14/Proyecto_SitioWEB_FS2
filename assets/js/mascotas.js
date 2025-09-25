document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formMascota");
  const listaMascotas = document.getElementById("listaMascotas");

  // Cargar mascotas ya guardadas
  const mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];
  mostrarMascotas();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreMascota").value.trim();
    const tipo = document.getElementById("tipo").value;
    const edad = document.getElementById("edad").value;

    if (!nombre || !tipo || edad === "") {
      alert("⚠️ Debes completar todos los campos.");
      return;
    }

    mascotas.push({ nombre, tipo, edad });
    localStorage.setItem("mascotas", JSON.stringify(mascotas));

    form.reset();
    mostrarMascotas();
  });

  function mostrarMascotas() {
    listaMascotas.innerHTML = "";
    mascotas.forEach((m, i) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${m.nombre} (${m.tipo}, ${m.edad} años)`;
      listaMascotas.appendChild(li);
    });
  }
});
