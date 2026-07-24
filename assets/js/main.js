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
    if (reduceMotion) { el.textContent = target.toLocaleString("pt-PT", { minimumFractionDigits: decimals }); return; }
    const dur = 1600; const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = val.toLocaleString("pt-PT", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("pt-PT", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
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
      name: (v) => v.trim().length >= 2 || "Indica o teu nome.",
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

  /* ---------- Carrossel de cortes em destaque (hero) ---------- */
  const ccTrack = $("#ccTrack");
  if (ccTrack) {
    const slides = $$(".cc-slide", ccTrack);
    const dotsWrap = $("#ccDots");
    let idx = 0, ccTimer = null;

    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Corte " + (i + 1));
      if (i === 0) b.classList.add("is-active");
      b.addEventListener("click", () => { ccGo(i); ccRestart(); });
      dotsWrap.appendChild(b);
    });
    const ccDots = $$("button", dotsWrap);

    const ccGo = (i) => {
      idx = (i + slides.length) % slides.length;
      ccTrack.style.transform = `translateX(-${idx * 100}%)`;
      ccDots.forEach((d, di) => d.classList.toggle("is-active", di === idx));
    };
    const ccNext = () => ccGo(idx + 1);
    const ccPrev = () => ccGo(idx - 1);
    $("#ccNext")?.addEventListener("click", () => { ccNext(); ccRestart(); });
    $("#ccPrev")?.addEventListener("click", () => { ccPrev(); ccRestart(); });

    const ccStart = () => { if (!reduceMotion) ccTimer = setInterval(ccNext, 4500); };
    const ccStop = () => { if (ccTimer) clearInterval(ccTimer); };
    const ccRestart = () => { ccStop(); ccStart(); };

    const vp = ccTrack.closest(".cc-viewport") || ccTrack.parentElement;
    vp.addEventListener("mouseenter", ccStop);
    vp.addEventListener("mouseleave", ccStart);
    let ccSx = 0;
    vp.addEventListener("touchstart", (e) => { ccSx = e.touches[0].clientX; ccStop(); }, { passive: true });
    vp.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - ccSx; if (Math.abs(dx) > 40) (dx < 0 ? ccNext() : ccPrev()); ccStart(); }, { passive: true });
    ccStart();
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

  /* ---------- Seleção de corte → contacto + WhatsApp ---------- */
  const WA_NUMBER = "351900000000";
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

  /* ---------- Back to top ---------- */
  const toTop = $("#toTop");
  toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  // Estado inicial
  onScroll();
})();
