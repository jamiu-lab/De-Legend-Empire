"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------
   * HEADER: turns white on scroll
   * ----------------------------- */
  const header = document.getElementById("mainHeader");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 0);
    });
  }

  /* -----------------------------
   * FOOTER: toggle sections (mobile)
   * ----------------------------- */
  const footerSections = document.querySelectorAll(".footer-section h4");
  footerSections.forEach((header) => {
    header.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        header.parentElement.classList.toggle("active");
      }
    });
  });

  // Reset footer state when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      document
        .querySelectorAll(".footer-section.active")
        .forEach((section) => section.classList.remove("active"));
    }
  });

  /* -----------------------------
   * FADE-IN ON SCROLL
   * ----------------------------- */
  const fadeElements = document.querySelectorAll(".fade-in");
  if (fadeElements.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeElements.forEach((el) => observer.observe(el));
  }

  /* -----------------------------
   * NAVIGATION DRAWER (mobile)
   * ----------------------------- */
  const menuToggle = document.getElementById("menuToggle");
  const navDrawer = document.getElementById("navDrawer");
  const closeDrawer = document.getElementById("closeDrawer");
  const menuOverlay = document.getElementById("menuOverlay");

  function closeNavDrawer() {
    navDrawer?.classList.remove("active");
    menuOverlay?.classList.remove("active");
    menuToggle?.classList.remove("rotated");
  }

  if (menuToggle && navDrawer && menuOverlay && closeDrawer) {
    menuToggle.addEventListener("click", () => {
      navDrawer.classList.add("active");
      menuOverlay.classList.add("active");
      menuToggle.classList.toggle("rotated");
    });

    closeDrawer.addEventListener("click", closeNavDrawer);
    menuOverlay.addEventListener("click", closeNavDrawer);
  }

  /* -----------------------------
   * COUNTRY SELECT DROPDOWN
   * ----------------------------- */
  const toggleBtn = document.getElementById("selected-country");
  const countryMenu = document.getElementById("country-menu");

  if (toggleBtn && countryMenu) {
    toggleBtn.addEventListener("click", () => {
      countryMenu.style.display =
        countryMenu.style.display === "block" ? "none" : "block";
    });

    countryMenu.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img")?.cloneNode();
        if (img) {
          toggleBtn.innerHTML = "";
          toggleBtn.appendChild(img);
        }
        countryMenu.style.display = "none";
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".country-dropdown")) {
        countryMenu.style.display = "none";
      }
    });
  }

  /* -----------------------------
   * HERO SLIDER WITH PROGRESS CIRCLE
   * ----------------------------- */
  const slides = Array.from(document.querySelectorAll(".hero-slider .slide"));
  const progressEl = document.querySelector(".progress-bar");
  const overlay = document.querySelector(".black-overlay") || null;
  const intervalMs = 10000; // 10s per slide
  let index = 0;
  let ticker = null;

  if (slides.length && progressEl) {
    const r = parseFloat(progressEl.getAttribute("r")) || 15.9155;
    const circumference = 2 * Math.PI * r;

    progressEl.style.strokeDasharray = `${circumference}`;
    progressEl.style.strokeDashoffset = `${circumference}`;

    function startProgress(durationMs) {
      progressEl.style.transition = "none";
      progressEl.style.strokeDashoffset = `${circumference}`;
      progressEl.getBoundingClientRect(); // force reflow
      progressEl.style.transition = `stroke-dashoffset ${durationMs}ms linear`;
      requestAnimationFrame(() => {
        progressEl.style.strokeDashoffset = "0";
      });
    }

    function nextSlide() {
      setTimeout(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
        startProgress(intervalMs);
      }, 800);
    }

    function startSlider() {
      startProgress(intervalMs);
      ticker = setInterval(nextSlide, intervalMs);
    }

    function stopSlider() {
      clearInterval(ticker);
      ticker = null;
      const computed = window.getComputedStyle(progressEl).strokeDashoffset;
      progressEl.style.transition = "none";
      progressEl.style.strokeDashoffset = computed;
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopSlider();
      else if (!ticker) startSlider();
    });

    slides.forEach((s, i) => s.classList.toggle("active", i === 0));
    startSlider();
  }

  /* -----------------------------
   * SEARCH OVERLAY
   * ----------------------------- */
  const searchIcon = document.getElementById("search-icon");
  const searchOverlay = document.getElementById("search-overlay");
  const closeSearch = document.getElementById("close-search");

  if (searchIcon && searchOverlay && closeSearch) {
    searchIcon.addEventListener("click", () => {
      searchOverlay.classList.add("active");
    });

    closeSearch.addEventListener("click", () => {
      searchOverlay.classList.remove("active");
    });

    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active");
      }
    });
  }
});
