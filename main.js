(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  const heroReveals = document.querySelectorAll(".hero .reveal");
  heroReveals.forEach((el, i) => {
    el.style.transitionDelay = `${120 + i * 90}ms`;
    requestAnimationFrame(() => el.classList.add("is-visible"));
  });

  reveals.forEach((el, i) => {
    if (el.closest(".hero")) return;
    el.style.transitionDelay = `${Math.min(i % 6, 4) * 70}ms`;
    observer.observe(el);
  });
})();
