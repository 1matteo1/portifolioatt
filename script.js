/* ==========================================================================
   PORTFÓLIO PESSOAL — SCRIPT PRINCIPAL
   Este arquivo é carregado em todas as páginas (index, formação,
   portfólio e contato) e cuida de 4 comportamentos:
   1) Alternância de tema claro/escuro (com persistência em localStorage)
   2) Menu responsivo (abre/fecha em telas pequenas)
   3) Revelação suave das seções ao rolar a página
   4) Validação e simulação de envio do formulário de contato
   Não usa nenhuma biblioteca externa — apenas JavaScript puro (Vanilla JS).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileMenu();
  initScrollReveal();
  initContactForm();
  markCurrentPageInMenu();
});

/* --------------------------------------------------------------------------
   1) TEMA CLARO/ESCURO
   Guarda a escolha do usuário em localStorage para que a preferência
   se mantenha ao navegar entre as páginas do site.
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const STORAGE_KEY = "portfolio-theme";
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    toggleBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
    );
  };

  // Tema salvo tem prioridade; caso não exista, respeita a preferência do sistema
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

/* --------------------------------------------------------------------------
   2) MENU RESPONSIVO (hambúrguer)
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (!menuToggle || !navMenu) return;

  const closeMenu = () => {
    navMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu automaticamente ao escolher um link (melhora a navegação no celular)
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fecha o menu se a tela for redimensionada para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu();
  });
}

/* --------------------------------------------------------------------------
   3) REVELAÇÃO SUAVE AO ROLAR
   Usa IntersectionObserver para adicionar a classe "is-visible" apenas
   quando o elemento entra na tela — mais eficiente do que ouvir o evento
   de scroll diretamente.
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4) FORMULÁRIO DE CONTATO — validação + simulação de envio
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const modal = document.getElementById("success-modal");
  const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
  const statusEl = document.getElementById("form-status");

  const fields = {
    name: form.querySelector("#field-name"),
    email: form.querySelector("#field-email"),
    message: form.querySelector("#field-message"),
  };

  // Expressão regular simples para validar o formato "usuario@dominio.com"
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showError = (input, message) => {
    const wrapper = input.closest(".form-field");
    const errorEl = wrapper.querySelector(".field-error");
    wrapper.classList.add("has-error");
    errorEl.textContent = message;
  };

  const clearError = (input) => {
    const wrapper = input.closest(".form-field");
    const errorEl = wrapper.querySelector(".field-error");
    wrapper.classList.remove("has-error");
    errorEl.textContent = "";
  };

  const validateField = (input) => {
    const value = input.value.trim();

    if (value === "") {
      showError(input, "Este campo é obrigatório.");
      return false;
    }

    if (input === fields.email && !EMAIL_REGEX.test(value)) {
      showError(input, "Informe um e-mail válido (ex: nome@dominio.com).");
      return false;
    }

    clearError(input);
    return true;
  };

  // Valida cada campo em tempo real, ao sair do campo (evento "blur")
  Object.values(fields).forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".form-field").classList.contains("has-error")) {
        validateField(input);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // impede o envio real, pois é uma simulação

    const results = Object.values(fields).map((input) => validateField(input));
    const isValid = results.every(Boolean);

    if (!isValid) {
      statusEl.textContent =
        "Verifique os campos destacados antes de enviar.";
      statusEl.style.color = "var(--danger)";
      return;
    }

    // Simulação do envio: em um site real, aqui iria uma chamada a um
    // serviço de e-mail/back-end. Como é uma simulação, apenas limpamos
    // o formulário e exibimos a confirmação.
    statusEl.textContent = "";
    form.reset();
    openModal(modal);
  });

  modalCloseButtons.forEach((btn) =>
    btn.addEventListener("click", () => closeModal(modal))
  );

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal(modal);
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.querySelector(".modal")?.focus();
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("is-open");
}

/* --------------------------------------------------------------------------
   5) DESTACA NO MENU A PÁGINA ATUAL (aria-current)
   Ajuda o usuário a saber em qual seção do site ele está.
   -------------------------------------------------------------------------- */
function markCurrentPageInMenu() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const linkFile = link.getAttribute("href");
    if (linkFile === currentFile) {
      link.setAttribute("aria-current", "page");
    }
  });
}
