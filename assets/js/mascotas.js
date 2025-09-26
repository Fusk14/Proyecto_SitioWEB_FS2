document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formMascota");
  const listaMascotas = document.getElementById("listaMascotas");

  const mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];
  mostrarMascotas();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreMascota").value.trim();
    const tipo = document.getElementById("tipo").value;
    const raza = document.getElementById("raza").value.trim();
    const color = document.getElementById("color").value.trim();
    const edad = document.getElementById("edad").value;
    const peso = document.getElementById("peso").value;
    const genero = document.getElementById("genero").value;
    const observaciones = document.getElementById("observaciones").value.trim();

    if (!nombre || !tipo || edad === "") {
      alert("⚠️ Debes completar al menos Nombre, Tipo y Edad.");
      return;
    }

    mascotas.push({ nombre, tipo, raza, color, edad, peso, genero, observaciones });
    localStorage.setItem("mascotas", JSON.stringify(mascotas));

    form.reset();
    mostrarMascotas();
  });

  function mostrarMascotas() {
    listaMascotas.innerHTML = "";
    mascotas.forEach((m) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `
        <strong>${m.nombre}</strong> (${m.tipo}${m.raza ? ", " + m.raza : ""})<br>
        Edad: ${m.edad} años${m.peso ? " | Peso: " + m.peso + " kg" : ""}${m.color ? " | Color: " + m.color : ""}${m.genero ? " | " + m.genero : ""}
        ${m.observaciones ? "<br><em>Obs: " + m.observaciones + "</em>" : ""}
      `;
      listaMascotas.appendChild(li);
    });
  }
});
