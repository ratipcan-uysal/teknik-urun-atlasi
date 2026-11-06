(() => {
  'use strict';
  const search = document.getElementById('search');
  const clear = document.getElementById('clear-search');
  const status = document.getElementById('search-status');
  const empty = document.getElementById('empty-results');
  const toc = document.getElementById('toc');
  const mobile = matchMedia('(max-width: 900px)');
  const normalize = text => text.toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
  const chapters = [...document.querySelectorAll('.chapter')];
  const units = [...document.querySelectorAll('#guide .unit')];
  const index = new Map(units.map(unit => {
    const chapter = unit.closest('.chapter');
    const topic = unit.closest('.topic');
    return [unit, normalize(unit.textContent + ' ' + (chapter?.querySelector('h2')?.textContent || '') + ' ' + (topic?.querySelector('h3')?.textContent || ''))];
  }));
  let timer;
  function filter() {
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let concepts = 0, matches = 0;
    units.forEach(unit => {
      const visible = terms.every(term => index.get(unit).includes(term));
      unit.hidden = !visible;
      if (visible) { matches++; if (unit.hasAttribute('data-item')) concepts++; }
    });
    document.querySelectorAll('.topic').forEach(topic => {
      topic.hidden = terms.length > 0 && ![...topic.querySelectorAll('.unit')].some(unit => !unit.hidden);
    });
    chapters.forEach(chapter => {
      chapter.hidden = terms.length > 0 && ![...chapter.querySelectorAll('.unit')].some(unit => !unit.hidden);
    });
    document.body.classList.toggle('is-searching', terms.length > 0);
    clear.hidden = !terms.length;
    empty.hidden = !terms.length || matches > 0;
    status.textContent = terms.length ? `${concepts} kavram · ${matches} içerik eşleşti.` : '216 kavram · Bölüm menüsüyle veya arayarak ilerle.';
  }
  search.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(filter, 150); });
  clear.addEventListener('click', () => { clearTimeout(timer); search.value = ''; filter(); search.focus(); });
  search.addEventListener('keydown', e => { if (e.key === 'Escape') { clear.click(); } });
  function tocMode() { toc.open = !mobile.matches; }
  tocMode();
  mobile.addEventListener('change', tocMode);
  document.querySelectorAll('.section-link').forEach(link => link.addEventListener('click', () => {
    if (search.value) { clearTimeout(timer); search.value = ''; filter(); }
    if (mobile.matches) toc.open = false;
  }));
  const anchors = [...document.querySelectorAll('.section-link')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      anchors.forEach(link => {
        if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-80px 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('.chapter-heading h2').forEach(heading => observer.observe(heading));
  let scheduled = false;
  function progress() {
    const total = document.documentElement.scrollHeight - innerHeight;
    document.querySelector('.reading-progress').style.width = (total > 0 ? scrollY / total * 100 : 0) + '%';
    scheduled = false;
  }
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(progress); } }, { passive: true });
  addEventListener('resize', progress, { passive: true });
  progress();
})();
