document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const rutInput = document.getElementById("rut");
  const contrasenaInput = document.getElementById("contrasena");

  const rut = rutInput.value.trim();
  const contrasena = contrasenaInput.value.trim();

  let valido = true;

  // Validación RUT
  const rutRegex = /^[0-9]{7,8}-[0-9Kk]{1}$/;
  if (!rutRegex.test(rut)) {
    rutInput.classList.add("is-invalid");
    valido = false;
  } else {
    rutInput.classList.remove("is-invalid");
    rutInput.classList.add("is-valid");
  }

  // Validación contraseña
  if (contrasena === "") {
    contrasenaInput.classList.add("is-invalid");
    valido = false;
  } else {
    contrasenaInput.classList.remove("is-invalid");
    contrasenaInput.classList.add("is-valid");
  }

  if (!valido) return;

  // Buscar usuario registrado
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(
    (u) => u.rut === rut && u.contrasena === contrasena
  );

  if (!usuario) {
    alert("❌ Credenciales inválidas. Verifique sus datos o regístrese.");
    return;
  }

  // Guardar datos de sesión
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("rut", usuario.rut);
  localStorage.setItem("nombre", usuario.nombre);
  localStorage.setItem("rol", "cliente");

  alert("Inicio de sesión exitoso. Bienvenido " + usuario.nombre);
  window.location.href = "index.html";
});
