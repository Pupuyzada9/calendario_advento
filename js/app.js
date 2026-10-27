(() => {
  const date = new Date();
  const timeZone = 'America/Sao_Paulo';
  document.querySelector('#copyright-year').textContent = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', timeZone }).format(date);
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
