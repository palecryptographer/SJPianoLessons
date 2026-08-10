(() => {
  const revealSelector = [
    ".page-hero",
    ".section-title",
    ".split",
    ".teacher",
    ".performance-layout",
    ".online-panel",
    ".areas-panel",
    ".faq",
    ".gallery-grid",
    ".video-grid",
    ".testimonial-grid",
  ].join(",");

  function initMotion() {
    const root = document.documentElement;
    if (!root || typeof window.matchMedia !== "function") return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const targets = Array.from(document.querySelectorAll(revealSelector));
    if (
      !targets.length ||
      typeof window.IntersectionObserver !== "function"
    ) {
      return;
    }

    let observer = null;
    let reductionApplied = motionPreference.matches;

    const revealAll = () => {
      if (observer && root.classList.contains("motion-ready")) {
        observer.disconnect();
      }
      root.classList.remove("motion-ready");
      targets.forEach((target) => {
        if (!target.classList.contains("motion-visible")) {
          target.classList.add("motion-visible");
        }
      });
    };

    const enableMotion = () => {
      if (motionPreference.matches) {
        reductionApplied = true;
      }

      if (reductionApplied) {
        revealAll();
        return;
      }

      try {
        if (!observer) {
          observer = new window.IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("motion-visible");
                observer.unobserve(entry.target);
              });
            },
            { rootMargin: "0px 0px 10%", threshold: 0.1 },
          );
        }

        targets.forEach((target) => {
          target.classList.add("motion-reveal");
        });
        root.classList.add("motion-ready");
        targets
          .filter((target) => !target.classList.contains("motion-visible"))
          .forEach((target) => observer.observe(target));
      } catch {
        revealAll();
      }
    };

    targets
      .filter((target) => target.matches(".page-hero"))
      .forEach((target) => target.classList.add("motion-reveal--large"));

    enableMotion();

    const handlePreferenceChange = () => {
      if (motionPreference.matches) {
        reductionApplied = true;
      }
      enableMotion();
    };

    if (typeof motionPreference.addEventListener === "function") {
      motionPreference.addEventListener("change", handlePreferenceChange);
    } else if (typeof motionPreference.addListener === "function") {
      motionPreference.addListener(handlePreferenceChange);
    }
  }

  function initGallery() {
    const dialog = document.querySelector("[data-gallery-dialog]");
    if (!dialog) return;

    const image = dialog.querySelector("img");
    const caption = dialog.querySelector("[data-dialog-caption]");
    const triggers = document.querySelectorAll("[data-gallery-image]");
    if (!image || !caption || !triggers.length) return;

    let lastTrigger = null;

    triggers.forEach((button) => {
      button.addEventListener("click", () => {
        lastTrigger = button;
        image.src = button.dataset.galleryImage || "";
        image.alt = button.dataset.galleryAlt || "";
        caption.textContent = button.dataset.galleryCaption || "";
        if (!dialog.open) dialog.showModal();
      });
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", () => {
      if (lastTrigger) lastTrigger.focus();
      lastTrigger = null;
    });
  }

  function boot() {
    try {
      initMotion();
    } catch {
      document.documentElement.classList.remove("motion-ready");
    }

    try {
      initGallery();
    } catch {
      // Gallery enhancement is optional; native page content remains available.
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
