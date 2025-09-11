document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const rut = document.getElementById("rut").value;
  const contrasena = document.getElementById("password").value;

  const res = await fetch("http://localhost:8081/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rut, contrasena })
  });

  if (res.ok) {
    alert("Login exitoso!");
    // Aquí rediriges al panel de cliente o admin según el rol
  } else {
    alert("Error: credenciales inválidas");
  }
});
