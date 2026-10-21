const menuBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

function closeMenu() {
  if (!menu || !menuBtn) return;
  menu.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.textContent = 'Menu';
}

if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Fechar' : 'Menu';
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
}

const navLinks = Array.from(document.querySelectorAll('.nav-link')).filter((link) => {
  const href = link.getAttribute('href');
  return href && href.startsWith('#') && href.length > 1 && document.querySelector(href);
});

if (navLinks.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === id);
        });
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );
  navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .forEach((section) => spy.observe(section));
}