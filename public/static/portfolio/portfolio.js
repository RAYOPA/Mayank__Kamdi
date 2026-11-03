const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');

if (toggle && navigation) {
  const links = [...navigation.querySelectorAll('a')];

  const setOpen = (open, restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    navigation.classList.toggle('is-open', open);

    if (open) {
      links[0]?.focus({ preventScroll: true });
    } else if (restoreFocus) {
      toggle.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (
      toggle.getAttribute('aria-expanded') === 'true' &&
      !navigation.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setOpen(false);
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
