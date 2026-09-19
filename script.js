// Feature: Light/Dark Theme Switcher with localStorage Persistence
const themeToggle = document.getElementById("theme-toggle");

// 1. Check saved state in localStorage on initial page load
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggle.textContent = "☾";
}

// 2. Handle button clicks
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");
  themeToggle.textContent = isLight ? "☾" : "☀";

  // 3. Save preference to localStorage
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

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

// Feature 2: Bulletproof Cumulative Scrollspy Engine
const sections = document.querySelectorAll("section[id], footer[id]");
const navItems = document.querySelectorAll(".nav-item");

function updateActiveNav() {
  // Trigger line sits just below the 90px sticky navbar offset
  const triggerLine = window.scrollY + 110;
  let currentSectionId = "";

  // Find the last section whose top edge has passed the trigger line
  sections.forEach((section) => {
    if (triggerLine >= section.offsetTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  // Edge Case: Absolute bottom of document belongs to Contact
  const isAtBottom = window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 15;
  if (isAtBottom) {
    currentSectionId = "contact";
  }

  // Update navbar classes
  if (currentSectionId) {
    navItems.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSectionId}`
      );
    });
  }
}

// Event Listeners
window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
updateActiveNav(); // Run immediately on page load

// Feature 3: Minimal Ambient Cursor Spotlight
const ambientGlow = document.getElementById("ambient-glow");

window.addEventListener("pointermove", (e) => {
  ambientGlow.style.setProperty("--glow-x", `${e.clientX}px`);
  ambientGlow.style.setProperty("--glow-y", `${e.clientY}px`);
});

// Feature 3: Minimalist Ambient Cyber-Embers (Easy to Explain)
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 35 lightweight rising ember particles
const particleCount = 35;
const particles = [];

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.5 + 0.8,
    speedY: Math.random() * 0.35 + 0.15,
    alpha: Math.random() * 0.35 + 0.15
  });
}

function renderEmbers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.y -= p.speedY;

    // Wrap around: when particle hits top, reset to bottom
    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(204, 255, 0, ${p.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(renderEmbers);
}

renderEmbers();