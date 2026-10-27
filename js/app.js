(() => {
  const date = new Date();
  const timeZone = 'America/Sao_Paulo';
  document.querySelector('#copyright-year').textContent = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', timeZone }).format(date);
})();

(() => {
  // Contador de 15 minutos da barra do topo; mantém o tempo ao recarregar a página
  const output = document.querySelector('[data-timer]');
  if (!output) return;
  const duration = 15 * 60 * 1000;
  let start = Date.now();
  try {
    const saved = Number(localStorage.getItem('offer-timer-start'));
    if (saved && saved <= start) start = saved;
    else localStorage.setItem('offer-timer-start', String(start));
  } catch (e) {}
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    const left = Math.max(0, Math.ceil((start + duration - Date.now()) / 1000));
    output.textContent = `${pad(Math.floor(left / 60))}:${pad(left % 60)}`;
    return left > 0;
  };
  if (tick()) {
    const timer = setInterval(() => { if (!tick()) clearInterval(timer); }, 1000);
  }
})();

(() => {
  // Barra fixa de compra: aparece depois do topo e some quando um bloco de compra está na tela
  const bar = document.querySelector('.sticky-cta');
  if (!bar || !('IntersectionObserver' in window)) return;
  const hidden = new Set();
  const update = () => bar.classList.toggle('is-visible', hidden.size === 0);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) hidden.add(entry.target);
      else hidden.delete(entry.target);
    });
    update();
  });
  document.querySelectorAll('.hero, .offer-card, .faq-purchase').forEach(el => observer.observe(el));
})();

(() => {
  const gallery = document.querySelector('.product-gallery');
  const toggle = gallery.querySelector('.gallery-toggle');
  toggle.addEventListener('click', () => {
    const paused = gallery.classList.toggle('is-paused');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Continuar carrossel' : 'Pausar carrossel';
  });
})();
