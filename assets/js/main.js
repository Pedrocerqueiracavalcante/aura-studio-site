/* =====================================================================
   Barbearia Menuz — Interatividade
   Vanilla JS · sem dependências
   ===================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Ano no rodapé ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: estado ao rolar ---------- */
  const header = $("[data-header]");
  const onScroll = () => {
    if (header) header.toggleAttribute("data-scrolled", window.scrollY > 24);
    // Back to top
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

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
    document.getElementById("admin")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeLightbox();
    closeLogin();
  });

  /* ---------- Back to top ---------- */
  const toTop = $("#toTop");
  toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  // Estado inicial
  onScroll();
})();
