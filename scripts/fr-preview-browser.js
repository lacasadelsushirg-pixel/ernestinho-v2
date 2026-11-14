const root = document.documentElement;
const isFrench = root.hasAttribute('data-fr-preview');
if (!isFrench) {
  const group = document.querySelector('[data-ec-desktop-language-group]');
  if (group) {
    function restoreFrenchChoice() {
      if (group.querySelector('[data-fr-preview-choice]')) return;
      const link = document.createElement('a');
      link.href = root.dataset.frPreviewHref;
      link.lang = 'fr';
      link.dataset.frPreviewChoice = '';
      link.dataset.desktopLanguage = 'FR';
      link.className = 'ec-desktop-language-choice';
      link.style.cssText = 'text-decoration:none;white-space:nowrap';
      link.textContent = '🇫🇷 Français';
      group.append(link);
    }
    // The three-language runtime rebuilds its desktop selector after loading.
    restoreFrenchChoice();
    new MutationObserver(restoreFrenchChoice).observe(group, { childList: true });
  }
} else {
  for (const button of document.querySelectorAll('[data-carousel-target]')) {
    const track = document.getElementById(button.dataset.carouselTarget);
    const card = track?.querySelector('.feature');
    if (!card) continue;
    button.addEventListener('click', () => {
      const direction = button.dataset.carouselDirection === 'prev' ? -1 : 1;
      track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 18), behavior: 'smooth' });
    });
  }
}

if (isFrench && document.getElementById('fr-month-rain')) {
  const grid = document.getElementById('month-grid');
  const extra = document.getElementById('month-extra');
  const buttons = [...document.querySelectorAll('[data-tab]')];
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;
      grid.style.display = tab === 'month' ? '' : 'none';
      extra.hidden = tab === 'month';
      extra.style.display = tab === 'month' ? 'none' : '';
      for (const panel of extra.children) panel.hidden = panel.id !== `fr-month-${tab}`;
      for (const choice of buttons) choice.setAttribute('aria-pressed', String(choice === button));
    });
  }
}
