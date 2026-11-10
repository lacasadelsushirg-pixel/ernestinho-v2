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
