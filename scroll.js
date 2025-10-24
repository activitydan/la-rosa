(function () {
  const doc = document.documentElement;
  if (doc.classList.contains('no-js')) {
    doc.classList.remove('no-js');
  }

  const targets = Array.from(document.querySelectorAll('[data-scroll-effect]'));
  if (!targets.length) return;

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = reducedMotionQuery && reducedMotionQuery.matches;

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    targets.forEach((element) => {
      element.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -15% 0px',
      threshold: 0.15,
    }
  );

  targets.forEach((element) => {
    observer.observe(element);
  });
})();
