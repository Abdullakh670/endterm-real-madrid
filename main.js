// Live countdown to the next match: <div data-countdown="2026-11-22T21:00:00+01:00">
(function () {
    const box = document.querySelector('[data-countdown]');
    if (!box) return;
    const target = new Date(box.dataset.countdown).getTime();
    const pad = n => String(n).padStart(2, '0');
    function tick() {
        let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
        const d = Math.floor(s / 86400); s %= 86400;
        const h = Math.floor(s / 3600); s %= 3600;
        const m = Math.floor(s / 60); s %= 60;
        box.innerHTML = [[d, 'days'], [pad(h), 'hours'], [pad(m), 'min'], [pad(s), 'sec']]
            .map(([v, l]) => `<div><b>${v}</b><small>${l}</small></div>`).join('');
    }
    tick();
    setInterval(tick, 1000);
})();

// Count-up numbers when the strip scrolls into view
(function () {
    const nums = document.querySelectorAll('[data-count]');
    if (!nums.length || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const end = +e.target.dataset.count, t0 = performance.now();
        (function step(t) {
            const p = Math.min(1, (t - t0) / 1400);
            e.target.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
        })(t0);
    }), { threshold: .6 });
    nums.forEach(n => { n.textContent = '0'; io.observe(n); });
})();

// If images/bernabeu.jpg exists, use it as the hero background behind the animated scene
(function () {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const im = new Image();
    im.onload = () => hero.classList.add('has-photo');
    im.src = 'images/bernabeu.jpg';
})();