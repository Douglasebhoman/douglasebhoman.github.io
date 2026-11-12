/* Scroll reveal, shared by every page.

   Elements marked .reveal fade in and rise 16px the first time they scroll into
   view, once. reveal-d1 to reveal-d3 delay an element by 100 to 300ms, to stagger
   neighbours.

   The hidden state is set here, never in a stylesheet, so with JavaScript off
   nothing is hidden. Nothing is hidden either when the reader prefers reduced
   motion, or when the element is already on screen at load, which avoids a
   flash of visible, hidden, visible.

   Every .reveal element gets a "reveal" event the first time it comes into view,
   animated or not, for pages that start something then (the homepage counters). */
(() => {
  const els = document.querySelectorAll('.reveal');
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
    const step = el.className.match(/\breveal-d([1-3])\b/);
    const delay = step ? step[1] * 100 : 0;
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
