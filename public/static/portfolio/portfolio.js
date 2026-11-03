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

const hero = document.querySelector('.portfolio-hero');
const scene = document.querySelector('[data-scroll-scene]');
const finale = document.querySelector('.portfolio-finale');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (hero && scene) {
  let targetProgress = 0;
  let currentProgress = 0;
  let animationFrame = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const renderProgress = (progress) => {
    const p = clamp(progress, 0, 1);
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    scene.style.setProperty('--background-drift', `${(-p * viewportHeight * 0.025).toFixed(2)}px`);
    scene.style.setProperty('--background-zoom', (1 + p * 0.055).toFixed(4));
    scene.style.setProperty('--human-drift', `${(-p * Math.min(viewportWidth * 0.075, 76)).toFixed(2)}px`);
    scene.style.setProperty('--human-zoom', (1 + p * 0.025).toFixed(4));
    scene.style.setProperty('--android-drift', `${(p * Math.min(viewportWidth * 0.07, 72)).toFixed(2)}px`);
    scene.style.setProperty('--android-zoom', (1 + p * 0.035).toFixed(4));
    scene.style.setProperty('--copy-lift', `${(-p * viewportHeight * 0.025).toFixed(2)}px`);
    scene.style.setProperty('--copy-zoom', (1 - p * 0.025).toFixed(4));
    scene.style.setProperty('--role-zoom', (1 + p * 0.2).toFixed(4));
    scene.style.setProperty('--touch-zoom', (1 + p * 0.65).toFixed(4));
    scene.style.setProperty('--star-turn', `${(p * 70).toFixed(2)}deg`);
    scene.dataset.scrollProgress = p.toFixed(3);
  };

  const animate = () => {
    currentProgress += (targetProgress - currentProgress) * 0.14;
    if (Math.abs(targetProgress - currentProgress) < 0.0005) currentProgress = targetProgress;
    renderProgress(currentProgress);

    if (currentProgress !== targetProgress) {
      animationFrame = window.requestAnimationFrame(animate);
    } else {
      animationFrame = 0;
    }
  };

  const measureScroll = () => {
    if (reduceMotion.matches) {
      targetProgress = 0;
      currentProgress = 0;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      renderProgress(0);
      return;
    }

    const travel = hero.offsetHeight - scene.offsetHeight;
    const heroTop = hero.getBoundingClientRect().top;
    targetProgress = travel > 0 ? clamp(-heroTop / travel, 0, 1) : 0;
    if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
  };

  window.addEventListener('scroll', measureScroll, { passive: true });
  window.addEventListener('resize', measureScroll, { passive: true });
  reduceMotion.addEventListener('change', (event) => {
    if (event.matches) {
      targetProgress = 0;
      currentProgress = 0;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      renderProgress(0);
    } else {
      measureScroll();
    }
  });

  renderProgress(0);
  measureScroll();
}

if (finale && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        finale.classList.add('is-visible');
        observer.unobserve(finale);
      }
    }
  }, { threshold: 0.18 });
  observer.observe(finale);
} else {
  finale?.classList.add('is-visible');
}
