const WHATSAPP_NUMBER = "5598991856123";
const DEFAULT_MESSAGE =
  "Ol\u00e1, quero solicitar um or\u00e7amento para um site com a ALGdivulga+.";

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const whatsappLinks = document.querySelectorAll("[data-whatsapp]");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const navSectionPairs = [...navLinks]
  .map((link) => {
    const hash = link.getAttribute("href");
    const section = hash?.startsWith("#") ? document.querySelector(hash) : null;
    return section ? { hash, section } : null;
  })
  .filter(Boolean);

function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message || DEFAULT_MESSAGE);
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (cleanNumber) {
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  }

  return `https://api.whatsapp.com/send?text=${encoded}`;
}

function setWhatsappLinks() {
  whatsappLinks.forEach((link) => {
    link.href = buildWhatsAppUrl(DEFAULT_MESSAGE);
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

function buildLeadPayload(formData) {
  return {
    nome: String(formData.get("nome") || "").trim(),
    projeto: String(formData.get("projeto") || "").trim(),
    mensagem: String(formData.get("mensagem") || "").trim(),
  };
}

function buildLeadMessage(payload) {
  return [
    `Ol\u00e1, sou ${payload.nome || "cliente"}.`,
    `Quero solicitar um or\u00e7amento para: ${payload.projeto || "site"}.`,
    payload.mensagem ? `Resumo: ${payload.mensagem}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function setActiveNavLink(hash) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === hash;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateActiveNavFromScroll() {
  if (!navSectionPairs.length) return;

  const pageBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

  if (pageBottom) {
    setActiveNavLink(navSectionPairs[navSectionPairs.length - 1].hash);
    return;
  }

  const offset = (header?.offsetHeight || 0) + 96;
  const scrollPosition = window.scrollY + offset;
  let activeHash = "";

  navSectionPairs.forEach(({ hash, section }) => {
    if (scrollPosition >= section.offsetTop) {
      activeHash = hash;
    }
  });

  setActiveNavLink(activeHash);
}

setWhatsappLinks();
updateHeaderState();
updateActiveNavFromScroll();

window.addEventListener(
  "scroll",
  () => {
    updateHeaderState();
    updateActiveNavFromScroll();
  },
  { passive: true }
);

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");

    const hash = event.target.getAttribute("href");
    if (hash?.startsWith("#")) {
      setActiveNavLink(hash);
    }
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const payload = buildLeadPayload(formData);
  const message = buildLeadMessage(payload);

  window.open(buildWhatsAppUrl(message), "_blank", "noopener");

  if (formNote) {
    formNote.textContent = "Mensagem pronta. O WhatsApp foi aberto para envio.";
  }
});
