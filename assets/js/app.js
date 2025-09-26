// app.js
function verificarSesion(e) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    e.preventDefault();
    const modal = new bootstrap.Modal(document.getElementById("loginRequiredModal"));
    modal.show();
  }
}

function mostrarDatosUsuario() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginMenu = document.getElementById("loginMenu");
  const logoutContainer = document.getElementById("logoutContainer");
  const perfilLink = document.getElementById("perfil-link");
  const adminMenu = document.getElementById("adminMenu");

  if (isLoggedIn) {
    const nombre = localStorage.getItem("nombre");
    const rut = localStorage.getItem("rut");

    if (loginMenu) loginMenu.classList.add("d-none");
    if (logoutContainer) logoutContainer.classList.remove("d-none");
    if (adminMenu) adminMenu.classList.remove("d-none");

    if (perfilLink) {
      perfilLink.dataset.bsToggle = "modal";
      perfilLink.dataset.bsTarget = "#modal-perfil";
      perfilLink.href = "#";
      perfilLink.innerHTML = `<span>${nombre}</span><br><small>${rut}</small>`;

      const modalNombre = document.getElementById("perfil-modal-nombre");
      const modalRut = document.getElementById("perfil-modal-rut");
      if (modalNombre) modalNombre.textContent = nombre;
      if (modalRut) modalRut.textContent = rut;
    }
  } else {
    if (loginMenu) loginMenu.classList.remove("d-none");
    if (logoutContainer) logoutContainer.classList.add("d-none");
    if (adminMenu) adminMenu.classList.add("d-none");

    if (perfilLink) {
      perfilLink.dataset.bsToggle = "";
      perfilLink.dataset.bsTarget = "";
      perfilLink.href = "#verperfil";
      perfilLink.innerHTML = "Ver Perfil";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Protege los botones de servicios
  document.querySelectorAll(".btn-servicio").forEach(btn => {
    btn.addEventListener("click", verificarSesion);
  });

  mostrarDatosUsuario();

  // Cerrar sesión
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      alert("👋 Sesión cerrada correctamente.");
      window.location.href = "login.html";
    });
  }
});

// app.js
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Si está logueado y estamos en login o registro => redirigir a index.html
  const currentPage = window.location.pathname.split("/").pop();

  if (isLoggedIn && (currentPage === "login.html" || currentPage === "registro.html")) {
    alert("⚠️ Ya tienes una sesión iniciada.");
    window.location.href = "index.html"; // Redirige al inicio
  }

  // Ocultar botón Iniciar Sesión si está logueado
  if (isLoggedIn) {
    const loginLinks = document.querySelectorAll('a[href="login.html"]');
    loginLinks.forEach(link => link.classList.add("d-none")); // Oculta el link
  }

  // Ocultar botón Registrar en login si está logueado
  if (isLoggedIn && document.getElementById("registroForm")) {
    document.getElementById("registroForm").classList.add("d-none");
  }

  // Botón Cerrar Sesión
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("rut");
      localStorage.removeItem("nombre");
      localStorage.removeItem("rol");
      alert("✅ Sesión cerrada correctamente");
      window.location.href = "index.html";
    });
  }
});

