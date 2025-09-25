document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formInventario");
  const listaInventario = document.getElementById("listaInventario");

  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
  mostrarInventario();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const producto = document.getElementById("producto").value.trim();
    const cantidad = document.getElementById("cantidad").value;

    if (!producto || cantidad <= 0) {
      alert("⚠️ Debes ingresar un producto válido y una cantidad mayor a 0.");
      return;
    }

    inventario.push({ producto, cantidad });
    localStorage.setItem("inventario", JSON.stringify(inventario));

    form.reset();
    mostrarInventario();
  });

  function mostrarInventario() {
    listaInventario.innerHTML = "";
    inventario.forEach((i) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${i.producto} - Cantidad: ${i.cantidad}`;
      listaInventario.appendChild(li);
    });
  }
});
