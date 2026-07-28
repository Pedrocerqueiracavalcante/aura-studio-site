/* =====================================================================
   Barbearia Menuz â€” Interatividade
   Vanilla JS Â· sem dependÃªncias
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
      "language.portuguese": "Português - Portugal",
      "language.english": "English - United Kingdom",
      "language.spanish": "Español - España",
      "language.french": "Français - France",
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
      "app.bannerText": "Acesse a Área de atendimento",
      "app.open": "Abrir",
      "app.closeBanner": "Fechar aviso",
      "app.home": "Início",
      "app.search": "Buscar",
      "app.appointments": "Área",
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
      "language.portuguese": "Português - Portugal",
      "language.english": "English - United Kingdom",
      "language.spanish": "Español - España",
      "language.french": "Français - France",
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
      "footer.copy": "Â© 2026 Menuz Barber. Premium service for modern barbershops.",
      "toTop.label": "Back to top",
      "app.bannerText": "Open the service area",
      "app.open": "Open",
      "app.closeBanner": "Close notice",
      "app.home": "Home",
      "app.search": "Search",
      "app.appointments": "Area",
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
      "language.portuguese": "Português - Portugal",
      "language.english": "English - United Kingdom",
      "language.spanish": "Español - España",
      "language.french": "Français - France",
      "search.label": "Buscar",
      "search.placeholder": "Buscar por artista, evento o lugar",
      "search.button": "Buscar",
      "nav.reviews": "ReseÃ±as",
      "nav.contact": "Contacto",
      "header.notifications": "Notificaciones",
      "user.guest": "Visitante",
      "user.loginHint": "Haz clic para entrar",
      "user.signIn": "Entrar",
      "user.signUp": "Crear cuenta",
      "user.schedule": "Agendar",
      "reviews.eyebrow": "ReseÃ±as",
      "reviews.title": "Confianza antes del primer corte.",
      "reviews.card1": "AtenciÃ³n puntual y el corte exactamente como lo elegÃ­ en el enlace.",
      "reviews.card2": "La pÃ¡gina es simple. Vi los servicios y ya sabÃ­a el precio.",
      "reviews.card3": "Ambiente limpio, barbero cuidadoso y acabado muy profesional.",
      "contact.eyebrow": "Contacto",
      "contact.title": "Agenda tu prÃ³ximo horario.",
      "contact.text": "EnvÃ­a un mensaje con el servicio deseado. El equipo confirma el mejor horario disponible.",
      "contact.whatsapp": "Enviar por WhatsApp",
      "contact.publicPage": "Ver pÃ¡gina pÃºblica",
      "footer.copy": "Â© 2026 Menuz Barber. AtenciÃ³n premium para barberÃ­as modernas.",
      "toTop.label": "Volver arriba",
      "app.bannerText": "Accede al área de atención",
      "app.open": "Abrir",
      "app.closeBanner": "Cerrar aviso",
      "app.home": "Inicio",
      "app.search": "Buscar",
      "app.appointments": "Área",
      "app.profile": "Perfil",
      "login.eyebrow": "Login del barbero",
      "login.title": "Entra al panel",
      "login.email": "E-mail",
      "login.password": "ContraseÃ±a",
      "login.passwordPlaceholder": "Tu contraseÃ±a",
      "login.recover": "Recuperar contraseÃ±a",
    },
    fr: {
      "language.label": "Choisir la langue",
      "language.portuguese": "Português - Portugal",
      "language.english": "English - United Kingdom",
      "language.spanish": "Español - España",
      "language.french": "Français - France",
      "search.label": "Rechercher",
      "search.placeholder": "Rechercher un artiste, un Ã©vÃ©nement ou un lieu",
      "search.button": "Rechercher",
      "nav.reviews": "Avis",
      "nav.contact": "Contact",
      "header.notifications": "Notifications",
      "user.guest": "Visiteur",
      "user.loginHint": "Cliquez pour vous connecter",
      "user.signIn": "Connexion",
      "user.signUp": "CrÃ©er un compte",
      "user.schedule": "RÃ©server",
      "reviews.eyebrow": "Avis",
      "reviews.title": "La confiance avant la premiÃ¨re coupe.",
      "reviews.card1": "Service ponctuel et coupe exactement comme je l'avais choisie via le lien.",
      "reviews.card2": "La page est simple. J'ai vu les services et je connaissais dÃ©jÃ  le prix.",
      "reviews.card3": "Espace propre, barbier soigneux et finition trÃ¨s professionnelle.",
      "contact.eyebrow": "Contact",
      "contact.title": "RÃ©servez votre prochain crÃ©neau.",
      "contact.text": "Envoyez un message avec le service souhaitÃ©. L'Ã©quipe confirme le meilleur crÃ©neau disponible.",
      "contact.whatsapp": "Envoyer sur WhatsApp",
      "contact.publicPage": "Voir la page publique",
      "footer.copy": "Â© 2026 Menuz Barber. Service premium pour barbershops modernes.",
      "toTop.label": "Retour en haut",
      "app.bannerText": "Ouvrir l'espace de service",
      "app.open": "Ouvrir",
      "app.closeBanner": "Fermer l'avis",
      "app.home": "Accueil",
      "app.search": "Recherche",
      "app.appointments": "Espace",
      "app.profile": "Profil",
      "login.eyebrow": "Connexion barbier",
      "login.title": "AccÃ©der au tableau de bord",
      "login.email": "E-mail",
      "login.password": "Mot de passe",
      "login.passwordPlaceholder": "Votre mot de passe",
      "login.recover": "RÃ©cupÃ©rer le mot de passe",
    },
  };

  /* ---------- App shell: banner + tab bar + ondas (todas as pÃ¡ginas) ---------- */
  const getStoredLanguage = () => {
    try {
      return localStorage.getItem(LANG_KEY);
    } catch (_) {
      return null;
    }
  };
  let currentLanguage = languages[getStoredLanguage()] ? getStoredLanguage() : "pt";
  const t = (key) => i18n[currentLanguage]?.[key] || i18n.pt[key] || key;
  const BOOKING_AREA_ID = "area";
  const scrollToBookingArea = (behavior = reduceMotion ? "auto" : "smooth") => {
    document.getElementById(BOOKING_AREA_ID)?.scrollIntoView({ behavior, block: "start" });
  };
  const normalizeLegacyBookingHash = () => {
    if (window.location.hash !== "#agendamento" || !document.getElementById(BOOKING_AREA_ID)) return;
    window.history.replaceState(null, "", window.location.pathname + window.location.search + "#" + BOOKING_AREA_ID);
    requestAnimationFrame(() => scrollToBookingArea("auto"));
  };
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
  normalizeLegacyBookingHash();
  window.addEventListener("hashchange", normalizeLegacyBookingHash);

  (function appShell() {
    if (!document.body) return;
    const page = (location.pathname.split("/").pop() || "index.html").toLowerCase() || "index.html";

    // Ondas de fundo
    const waves = document.createElement("div");
    waves.className = "app-bg-waves";
    waves.setAttribute("aria-hidden", "true");
    document.body.prepend(waves);

    // Banner superior (dispensÃ¡vel por sessÃ£o)
    if (sessionStorage.getItem("menuzBannerClosed") !== "1") {
      const banner = document.createElement("div");
      banner.className = "app-banner";
      banner.innerHTML =
        '<img class="app-banner__logo" src="assets/img/logo.svg" alt="">' +
        '<div class="app-banner__txt"><strong>Menuz</strong><span>Acesse a Área de atendimento</span></div>' +
        '<a class="btn btn--primary btn--sm app-banner__cta" href="barbearia-menuz.html#area">Abrir</a>' +
        '<button class="app-banner__close" type="button" aria-label="Fechar aviso">Ã—</button>';
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
      { label: "InÃ­cio", href: "index.html", match: ["index.html", ""], icon: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>' },
      { key: "app.search", label: "Buscar", href: "index.html#buscar", match: ["buscar"], icon: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>' },
      { key: "app.appointments", label: "Área", href: "barbearia-menuz.html#area", match: ["barbearia-menuz.html"], icon: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M3 9h18M8 2v4M16 2v4"/>' },
      { key: "app.profile", label: "Perfil", href: "login.html", match: ["login.html", "dashboard.html"], icon: '<circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3.5-6 7-6s7 2 7 6"/>' },
    ];
    const bar = document.createElement("nav");
    bar.className = "app-tabbar";
    bar.setAttribute("aria-label", "NavegaÃ§Ã£o principal do app");
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

  /* ---------- Ano no rodapÃ© ---------- */
  /* ---------- Home: data, carrossel de destaques, GPS e cards ---------- */
  (function homePage() {
    const promoTrack = $("[data-promo-track]");
    const nearby = $("[data-nearby]");
    if (!promoTrack && !nearby) return;

    const todayEl = $("[data-today]");
    if (todayEl) {
      todayEl.textContent = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "");
    }

    // Carrossel de destaques
    if (promoTrack) {
      const cards = $$(".promo-card", promoTrack);
      const dotsWrap = $("[data-promo-dots]");
      const carEl = $("[data-promo-carousel]");
      let pi = 0, ptimer = null;
      cards.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-label", "Destaque " + (i + 1));
        if (i === 0) b.classList.add("is-active");
        b.addEventListener("click", () => { pgo(i); prestart(); });
        dotsWrap.appendChild(b);
      });
      const pdots = $$("button", dotsWrap);
      const pgo = (i) => { pi = (i + cards.length) % cards.length; promoTrack.style.transform = "translateX(-" + pi * 100 + "%)"; pdots.forEach((d, di) => d.classList.toggle("is-active", di === pi)); };
      const pstart = () => { if (!reduceMotion) ptimer = setInterval(() => pgo(pi + 1), 4200); };
      const pstop = () => { if (ptimer) clearInterval(ptimer); };
      const prestart = () => { pstop(); pstart(); };
      carEl.addEventListener("mouseenter", pstop);
      carEl.addEventListener("mouseleave", pstart);
      let psx = 0;
      carEl.addEventListener("touchstart", (e) => { psx = e.touches[0].clientX; pstop(); }, { passive: true });
      carEl.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - psx; if (Math.abs(dx) > 40) pgo(dx < 0 ? pi + 1 : pi - 1); pstart(); }, { passive: true });
      pstart();
    }

    if (!nearby) { const y0 = $("#year"); if (y0) y0.textContent = new Date().getFullYear(); return; }
    const emptyEl = nearby.querySelector("[data-geo-empty]");
    const loadingEl = nearby.querySelector("[data-geo-loading]");
    const resultsEl = nearby.querySelector("[data-geo-results]");
    const noteEl = nearby.querySelector("[data-geo-note]");
    const refreshBtn = nearby.querySelector(".nearby__refresh");
    const homeSearch = $("[data-estab-search]");

    // Barbearias afiliadas (mock — trocar por API/base real)
    const shops = [
      { id: "menuz", name: "Barbearia Menuz", city: "Centro · Igarapé/MG", lat: -20.0708, lng: -44.3028, rating: 4.9, reviews: 327, price: "R$ 45–70", services: "Corte, Barba, Navalha", open: 9, close: 19, photo: "bg-shop-main", url: "barbearia-menuz.html#area" },
      { id: "studio", name: "Studio Premium Centro", city: "Centro · Igarapé/MG", lat: -20.0725, lng: -44.2990, rating: 4.7, reviews: 184, price: "R$ 50–90", services: "Corte, Sobrancelha", open: 9, close: 20, photo: "bg-shop-chair", url: "barbearia-menuz.html#area" },
      { id: "classic", name: "Classic Barber Club", city: "São Benedito · Igarapé/MG", lat: -20.0665, lng: -44.3075, rating: 4.8, reviews: 256, price: "R$ 40–75", services: "Corte, Barba, Pigmentação", open: 8, close: 19, photo: "bg-shop-tools", url: "barbearia-menuz.html#area" },
      { id: "navalha", name: "Navalha de Ouro", city: "Nova Igarapé · MG", lat: -20.0600, lng: -44.2950, rating: 4.6, reviews: 98, price: "R$ 35–60", services: "Corte, Navalha", open: 10, close: 20, photo: "bg-shop-cards", url: "barbearia-menuz.html#area" },
    ];

    const FAV_KEY = "menuzFavShops";
    const getFavs = () => { try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); } catch (e) { return []; } };
    const setFavs = (arr) => localStorage.setItem(FAV_KEY, JSON.stringify(arr));

    const haversine = (a, b) => {
      const R = 6371, toRad = (x) => x * Math.PI / 180;
      const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
      const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(s));
    };
    const fmtKm = (km) => km < 1 ? Math.round(km * 1000) + " m" : km.toFixed(1).replace(".", ",") + " km";
    const driveMin = (km) => Math.max(1, Math.round(km / 25 * 60));

    let userPos = null, query = "";

    const render = () => {
      const favs = getFavs();
      let list = shops.map((s) => ({ ...s, dist: userPos ? haversine(userPos, s) : null }));
      if (userPos) list.sort((a, b) => a.dist - b.dist);
      if (query) { const q = query.toLowerCase(); list = list.filter((s) => (s.name + " " + s.services + " " + s.city).toLowerCase().includes(q)); }
      const nowH = new Date().getHours();
      resultsEl.innerHTML = list.map((s) => {
        const isOpen = nowH >= s.open && nowH < s.close;
        const fav = favs.includes(s.id);
        const dist = s.dist != null
          ? '<p class="shop-card__dist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="10" r="2.4"/></svg>' + fmtKm(s.dist) + " · ~" + driveMin(s.dist) + " min</p>"
          : "";
        return '<article class="shop-card">' +
          '<div class="shop-card__photo ' + s.photo + '">' +
            '<span class="shop-card__status ' + (isOpen ? "is-open" : "is-closed") + '">' + (isOpen ? "Aberto" : "Fechado") + '</span>' +
            '<button class="shop-card__fav ' + (fav ? "is-fav" : "") + '" type="button" data-fav="' + s.id + '" aria-label="Favoritar" aria-pressed="' + fav + '">' + (fav ? "♥" : "♡") + '</button>' +
          '</div>' +
          '<div class="shop-card__body">' +
            '<div class="shop-card__top"><h3>' + s.name + '</h3><span class="shop-card__rating">★ ' + String(s.rating).replace(".", ",") + ' <small>(' + s.reviews + ')</small></span></div>' +
            '<p class="shop-card__meta">' + s.services + ' · ' + s.price + '</p>' +
            '<p class="shop-card__meta">' + s.city + ' · ' + s.open + 'h–' + s.close + 'h</p>' +
            dist +
            '<div class="shop-card__actions"><a class="btn btn--primary btn--sm" href="' + s.url + '">Agendar</a></div>' +
          '</div></article>';
      }).join("") || '<p class="nearby__note" style="grid-column:1/-1">Nenhuma barbearia encontrada.</p>';

      $$("[data-fav]", resultsEl).forEach((btn) => btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-fav"); const f = getFavs();
        const i = f.indexOf(id); if (i >= 0) f.splice(i, 1); else f.push(id);
        setFavs(f); render();
      }));
    };

    const showResults = () => { emptyEl.hidden = true; loadingEl.hidden = true; resultsEl.hidden = false; if (refreshBtn) refreshBtn.hidden = false; };
    const showLoading = () => { emptyEl.hidden = true; resultsEl.hidden = true; loadingEl.hidden = false; };
    const setNote = (t) => { if (noteEl) { noteEl.hidden = false; noteEl.textContent = t; } };

    const locate = () => {
      if (!("geolocation" in navigator)) { userPos = null; showResults(); render(); setNote("Localização indisponível — a mostrar todas as barbearias afiliadas."); return; }
      showLoading();
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          showResults(); render();
          setNote("Ordenado pela distância a partir da tua localização atual.");
          if (!reduceMotion) navigator.geolocation.watchPosition((p) => { userPos = { lat: p.coords.latitude, lng: p.coords.longitude }; render(); }, () => {}, { enableHighAccuracy: true, maximumAge: 15000 });
        },
        () => { userPos = null; showResults(); render(); setNote("Sem acesso à localização — a mostrar todas as barbearias afiliadas."); },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
      );
    };

    $$("[data-geo-enable]").forEach((b) => b.addEventListener("click", locate));
    const manualBtn = nearby.querySelector("[data-geo-manual]");
    if (manualBtn) manualBtn.addEventListener("click", () => { userPos = null; showResults(); render(); setNote("A mostrar todas as barbearias afiliadas."); });

    if (homeSearch) homeSearch.addEventListener("input", (e) => { query = e.target.value.trim(); if (resultsEl.hidden) showResults(); render(); });
    const estabForm = $("[data-estab-form]");
    if (estabForm) estabForm.addEventListener("submit", (e) => { e.preventDefault(); if (resultsEl.hidden) showResults(); render(); });
  })();

  /* ---------- Área de Perfil ---------- */
  (function profilePage() {
    const nav = $("[data-profile-nav]");
    if (!nav) return;

    const panels = $$(".profile-panel");
    const showTab = (name) => {
      $$("button", nav).forEach((b) => b.classList.toggle("is-active", b.dataset.tab === name));
      panels.forEach((p) => { p.hidden = p.dataset.panel !== name; });
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    };
    nav.addEventListener("click", (e) => { const b = e.target.closest("button[data-tab]"); if (b) showTab(b.dataset.tab); });
    $$("[data-goto]").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.goto)));

    const sub = $("[data-subtabs]");
    if (sub) sub.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-sub]"); if (!b) return;
      $$("button", sub).forEach((x) => x.classList.toggle("is-active", x === b));
      $$("[data-sublist]").forEach((l) => { l.hidden = l.dataset.sublist !== b.dataset.sub; });
    });

    // Favoritos (do localStorage) + exemplo
    const favWrap = $("[data-fav-shops]");
    if (favWrap) {
      const meta = {
        menuz: { name: "Barbearia Menuz", city: "Igarapé/MG", rating: "4,9", photo: "bg-shop-main" },
        studio: { name: "Studio Premium Centro", city: "Igarapé/MG", rating: "4,7", photo: "bg-shop-chair" },
        classic: { name: "Classic Barber Club", city: "Igarapé/MG", rating: "4,8", photo: "bg-shop-tools" },
        navalha: { name: "Navalha de Ouro", city: "Igarapé/MG", rating: "4,6", photo: "bg-shop-cards" },
      };
      let favs = [];
      try { favs = JSON.parse(localStorage.getItem("menuzFavShops") || "[]"); } catch (e) {}
      if (!favs.length) favs = ["menuz", "classic"];
      const renderFavs = () => {
        favWrap.innerHTML = favs.map((id) => { const s = meta[id]; if (!s) return ""; return '<article class="fav-card"><div class="fav-card__ph ' + s.photo + '"></div><div><h3>' + s.name + '</h3><p>' + s.city + '</p><span>★ ' + s.rating + '</span></div><button class="fav-heart is-fav" type="button" data-unfav="' + id + '" aria-label="Remover dos favoritos">♥</button></article>'; }).join("") || '<p style="color:var(--muted)">Ainda não tens barbearias favoritas.</p>';
        const cnt = $("[data-fav-count]"); if (cnt) cnt.textContent = favs.length + 2;
        $$("[data-unfav]", favWrap).forEach((btn) => btn.addEventListener("click", () => { favs = favs.filter((x) => x !== btn.dataset.unfav); localStorage.setItem("menuzFavShops", JSON.stringify(favs)); renderFavs(); }));
      };
      renderFavs();
    }

    // Formulários (simulação de gravação)
    $$(".profile-form").forEach((form) => form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (form.hasAttribute("data-form-personal")) {
        const name = form.elements.name.value, email = form.elements.email.value, phone = form.elements.phone.value, city = form.elements.city.value;
        $$("[data-profile-name]").forEach((el) => el.textContent = name);
        $$("[data-profile-email]").forEach((el) => el.textContent = email);
        $$("[data-profile-phone]").forEach((el) => el.textContent = phone);
        $$("[data-profile-city]").forEach((el) => el.textContent = city);
        const av = $("[data-profile-avatar]"); if (av) av.textContent = name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
      }
      const ok = form.querySelector("[data-ok]"); if (ok) { ok.hidden = false; setTimeout(() => { ok.hidden = true; }, 2500); }
      if (form.hasAttribute("data-form-password")) form.reset();
    }));

    // Notificações
    const notifClear = $("[data-notif-clear]");
    if (notifClear) notifClear.addEventListener("click", () => {
      $$(".notif-item.is-unread").forEach((n) => n.classList.remove("is-unread"));
      const badge = $(".profile-nav__badge"); if (badge) badge.remove();
    });

    // Logout (botões)
    $$("[data-logout]").forEach((b) => b.addEventListener("click", (e) => { if (b.tagName === "BUTTON") { e.preventDefault(); window.location.href = "login.html"; } }));

    // Excluir conta (modal)
    const modal = $("[data-confirm]");
    const setModal = (open) => { if (modal) modal.hidden = !open; };
    $$("[data-delete-account]").forEach((b) => b.addEventListener("click", () => setModal(true)));
    $$("[data-confirm-cancel]").forEach((b) => b.addEventListener("click", () => setModal(false)));
    const okBtn = $("[data-confirm-ok]");
    if (okBtn) okBtn.addEventListener("click", () => { window.location.href = "index.html"; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setModal(false); });
  })();

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

  /* ---------- Nav ativa por secÃ§Ã£o ---------- */
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

  /* ---------- Contador de estatÃ­sticas ---------- */
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

  /* ---------- ValidaÃ§Ã£o do formulÃ¡rio ---------- */
  const form = $("#contactForm");
  if (form) {
    const success = $("#formSuccess");

    const validators = {
      name: (v) => v.trim().length >= 2 || "Informe seu nome.",
      phone: (v) => /[0-9]{6,}/.test(v.replace(/\s/g, "")) || "Indica um telemÃ³vel vÃ¡lido.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Indica um email vÃ¡lido.",
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

      // SimulaÃ§Ã£o de envio (substituir por integraÃ§Ã£o real: Formspree, EmailJS, APIâ€¦)
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true; btn.textContent = "A enviarâ€¦";
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

  /* ---------- SeleÃ§Ã£o de corte â†’ contato + WhatsApp ---------- */
  const WA_NUMBER = "5531999999999";
  const cutsSelected = $("#cutsSelected");
  const formChosen = $("#formChosen");
  const cfMsg = document.getElementById("cf-msg");
  const waSend = $("#waSend");
  const waFloat = $(".wa-float");

  const selectCut = (name, cardEl) => {
    $$(".cut.is-selected").forEach((c) => c.classList.remove("is-selected"));
    if (cardEl) cardEl.classList.add("is-selected");

    if (cutsSelected) { cutsSelected.hidden = false; cutsSelected.textContent = "âœ“ Corte selecionado: " + name + ". Continua para agendar."; }
    if (formChosen) { formChosen.hidden = false; formChosen.textContent = "âœ‚ï¸ Corte escolhido: " + name; }
    if (cfMsg) cfMsg.value = "OlÃ¡! Quero agendar o corte: " + name + ".";

    const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("OlÃ¡! Quero agendar o corte: " + name + " na Barbearia Menuz.")}`;
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
      text: "ConheÃ§a a Barbearia Menuz, escolha seu corte e agende pelo link.",
      url: window.location.href.split("#")[0],
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (_) { /* usuÃ¡rio cancelou */ }
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

  const showDashboardToast = (message, type = "success") => {
    let toast = $("[data-dashboard-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "dashboard-toast";
      toast.setAttribute("data-dashboard-toast", "");
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.dataset.type = type;
    toast.classList.add("is-visible");
    window.clearTimeout(showDashboardToast.timer);
    showDashboardToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
  };

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-dashboard-action]");
    const uiFeedback = event.target.closest("[data-ui-feedback]");
    const favorite = event.target.closest("[data-favorite-profile]");
    if (action) showDashboardToast(action.getAttribute("data-dashboard-action") || "Alteracoes salvas.");
    if (uiFeedback) showDashboardToast(uiFeedback.getAttribute("data-ui-feedback") || "Informacao atualizada.");
    if (favorite) {
      const active = favorite.getAttribute("aria-pressed") === "true";
      favorite.setAttribute("aria-pressed", String(!active));
      favorite.textContent = active ? "♡" : "♥";
      showDashboardToast(active ? "Perfil removido dos favoritos." : "Perfil salvo nos favoritos.");
    }
  });

  const profilePhotoInput = $("[data-profile-photo-input]");
  const profilePhotoPreview = $("[data-profile-photo-preview]");
  profilePhotoInput?.addEventListener("change", () => {
    const file = profilePhotoInput.files?.[0];
    if (!file || !profilePhotoPreview) return;
    if (!file.type.startsWith("image/")) {
      showDashboardToast("Escolha um arquivo de imagem vÃ¡lido.", "error");
      profilePhotoInput.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      profilePhotoPreview.style.backgroundImage = `url("${reader.result}")`;
      showDashboardToast("PrÃ©via da foto atualizada.");
    };
    reader.onerror = () => showDashboardToast("NÃ£o foi possÃ­vel carregar a imagem.", "error");
    reader.readAsDataURL(file);
  });
  const coverPhotoInput = $("[data-cover-photo-input]");
  coverPhotoInput?.addEventListener("change", () => {
    const file = coverPhotoInput.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showDashboardToast("Escolha um arquivo de imagem valido.", "error");
      coverPhotoInput.value = "";
      return;
    }
    showDashboardToast("Foto de capa pronta para publicacao.");
  });

  /* ---------- Area: cliente -> painel -> mensagem automatica ---------- */
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
    pending: "Aguardando ConfirmaÃ§Ã£o",
    confirmed: "Confirmado",
    cancelled: "Cancelado",
    finished: "Finalizado",
    rescheduled: "Reagendado",
  };
  const serviceMinutes = {
    "Corte masculino": 40,
    "Barba + Navalha": 30,
    "Corte + Barba": 70,
    "PigmentaÃ§Ã£o": 45,
  };
  const tenantProfile = {
    slug: "barbearia-menuz",
    name: "Barbearia Menuz",
    address: "Rua Tiradentes, 48 - Centro - IgarapÃ©/MG",
    availability: {
      days: [2, 3, 4, 5, 6],
      start: "09:00",
      end: "19:00",
      interval: 15,
      breaks: [{ start: "12:00", end: "14:00" }],
      manualBlocks: [
        { barber: "Pedro", date: "2026-07-29", time: "10:30" },
        { barber: "Rafael", date: "2026-07-30", time: "15:00" },
      ],
    },
    services: [
      { name: "Corte masculino", price: 45, minutes: 40 },
      { name: "Barba + Navalha", price: 35, minutes: 30 },
      { name: "Corte + Barba", price: 70, minutes: 70 },
      { name: "PigmentaÃ§Ã£o", price: 55, minutes: 45 },
    ],
    plans: [
      { name: "Plano Mensal", price: 129, service: "Corte masculino" },
      { name: "Plano Premium", price: 189, service: "Corte + Barba" },
      { name: "Plano Executivo", price: 249, service: "Corte + Barba" },
    ],
  };
  const serviceByName = tenantProfile.services.reduce((acc, service) => {
    acc[service.name] = service;
    return acc;
  }, {});
  const planByName = tenantProfile.plans.reduce((acc, plan) => {
    acc[plan.name] = plan;
    return acc;
  }, {});
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
  const PRODUCTS_KEY = "menuzProducts";
  const GALLERY_KEY = "menuzGallery";
  let memoryReviews = [];
  let memoryReviewSettings = { enabled: true };
  let memoryProducts = [];
  const defaultGalleryItems = [
    { id: "gallery-shop-main", label: "Ambiente principal", src: "", main: true },
    { id: "gallery-shop-chair", label: "Cadeiras", src: "", main: false },
    { id: "gallery-shop-tools", label: "Equipamentos", src: "", main: false },
  ];
  let memoryGallery = defaultGalleryItems;
  let galleryItems = defaultGalleryItems;
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
      city: "IgarapÃ©/MG",
      rating: 5,
      service: "Corte masculino",
      comment: "Atendimento rÃ¡pido, corte bem explicado e resultado exatamente como escolhi na pÃ¡gina.",
      date: "2026-07-20",
      status: "approved",
      photo: "",
      reply: "Obrigado pela confianÃ§a, Marcos. SerÃ¡ sempre bem-vindo.",
    },
    {
      id: "demo-review-2",
      client: "AndrÃ© Souza",
      city: "Belo Horizonte/MG",
      rating: 5,
      service: "Corte + Barba",
      comment: "Gostei de ver os modelos antes de chegar. Facilitou muito para explicar o corte.",
      date: "2026-07-18",
      status: "approved",
      photo: "",
      reply: "",
    },
    {
      id: "demo-review-3",
      client: "Cliente anÃ´nimo",
      city: "Contagem/MG",
      rating: 4,
      service: "Barba + Navalha",
      comment: "Ambiente organizado e barbeiro pontual. Voltarei mais vezes.",
      date: "2026-07-16",
      status: "approved",
      photo: "",
      reply: "",
    },
  ];
  const defaultProducts = [
    {
      id: "product-1",
      name: "Pomada Matte",
      brand: "Menuz Pro",
      category: "Pomada",
      description: "Fixacao forte, acabamento seco e visual natural para cortes com textura.",
      link: "",
      status: "active",
    },
    {
      id: "product-2",
      name: "Oleo de Barba",
      brand: "Barber Care",
      category: "Barba",
      description: "Hidratacao leve para finalizar barba com brilho controlado e toque macio.",
      link: "",
      status: "active",
    },
    {
      id: "product-3",
      name: "Maquina Pro Fade",
      brand: "Precision Tools",
      category: "Equipamento",
      description: "Equipamento de acabamento usado para linhas precisas, degradês e detalhes.",
      link: "",
      status: "active",
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
  const readProducts = () => {
    if (!appointmentsStorage) return memoryProducts;
    try {
      const parsed = JSON.parse(appointmentsStorage.getItem(PRODUCTS_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  };
  const writeProducts = (items) => {
    if (appointmentsStorage) appointmentsStorage.setItem(PRODUCTS_KEY, JSON.stringify(items));
    else memoryProducts = items;
    window.dispatchEvent(new CustomEvent("menuz:products-updated"));
  };
  const readGallery = () => {
    if (!appointmentsStorage) return memoryGallery;
    try {
      const parsed = JSON.parse(appointmentsStorage.getItem(GALLERY_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  };
  const writeGallery = (items) => {
    galleryItems = items;
    if (appointmentsStorage) appointmentsStorage.setItem(GALLERY_KEY, JSON.stringify(items));
    else memoryGallery = items;
    window.dispatchEvent(new CustomEvent("menuz:gallery-updated"));
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
  const ensureProducts = () => {
    const current = readProducts();
    if (current.length) return current;
    writeProducts(defaultProducts);
    return defaultProducts;
  };
  const ensureGallery = () => {
    const current = readGallery();
    if (current.length) {
      galleryItems = current;
      return current;
    }
    writeGallery(defaultGalleryItems);
    return defaultGalleryItems;
  };
  const starsText = (rating) => "â˜…â˜…â˜…â˜…â˜…".slice(0, Number(rating || 0)) + "â˜†â˜†â˜†â˜†â˜†".slice(0, 5 - Number(rating || 0));
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
    const satisfaction = total ? Math.round((base.filter((item) => Number(item.rating) >= 4).length / total) * 100) : 0;
    const distribution = [5, 4, 3, 2, 1].map((rating) => {
      const count = base.filter((item) => Number(item.rating) === rating).length;
      return { rating, count, percent: total ? Math.round((count / total) * 100) : 0 };
    });
    return {
      total,
      approved: approved.length,
      pending: items.filter((item) => item.status === "pending").length,
      average,
      five,
      satisfaction,
      distribution,
    };
  };
  const updateReviewSummary = () => {
    const settings = readReviewSettings();
    const section = $("[data-public-reviews-section]");
    if (section && !settings.enabled) {
      section.innerHTML = `<div class="reviews-disabled">As avaliaÃ§Ãµes desta barbearia estÃ£o desativadas no momento.</div>`;
    }
    const items = ensureReviews();
    const stats = reviewStats(items);
    const averageText = stats.average ? stats.average.toFixed(1).replace(".", ",") : "0,0";
    $$("[data-review-summary]").forEach((el) => {
      el.textContent = settings.enabled ? `â˜… ${averageText} Â· ${stats.total} avaliaÃ§Ãµes Â· ${stats.five}% nota 5` : "AvaliaÃ§Ãµes desativadas";
    });
    $$("[data-review-average]").forEach((el) => { el.textContent = averageText; });
    $$("[data-review-total]").forEach((el) => { el.textContent = stats.total; });
    $$("[data-review-five]").forEach((el) => { el.textContent = `${stats.five}%`; });
    $$("[data-review-satisfaction]").forEach((el) => { el.textContent = `${stats.satisfaction}%`; });
    $$("[data-admin-review-average]").forEach((el) => { el.textContent = averageText; });
    $$("[data-admin-review-total]").forEach((el) => { el.textContent = items.length; });
    $$("[data-admin-review-pending]").forEach((el) => { el.textContent = stats.pending; });
    const distribution = $("[data-review-distribution]");
    if (distribution) {
      distribution.innerHTML = stats.distribution.map((item) => `
        <div class="review-distribution__row">
          <span>${item.rating} estrelas</span>
          <span class="review-distribution__bar"><span style="width:${item.percent}%"></span></span>
          <span>${item.percent}%</span>
        </div>
      `).join("");
    }
  };
  const renderProducts = () => {
    const items = ensureProducts();
    const adminList = $("[data-products-list]");
    if (adminList) {
      adminList.innerHTML = items.map((item) => `
        <article class="product-admin-card" data-product-id="${escapeHtml(item.id)}">
          <div>
            <small>${escapeHtml(item.category)} · ${escapeHtml(item.brand)}</small>
            <h4>${escapeHtml(item.name)}</h4>
            <p>${escapeHtml(item.description)}</p>
            <span class="product-status ${item.status === "inactive" ? "is-inactive" : ""}">${item.status === "active" ? "Ativo" : "Inativo"}</span>
          </div>
          <div class="product-admin-actions">
            <button type="button" data-product-toggle>${item.status === "active" ? "Inativar" : "Ativar"}</button>
            <button type="button" data-product-remove>Excluir</button>
          </div>
        </article>
      `).join("");
    }
    const publicGrid = $("[data-public-products]");
    if (publicGrid) {
      const active = items.filter((item) => item.status === "active");
      publicGrid.innerHTML = active.map((item) => `
        <article class="public-product-card">
          <div class="public-product-card__image" aria-hidden="true">${escapeHtml(item.category.slice(0, 2).toUpperCase())}</div>
          <small>${escapeHtml(item.brand)} · ${escapeHtml(item.category)}</small>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.description)}</p>
          ${item.link ? `<a href="${escapeHtml(item.link)}" target="_blank" rel="noopener">Ver produto</a>` : ""}
        </article>
      `).join("");
    }
  };
  const renderGallery = () => {
    const wrap = $("[data-gallery-preview]");
    ensureGallery();
    if (!wrap) return;
    wrap.innerHTML = galleryItems.map((item, index) => `
      <article class="gallery-admin-item ${item.main ? "is-main" : ""}" data-gallery-id="${escapeHtml(item.id)}">
        <figure>
          ${item.src ? `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.label)}">` : `<span class="upload-tile ${index === 0 ? "bg-shop-main" : index === 1 ? "bg-shop-chair" : "bg-shop-tools"}"><span>${escapeHtml(item.label)}</span></span>`}
        </figure>
        <div class="gallery-admin-actions">
          <button type="button" data-gallery-main>Principal</button>
          <button type="button" data-gallery-up>Subir</button>
          <button type="button" data-gallery-down>Descer</button>
          <button type="button" data-gallery-remove>Excluir</button>
        </div>
      </article>
    `).join("");
  };
  const renderPublicGallery = () => {
    const photos = $$(".public-gallery [data-lightbox]");
    if (!photos.length) return;
    const items = ensureGallery();
    items.slice(0, photos.length).forEach((item, index) => {
      const photo = photos[index];
      if (item.src) photo.style.backgroundImage = `url("${item.src}")`;
      const label = $("span", photo);
      if (label && item.label) label.textContent = index === 0 && item.main ? item.label : item.label;
      photo.setAttribute("data-lightbox", item.label || "Galeria");
    });
  };
  const renderPublicReviews = () => {
    const wrap = $("[data-public-reviews]");
    if (!wrap) return;
    const settings = readReviewSettings();
    if (!settings.enabled) {
      updateReviewSummary();
      return;
    }
    const ratingFilter = $("[data-public-review-rating]")?.value || "all";
    const order = $("[data-public-review-order]")?.value || "recent";
    const approved = ensureReviews()
      .filter((item) => item.status === "approved")
      .filter((item) => ratingFilter === "all" || Number(item.rating) === Number(ratingFilter))
      .sort((a, b) => {
        if (order === "best") return Number(b.rating || 0) - Number(a.rating || 0);
        return String(b.date || "").localeCompare(String(a.date || ""));
      });
    if (!approved.length) {
      wrap.innerHTML = `<div class="empty-state">Nenhuma avaliacao encontrada com este filtro.</div>`;
      updateReviewSummary();
      return;
    }
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
        </div>
        <small class="review-service">${escapeHtml(item.service || "Atendimento premium")}</small>
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
        `OlÃ¡, ${item.client}.`,
        "",
        "Infelizmente nÃ£o serÃ¡ possÃ­vel realizar seu atendimento no horÃ¡rio solicitado.",
        item.reason ? `Motivo: ${item.reason}` : "Motivo: horÃ¡rio indisponÃ­vel.",
        "",
        "Por favor, escolha um novo horÃ¡rio disponÃ­vel.",
        "Obrigado pela compreensÃ£o.",
      ].join("\n");
    }
    if (type === "reminder") {
      return [
        `OlÃ¡, ${item.client}.`,
        "",
        "Este Ã© um lembrete do seu agendamento.",
        `Data: ${formatDate(item.date)} Ã s ${item.time}.`,
        `ServiÃ§o: ${item.service}`,
        "Barbearia Menuz",
        "",
        "Esperamos vocÃª.",
      ].join("\n");
    }
    if (type === "review") {
      const reviewUrl = new URL("barbearia-menuz.html", window.location.href).href + "#avaliar";
      return [
        `OlÃ¡, ${item.client}.`,
        "",
        "Obrigado por escolher a Barbearia Menuz.",
        "Seu atendimento foi finalizado e gostarÃ­amos de saber como foi sua experiÃªncia.",
        "",
        "Avalie pelo link:",
        reviewUrl,
        "",
        "Sua opiniÃ£o ajuda outros clientes e valoriza o trabalho do barbeiro.",
      ].join("\n");
    }
    return [
      `OlÃ¡, ${item.client}!`,
      "",
      "Seu agendamento foi confirmado com sucesso.",
      "",
      "Barbearia: Barbearia Menuz",
      `Profissional: ${item.barber}`,
      item.plan ? `Plano: ${item.plan}` : "",
      `ServiÃ§o: ${item.service}`,
      item.cut ? `Modelo de corte: ${item.cut}` : "",
      `Data: ${formatDate(item.date)}`,
      `HorÃ¡rio: ${item.time}`,
      `Valor: ${formatCurrency(item.price)}`,
      `Forma de pagamento: ${item.payment}`,
      "",
      "EndereÃ§o: Rua Tiradentes, 48 - Centro - IgarapÃ©/MG",
      "Pedimos que chegue com 5 minutos de antecedÃªncia.",
      "",
      "Agradecemos pela preferÃªncia e esperamos vocÃª!",
    ].filter(Boolean).join("\n");
  };
  const timeToMinutes = (time) => {
    const [hours, minutes] = String(time || "0:0").split(":").map(Number);
    return (hours * 60) + (minutes || 0);
  };
  const minutesToTime = (minutes) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  const parseLocalDate = (date) => {
    const [year, month, day] = String(date || "").split("-").map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  };
  const isSameIsoDate = (date) => date === new Date().toISOString().slice(0, 10);
  const isUnavailableDay = (date) => {
    const parsed = parseLocalDate(date);
    return !parsed || !tenantProfile.availability.days.includes(parsed.getDay());
  };
  const rangesOverlap = (startA, endA, startB, endB) => startA < endB && startB < endA;
  const isManualBlock = (candidate) => tenantProfile.availability.manualBlocks.some((item) => (
    item.barber === candidate.barber &&
    item.date === candidate.date &&
    item.time === candidate.time
  ));
  const isSlotBlocked = (candidate, ignoreId = "") => {
    const candidateStart = timeToMinutes(candidate.time);
    const candidateEnd = candidateStart + Number(candidate.minutes || serviceByName[candidate.service]?.minutes || 40);
    return readAppointments().some((item) => {
      if (
        item.id === ignoreId ||
        item.barber !== candidate.barber ||
        item.date !== candidate.date ||
        !["pending", "confirmed"].includes(item.status)
      ) return false;
      const itemStart = timeToMinutes(item.time);
      const itemEnd = itemStart + Number(item.minutes || serviceByName[item.service]?.minutes || 40);
      return rangesOverlap(candidateStart, candidateEnd, itemStart, itemEnd);
    });
  };
  const availableSlotsFor = ({ barber, service, date }) => {
    if (!barber || !service || !date || isUnavailableDay(date)) return [];
    const config = tenantProfile.availability;
    const duration = serviceByName[service]?.minutes || serviceMinutes[service] || 40;
    const start = timeToMinutes(config.start);
    const end = timeToMinutes(config.end);
    const now = new Date();
    const todayMinutes = (now.getHours() * 60) + now.getMinutes();
    const slots = [];
    for (let cursor = start; cursor + duration <= end; cursor += config.interval) {
      const time = minutesToTime(cursor);
      const blockedByBreak = config.breaks.some((item) => rangesOverlap(cursor, cursor + duration, timeToMinutes(item.start), timeToMinutes(item.end)));
      const blockedByPast = isSameIsoDate(date) && cursor <= todayMinutes;
      const candidate = { barber, service, date, time, minutes: duration };
      if (!blockedByBreak && !blockedByPast && !isManualBlock(candidate) && !isSlotBlocked(candidate)) {
        slots.push(time);
      }
    }
    return slots;
  };
  const selectedServiceMeta = (formEl) => serviceByName[formEl?.elements.service?.value] || { price: 0, minutes: 40 };
  const updateBookingChoices = (formEl) => {
    if (!formEl) return;
    $$("[data-choice-field]", formEl).forEach((button) => {
      const field = button.getAttribute("data-choice-field");
      const value = button.getAttribute("data-choice-value");
      button.classList.toggle("is-selected", formEl.elements[field]?.value === value);
    });
  };
  const updateBookingSummary = (formEl) => {
    if (!formEl) return;
    const date = formEl.elements.date?.value || "";
    const plan = formEl.elements.plan?.value || "";
    const meta = selectedServiceMeta(formEl);
    const summary = {
      barber: formEl.elements.barber?.value || "Escolha um profissional",
      service: formEl.elements.service?.value || "Escolha um serviÃ§o",
      plan: plan || "Sem plano selecionado",
      date: date ? formatDate(date) : "Selecione uma data",
      time: formEl.elements.time?.value || "Selecione um horÃ¡rio",
      price: formatCurrency(planByName[plan]?.price || meta.price || 0),
    };
    Object.entries(summary).forEach(([key, value]) => {
      const el = $(`[data-summary-${key}]`, formEl);
      if (el) el.textContent = value;
    });
    updateBookingChoices(formEl);
  };
  const updateBlockedTimes = (formEl) => {
    const barber = formEl?.elements.barber?.value;
    const service = formEl?.elements.service?.value;
    const date = formEl?.elements.date?.value;
    const timeField = formEl?.elements.time;
    const slotWrap = $("[data-time-slots]", formEl);
    if (!timeField || !slotWrap) {
      if (formEl && timeField && barber && date) {
        const current = timeField.value;
        Array.from(timeField.options || []).forEach((option) => {
          if (!option.value) return;
          option.disabled = isSlotBlocked({ barber, date, time: option.value });
        });
        if (current && timeField.selectedOptions?.[0]?.disabled) timeField.value = "";
      }
      updateBookingSummary(formEl);
      return;
    }
    if (!barber || !service || !date) {
      timeField.value = "";
      slotWrap.innerHTML = `<span class="time-slot-empty">Escolha profissional, serviÃ§o e data para ver a agenda.</span>`;
      updateBookingSummary(formEl);
      return;
    }
    if (isUnavailableDay(date)) {
      timeField.value = "";
      slotWrap.innerHTML = `<span class="time-slot-empty">Este profissional nÃ£o atende nesta data.</span>`;
      updateBookingSummary(formEl);
      return;
    }
    const slots = availableSlotsFor({ barber, service, date });
    if (!slots.includes(timeField.value)) timeField.value = "";
    slotWrap.innerHTML = slots.length ? slots.map((time) => `
      <button type="button" class="${timeField.value === time ? "is-selected" : ""}" data-time-choice="${escapeHtml(time)}">${escapeHtml(time)}</button>
    `).join("") : `<span class="time-slot-empty">Nenhum horÃ¡rio disponÃ­vel para esta combinaÃ§Ã£o.</span>`;
    updateBookingSummary(formEl);
  };
  const setBookingField = (name, value, shouldScroll = true) => {
    const formEl = $("[data-booking-form]");
    const field = formEl?.elements[name];
    if (!field) return;
    field.value = value;
    field.dispatchEvent(new Event("change", { bubbles: true }));
    if (shouldScroll) scrollToBookingArea();
  };

  document.addEventListener("click", (e) => {
    const service = e.target.closest("[data-pick-service]");
    const cut = e.target.closest("[data-pick-cut]");
    const barber = e.target.closest("[data-pick-barber]");
    const plan = e.target.closest("[data-pick-plan]");
    const choice = e.target.closest("[data-choice-field]");
    const timeChoice = e.target.closest("[data-time-choice]");
    if (service) setBookingField("service", service.getAttribute("data-pick-service"));
    if (cut) setBookingField("cut", cut.getAttribute("data-pick-cut"));
    if (barber) setBookingField("barber", barber.getAttribute("data-pick-barber"));
    if (plan) setBookingField("plan", plan.getAttribute("data-pick-plan"));
    if (choice) setBookingField(choice.getAttribute("data-choice-field"), choice.getAttribute("data-choice-value"), false);
    if (timeChoice) setBookingField("time", timeChoice.getAttribute("data-time-choice"), false);
  });

  const bookingForm = $("[data-booking-form]");
  if (bookingForm) {
    const todayIso = new Date().toISOString().slice(0, 10);
    if (bookingForm.elements.date) bookingForm.elements.date.min = todayIso;
    ["barber", "service", "date", "time", "plan"].forEach((name) => bookingForm.elements[name]?.addEventListener("change", () => updateBlockedTimes(bookingForm)));
    ["client", "phone", "payment", "cut"].forEach((name) => bookingForm.elements[name]?.addEventListener("input", () => updateBookingSummary(bookingForm)));
    updateBlockedTimes(bookingForm);
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(bookingForm);
      const serviceMeta = serviceByName[data.get("service")] || {};
      const planMeta = planByName[data.get("plan")] || {};
      const appointment = {
        id: "appointment-" + Date.now(),
        client: String(data.get("client") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        barber: data.get("barber"),
        service: data.get("service"),
        cut: data.get("cut"),
        plan: data.get("plan"),
        date: data.get("date"),
        time: data.get("time"),
        payment: data.get("payment"),
        price: Number(planMeta.price || serviceMeta.price || 0),
        minutes: Number(serviceMeta.minutes || serviceMinutes[data.get("service")] || 40),
        status: "pending",
        createdAt: new Date().toISOString(),
        reminders: ["24 horas antes", "2 horas antes", "30 minutos antes"],
      };
      const success = $("[data-booking-success]");
      if (!appointment.client || !appointment.phone || !appointment.barber || !appointment.service || !appointment.date || !appointment.time || !appointment.payment) {
        if (success) {
          success.hidden = false;
          success.classList.add("is-error");
          success.textContent = "Preencha profissional, serviÃ§o, data, horÃ¡rio e seus dados para confirmar.";
        }
        return;
      }
      if (isSlotBlocked(appointment)) {
        if (success) {
          success.hidden = false;
          success.classList.add("is-error");
          success.textContent = "Este horÃ¡rio acabou de ficar indisponÃ­vel. Escolha outro horÃ¡rio.";
        }
        updateBlockedTimes(bookingForm);
        return;
      }
      writeAppointments([appointment, ...readAppointments()]);
      bookingForm.reset();
      updateBlockedTimes(bookingForm);
      if (success) {
        success.hidden = false;
        success.classList.remove("is-error");
        success.innerHTML = `<strong>SolicitaÃ§Ã£o enviada.</strong><span>Status: ${statusText.pending}. O barbeiro foi notificado no painel e vocÃª receberÃ¡ a confirmaÃ§Ã£o automÃ¡tica.</span>`;
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
          <p>${escapeHtml(item.phone)} Â· ${escapeHtml(item.payment)}</p>
          <dl>
            <div><dt>ServiÃ§o</dt><dd>${escapeHtml(item.service)}</dd></div>
            <div><dt>Profissional</dt><dd>${escapeHtml(item.barber)}</dd></div>
            <div><dt>Plano</dt><dd>${escapeHtml(item.plan || "Sem plano")}</dd></div>
            <div><dt>Data</dt><dd>${formatDate(item.date)}</dd></div>
            <div><dt>HorÃ¡rio</dt><dd>${escapeHtml(item.time)}</dd></div>
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
        const reason = window.prompt("Motivo da recusa (opcional):", "O profissional jÃ¡ possui outro compromisso nesse horÃ¡rio.") || "";
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

  const galleryInput = $("[data-gallery-input]");
  galleryInput?.addEventListener("change", () => {
    const files = Array.from(galleryInput.files || []).filter((file) => file.type.startsWith("image/")).slice(0, 8);
    if (!files.length) {
      showDashboardToast("Selecione imagens validas para a galeria.", "error");
      galleryInput.value = "";
      return;
    }
    Promise.all(files.map((file, index) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({
        id: `gallery-${Date.now()}-${index}`,
        label: file.name.replace(/\.[^.]+$/, "").slice(0, 42) || "Imagem da galeria",
        src: String(reader.result || ""),
        main: false,
      });
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    }))).then((items) => {
      const next = [...ensureGallery(), ...items.filter(Boolean)].slice(0, 12);
      if (!next.some((item) => item.main) && next[0]) next[0].main = true;
      writeGallery(next);
      renderGallery();
      renderPublicGallery();
      showDashboardToast("Previa da galeria atualizada.");
      galleryInput.value = "";
    });
  });
  const galleryPreview = $("[data-gallery-preview]");
  galleryPreview?.addEventListener("click", (e) => {
    const card = e.target.closest("[data-gallery-id]");
    if (!card) return;
    const id = card.getAttribute("data-gallery-id");
    const items = [...ensureGallery()];
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return;
    if (e.target.closest("[data-gallery-main]")) {
      writeGallery(items.map((item) => ({ ...item, main: item.id === id })));
      showDashboardToast("Foto principal definida.");
    }
    if (e.target.closest("[data-gallery-up]") && index > 0) {
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
      writeGallery(items);
      showDashboardToast("Imagem reposicionada.");
    }
    if (e.target.closest("[data-gallery-down]") && index < items.length - 1) {
      [items[index + 1], items[index]] = [items[index], items[index + 1]];
      writeGallery(items);
      showDashboardToast("Imagem reposicionada.");
    }
    if (e.target.closest("[data-gallery-remove]")) {
      if (!window.confirm("Excluir esta imagem da galeria?")) return;
      const next = items.filter((item) => item.id !== id);
      if (items[index].main && next[0]) next[0].main = true;
      writeGallery(next);
      showDashboardToast("Imagem removida da galeria.");
    }
    renderGallery();
    renderPublicGallery();
  });

  const productForm = $("[data-product-form]");
  productForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(productForm);
    const product = {
      id: "product-" + Date.now(),
      name: String(data.get("name") || "").trim(),
      brand: String(data.get("brand") || "").trim(),
      category: String(data.get("category") || "").trim(),
      description: String(data.get("description") || "").trim(),
      link: String(data.get("link") || "").trim(),
      status: String(data.get("status") || "active"),
    };
    if (!product.name || !product.brand || !product.category || !product.description) {
      showDashboardToast("Preencha nome, marca, categoria e descricao.", "error");
      return;
    }
    writeProducts([product, ...ensureProducts()]);
    productForm.reset();
    renderProducts();
    showDashboardToast("Produto adicionado e refletido na vitrine publica.");
  });
  $("[data-products-list]")?.addEventListener("click", (e) => {
    const card = e.target.closest("[data-product-id]");
    if (!card) return;
    const id = card.getAttribute("data-product-id");
    const items = ensureProducts();
    if (e.target.closest("[data-product-toggle]")) {
      writeProducts(items.map((item) => item.id === id ? { ...item, status: item.status === "active" ? "inactive" : "active" } : item));
      showDashboardToast("Status do produto atualizado.");
    }
    if (e.target.closest("[data-product-remove]")) {
      if (!window.confirm("Excluir este produto da vitrine?")) return;
      writeProducts(items.filter((item) => item.id !== id));
      showDashboardToast("Produto removido.");
    }
    renderProducts();
  });

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
      wrap.innerHTML = `<div class="empty-state">Nenhuma avaliaÃ§Ã£o encontrada com estes filtros.</div>`;
      return;
    }
    wrap.innerHTML = filtered.map((item) => `
      <article class="review-admin-card" data-review-id="${escapeHtml(item.id)}">
        <div class="review-admin-card__head">
          <div class="review-person">
            <span class="review-avatar">${item.photo ? `<img src="${escapeHtml(item.photo)}" alt="">` : escapeHtml(reviewInitials(item.client))}</span>
            <div>
              <strong>${escapeHtml(item.client)}</strong>
              <span>${escapeHtml(item.city || "Cidade nÃ£o informada")}</span>
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
        ${item.comment ? `<p>${escapeHtml(item.comment)}</p>` : `<p>Cliente nÃ£o adicionou comentÃ¡rio.</p>`}
        ${item.reply ? `<div class="review-reply"><strong>Sua resposta</strong><br>${escapeHtml(item.reply)}</div>` : ""}
        <small>O comentÃ¡rio do cliente Ã© preservado. VocÃª pode responder, ocultar ou denunciar.</small>
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
        client: data.get("anonymous") ? "Cliente anÃ´nimo" : String(data.get("client") || "").trim(),
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
        success.innerHTML = `<strong>AvaliaÃ§Ã£o enviada.</strong><span>Ela ficarÃ¡ pendente atÃ© a barbearia aprovar no painel.</span>`;
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
        ? "AvaliaÃ§Ãµes ativas: a seÃ§Ã£o aparece na pÃ¡gina pÃºblica e convites podem ser enviados apÃ³s o atendimento."
        : "AvaliaÃ§Ãµes desativadas: a seÃ§Ã£o pÃºblica fica oculta e convites nÃ£o serÃ£o gerados.";
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
        const reply = window.prompt("Resposta da barbearia:", current?.reply || "Obrigado pela avaliaÃ§Ã£o. Ficamos felizes com sua experiÃªncia.") || "";
        if (reply.trim()) updateReview(id, (item) => ({ ...item, reply: reply.trim(), repliedAt: new Date().toISOString() }));
      }
    });
    window.addEventListener("menuz:reviews-updated", renderAdminReviews);
  }
  ["change", "input"].forEach((evt) => {
    $("[data-public-review-rating]")?.addEventListener(evt, renderPublicReviews);
    $("[data-public-review-order]")?.addEventListener(evt, renderPublicReviews);
  });
  renderProducts();
  renderGallery();
  renderPublicGallery();
  renderPublicReviews();
  updateReviewSummary();
  window.addEventListener("menuz:products-updated", renderProducts);
  window.addEventListener("menuz:gallery-updated", () => {
    renderGallery();
    renderPublicGallery();
  });
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
