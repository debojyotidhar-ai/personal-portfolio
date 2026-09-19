// Feature 1: Mouse Spotlight Glow on Cards
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// Feature 2: Dynamic Active Navbar Highlighter (Scrollspy)
const sections = document.querySelectorAll("section[id], footer[id]");
const navItems = document.querySelectorAll(".nav-item");

const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -70% 0px",
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute("id");
      navItems.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${currentId}`
        );
      });
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));