/**
 * main.js — Site behavior
 * =======================
 * Handles:
 *   - Rendering project cards from the PROJECTS array (defined in projects.js)
 *   - Active nav link highlighting on scroll
 *   - Scroll-reveal animation for cards
 *   - Mobile nav toggle
 */

/* ─── Project Card Renderer ─────────────────────────────────────────────── */

function buildProjectCard(project) {
  const card = document.createElement("article");
  card.classList.add("project-card");
  if (project.highlight) card.classList.add("project-card--highlight");

  // Tags
  const tagsHTML = project.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  // Link buttons — only render if URL is provided
  const githubBtn = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener" class="card-link">
         <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
         GitHub
       </a>`
    : "";

  const liveBtn = project.live
    ? `<a href="${project.live}" target="_blank" rel="noopener" class="card-link card-link--accent">
         <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>
         Live
       </a>`
    : "";

  card.innerHTML = `
    <div class="card-inner">
      <h3 class="card-title">${project.title}</h3>
      <p class="card-description">${project.description}</p>
      <div class="card-footer">
        <div class="card-tags">${tagsHTML}</div>
        <div class="card-links">${githubBtn}${liveBtn}</div>
      </div>
    </div>
  `;

  return card;
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  if (!window.PROJECTS || PROJECTS.length === 0) {
    grid.innerHTML = `<p class="empty-state">No projects yet — add some in <code>js/projects.js</code>.</p>`;
    return;
  }

  PROJECTS.forEach((project) => {
    const card = buildProjectCard(project);
    grid.appendChild(card);
  });
}

/* ─── Scroll Reveal ──────────────────────────────────────────────────────── */

function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    // Fallback: just show everything
    targets.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ─── Active Nav on Scroll ───────────────────────────────────────────────── */

function initNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".site-header");

  const onScroll = () => {
    // Shrink header after scrolling down
    if (window.scrollY > 60) {
      header.classList.add("site-header--scrolled");
    } else {
      header.classList.remove("site-header--scrolled");
    }

    // Highlight active section link
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - (window.innerHeight / 2);
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "nav-link--active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // Run once on load
}

/* ─── Mobile Nav Toggle ──────────────────────────────────────────────────── */

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("nav-menu--open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when a link is clicked
  menu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("nav-menu--open");
      toggle.setAttribute("aria-expanded", false);
    });
  });
}

/* ─── Typed Hero Subtitle ────────────────────────────────────────────────── */

function initTypedSubtitle() {
  const el = document.getElementById("typed-subtitle");
  if (!el) return;

  const phrases = [
    "Full-Stack Engineer.",
    "CS Graduate.",
    "Builder of things.",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const TYPE_SPEED = 65;
  const DELETE_SPEED = 35;
  const PAUSE_AFTER_TYPE = 1800;
  const PAUSE_AFTER_DELETE = 400;

  function tick() {
    const phrase = phrases[phraseIndex];

    if (!deleting) {
      el.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
    }

    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }

  tick();
}

/* ─── Init ───────────────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initScrollReveal();
  initNavHighlight();
  initMobileNav();
  initTypedSubtitle();
});