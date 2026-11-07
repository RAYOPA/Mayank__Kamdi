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
  let progressFrame = 0;
  let pointerFrame = 0;
  let targetPointerX = 0;
  let targetPointerY = 0;
  let currentPointerX = 0;
  let currentPointerY = 0;
  let activeTouch = false;
  let touchResetTimer = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const renderProgress = (progress) => {
    const p = clamp(progress, 0, 1);
    const focus = p * p * (3 - (2 * p));
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    scene.style.setProperty('--background-drift', `${(-p * viewportHeight * 0.025).toFixed(2)}px`);
    scene.style.setProperty('--background-zoom', (1 + p * 0.055).toFixed(4));
    scene.style.setProperty('--human-drift', `${(-p * Math.min(viewportWidth * 0.075, 76)).toFixed(2)}px`);
    scene.style.setProperty('--human-zoom', (1 + p * 0.025).toFixed(4));
    scene.style.setProperty('--android-drift', `${(p * Math.min(viewportWidth * 0.07, 72)).toFixed(2)}px`);
    scene.style.setProperty('--android-zoom', (1 + p * 0.035).toFixed(4));
    scene.style.setProperty('--human-opacity', (1 - focus * 0.12).toFixed(4));
    scene.style.setProperty('--android-opacity', (0.94 + focus * 0.06).toFixed(4));
    scene.style.setProperty('--human-saturation', (1 - focus * 0.08).toFixed(4));
    scene.style.setProperty('--android-saturation', (0.96 + focus * 0.12).toFixed(4));
    scene.style.setProperty('--human-field-opacity', (0.12 - focus * 0.10).toFixed(4));
    scene.style.setProperty('--machine-field-opacity', (0.02 + focus * 0.16).toFixed(4));
    scene.style.setProperty('--scroll-focus', focus.toFixed(4));
    scene.style.setProperty('--copy-lift', `${(-p * viewportHeight * 0.025).toFixed(2)}px`);
    scene.style.setProperty('--copy-zoom', (1 - p * 0.025).toFixed(4));
    scene.style.setProperty('--role-zoom', (1 + p * 0.2).toFixed(4));
    scene.style.setProperty('--touch-zoom', (1 + p * 0.65).toFixed(4));
    scene.style.setProperty('--star-turn', `${(p * 70).toFixed(2)}deg`);
    scene.dataset.scrollProgress = p.toFixed(3);
  };

  const animateProgress = () => {
    currentProgress += (targetProgress - currentProgress) * 0.14;
    if (Math.abs(targetProgress - currentProgress) < 0.0005) currentProgress = targetProgress;
    renderProgress(currentProgress);

    if (currentProgress !== targetProgress) {
      progressFrame = window.requestAnimationFrame(animateProgress);
    } else {
      progressFrame = 0;
    }
  };

  const measureScroll = () => {
    if (reduceMotion.matches) {
      targetProgress = 0;
      currentProgress = 0;
      if (progressFrame) window.cancelAnimationFrame(progressFrame);
      progressFrame = 0;
      renderProgress(0);
      return;
    }

    const travel = hero.offsetHeight - scene.offsetHeight;
    const heroTop = hero.getBoundingClientRect().top;
    targetProgress = travel > 0 ? clamp(-heroTop / travel, 0, 1) : 0;
    if (!progressFrame) progressFrame = window.requestAnimationFrame(animateProgress);
  };

  const renderPointer = (x, y) => {
    const setPx = (property, value) => scene.style.setProperty(property, `${value.toFixed(2)}px`);
    const width = window.innerWidth;
    const height = window.innerHeight;

    setPx('--background-pointer-x', -x * Math.min(width * 0.004, 5));
    setPx('--background-pointer-y', -y * Math.min(height * 0.004, 5));
    setPx('--human-pointer-x', x * Math.min(width * 0.014, 15));
    setPx('--human-pointer-y', y * Math.min(height * 0.010, 10));
    setPx('--android-pointer-x', -x * Math.min(width * 0.017, 18));
    setPx('--android-pointer-y', -y * Math.min(height * 0.011, 11));
    setPx('--human-field-x', x * 7);
    setPx('--human-field-y', y * 5);
    setPx('--machine-field-x', -x * 8);
    setPx('--machine-field-y', -y * 5);
    setPx('--touch-pointer-x', x * 4);
    setPx('--touch-pointer-y', y * 3);
  };

  const animatePointer = () => {
    currentPointerX += (targetPointerX - currentPointerX) * 0.16;
    currentPointerY += (targetPointerY - currentPointerY) * 0.16;
    if (Math.abs(targetPointerX - currentPointerX) < 0.001) currentPointerX = targetPointerX;
    if (Math.abs(targetPointerY - currentPointerY) < 0.001) currentPointerY = targetPointerY;
    renderPointer(currentPointerX, currentPointerY);

    if (currentPointerX !== targetPointerX || currentPointerY !== targetPointerY) {
      pointerFrame = window.requestAnimationFrame(animatePointer);
    } else {
      pointerFrame = 0;
    }
  };

  const aimPointer = (x, y) => {
    if (reduceMotion.matches) return;
    targetPointerX = clamp(x, -1, 1);
    targetPointerY = clamp(y, -1, 1);
    if (!pointerFrame) pointerFrame = window.requestAnimationFrame(animatePointer);
  };

  const aimFromEvent = (event) => {
    const bounds = scene.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    aimPointer(
      ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    );
  };

  scene.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    activeTouch = false;
    aimFromEvent(event);
  }, { passive: true });

  scene.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.pointerType !== 'touch' || reduceMotion.matches) return;
    if (event.target.closest?.('a, button')) return;
    activeTouch = true;
    aimFromEvent(event);
    window.clearTimeout(touchResetTimer);
    touchResetTimer = window.setTimeout(() => {
      activeTouch = false;
      aimPointer(0, 0);
    }, 520);
  }, { passive: true });

  scene.addEventListener('pointerleave', () => {
    if (activeTouch) return;
    aimPointer(0, 0);
  }, { passive: true });

  scene.addEventListener('pointercancel', () => {
    activeTouch = false;
    window.clearTimeout(touchResetTimer);
    aimPointer(0, 0);
  }, { passive: true });

  const handleMotionPreference = (event) => {
    if (event.matches) {
      targetProgress = 0;
      currentProgress = 0;
      if (progressFrame) window.cancelAnimationFrame(progressFrame);
      progressFrame = 0;
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      targetPointerX = 0;
      targetPointerY = 0;
      currentPointerX = 0;
      currentPointerY = 0;
      renderProgress(0);
      renderPointer(0, 0);
    } else {
      measureScroll();
    }
  };

  window.addEventListener('scroll', measureScroll, { passive: true });
  window.addEventListener('resize', measureScroll, { passive: true });
  reduceMotion.addEventListener('change', handleMotionPreference);
  renderProgress(0);
  renderPointer(0, 0);
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
