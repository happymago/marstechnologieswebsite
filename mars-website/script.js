/* ===========================
   HEADER SCROLL STATE
=========================== */
(function () {
  const header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ===========================
   MOBILE BURGER MENU
=========================== */
(function () {
  const burger = document.getElementById('burger');
  const links  = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    const [s1, s2, s3] = burger.querySelectorAll('span');
    if (open) {
      s1.style.cssText = 'transform:translateY(7px) rotate(45deg)';
      s2.style.cssText = 'opacity:0; transform:scaleX(0)';
      s3.style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
    } else {
      [s1, s2, s3].forEach(s => s.style.cssText = '');
    }
  });

  // Close when a nav link is clicked
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });
})();


/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ===========================
   SCROLL REVEAL
=========================== */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-left { opacity: 0; transform: translateX(-32px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .reveal-left.visible { opacity: 1; transform: translateX(0); }
    .reveal-right { opacity: 0; transform: translateX(32px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .reveal-right.visible { opacity: 1; transform: translateX(0); }
  `;
  document.head.appendChild(style);

  // Add reveal classes to elements
  document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.product-block__media').forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
  });
  document.querySelectorAll('.product-block__content').forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? 'reveal-right' : 'reveal-left');
  });
  document.querySelectorAll('.websystems__card').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.about__content').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.about__stats-wrap').forEach(el => el.classList.add('reveal-right'));
  document.querySelectorAll('.contact__card').forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
})();


/* ===========================
   FOOTER YEAR
=========================== */
(function () {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ===========================
   ACTIVE NAV HIGHLIGHT
=========================== */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--orange)';
      }
    });
  }, { passive: true });
})();
