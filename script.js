// NOTE: Prevent NAV BAR
const navStick = document.querySelectorAll('.navigation__stick');
const navBar = document.querySelector('.navigation__bar');
const navBox = document.querySelector('.navigation__box');

let show = true;

const appearNav = function () {
  navBox.style.transform = 'translateX(0)';
  navStick.forEach(stick => stick.classList.add('active'));
  show = false;
};

const disappearNav = function () {
  navBox.style.transform = 'translateX(-25rem)';
  navStick.forEach(stick => stick.classList.remove('active'));
  show = true;
};

navBar.addEventListener('click', function () {
  show ? appearNav() : disappearNav();
});

// NOTE: Show and Close modal
const btnSubmit = document.querySelector('.btn--audition');
const btnClose = document.querySelector('.modal__close');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const showModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnSubmit.addEventListener('click', showModal);
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', function (e) {
  if (e.target !== modal) closeModal();
});

// NOTE: Scroll To section
const navLink = document.querySelectorAll('.navigation__link');
const navLinks = document.querySelector('.navigation__list');
const btnAbout = document.querySelector('.header__btn');
const sectionAbout = document.querySelector('.about');

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  if (!id) return;

  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

  // Close Nav list
  disappearNav();
});

btnAbout.addEventListener('click', function (e) {
  e.preventDefault();
  sectionAbout.scrollIntoView({ behavior: 'smooth' });
});

// NOTE: Sticky Navigation Bar
const navigation = document.querySelector('.navigation');
const header = document.querySelector('.header');
const navheight = navigation.getBoundingClientRect().height;

const headerObs = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navigation.classList.add('sticky');
  else navigation.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(headerObs, {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
});

headerObserver.observe(header);

// NOTE: Mouseenter and mouseleave event
const artistLists = document.querySelectorAll('.artists__group');

const mouseEvent = function (e) {
  const group = e.target;
  const imgs = group
    .closest('.artists__group')
    .querySelectorAll('.artists__image');
  const contents = group
    .closest('.artists__group')
    .querySelectorAll('.artists__content');

  imgs.forEach(img => img.classList.toggle('active'));
  contents.forEach(content => content.classList.toggle('active'));
};

artistLists.forEach(list => {
  list.addEventListener('mouseenter', mouseEvent);
  list.addEventListener('mouseleave', mouseEvent);
});

// NOTE: Infinity Carousel
const carousel = document.querySelector('.releases__carousel');
const albumList = document.querySelector('.releases__list');
const page = document.querySelector('.slide');
const albums = document.querySelectorAll('.releases__item');

const screen600 = window.matchMedia('(max-width: 37.5em)');
const screen400 = window.matchMedia('(max-width: 25em)');
const SEC = 2000;
const TRANSITION = 'all 0.7s ease-in-out';

let index = 0;

const carouselEffet = function () {
  setInterval(function () {
    albumList.style.transform = 'translateX(-33.3333%)';

    if (screen600.matches) albumList.style.transform = 'translateX(-50%)';
    if (screen400.matches) albumList.style.transform = 'translateX(-100%)';

    // Pagiantion
    if (index >= albums.length - 1) {
      index = 0;
      page.style.transform = `translateX(0)`;
    } else {
      index++;
      page.style.transition = TRANSITION;
      page.style.transform = `translateX(${100 * index}%)`;
    }
  }, SEC);
};
carouselEffet();

albumList.addEventListener('transitionend', function () {
  albumList.appendChild(albumList.firstElementChild);
  albumList.style.transition = 'none';
  albumList.style.transform = 'translateX(0)';

  setTimeout(() => {
    albumList.style.transition = TRANSITION;
  });
});

// Reveal each section
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
