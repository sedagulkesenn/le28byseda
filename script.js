const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];


/* SCROLL PROGRESS */

const progress = $('#progress');

addEventListener('scroll', () => {

  const height =
    document.documentElement.scrollHeight - innerHeight;

  progress.style.width =
    `${(scrollY / height) * 100}%`;

});


/* MOBILE MENU */

const menuBtn = $('#menuBtn');

menuBtn.addEventListener('click', () => {

  $('.nav').classList.toggle('menu-open');

});


$$('.nav nav a').forEach(link => {

  link.addEventListener('click', () => {

    $('.nav').classList.remove('menu-open');

  });

});


/* WORK FILTERS */

$$('.filter').forEach(button => {

  button.addEventListener('click', () => {

    $$('.filter').forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    const filter = button.dataset.filter;

    $$('.project').forEach(project => {

      const categories =
        project.dataset.category || '';

      const show =
        filter === 'all' ||
        categories.includes(filter);

      project.style.display =
        show ? '' : 'none';

    });

  });

});

/* =====================================
   NICHE IMAGE HOVER
====================================== */

const nicheTags = document.querySelectorAll(".floating-tag");
const nichePreview = document.getElementById("nichePreview");
const nichePreviewImage = document.getElementById("nichePreviewImage");
const nichePreviewText = document.getElementById("nichePreviewText");

nicheTags.forEach((tag, index) => {

  tag.addEventListener("mouseenter", () => {

    const image = tag.dataset.image;
    const alt = tag.dataset.alt;

    nichePreviewImage.src = image;
    nichePreviewImage.alt = alt;
    nichePreviewText.textContent = alt;

    nichePreview.classList.add("visible");

  });


  tag.addEventListener("mousemove", (event) => {

    nichePreview.style.left = `${event.clientX + 25}px`;
    nichePreview.style.top = `${event.clientY + 25}px`;

  });


  tag.addEventListener("mouseleave", () => {

    nichePreview.classList.remove("visible");

  });

});