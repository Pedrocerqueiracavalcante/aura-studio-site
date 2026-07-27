/* =====================================================================
   Barbearia Menuz — Interatividade
   Vanilla JS · sem dependências
   ===================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => c ? Array.from(c.querySelectorAll(s)) : [];
  const LANG_KEY = "menuzLanguage";
  const languages = {
    pt: { code: "PT", flagClass: "language-flag--pt", htmlLang: "pt-BR" },
    en: { code: "EN", flagClass: "language-flag--en", htmlLang: "en" },
    es: { code: "ES", flagClass: "language-flag--es", htmlLang: "es" },
    fr: { code: "FR", flagClass: "language-flag--fr", htmlLang: "fr" },
  };
  const i18n = {
    pt: {
      "language.label": "Selecionar idioma",
      "language.portuguese": "Português",
      "language.english": "English",
      "language.spanish": "Español",
      "language.french": "Français",
      "search.label": "Pesquisar",
      "search.placeholder": "Pesquisa por artista, evento ou local",
      "search.button": "Pesquisar",
      "nav.reviews": "Avaliações",
      "nav.contact": "Contato",
      "header.notifications": "Notificações",
      "user.guest": "Visitante",
      "user.loginHint": "Clique para entrar",
      "user.signIn": "Entrar",
      "user.signUp": "Criar conta",
      "user.schedule": "Agendar",
      "reviews.eyebrow": "Avaliações",
      "reviews.title": "Confiança antes do primeiro corte.",
      "reviews.card1": "Atendimento pontual e corte exatamente como escolhi pelo link.",
      "reviews.card2": "A página é simples, vi os serviços e já cheguei sabendo o valor.",
      "reviews.card3": "Ambiente limpo, barbeiro cuidadoso e acabamento muito profissional.",
      "contact.eyebrow": "Contato",
      "contact.title": "Agende seu próximo horário.",
      "contact.text": "Envie uma mensagem com o serviço desejado. A equipe confirma o melhor horário disponível.",
      "contact.whatsapp": "Chamar no WhatsApp",
      "contact.publicPage": "Ver página pública",
      "footer.copy": "© 2026 Menuz Barber. Atendimento premium para barbearias modernas.",
      "toTop.label": "Voltar ao topo",
      "app.bannerText": "Agende agora, é rápido",
      "app.open": "Abrir",
      "app.closeBanner": "Fechar aviso",
      "app.home": "Início",
      "app.search": "Buscar",
      "app.appointments": "Agendamentos",
      "app.profile": "Perfil",
      "login.eyebrow": "Login do barbeiro",
      "login.title": "Entre no painel",
      "login.email": "E-mail",
      "login.password": "Senha",
      "login.passwordPlaceholder": "Sua senha",
      "login.recover": "Recuperar senha",
    },
    en: {
      "language.label": "Select language",
      "language.portuguese": "Português",
      "language.english": "English",
      "language.spanish": "Español",
      "language.french": "Français",
      "search.label": "Search",
      "search.placeholder": "Search by artist, event or place",
      "search.button": "Search",
      "nav.reviews": "Reviews",
      "nav.contact": "Contact",
      "header.notifications": "Notifications",
      "user.guest": "Guest",
      "user.loginHint": "Click to sign in",
      "user.signIn": "Sign in",
      "user.signUp": "Create account",
      "user.schedule": "Book",
      "reviews.eyebrow": "Reviews",
      "reviews.title": "Confidence before the first cut.",
      "reviews.card1": "On-time service and the exact cut I selected through the link.",
      "reviews.card2": "The page is simple. I saw the services and already knew the price.",
      "reviews.card3": "Clean space, careful barber and a very professional finish.",
      "contact.eyebrow": "Contact",
      "contact.title": "Book your next appointment.",
      "contact.text": "Send a message with the service you want. The team confirms the best available time.",
      "contact.whatsapp": "Message on WhatsApp",
      "contact.publicPage": "View public page",
      "footer.copy": "© 2026 Menuz Barber. Premium service for modern barbershops.",
      "toTop.label": "Back to top",
      "app.bannerText": "Book now, it is fast",
      "app.open": "Open",
      "app.closeBanner": "Close notice",
      "app.home": "Home",
      "app.search": "Search",
      "app.appointments": "Appointments",
      "app.profile": "Profile",
      "login.eyebrow": "Barber login",
      "login.title": "Enter the dashboard",
      "login.email": "Email",
      "login.password": "Password",
      "login.passwordPlaceholder": "Your password",
      "login.recover": "Recover password",
    },
    es: {
      "language.label": "Seleccionar idioma",
      "language.portuguese": "Português",
      "language.english": "English",
      "language.spanish": "Español",
      "language.french": "Français",
      "search.label": "Buscar",
      "search.placeholder": "Buscar por artista, evento o lugar",
      "search.button": "Buscar",
      "nav.reviews": "Reseñas",
      "nav.contact": "Contacto",
      "header.notifications": "Notificaciones",
      "user.guest": "Visitante",
      "user.loginHint": "Haz clic para entrar",
      "user.signIn": "Entrar",
      "user.signUp": "Crear cuenta",
      "user.schedule": "Agendar",
      "reviews.eyebrow": "Reseñas",
      "reviews.title": "Confianza antes del primer corte.",
      "reviews.card1": "Atención puntual y el corte exactamente como lo elegí en el enlace.",
      "reviews.card2": "La página es simple. Vi los servicios y ya sabía el precio.",
      "reviews.card3": "Ambiente limpio, barbero cuidadoso y acabado muy profesional.",
      "contact.eyebrow": "Contacto",
      "contact.title": "Agenda tu próximo horario.",
      "contact.text": "Envía un mensaje con el servicio deseado. El equipo confirma el mejor horario disponible.",
      "contact.whatsapp": "Enviar por WhatsApp",
      "contact.publicPage": "Ver página pública",
      "footer.copy": "© 2026 Menuz Barber. Atención premium para barberías modernas.",
      "toTop.label": "Volver arriba",
      "app.bannerText": "Agenda ahora, es rápido",
      "app.open": "Abrir",
      "app.closeBanner": "Cerrar aviso",
      "app.home": "Inicio",
      "app.search": "Buscar",
      "app.appointments": "Agendamientos",
      "app.profile": "Perfil",
      "login.eyebrow": "Login del barbero",
      "login.title": "Entra al panel",
      "login.email": "E-mail",
      "login.password": "Contraseña",
      "login.passwordPlaceholder": "Tu contraseña",
      "login.recover": "Recuperar contraseña",
    },
    fr: {
      "language.label": "Choisir la langue",
      "language.portuguese": "Português",
      "language.english": "English",
      "language.spanish": "Español",
      "language.french": "Français",
      "search.label": "Rechercher",
      "search.placeholder": "Rechercher un artiste, un événement ou un lieu",
      "search.button": "Rechercher",
      "nav.reviews": "Avis",
      "nav.contact": "Contact",
      "header.notifications": "Notifications",
      "user.guest": "Visiteur",
      "user.loginHint": "Cliquez pour vous connecter",
      "user.signIn": "Connexion",
      "user.signUp": "Créer un compte",
      "user.schedule": "Réserver",
      "reviews.eyebrow": "Avis",
      "reviews.title": "La confiance avant la première coupe.",
      "reviews.card1": "Service ponctuel et coupe exactement comme je l'avais choisie via le lien.",
      "reviews.card2": "La page est simple. J'ai vu les services et je connaissais déjà le prix.",
      "reviews.card3": "Espace propre, barbier soigneux et finition très professionnelle.",
      "contact.eyebrow": "Contact",
      "contact.title": "Réservez votre prochain créneau.",
      "contact.text": "Envoyez un message avec le service souhaité. L'équipe confirme le meilleur créneau disponible.",
      "contact.whatsapp": "Envoyer sur WhatsApp",
      "contact.publicPage": "Voir la page publique",
      "footer.copy": "© 2026 Menuz Barber. Service premium pour barbershops modernes.",
      "toTop.label": "Retour en haut",
      "app.bannerText": "Réservez maintenant, c'est rapide",
      "app.open": "Ouvrir",
      "app.closeBanner": "Fermer l'avis",
      "app.home": "Accueil",
      "app.search": "Recherche",
      "app.appointments": "Rendez-vous",
      "app.profile": "Profil",
      "login.eyebrow": "Connexion barbier",
      "login.title": "Accéder au tableau de bord",
      "login.email": "E-mail",
      "login.password": "Mot de passe",
      "login.passwordPlaceholder": "Votre mot de passe",
      "login.recover": "Récupérer le mot de passe",
    },
  };

  /* ---------- App shell: banner + tab bar + ondas (todas as páginas) ---------- */
  const getStoredLanguage = () => {
    try {
      return localStorage.getItem(LANG_KEY);
    } catch (_) {
      return null;
    }
  };
  let currentLanguage = languages[getStoredLanguage()] ? getStoredLanguage() : "pt";
  const t = (key) => i18n[currentLanguage]?.[key] || i18n.pt[key] || key;
  const applyI18n = () => {
    const lang = languages[currentLanguage] || languages.pt;
    document.documentElement.lang = lang.htmlLang;
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-placeholder]").forEach((el) => { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"))); });
    $$("[data-i18n-aria-label]").forEach((el) => { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label"))); });
    $$("[data-language-current-flag]").forEach((el) => {
      el.classList.remove("language-flag--pt", "language-flag--en", "language-flag--es", "language-flag--fr");
      el.classList.add(lang.flagClass);
    });
    $$("[data-language-current-code]").forEach((el) => { el.textContent = lang.code; });
    $$("[data-language-option]").forEach((option) => {
      const selected = option.getAttribute("data-lang") === currentLanguage;
      option.setAttribute("aria-checked", String(selected));
      option.classList.toggle("is-selected", selected);
    });
  };
  const setLanguage = (lang) => {
    if (!languages[lang]) return;
    currentLanguage = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) { /* storage unavailable */ }
    applyI18n();
  };
  const initLanguageSelector = () => {
    $$("[data-language-selector]").forEach((selector) => {
      const trigger = $("[data-language-trigger]", selector);
      const menu = $("[data-language-menu]", selector);
      if (!trigger || !menu) return;
      const setOpen = (open) => {
        selector.classList.toggle("is-open", open);
        trigger.setAttribute("aria-expanded", String(open));
      };
      trigger.addEventListener("click", () => setOpen(!selector.classList.contains("is-open")));
      $$("[data-language-option]", selector).forEach((option) => {
        option.addEventListener("click", () => {
          setLanguage(option.getAttribute("data-lang"));
          setOpen(false);
        });
      });
      document.addEventListener("click", (event) => {
        if (!selector.contains(event.target)) setOpen(false);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
      });
    });
  };
  window.MenuzI18n = { languages, setLanguage, translate: applyI18n, t: (key) => t(key) };

  (function appShell() {
    if (!document.body) return;
    const page = (location.pathname.split("/").pop() || "index.html").toLowerCase() || "index.html";

    // Ondas de fundo
    const waves = document.createElement("div");
    waves.className = "app-bg-waves";
    waves.setAttribute("aria-hidden", "true");
    document.body.prepend(waves);

    // Banner superior (dispensável por sessão)
    if (sessionStorage.getItem("menuzBannerClosed") !== "1") {
      const banner = document.createElement("div");
      banner.className = "app-banner";
      banner.innerHTML =
        '<img class="app-banner__logo" src="assets/img/logo.svg" alt="">' +
        '<div class="app-banner__txt"><strong>Menuz</strong><span>Agende agora, é rápido</span></div>' +
        '<a class="btn btn--primary btn--sm app-banner__cta" href="barbearia-menuz.html#agendamento">Abrir</a>' +
        '<button class="app-banner__close" type="button" aria-label="Fechar aviso">×</button>';
      $(".app-banner__txt span", banner)?.setAttribute("data-i18n", "app.bannerText");
      $(".app-banner__txt span", banner) && ($(".app-banner__txt span", banner).textContent = t("app.bannerText"));
      $(".app-banner__cta", banner)?.setAttribute("data-i18n", "app.open");
      $(".app-banner__cta", banner) && ($(".app-banner__cta", banner).textContent = t("app.open"));
      $(".app-banner__close", banner)?.setAttribute("data-i18n-aria-label", "app.closeBanner");
      $(".app-banner__close", banner)?.setAttribute("aria-label", t("app.closeBanner"));
      document.body.prepend(banner);
      banner.querySelector(".app-banner__close").addEventListener("click", () => {
        banner.hidden = true;
        sessionStorage.setItem("menuzBannerClosed", "1");
      });
    }

    // Tab bar inferior
    const tabs = [
      { label: "Início", href: "index.html", match: ["index.html", ""], icon: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>' },
      { key: "app.search", label: "Buscar", href: "index.html#buscar", match: ["buscar"], icon: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>' },
      { key: "app.appointments", label: "Agendamentos", href: "barbearia-menuz.html#agendamento", match: ["barbearia-menuz.html"], icon: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M3 9h18M8 2v4M16 2v4"/>' },
      { key: "app.profile", label: "Perfil", href: "login.html", match: ["login.html", "dashboard.html"], icon: '<circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3.5-6 7-6s7 2 7 6"/>' },
    ];
    const bar = document.createElement("nav");
    bar.className = "app-tabbar";
    bar.setAttribute("aria-label", "Navegação principal do app");
    bar.innerHTML = tabs.map((t) => {
      const active = t.match.includes(page) ? " is-active" : "";
      return '<a class="app-tab' + active + '" href="' + t.href + '"' + (active ? ' aria-current="page"' : '') +
        '><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        t.icon + '</svg><span data-i18n="' + (t.key || "app.home") + '">' + window.MenuzI18n.t(t.key || "app.home") + '</span></a>';
    }).join("");
    document.body.appendChild(bar);
    document.body.classList.add("has-tabbar");
  })();
  initLanguageSelector();
  applyI18n();

  /* ---------- Ano no rodapé ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: estado ao rolar ---------- */
  const header = $("[data-header]");
  const toTop = $("#toTop");
  const onScroll = () => {
    if (header) header.toggleAttribute("data-scrolled", window.scrollY > 24);
    // Back to top
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Landing premium: carousel de fundo + tilt do card ---------- */
  const barberSlides = $$("[data-barber-carousel] .barber-slide");
  if (barberSlides.length) {
    let barberSlideIndex = 0;
    const showBarberSlide = (nextIndex) => {
      barberSlides[barberSlideIndex]?.classList.remove("is-active");
      barberSlideIndex = (nextIndex + barberSlides.length) % barberSlides.length;
      barberSlides[barberSlideIndex]?.classList.add("is-active");
    };
    if (!reduceMotion) {
      setInterval(() => showBarberSlide(barberSlideIndex + 1), 4000);
    }
  }

  const tiltCard = $("[data-tilt-card]");
  if (tiltCard && !reduceMotion) {
    tiltCard.addEventListener("pointermove", (event) => {
      const rect = tiltCard.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5;
      const py = (event.clientY - rect.top) / rect.height - .5;
      tiltCard.style.transform = `rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-6px)`;
    });
    tiltCard.addEventListener("pointerleave", () => {
      tiltCard.style.transform = "";
    });
  }

  /* ---------- Menu mobile ---------- */
  const navToggle = $("#navToggle");
  const nav = $("#primaryNav");
  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);

  const setNav = (open) => {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("nav-open", open);
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => setNav(!nav.classList.contains("is-open")));
  }
  backdrop.addEventListener("click", () => setNav(false));
  $$(".nav__link", nav).forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-reveal-delay") || 0;
          setTimeout(() => entry.target.classList.add("is-visible"), Number(delay));
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Nav ativa por secção ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__link");
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + id));
        }
      });
    }, { threshold: 0.5, rootMargin: "-20% 0px -40% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Contador de estatísticas ---------- */
  const counters = $$("[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute("data-count"));
    const decimals = (el.getAttribute("data-count").split(".")[1] || "").length;
      if (reduceMotion) { el.textContent = target.toLocaleString("pt-BR", { minimumFractionDigits: decimals }); return; }
    const dur = 1600; const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = val.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { animateCount(entry.target); cObs.unobserve(entry.target); } });
    }, { threshold: 1 });
    counters.forEach((c) => cObs.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Slider de depoimentos ---------- */
  const track = $("#testimonialTrack");
  if (track) {
    const slides = $$(".testimonial", track);
    const dotsWrap = $("#tDots");
    let index = 0; let timer = null;

    // Cria dots
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Depoimento " + (i + 1));
      if (i === 0) b.classList.add("is-active");
      b.addEventListener("click", () => { go(i); restart(); });
      dotsWrap.appendChild(b);
    });
    const dots = $$("button", dotsWrap);

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      // Considera a margem entre slides
      const gap = 1.4 * 16;
      const offset = index * (track.parentElement.clientWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;
      dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
    };
    const next = () => go(index + 1);
    const prev = () => go(index - 1);

    $("#tNext")?.addEventListener("click", () => { next(); restart(); });
    $("#tPrev")?.addEventListener("click", () => { prev(); restart(); });

    const start = () => { if (!reduceMotion) timer = setInterval(next, 6000); };
    const stop = () => { if (timer) clearInterval(timer); };
    const restart = () => { stop(); start(); };

    const viewport = $(".testimonials__viewport");
    viewport?.addEventListener("mouseenter", stop);
    viewport?.addEventListener("mouseleave", start);

    // Suporte a toque (swipe)
    let startX = 0;
    viewport?.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; stop(); }, { passive: true });
    viewport?.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) (dx < 0 ? next() : prev());
      start();
    }, { passive: true });

    window.addEventListener("resize", () => go(index));
    start();
  }

  /* ---------- Validação do formulário ---------- */
  const form = $("#contactForm");
  if (form) {
    const success = $("#formSuccess");

    const validators = {
      name: (v) => v.trim().length >= 2 || "Informe seu nome.",
      phone: (v) => /[0-9]{6,}/.test(v.replace(/\s/g, "")) || "Indica um telemóvel válido.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Indica um email válido.",
    };

    const showError = (input, msg) => {
      const field = input.closest(".field");
      const err = $(`[data-error-for="${input.id}"]`);
      field?.classList.toggle("field--invalid", !!msg);
      if (err) err.textContent = msg || "";
      return !msg;
    };

    const validateField = (input) => {
      const rule = validators[input.name];
      if (!rule) return true;
      const res = rule(input.value);
      return showError(input, res === true ? "" : res);
    };

    ["name", "phone", "email"].forEach((n) => {
      const input = form.elements[n];
      input?.addEventListener("blur", () => validateField(input));
      input?.addEventListener("input", () => { if (input.closest(".field").classList.contains("field--invalid")) validateField(input); });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      ["name", "phone", "email"].forEach((n) => { if (!validateField(form.elements[n])) ok = false; });
      if (!ok) { form.querySelector(".field--invalid input")?.focus(); return; }

      // Simulação de envio (substituir por integração real: Formspree, EmailJS, API…)
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true; btn.textContent = "A enviar…";
      setTimeout(() => {
        btn.disabled = false; btn.textContent = original;
        form.reset();
        if (success) { success.hidden = false; success.scrollIntoView({ behavior: "smooth", block: "center" }); }
        setTimeout(() => { if (success) success.hidden = true; }, 6000);
      }, 1100);
    });
  }

  /* ---------- Coverflow de cortes em destaque (hero, estilo Menuz) ---------- */
  const cfTrack = $("#cfTrack");
  if (cfTrack) {
    const stage = cfTrack.closest(".cf-stage");
    const slides = $$(".cf-slide", cfTrack);
    const dotsWrap = $("#cfDots");
    let active = Math.min(1, slides.length - 1), cfTimer = null;

    slides.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Corte " + (i + 1));
      b.addEventListener("click", () => { cfCenter(i); cfRestart(); });
      dotsWrap.appendChild(b);
      // clicar num card vizinho tra-lo para o centro
      s.addEventListener("click", (e) => {
        if (e.target.closest(".cut__select")) return;
        if (i !== active) { cfCenter(i); cfRestart(); }
      });
    });
    const cfDots = $$("button", dotsWrap);

    const cfCenter = (i) => {
      active = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === active));
      cfDots.forEach((d, k) => d.classList.toggle("is-active", k === active));
      const s = slides[active];
      const target = stage.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2);
      cfTrack.style.transform = `translateX(${target}px)`;
    };
    const cfNext = () => cfCenter(active + 1);
    const cfPrev = () => cfCenter(active - 1);
    $("#cfNext")?.addEventListener("click", () => { cfNext(); cfRestart(); });
    $("#cfPrev")?.addEventListener("click", () => { cfPrev(); cfRestart(); });

    const cfStart = () => { if (!reduceMotion) cfTimer = setInterval(cfNext, 4500); };
    const cfStop = () => { if (cfTimer) clearInterval(cfTimer); };
    const cfRestart = () => { cfStop(); cfStart(); };

    stage.addEventListener("mouseenter", cfStop);
    stage.addEventListener("mouseleave", cfStart);
    let cfSx = 0;
    stage.addEventListener("touchstart", (e) => { cfSx = e.touches[0].clientX; cfStop(); }, { passive: true });
    stage.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - cfSx; if (Math.abs(dx) > 40) (dx < 0 ? cfNext() : cfPrev()); cfStart(); }, { passive: true });

    let cfRz;
    window.addEventListener("resize", () => { clearTimeout(cfRz); cfRz = setTimeout(() => cfCenter(active), 120); });
    window.addEventListener("load", () => cfCenter(active));
    requestAnimationFrame(() => cfCenter(active));
    cfStart();
  }

  /* ---------- Filtro de cortes por categoria ---------- */
  const cutsFilter = $("#cutsFilter");
  const cutsGrid = $("#cutsGrid");
  if (cutsFilter && cutsGrid) {
    const cards = $$(".cut", cutsGrid);
    cutsFilter.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      $$(".chip", cutsFilter).forEach((c) => {
        const on = c === btn;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-selected", on ? "true" : "false");
      });
      const f = btn.getAttribute("data-filter");
      cards.forEach((card) => {
        card.classList.toggle("is-hidden", !(f === "all" || card.getAttribute("data-cat") === f));
      });
    });
  }

  /* ---------- Seleção de corte → contato + WhatsApp ---------- */
  const WA_NUMBER = "5531999999999";
  const cutsSelected = $("#cutsSelected");
  const formChosen = $("#formChosen");
  const cfMsg = document.getElementById("cf-msg");
  const waSend = $("#waSend");
  const waFloat = $(".wa-float");

  const selectCut = (name, cardEl) => {
    $$(".cut.is-selected").forEach((c) => c.classList.remove("is-selected"));
    if (cardEl) cardEl.classList.add("is-selected");

    if (cutsSelected) { cutsSelected.hidden = false; cutsSelected.textContent = "✓ Corte selecionado: " + name + ". Continua para agendar."; }
    if (formChosen) { formChosen.hidden = false; formChosen.textContent = "✂️ Corte escolhido: " + name; }
    if (cfMsg) cfMsg.value = "Olá! Quero agendar o corte: " + name + ".";

    const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Olá! Quero agendar o corte: " + name + " na Barbearia Menuz.")}`;
    if (waSend) waSend.href = href;
    if (waFloat) waFloat.href = href;

    document.getElementById("contato")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".cut__select");
    if (!btn) return;
    const name = btn.getAttribute("data-cut") || btn.closest(".cut")?.querySelector(".cut__name")?.textContent?.trim() || "Corte";
    selectCut(name, btn.closest(".cut"));
  });

  /* ---------- Perfil publico: dia atual, compartilhar e lightbox ---------- */
  const today = new Date().getDay();
  $$("[data-hours] [data-day]").forEach((item) => {
    item.classList.toggle("is-today", Number(item.getAttribute("data-day")) === today);
  });

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-share]");
    if (!btn) return;
    const shareData = {
      title: "Barbearia Menuz",
      text: "Conheça a Barbearia Menuz, escolha seu corte e agende pelo link.",
      url: window.location.href.split("#")[0],
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (_) { /* usuário cancelou */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      btn.classList.add("is-copied");
      setTimeout(() => btn.classList.remove("is-copied"), 1400);
    } catch (_) {
      window.prompt("Copie o link da barbearia:", shareData.url);
    }
  });

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy-public]");
    if (!btn) return;
    const url = new URL("barbearia-menuz.html", window.location.href).href;
    try {
      await navigator.clipboard.writeText(url);
      btn.textContent = "Link copiado";
      setTimeout(() => { btn.textContent = "Copiar link"; }, 1600);
    } catch (_) {
      window.prompt("Copie o link da barbearia:", url);
    }
  });

  const cleanLogin = $("[data-clean-login]");
  cleanLogin?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });

  /* ---------- Agendamento: cliente -> painel -> mensagem automatica ---------- */
  const APPOINTMENTS_KEY = "menuzAppointments";
  let memoryAppointments = [];
  const appointmentsStorage = (() => {
    try {
      const storage = window.localStorage;
      const testKey = "__menuz_storage_test__";
      storage.setItem(testKey, "1");
      storage.removeItem(testKey);
      return storage;
    } catch (_) {
      return null;
    }
  })();
  const statusText = {
    pending: "Aguardando Confirmação",
    confirmed: "Confirmado",
    cancelled: "Cancelado",
    finished: "Finalizado",
    rescheduled: "Reagendado",
  };
  const serviceMinutes = {
    "Corte masculino": 40,
    "Barba + Navalha": 30,
    "Corte + Barba": 70,
  };
  const defaultAppointments = [
    {
      id: "demo-appointment-1",
      client: "Pedro Henrique",
      phone: "(31) 99999-9999",
      barber: "Pedro",
      service: "Low Fade",
      cut: "Low Fade",
      date: "2026-07-25",
      time: "16:00",
      payment: "PIX",
      price: 45,
      minutes: 40,
      status: "pending",
      createdAt: new Date().toISOString(),
      reminders: ["24 horas antes", "2 horas antes", "30 minutos antes"],
    },
  ];
  const REVIEWS_KEY = "menuzReviews";
  const REVIEW_SETTINGS_KEY = "menuzReviewSettings";
  let memoryReviews = [];
  let memoryReviewSettings = { enabled: true };
  const reviewStatusText = {
    pending: "Pendente",
    approved: "Aprovada",
    hidden: "Oculta",
    reported: "Denunciada",
  };
  const defaultReviews = [
    {
      id: "demo-review-1",
      client: "Marcos Lima",
      city: "Igarapé/MG",
      rating: 5,
      comment: "Atendimento rápido, corte bem explicado e resultado exatamente como escolhi na página.",
      date: "2026-07-20",
      status: "approved",
      photo: "",
      reply: "Obrigado pela confiança, Marcos. Será sempre bem-vindo.",
    },
    {
      id: "demo-review-2",
      client: "André Souza",
      city: "Belo Horizonte/MG",
      rating: 5,
      comment: "Gostei de ver os modelos antes de chegar. Facilitou muito para explicar o corte.",
      date: "2026-07-18",
      status: "approved",
      photo: "",
      reply: "",
    },
    {
      id: "demo-review-3",
      client: "Cliente anônimo",
      city: "Contagem/MG",
      rating: 4,
      comment: "Ambiente organizado e barbeiro pontual. Voltarei mais vezes.",
      date: "2026-07-16",
      status: "approved",
      photo: "",
      reply: "",
    },
  ];
  const readAppointments = () => {
    if (!appointmentsStorage) return memoryAppointments;
    try {
      const parsed = JSON.parse(appointmentsStorage.getItem(APPOINTMENTS_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  };
  const writeAppointments = (items) => {
    if (appointmentsStorage) appointmentsStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(items));
    else memoryAppointments = items;
    window.dispatchEvent(new CustomEvent("menuz:appointments-updated"));
  };
  const readReviews = () => {
    if (!appointmentsStorage) return memoryReviews;
    try {
      const parsed = JSON.parse(appointmentsStorage.getItem(REVIEWS_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  };
  const writeReviews = (items) => {
    if (appointmentsStorage) appointmentsStorage.setItem(REVIEWS_KEY, JSON.stringify(items));
    else memoryReviews = items;
    window.dispatchEvent(new CustomEvent("menuz:reviews-updated"));
  };
  const readReviewSettings = () => {
    if (!appointmentsStorage) return memoryReviewSettings;
    try {
      return { enabled: true, ...(JSON.parse(appointmentsStorage.getItem(REVIEW_SETTINGS_KEY) || "{}") || {}) };
    } catch (_) {
      return { enabled: true };
    }
  };
  const writeReviewSettings = (settings) => {
    const next = { enabled: true, ...settings };
    if (appointmentsStorage) appointmentsStorage.setItem(REVIEW_SETTINGS_KEY, JSON.stringify(next));
    else memoryReviewSettings = next;
    window.dispatchEvent(new CustomEvent("menuz:reviews-updated"));
  };
  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  const formatCurrency = (value) => Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const escapeHtml = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  }[char]));
  const ensureReviews = () => {
    const current = readReviews();
    if (current.length) return current;
    writeReviews(defaultReviews);
    return defaultReviews;
  };
  const starsText = (rating) => "★★★★★".slice(0, Number(rating || 0)) + "☆☆☆☆☆".slice(0, 5 - Number(rating || 0));
  const reviewInitials = (name) => String(name || "Cliente")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "CL";
  const reviewStats = (items) => {
    const approved = items.filter((item) => item.status === "approved");
    const base = approved.length ? approved : items;
    const total = base.length;
    const average = total ? base.reduce((sum, item) => sum + Number(item.rating || 0), 0) / total : 0;
    const five = total ? Math.round((base.filter((item) => Number(item.rating) === 5).length / total) * 100) : 0;
    return {
      total,
      approved: approved.length,
      pending: items.filter((item) => item.status === "pending").length,
      average,
      five,
    };
  };
  const updateReviewSummary = () => {
    const settings = readReviewSettings();
    const section = $("[data-public-reviews-section]");
    if (section && !settings.enabled) {
      section.innerHTML = `<div class="reviews-disabled">As avaliações desta barbearia estão desativadas no momento.</div>`;
    }
    const items = ensureReviews();
    const stats = reviewStats(items);
    const averageText = stats.average ? stats.average.toFixed(1).replace(".", ",") : "0,0";
    $$("[data-review-summary]").forEach((el) => {
      el.textContent = settings.enabled ? `★ ${averageText} · ${stats.total} avaliações · ${stats.five}% nota 5` : "Avaliações desativadas";
    });
    $$("[data-review-average]").forEach((el) => { el.textContent = averageText; });
    $$("[data-review-total]").forEach((el) => { el.textContent = stats.total; });
    $$("[data-review-five]").forEach((el) => { el.textContent = `${stats.five}%`; });
    $$("[data-admin-review-average]").forEach((el) => { el.textContent = averageText; });
    $$("[data-admin-review-total]").forEach((el) => { el.textContent = items.length; });
    $$("[data-admin-review-pending]").forEach((el) => { el.textContent = stats.pending; });
  };
  const renderPublicReviews = () => {
    const wrap = $("[data-public-reviews]");
    if (!wrap) return;
    const settings = readReviewSettings();
    if (!settings.enabled) {
      updateReviewSummary();
      return;
    }
    const approved = ensureReviews().filter((item) => item.status === "approved");
    wrap.innerHTML = approved.map((item) => `
      <article class="review-card">
        <div class="review-card__head">
          <div class="review-person">
            <span class="review-avatar">${item.photo ? `<img src="${escapeHtml(item.photo)}" alt="">` : escapeHtml(reviewInitials(item.client))}</span>
            <div>
              <strong>${escapeHtml(item.client)}</strong>
              <span>${escapeHtml(item.city || "Cliente Menuz")}</span>
            </div>
          </div>
          <span class="review-stars" aria-label="${escapeHtml(String(item.rating))} de 5 estrelas">${starsText(item.rating)}</span>
        </div>
        ${item.comment ? `<blockquote>${escapeHtml(item.comment)}</blockquote>` : ""}
        ${item.reply ? `<div class="review-reply"><strong>Resposta da barbearia</strong><br>${escapeHtml(item.reply)}</div>` : ""}
        <time datetime="${escapeHtml(item.date)}">${formatDate(item.date)}</time>
      </article>
    `).join("");
    updateReviewSummary();
  };
  const phoneToWa = (phone) => {
    const digits = String(phone || "").replace(/\D/g, "");
    if (!digits) return WA_NUMBER;
    return digits.startsWith("55") ? digits : "55" + digits;
  };
  const appointmentMessage = (item, type = "confirmed") => {
    if (type === "cancelled") {
      return [
        `Olá, ${item.client}.`,
        "",
        "Infelizmente não será possível realizar seu atendimento no horário solicitado.",
        item.reason ? `Motivo: ${item.reason}` : "Motivo: horário indisponível.",
        "",
        "Por favor, escolha um novo horário disponível.",
        "Obrigado pela compreensão.",
      ].join("\n");
    }
    if (type === "reminder") {
      return [
        `Olá, ${item.client}.`,
        "",
        "Este é um lembrete do seu agendamento.",
        `Data: ${formatDate(item.date)} às ${item.time}.`,
        `Serviço: ${item.service}`,
        "Barbearia Menuz",
        "",
        "Esperamos você.",
      ].join("\n");
    }
    if (type === "review") {
      const reviewUrl = new URL("barbearia-menuz.html", window.location.href).href + "#avaliar";
      return [
        `Olá, ${item.client}.`,
        "",
        "Obrigado por escolher a Barbearia Menuz.",
        "Seu atendimento foi finalizado e gostaríamos de saber como foi sua experiência.",
        "",
        "Avalie pelo link:",
        reviewUrl,
        "",
        "Sua opinião ajuda outros clientes e valoriza o trabalho do barbeiro.",
      ].join("\n");
    }
    return [
      `Olá, ${item.client}!`,
      "",
      "Seu agendamento foi confirmado com sucesso.",
      "",
      "Barbearia: Barbearia Menuz",
      `Profissional: ${item.barber}`,
      `Serviço: ${item.service}`,
      item.cut ? `Modelo de corte: ${item.cut}` : "",
      `Data: ${formatDate(item.date)}`,
      `Horário: ${item.time}`,
      `Valor: ${formatCurrency(item.price)}`,
      `Forma de pagamento: ${item.payment}`,
      "",
      "Endereço: Rua Tiradentes, 48 - Centro - Igarapé/MG",
      "Pedimos que chegue com 5 minutos de antecedência.",
      "",
      "Agradecemos pela preferência e esperamos você!",
    ].filter(Boolean).join("\n");
  };
  const isSlotBlocked = (candidate, ignoreId = "") => readAppointments().some((item) => (
    item.id !== ignoreId &&
    item.barber === candidate.barber &&
    item.date === candidate.date &&
    item.time === candidate.time &&
    ["pending", "confirmed"].includes(item.status)
  ));
  const updateBlockedTimes = (formEl) => {
    const barber = formEl?.elements.barber?.value;
    const date = formEl?.elements.date?.value;
    const timeSelect = formEl?.elements.time;
    if (!barber || !date || !timeSelect) return;
    const current = timeSelect.value;
    Array.from(timeSelect.options).forEach((option) => {
      if (!option.value) return;
      option.disabled = isSlotBlocked({ barber, date, time: option.value });
    });
    if (current && timeSelect.selectedOptions[0]?.disabled) timeSelect.value = "";
  };
  const setBookingField = (name, value) => {
    const formEl = $("[data-booking-form]");
    const field = formEl?.elements[name];
    if (!field) return;
    field.value = value;
    field.dispatchEvent(new Event("change", { bubbles: true }));
    document.getElementById("agendamento")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  document.addEventListener("click", (e) => {
    const service = e.target.closest("[data-pick-service]");
    const cut = e.target.closest("[data-pick-cut]");
    const barber = e.target.closest("[data-pick-barber]");
    if (service) setBookingField("service", service.getAttribute("data-pick-service"));
    if (cut) setBookingField("cut", cut.getAttribute("data-pick-cut"));
    if (barber) setBookingField("barber", barber.getAttribute("data-pick-barber"));
  });

  const bookingForm = $("[data-booking-form]");
  if (bookingForm) {
    const todayIso = new Date().toISOString().slice(0, 10);
    if (bookingForm.elements.date) bookingForm.elements.date.min = todayIso;
    ["barber", "date"].forEach((name) => bookingForm.elements[name]?.addEventListener("change", () => updateBlockedTimes(bookingForm)));
    updateBlockedTimes(bookingForm);
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(bookingForm);
      const serviceSelect = bookingForm.elements.service;
      const selectedService = serviceSelect.selectedOptions[0];
      const appointment = {
        id: "appointment-" + Date.now(),
        client: data.get("client").trim(),
        phone: data.get("phone").trim(),
        barber: data.get("barber"),
        service: data.get("service"),
        cut: data.get("cut"),
        date: data.get("date"),
        time: data.get("time"),
        payment: data.get("payment"),
        price: Number(selectedService?.dataset.price || 0),
        minutes: serviceMinutes[data.get("service")] || 40,
        status: "pending",
        createdAt: new Date().toISOString(),
        reminders: ["24 horas antes", "2 horas antes", "30 minutos antes"],
      };
      if (isSlotBlocked(appointment)) {
        const success = $("[data-booking-success]");
        if (success) {
          success.hidden = false;
          success.classList.add("is-error");
          success.textContent = "Este horário acabou de ficar indisponível. Escolha outro horário.";
        }
        updateBlockedTimes(bookingForm);
        return;
      }
      writeAppointments([appointment, ...readAppointments()]);
      bookingForm.reset();
      updateBlockedTimes(bookingForm);
      const success = $("[data-booking-success]");
      if (success) {
        success.hidden = false;
        success.classList.remove("is-error");
        success.innerHTML = `<strong>Solicitação enviada.</strong><span>Status: ${statusText.pending}. O barbeiro foi notificado no painel e você receberá a confirmação automática.</span>`;
      }
    });
  }

  const listEl = $("[data-appointment-list]");
  const renderAppointments = () => {
    if (!listEl) return;
    let items = readAppointments();
    if (!items.length) {
      items = defaultAppointments;
      writeAppointments(items);
    }
    const search = ($("[data-appointment-search]")?.value || "").toLowerCase().trim();
    const status = $("[data-appointment-status]")?.value || "all";
    const barber = $("[data-appointment-barber]")?.value || "all";
    const counts = items.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    const setCount = (selector, value) => { const el = $(selector); if (el) el.textContent = value || 0; };
    setCount("[data-count-pending]", counts.pending);
    setCount("[data-count-confirmed]", counts.confirmed);
    setCount("[data-count-cancelled]", counts.cancelled);
    const filtered = items.filter((item) => (
      (!search || item.client.toLowerCase().includes(search)) &&
      (status === "all" || item.status === status) &&
      (barber === "all" || item.barber === barber)
    ));
    if (!filtered.length) {
      listEl.innerHTML = `<div class="empty-state">Nenhum agendamento encontrado com estes filtros.</div>`;
      return;
    }
    listEl.innerHTML = filtered.map((item) => `
      <article class="appointment-card" data-appointment-id="${escapeHtml(item.id)}">
        <div class="appointment-card__main">
          <span class="status-pill status-pill--${escapeHtml(item.status)}">${escapeHtml(statusText[item.status] || item.status)}</span>
          <h3>${escapeHtml(item.client)}</h3>
          <p>${escapeHtml(item.phone)} · ${escapeHtml(item.payment)}</p>
          <dl>
            <div><dt>Serviço</dt><dd>${escapeHtml(item.service)}</dd></div>
            <div><dt>Profissional</dt><dd>${escapeHtml(item.barber)}</dd></div>
            <div><dt>Data</dt><dd>${formatDate(item.date)}</dd></div>
            <div><dt>Horário</dt><dd>${escapeHtml(item.time)}</dd></div>
            <div><dt>Valor</dt><dd>${formatCurrency(item.price)}</dd></div>
            <div><dt>Corte</dt><dd>${escapeHtml(item.cut || "Opcional")}</dd></div>
          </dl>
        </div>
        <div class="appointment-card__actions">
          ${item.status === "pending" ? `<button class="btn btn--primary btn--sm" type="button" data-appointment-confirm>Confirmar</button><button class="btn btn--ghost btn--sm" type="button" data-appointment-cancel>Recusar</button>` : ""}
          ${item.status === "confirmed" ? `<button class="btn btn--ghost btn--sm" type="button" data-appointment-reminder>Lembrete</button><button class="btn btn--ghost btn--sm" type="button" data-appointment-finish>Finalizar</button><button class="btn btn--ghost btn--sm" type="button" data-appointment-reschedule>Reagendar</button>` : ""}
          ${item.status === "cancelled" && item.reason ? `<small>Motivo: ${escapeHtml(item.reason)}</small>` : ""}
        </div>
      </article>
    `).join("");
  };
  const showMessagePreview = (item, type) => {
    const panel = $("[data-message-preview]");
    const textEl = $("[data-message-text]");
    const waEl = $("[data-message-whatsapp]");
    if (!panel || !textEl || !waEl) return;
    const message = appointmentMessage(item, type);
    textEl.textContent = message;
    waEl.href = `https://wa.me/${phoneToWa(item.phone)}?text=${encodeURIComponent(message)}`;
    panel.hidden = false;
    panel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  };
  const updateAppointment = (id, updater) => {
    const items = readAppointments();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    items[index] = updater({ ...items[index] });
    writeAppointments(items);
    renderAppointments();
    return items[index];
  };
  if (listEl) {
    renderAppointments();
    ["input", "change"].forEach((evt) => {
      $("[data-appointment-search]")?.addEventListener(evt, renderAppointments);
      $("[data-appointment-status]")?.addEventListener(evt, renderAppointments);
      $("[data-appointment-barber]")?.addEventListener(evt, renderAppointments);
    });
    $("[data-seed-booking]")?.addEventListener("click", () => {
      writeAppointments([{ ...defaultAppointments[0], id: "demo-appointment-" + Date.now(), createdAt: new Date().toISOString() }, ...readAppointments()]);
      renderAppointments();
    });
    listEl.addEventListener("click", (e) => {
      const card = e.target.closest("[data-appointment-id]");
      if (!card) return;
      const id = card.getAttribute("data-appointment-id");
      if (e.target.closest("[data-appointment-confirm]")) {
        const item = updateAppointment(id, (current) => ({ ...current, status: "confirmed", confirmedAt: new Date().toISOString() }));
        if (item) showMessagePreview(item, "confirmed");
      }
      if (e.target.closest("[data-appointment-cancel]")) {
        const reason = window.prompt("Motivo da recusa (opcional):", "O profissional já possui outro compromisso nesse horário.") || "";
        const item = updateAppointment(id, (current) => ({ ...current, status: "cancelled", reason, cancelledAt: new Date().toISOString() }));
        if (item) showMessagePreview(item, "cancelled");
      }
      if (e.target.closest("[data-appointment-reminder]")) {
        const item = readAppointments().find((current) => current.id === id);
        if (item) showMessagePreview(item, "reminder");
      }
      if (e.target.closest("[data-appointment-finish]")) {
        const item = updateAppointment(id, (current) => ({ ...current, status: "finished", finishedAt: new Date().toISOString() }));
        if (item && readReviewSettings().enabled) showMessagePreview(item, "review");
      }
      if (e.target.closest("[data-appointment-reschedule]")) {
        updateAppointment(id, (current) => ({ ...current, status: "rescheduled", rescheduledAt: new Date().toISOString() }));
      }
    });
    window.addEventListener("menuz:appointments-updated", renderAppointments);
  }

  const updateReview = (id, updater) => {
    const items = ensureReviews();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    items[index] = updater({ ...items[index] });
    writeReviews(items);
    renderPublicReviews();
    renderAdminReviews();
    updateReviewSummary();
    return items[index];
  };
  const renderAdminReviews = () => {
    const wrap = $("[data-admin-reviews]");
    if (!wrap) return;
    const items = ensureReviews();
    updateReviewSummary();
    const search = ($("[data-review-search]")?.value || "").toLowerCase().trim();
    const rating = $("[data-review-rating-filter]")?.value || "all";
    const status = $("[data-review-status-filter]")?.value || "all";
    const filtered = items.filter((item) => (
      (!search || item.client.toLowerCase().includes(search)) &&
      (rating === "all" || String(item.rating) === rating) &&
      (status === "all" || item.status === status)
    ));
    if (!filtered.length) {
      wrap.innerHTML = `<div class="empty-state">Nenhuma avaliação encontrada com estes filtros.</div>`;
      return;
    }
    wrap.innerHTML = filtered.map((item) => `
      <article class="review-admin-card" data-review-id="${escapeHtml(item.id)}">
        <div class="review-admin-card__head">
          <div class="review-person">
            <span class="review-avatar">${item.photo ? `<img src="${escapeHtml(item.photo)}" alt="">` : escapeHtml(reviewInitials(item.client))}</span>
            <div>
              <strong>${escapeHtml(item.client)}</strong>
              <span>${escapeHtml(item.city || "Cidade não informada")}</span>
            </div>
          </div>
          <span class="review-status review-status--${escapeHtml(item.status)}">${escapeHtml(reviewStatusText[item.status] || item.status)}</span>
        </div>
        <dl class="review-admin-card__meta">
          <div><dt>Nota</dt><dd><span class="review-stars">${starsText(item.rating)}</span></dd></div>
          <div><dt>Data</dt><dd>${formatDate(item.date)}</dd></div>
          <div><dt>Cliente</dt><dd>${escapeHtml(item.client)}</dd></div>
          <div><dt>Status</dt><dd>${escapeHtml(reviewStatusText[item.status] || item.status)}</dd></div>
        </dl>
        ${item.comment ? `<p>${escapeHtml(item.comment)}</p>` : `<p>Cliente não adicionou comentário.</p>`}
        ${item.reply ? `<div class="review-reply"><strong>Sua resposta</strong><br>${escapeHtml(item.reply)}</div>` : ""}
        <small>O comentário do cliente é preservado. Você pode responder, ocultar ou denunciar.</small>
        <div class="review-admin-actions">
          ${item.status !== "approved" ? `<button class="btn btn--primary btn--sm" type="button" data-review-approve>Aprovar</button>` : ""}
          ${item.status !== "hidden" ? `<button class="btn btn--ghost btn--sm" type="button" data-review-hide>Ocultar</button>` : ""}
          <button class="btn btn--ghost btn--sm" type="button" data-review-reply>Responder</button>
          <button class="btn btn--ghost btn--sm" type="button" data-review-report>Denunciar</button>
        </div>
      </article>
    `).join("");
  };
  const reviewForm = $("[data-review-form]");
  const readReviewPhoto = (file) => new Promise((resolve) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
  if (reviewForm) {
    const dateInput = $("[data-review-date]", reviewForm);
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
    reviewForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(reviewForm);
      const file = reviewForm.elements.photo?.files?.[0];
      const review = {
        id: "review-" + Date.now(),
        client: data.get("anonymous") ? "Cliente anônimo" : String(data.get("client") || "").trim(),
        city: String(data.get("city") || "").trim(),
        rating: Number(data.get("rating") || 0),
        comment: String(data.get("comment") || "").trim(),
        date: String(data.get("date") || new Date().toISOString().slice(0, 10)),
        status: "pending",
        photo: await readReviewPhoto(file),
        reply: "",
        createdAt: new Date().toISOString(),
      };
      writeReviews([review, ...ensureReviews()]);
      reviewForm.reset();
      if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
      const success = $("[data-review-success]");
      if (success) {
        success.hidden = false;
        success.classList.remove("is-error");
        success.innerHTML = `<strong>Avaliação enviada.</strong><span>Ela ficará pendente até a barbearia aprovar no painel.</span>`;
      }
      renderPublicReviews();
      renderAdminReviews();
    });
  }
  const reviewToggle = $("[data-review-toggle]");
  if (reviewToggle) {
    reviewToggle.checked = !!readReviewSettings().enabled;
    const updateToggleNote = () => {
      const note = $("[data-review-toggle-note]");
      if (note) note.textContent = reviewToggle.checked
        ? "Avaliações ativas: a seção aparece na página pública e convites podem ser enviados após o atendimento."
        : "Avaliações desativadas: a seção pública fica oculta e convites não serão gerados.";
    };
    updateToggleNote();
    reviewToggle.addEventListener("change", () => {
      writeReviewSettings({ enabled: reviewToggle.checked });
      updateToggleNote();
      renderAdminReviews();
      renderPublicReviews();
      updateReviewSummary();
    });
  }
  const adminReviews = $("[data-admin-reviews]");
  if (adminReviews) {
    renderAdminReviews();
    ["input", "change"].forEach((evt) => {
      $("[data-review-search]")?.addEventListener(evt, renderAdminReviews);
      $("[data-review-rating-filter]")?.addEventListener(evt, renderAdminReviews);
      $("[data-review-status-filter]")?.addEventListener(evt, renderAdminReviews);
    });
    $("[data-seed-review]")?.addEventListener("click", () => {
      const example = {
        ...defaultReviews[0],
        id: "demo-review-" + Date.now(),
        client: "Cliente Exemplo",
        status: "pending",
        date: new Date().toISOString().slice(0, 10),
        reply: "",
      };
      writeReviews([example, ...ensureReviews()]);
      renderAdminReviews();
    });
    adminReviews.addEventListener("click", (e) => {
      const card = e.target.closest("[data-review-id]");
      if (!card) return;
      const id = card.getAttribute("data-review-id");
      if (e.target.closest("[data-review-approve]")) {
        updateReview(id, (item) => ({ ...item, status: "approved", moderatedAt: new Date().toISOString() }));
      }
      if (e.target.closest("[data-review-hide]")) {
        updateReview(id, (item) => ({ ...item, status: "hidden", moderatedAt: new Date().toISOString() }));
      }
      if (e.target.closest("[data-review-report]")) {
        updateReview(id, (item) => ({ ...item, status: "reported", reportedAt: new Date().toISOString() }));
      }
      if (e.target.closest("[data-review-reply]")) {
        const current = ensureReviews().find((item) => item.id === id);
        const reply = window.prompt("Resposta da barbearia:", current?.reply || "Obrigado pela avaliação. Ficamos felizes com sua experiência.") || "";
        if (reply.trim()) updateReview(id, (item) => ({ ...item, reply: reply.trim(), repliedAt: new Date().toISOString() }));
      }
    });
    window.addEventListener("menuz:reviews-updated", renderAdminReviews);
  }
  renderPublicReviews();
  updateReviewSummary();
  window.addEventListener("menuz:reviews-updated", () => {
    renderPublicReviews();
    updateReviewSummary();
  });

  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCaption = $("#lightboxCaption");
  const closeLightbox = () => {
    lightbox?.classList.remove("is-open");
    lightbox?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-lightbox]");
    if (!target || !lightbox || !lightboxImage) return;
    lightboxImage.style.backgroundImage = getComputedStyle(target).backgroundImage;
    lightboxImage.setAttribute("aria-label", target.getAttribute("data-lightbox") || "Foto da barbearia");
    if (lightboxCaption) lightboxCaption.textContent = target.getAttribute("data-lightbox") || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
  $("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

  /* ---------- Login demonstrativo do painel ---------- */
  const loginModal = $("#loginModal");
  const loginForm = $("#loginForm");
  const inlineLoginForm = $("#inlineLoginForm");
  const adminLayout = $(".admin-layout");
  const adminWorkspace = $("#adminWorkspace");
  const showAdminDashboard = () => {
    adminLayout?.classList.add("is-logged-in");
    if (adminWorkspace) adminWorkspace.hidden = false;
    document.getElementById("admin")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };
  const openLogin = () => {
    if (!loginModal) return;
    loginModal.classList.add("is-open");
    loginModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    setTimeout(() => $("#loginEmail")?.focus(), 60);
  };
  const closeLogin = () => {
    loginModal?.classList.remove("is-open");
    loginModal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-login-open]")) openLogin();
    if (e.target.closest("[data-login-close]")) closeLogin();
  });
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeLogin();
    showAdminDashboard();
  });
  inlineLoginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    showAdminDashboard();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeLightbox();
    closeLogin();
  });

  /* ---------- Back to top ---------- */
  toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  // Estado inicial
  onScroll();
})();
