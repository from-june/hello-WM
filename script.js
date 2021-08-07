// NOTE: Prevent NAV BAR
const navStick = document.querySelectorAll('.navigation__stick');
const navBar = document.querySelector('.navigation__bar');
const navBox = document.querySelector('.navigation__box');

let show = true;

const appearNav = function () {
  navBox.style.transform = 'translateX(0)';
  navStick.forEach((stick) => stick.classList.add('active'));
  show = false;
};

const disappearNav = function () {
  navBox.style.transform = 'translateX(-25rem)';
  navStick.forEach((stick) => stick.classList.remove('active'));
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
