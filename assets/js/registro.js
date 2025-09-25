document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombreInput = document.getElementById("nombre");
  const rutInput = document.getElementById("rut");
  const contrasenaInput = document.getElementById("contrasena");

  const nombre = nombreInput.value.trim();
  const rut = rutInput.value.trim();
  const contrasena = contrasenaInput.value.trim();

  let valido = true;

  // Validación nombre
  if (nombre === "") {
    nombreInput.classList.add("is-invalid");
    valido = false;
  } else {
    nombreInput.classList.remove("is-invalid");
    nombreInput.classList.add("is-valid");
  }

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

  // Recuperar usuarios guardados
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si ya existe el RUT
  if (usuarios.find(u => u.rut === rut)) {
    alert("⚠️ Este RUT ya está registrado. Intenta iniciar sesión.");
    return;
  }

  // Guardar nuevo usuario
  usuarios.push({ nombre, rut, contrasena });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
  window.location.href = "login.html";
});
