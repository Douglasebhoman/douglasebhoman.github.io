/* Scroll reveal, shared by every page.

   Elements marked data-reveal fade in and rise 16px the first time they scroll
   into view, once. data-reveal="1" to "3" delays an element by 100 to 300ms, to
   stagger neighbours.

   It is an attribute, not a class, because the site once revealed a .reveal
   class with the hidden state in styles.css. A browser still holding that
   stylesheet would hide anything marked .reveal for good; it has no rule for
   data-reveal.

   The hidden state is set here, never in a stylesheet, so with JavaScript off
   nothing is hidden. Nothing is hidden either when the reader prefers reduced
   motion, or when the element is already on screen at load, which avoids a
   flash of visible, hidden, visible.

   Every data-reveal element gets a "reveal" event the first time it comes into
   view, animated or not, for pages that start something then (the homepage
   counters). */
(() => {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length || !('IntersectionObserver' in window)) return;

  const DURATION = 400, RISE = 16;
  const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hidden = new WeakSet();

  const hide = (el) => {
    el.style.opacity = '0';
    el.style.transform = `translateY(${RISE}px)`;
    hidden.add(el);
  };

  const show = (el) => {
    const step = Number(el.dataset.reveal);
    const delay = step >= 1 && step <= 3 ? step * 100 : 0;
    el.style.transition = `opacity ${DURATION}ms ease-out ${delay}ms, transform ${DURATION}ms ease-out ${delay}ms`;
    el.style.opacity = '';
    el.style.transform = '';
    // Hand transitions back to the page's own CSS once this one has run
    setTimeout(() => { el.style.transition = ''; }, delay + DURATION + 50);
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      if (hidden.has(e.target)) show(e.target);
      e.target.dispatchEvent(new CustomEvent('reveal'));
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  els.forEach((el) => {
    if (animate && el.getBoundingClientRect().top >= window.innerHeight) hide(el);
    obs.observe(el);
  });
})();
