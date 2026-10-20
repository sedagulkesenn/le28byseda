const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* SCROLL PROGRESS */
const progress = $('#progress');
const updateProgress = () => {
  if (!progress) return;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

/* MOBILE MENU */
const menuBtn = $('#menuBtn');
const nav = $('.nav');
const closeMenu = () => {
  if (!nav || !menuBtn) return;
  nav.classList.remove('menu-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
  menuBtn.textContent = '☰';
};
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menuBtn.textContent = isOpen ? '×' : '☰';
  });
  $$('.nav nav a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}

/* WORK FILTERS */
const filterButtons = $$('.filter');
const projectsGrid = $('.projects');
const projects = $$('.project');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';
    filterButtons.forEach(btn => {
      const active = btn === button;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    if (projectsGrid) projectsGrid.classList.toggle('is-filtering', filter !== 'all');
    projects.forEach(project => {
      const categories = (project.dataset.category || '').split(/\s+/);
      project.hidden = filter !== 'all' && !categories.includes(filter);
    });
  });
});

/* NICHE IMAGE PREVIEW — only initialise when the optional elements exist. */
const nicheTags = $$('.floating-tag');
const nichePreview = $('#nichePreview');
const nichePreviewImage = $('#nichePreviewImage');
const nichePreviewText = $('#nichePreviewText');
if (nichePreview && nichePreviewImage && nichePreviewText) {
  nicheTags.forEach(tag => {
    const showPreview = event => {
      const image = tag.dataset.image;
      const alt = tag.dataset.alt || '';
      if (!image) return;
      nichePreviewImage.src = image;
      nichePreviewImage.alt = alt;
      nichePreviewText.textContent = alt;
      nichePreview.classList.add('visible');
      if (event && 'clientX' in event) {
        nichePreview.style.left = `${Math.min(event.clientX + 25, window.innerWidth - 240)}px`;
        nichePreview.style.top = `${Math.min(event.clientY + 25, window.innerHeight - 220)}px`;
      }
    };
    tag.addEventListener('mouseenter', showPreview);
    tag.addEventListener('mousemove', event => {
      if (!nichePreview.classList.contains('visible')) return;
      nichePreview.style.left = `${Math.min(event.clientX + 25, window.innerWidth - 240)}px`;
      nichePreview.style.top = `${Math.min(event.clientY + 25, window.innerHeight - 220)}px`;
    });
    tag.addEventListener('mouseleave', () => nichePreview.classList.remove('visible'));
    tag.addEventListener('focus', showPreview);
    tag.addEventListener('blur', () => nichePreview.classList.remove('visible'));
  });
}
