// Harbor & Light — interaction layer
// Keeps motion to two deliberate moments: a load-in glow behind the hero,
// and a gentle parallax drift on the hero field as you scroll past it.

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  // Header solidifies once you've scrolled past the hero fold
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 60);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mobileNav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    })
  );

  // Visit form — placeholder submit handling
  const form = document.getElementById("visitForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      note.textContent = name
        ? `Thanks, ${name.split(" ")[0]} — we'll watch for you Sunday.`
        : "Thanks — we'll watch for you Sunday.";
      form.reset();
    });
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (window.gsap && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // The one orchestrated load-in moment: light gathering behind the headline
    gsap.timeline({ defaults: { ease: "power2.out" } })
      .to("#heroGlow", { opacity: 1, scale: 1, duration: 2.2 })
      .from(
        ".hero-kicker, .hero-title, .hero-sub, .hero-actions",
        { y: 22, opacity: 0, duration: 0.9, stagger: 0.12 },
        "-=1.8"
      );

    // A single scroll-linked drift on the hero background — not a per-section reveal
    gsap.to(".hero-field", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  } else {
    // No GSAP or reduced motion: content is visible by default, nothing to fix.
  }
});
