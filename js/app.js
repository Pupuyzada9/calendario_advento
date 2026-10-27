(() => {
  const date = new Date();
  const timeZone = 'America/Sao_Paulo';
  document.querySelector('#copyright-year').textContent = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', timeZone }).format(date);
})();

(() => {
  // Fim da promoção de outubro: 31/10 às 23:59:59 (horário de Brasília)
  const deadline = new Date('2026-10-31T23:59:59-03:00').getTime();
  const boxes = document.querySelectorAll('.promo-countdown');
  const outputs = document.querySelectorAll('[data-countdown]');
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    const left = deadline - Date.now();
    if (left <= 0) {
      boxes.forEach(box => { box.hidden = true; });
      return false;
    }
    const s = Math.floor(left / 1000);
    const days = Math.floor(s / 86400);
    const text = `${days > 0 ? days + 'd ' : ''}${pad(Math.floor(s % 86400 / 3600))}h ${pad(Math.floor(s % 3600 / 60))}m ${pad(s % 60)}s`;
    outputs.forEach(out => { out.textContent = text; });
    boxes.forEach(box => { box.hidden = false; });
    return true;
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
