
const toc = document.getElementById('sommaire');
const toggle = document.getElementById('tocToggle');
const root = document.documentElement;
const textSmaller = document.getElementById('textSmaller');
const textReset = document.getElementById('textReset');
const textLarger = document.getElementById('textLarger');
const reader = document.getElementById('reader');
const fontChoice = document.getElementById('fontChoice');
const themeChoice = document.getElementById('themeChoice');
const fontDropdown = document.querySelector('[data-dropdown=\"font\"]');
const fontDropdownTrigger = document.getElementById('fontDropdownTrigger');
const fontDropdownValue = document.getElementById('fontDropdownValue');
const fontDropdownMenu = document.getElementById('fontDropdownMenu');
const themeDropdown = document.querySelector('[data-dropdown=\"theme\"]');
const themeDropdownTrigger = document.getElementById('themeDropdownTrigger');
const themeDropdownValue = document.getElementById('themeDropdownValue');
const themeDropdownMenu = document.getElementById('themeDropdownMenu');
const backToDetails = document.getElementById('backToDetails');
const fullscreenToggle = document.getElementById('fullscreenToggle');
const fullscreenText = document.getElementById('fullscreenText');
const immersiveClock = document.getElementById('immersiveClock');
const DEFAULT_TEXT_SIZE = 19;
const MIN_TEXT_SIZE = 17;
const MAX_TEXT_SIZE = 22;
const STEP_TEXT_SIZE = 0.5;

function setTocState(collapsed) {
  toc.classList.toggle('collapsed', collapsed);
  toggle.setAttribute('aria-expanded', String(!collapsed));
}

function applyTextSize(size) {
  const clamped = Math.min(MAX_TEXT_SIZE, Math.max(MIN_TEXT_SIZE, size));
  root.style.setProperty('--chapter-font-size', clamped + 'px');
  try { localStorage.setItem('everloreTextSize', String(clamped)); } catch (e) {}
}

function readSavedTextSize() {
  try {
    const saved = parseFloat(localStorage.getItem('everloreTextSize'));
    return Number.isFinite(saved) ? saved : DEFAULT_TEXT_SIZE;
  } catch (e) {
    return DEFAULT_TEXT_SIZE;
  }
}


const FONT_MAP = {
  lato: '"Lato", "Segoe UI", Arial, sans-serif',
  georgia: 'Georgia, "Times New Roman", serif',
  verdana: 'Verdana, Geneva, sans-serif'
};

function applyReadingFont(key) {
  const safeKey = FONT_MAP[key] ? key : 'lato';
  root.style.setProperty('--chapter-font-family', FONT_MAP[safeKey]);
  if (fontChoice) fontChoice.value = safeKey;
  const labels = {lato:'Lato', georgia:'Georgia', verdana:'Verdana'};
  if (fontDropdownValue) fontDropdownValue.textContent = labels[safeKey];
  markSelectedOption(fontDropdownMenu, safeKey);
  try { localStorage.setItem('everloreReadingFont', safeKey); } catch (e) {}
}

function applyReadingTheme(theme) {
  const safeTheme = ['dark','light','sepia'].includes(theme) ? theme : 'dark';
  reader?.setAttribute('data-reading-theme', safeTheme);
  if (themeChoice) themeChoice.value = safeTheme;
  const labels = {dark:'Sombre', light:'Clair', sepia:'Sépia'};
  if (themeDropdownValue) themeDropdownValue.textContent = labels[safeTheme];
  markSelectedOption(themeDropdownMenu, safeTheme);
  try { localStorage.setItem('everloreReadingTheme', safeTheme); } catch (e) {}
}

function readSavedSetting(key, fallback) {
  try { return localStorage.getItem(key) || fallback; }
  catch (e) { return fallback; }
}

function goBackToDetails() {
  if (history.length > 1) history.back();
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateClock() {
  if (!immersiveClock) return;
  immersiveClock.textContent = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit', minute: '2-digit'
  }).format(new Date());
}

async function toggleFullscreenMode() {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch (e) {
    /* Le bouton reste sans effet si le navigateur refuse le mode plein écran. */
  }
}

function syncFullscreenButton() {
  const active = Boolean(document.fullscreenElement);
  if (!fullscreenToggle) return;
  fullscreenToggle.setAttribute('aria-label', active ? 'Quitter le plein écran' : 'Passer en plein écran');
  fullscreenToggle.title = active ? 'Quitter le plein écran' : 'Plein écran';
  if (fullscreenText) fullscreenText.textContent = active ? 'Réduire' : 'Plein écran';
}

toggle.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  setTocState(!toc.classList.contains('collapsed'));
});

textSmaller?.addEventListener('click', () => {
  const current = parseFloat(getComputedStyle(root).getPropertyValue('--chapter-font-size')) || DEFAULT_TEXT_SIZE;
  applyTextSize(current - STEP_TEXT_SIZE);
});
textReset?.addEventListener('click', () => applyTextSize(DEFAULT_TEXT_SIZE));
textLarger?.addEventListener('click', () => {
  const current = parseFloat(getComputedStyle(root).getPropertyValue('--chapter-font-size')) || DEFAULT_TEXT_SIZE;
  applyTextSize(current + STEP_TEXT_SIZE);
});

applyTextSize(readSavedTextSize());
applyReadingFont(readSavedSetting('everloreReadingFont', 'lato'));
applyReadingTheme(readSavedSetting('everloreReadingTheme', 'dark'));

fontChoice?.addEventListener('change', () => applyReadingFont(fontChoice.value));
themeChoice?.addEventListener('change', () => applyReadingTheme(themeChoice.value));
fontDropdownTrigger?.addEventListener('click', () => toggleEverDropdown(fontDropdown));
themeDropdownTrigger?.addEventListener('click', () => toggleEverDropdown(themeDropdown));
fontDropdownMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.addEventListener('click', () => { applyReadingFont(btn.dataset.value); closeEverDropdown(fontDropdown); }));
themeDropdownMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.addEventListener('click', () => { applyReadingTheme(btn.dataset.value); closeEverDropdown(themeDropdown); }));
backToDetails?.addEventListener('click', goBackToDetails);
fullscreenToggle?.addEventListener('click', toggleFullscreenMode);
document.addEventListener('fullscreenchange', syncFullscreenButton);

/* Échap revient à la fiche uniquement hors plein écran. En plein écran,
   le navigateur garde son comportement normal et quitte d'abord le plein écran. */
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (document.fullscreenElement) return;
  goBackToDetails();
});

updateClock();
setInterval(updateClock, 30000);
syncFullscreenButton();

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'auto', block:'start'});
  });
});


/* ===== Navigation multi-histoires Vampire Academy ===== */
const EVERLORE_STORIES = window.EVERLORE_STORIES;

const storyChoice = document.getElementById('storyChoice');
const storyDropdown = document.querySelector('[data-dropdown=\"story\"]');
const storyDropdownTrigger = document.getElementById('storyDropdownTrigger');
const storyDropdownValue = document.getElementById('storyDropdownValue');
const storyDropdownMenu = document.getElementById('storyDropdownMenu');
const storyPrev = document.getElementById('storyPrev');
const storyNext = document.getElementById('storyNext');
const storyCounter = document.getElementById('storyCounter');
const storyTitle = document.getElementById('storyTitle');
const storyAuthor = document.getElementById('storyAuthor');
const storyStats = document.getElementById('storyStats');
const storyClass = document.getElementById('storyClass');
const storyCharacters = document.getElementById('storyCharacters');
const storySocial = document.getElementById('storySocial');
const storySource = document.getElementById('storySource');
const storySummary = document.getElementById('storySummary');
const storySummaryBlock = document.getElementById('storySummaryBlock');
const summaryToggle = document.getElementById('summaryToggle');
const tocList = document.querySelector('#sommaire .toc-list');
let activeStoryIndex = 0;

EVERLORE_STORIES.forEach((story,index) => {
  const option = document.createElement('option');
  option.value = String(index);
  option.textContent = story.title;
  storyChoice.appendChild(option);
  const customOption = document.createElement('button');
  customOption.type = 'button';
  customOption.className = 'ever-dropdown-option';
  customOption.dataset.value = String(index);
  customOption.setAttribute('role','option');
  customOption.textContent = story.title;
  customOption.addEventListener('click', () => { renderStory(index); closeEverDropdown(storyDropdown); });
  storyDropdownMenu.appendChild(customOption);
});

function closeEverDropdown(dropdown) {
  if (!dropdown) return;
  dropdown.classList.remove('open');
  dropdown.querySelector('.ever-dropdown-trigger')?.setAttribute('aria-expanded','false');
}
function toggleEverDropdown(dropdown) {
  if (!dropdown) return;
  const opening = !dropdown.classList.contains('open');
  document.querySelectorAll('.ever-dropdown.open').forEach(d => closeEverDropdown(d));
  if (opening) {
    dropdown.classList.add('open');
    dropdown.querySelector('.ever-dropdown-trigger')?.setAttribute('aria-expanded','true');
  }
}
function markSelectedOption(menu, value) {
  menu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.setAttribute('aria-selected', String(btn.dataset.value === String(value))));
}
storyDropdownTrigger?.addEventListener('click', () => toggleEverDropdown(storyDropdown));
document.addEventListener('click', (event) => {
  document.querySelectorAll('.ever-dropdown.open').forEach(dropdown => { if (!dropdown.contains(event.target)) closeEverDropdown(dropdown); });
});

function formatSourceLabel(url) {
  try { return new URL(url).hostname.replace(/^www\./,''); }
  catch (e) { return 'source originale'; }
}

function renderStory(index, options = {}) {
  const { keepScroll = false, chapterIndex = null } = options;
  const safeIndex = Math.max(0, Math.min(EVERLORE_STORIES.length - 1, index));
  activeStoryIndex = safeIndex;
  const story = EVERLORE_STORIES[safeIndex];

  document.querySelectorAll('.story-content').forEach((el,i) => { el.hidden = i !== safeIndex; });
  storyChoice.value = String(safeIndex);
  if (storyDropdownValue) storyDropdownValue.textContent = story.title;
  markSelectedOption(storyDropdownMenu, safeIndex);
  storyPrev.disabled = safeIndex === 0;
  storyNext.disabled = safeIndex === EVERLORE_STORIES.length - 1;
  storyCounter.textContent = `${safeIndex + 1} / ${EVERLORE_STORIES.length}`;

  storyTitle.textContent = story.title;
  storyAuthor.textContent = `par ${story.author}`;
  storyStats.textContent = `Chapitres : ${story.chapters} · Mots : ${story.words}`;
  storyClass.textContent = `Classé : ${story.rated} · Langue : ${story.language} · Genre : ${story.genre}`;
  storyCharacters.textContent = `Personnages : ${story.characters}`;
  storySocial.textContent = `Avis : ${story.reviews} · Favoris : ${story.favs} · Abonnés : ${story.follows}`;
  storySource.href = story.source;
  storySource.textContent = `Source originale : ${formatSourceLabel(story.source)}`;
  storySummary.textContent = story.summary;
  document.title = `${story.title} · EverLore`;

  tocList.replaceChildren();
  story.chapterTitles.forEach((chapterTitle,chapterIdx) => {
    const a = document.createElement('a');
    const targetId = `${story.prefix}${chapterIdx + 1}`;
    a.href = `#${targetId}`;
    a.dataset.target = targetId;
    a.textContent = `${chapterIdx + 1}. ${chapterTitle}`;
    a.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById(targetId)?.scrollIntoView({behavior:'auto',block:'start'});
    });
    tocList.appendChild(a);
  });

  if (chapterIndex !== null) {
    const id = `${story.prefix}${chapterIndex}`;
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior:'auto',block:'start'}));
  } else if (!keepScroll) {
    requestAnimationFrame(() => document.getElementById('reader')?.scrollIntoView({behavior:'auto',block:'start'}));
  }
}

storyChoice.addEventListener('change', () => renderStory(Number(storyChoice.value)));
storyPrev.addEventListener('click', () => renderStory(activeStoryIndex - 1));
storyNext.addEventListener('click', () => renderStory(activeStoryIndex + 1));
summaryToggle.addEventListener('click', () => {
  const collapsed = storySummaryBlock.classList.toggle('collapsed');
  summaryToggle.setAttribute('aria-expanded', String(!collapsed));
});

/* Permet à un lien direct #s3-c12 d'activer automatiquement la bonne histoire. */
function activateFromHash() {
  const match = location.hash.match(/^#s(\d+)-c(\d+)$/);
  if (!match) return false;
  const storyIndex = Number(match[1]) - 1;
  const chapterIndex = Number(match[2]);
  if (!EVERLORE_STORIES[storyIndex]) return false;
  renderStory(storyIndex, { keepScroll: true, chapterIndex });
  return true;
}

setTocState(true);
if (!activateFromHash()) renderStory(0, { keepScroll: true });
window.addEventListener('pageshow', () => setTocState(true));
window.addEventListener('hashchange', activateFromHash);


/* ===== bloc suivant ===== */


/* ===== EverLore · langue Originale / Français avec cache local =====
   Le mode Français réutilise une traduction mémorisée localement.
   Pour l'alimenter : traduire la page avec Chrome puis cliquer sur ↧ FR. */
(() => {
  const DB_NAME = 'everloreTranslationCache';
  const DB_VERSION = 1;
  const STORE = 'translations';
  const languageDropdown = document.querySelector('[data-dropdown="language"]');
  const languageTrigger = document.getElementById('languageDropdownTrigger');
  const languageValue = document.getElementById('languageDropdownValue');
  const languageMenu = document.getElementById('languageDropdownMenu');
  const saveButton = document.getElementById('saveFrenchCache');
  const translationCount = document.getElementById('translationCount');
  const toast = document.getElementById('translationToast');
  let languageMode = 'original';
  let toastTimer = 0;

  const originalBodies = new Map();
  document.querySelectorAll('.chapter').forEach(chapter => {
    const clone = chapter.cloneNode(true);
    clone.querySelector('.chapter-nav')?.remove();
    originalBodies.set(chapter.id, clone.innerHTML);
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  function openDb() {
    return new Promise((resolve,reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath:'key' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function keyFor(storySlug, chapterId) { return `${storySlug}::${chapterId}`; }

  function storyData() {
    const story = EVERLORE_STORIES?.[activeStoryIndex];
    const container = document.querySelector(`.story-content[data-story="${story?.slug}"]`);
    return { story, container, chapters: container ? [...container.querySelectorAll('.chapter')] : [] };
  }

  function bodyHtml(chapter) {
    const clone = chapter.cloneNode(true);
    clone.querySelector('.chapter-nav')?.remove();
    return clone.innerHTML;
  }

  function replaceBody(chapter, html) {
    if (!chapter || typeof html !== 'string') return;
    const nav = chapter.querySelector('.chapter-nav')?.cloneNode(true);
    chapter.innerHTML = html;
    if (nav) chapter.appendChild(nav);
  }

  async function getRecord(key) {
    const db = await openDb();
    return new Promise((resolve,reject) => {
      const tx = db.transaction(STORE,'readonly');
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
  }

  async function cachedCount() {
    const {story,chapters} = storyData();
    if (!story) return {count:0,total:0};
    let count = 0;
    for (const chapter of chapters) {
      if (await getRecord(keyFor(story.slug, chapter.id))) count++;
    }
    return {count,total:chapters.length};
  }

  async function refreshCount() {
    try {
      const {count,total} = await cachedCount();
      if (translationCount) translationCount.textContent = `${count}/${total}`;
    } catch (e) {
      if (translationCount) translationCount.textContent = '—';
    }
  }

  async function saveDisplayedFrench() {
    const {story,chapters} = storyData();
    if (!story || !chapters.length) return;
    try {
      const db = await openDb();
      await new Promise((resolve,reject) => {
        const tx = db.transaction(STORE,'readwrite');
        const store = tx.objectStore(STORE);
        const now = Date.now();
        chapters.forEach(chapter => store.put({
          key:keyFor(story.slug,chapter.id),
          storySlug:story.slug,
          chapterId:chapter.id,
          html:bodyHtml(chapter),
          savedAt:now
        }));
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      });
      db.close();
      await refreshCount();
      showToast(`${chapters.length} chapitres mémorisés tels qu'ils sont affichés.`);
    } catch (e) {
      showToast('Impossible de mémoriser la traduction sur cet appareil.');
    }
  }

  async function restoreOriginal() {
    const {chapters} = storyData();
    chapters.forEach(chapter => {
      const html = originalBodies.get(chapter.id);
      if (html) replaceBody(chapter, html);
    });
  }

  async function applyCachedFrench({silent=false}={}) {
    const {story,chapters} = storyData();
    if (!story) return;
    let found = 0;
    for (const chapter of chapters) {
      const record = await getRecord(keyFor(story.slug, chapter.id));
      if (record?.html) { replaceBody(chapter, record.html); found++; }
      else {
        const original = originalBodies.get(chapter.id);
        if (original) replaceBody(chapter, original);
      }
    }
    if (!silent) {
      if (found === 0) showToast('Aucune traduction française mémorisée pour cette histoire. Traduisez-la avec Chrome puis cliquez sur ↧ FR.');
      else if (found < chapters.length) showToast(`${found}/${chapters.length} chapitres français disponibles hors ligne.`);
      else showToast('Traduction française chargée depuis le cache local.');
    }
  }

  function syncLanguageUi(mode) {
    languageMode = mode === 'fr' ? 'fr' : 'original';
    if (languageValue) languageValue.textContent = languageMode === 'fr' ? 'Français' : 'Originale';
    languageMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn =>
      btn.setAttribute('aria-selected', String(btn.dataset.value === languageMode))
    );
    try { localStorage.setItem('everloreLanguageMode', languageMode); } catch (e) {}
  }

  async function applyLanguage(mode,{silent=false}={}) {
    syncLanguageUi(mode);
    if (languageMode === 'fr') await applyCachedFrench({silent});
    else await restoreOriginal();
    await refreshCount();
  }

  languageTrigger?.addEventListener('click', () => toggleEverDropdown(languageDropdown));
  languageMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.addEventListener('click', async () => {
    closeEverDropdown(languageDropdown);
    await applyLanguage(btn.dataset.value);
  }));
  saveButton?.addEventListener('click', saveDisplayedFrench);

  const baseRenderStory = renderStory;
  renderStory = function(...args) {
    const result = baseRenderStory(...args);
    setTimeout(() => { applyLanguage(languageMode,{silent:true}); }, 0);
    return result;
  };

  let savedMode = 'original';
  try { savedMode = localStorage.getItem('everloreLanguageMode') || 'original'; } catch (e) {}
  syncLanguageUi(savedMode);
  applyLanguage(savedMode,{silent:true});

  window.everloreTranslationCache = { saveDisplayedFrench, applyLanguage, refreshCount };
})();


/* ===== bloc suivant ===== */


/* ===== EverLore · passages favoris, chapitres favoris, traductions préférées ===== */
(() => {
  const passageKey = 'everloreFavoritePassages';
  const chapterKey = 'everloreFavoriteChapters';
  const translationKey = 'everlorePreferredTranslations';
  const toolbar = document.getElementById('selectionActions');
  const savePassageBtn = document.getElementById('savePassageSelection');
  const openTranslationBtn = document.getElementById('openTranslationPreference');
  const modal = document.getElementById('translationPrefModal');
  const originalBox = document.getElementById('translationPrefOriginal');
  const prefInput = document.getElementById('translationPrefInput');
  const cancelPref = document.getElementById('translationPrefCancel');
  const savePref = document.getElementById('translationPrefSave');
  let selectedText = '';
  let selectedChapter = null;

  const readJson = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || '') || fallback; } catch (_) { return fallback; }
  };
  const writeJson = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} };
  const toast = (msg) => {
    const node = document.getElementById('translationToast');
    if (!node) return;
    node.textContent = msg;
    node.classList.add('show');
    clearTimeout(node._everTimer);
    node._everTimer = setTimeout(() => node.classList.remove('show'), 2600);
  };
  const currentStory = () => window.EVERLORE_STORIES?.[window.activeStoryIndex] || EVERLORE_STORIES?.[activeStoryIndex] || null;

  function ensureChapterFavoriteButtons() {
    document.querySelectorAll('.chapter').forEach(chapter => {
      const h2 = chapter.querySelector(':scope > h2');
      if (!h2 || h2.querySelector('.chapter-fav-button')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chapter-fav-button notranslate';
      btn.translate = false;
      btn.setAttribute('aria-label','Ajouter ce chapitre aux favoris');
      const story = EVERLORE_STORIES?.[activeStoryIndex];
      const id = `${story?.slug || 'story'}::${chapter.id}`;
      const favs = readJson(chapterKey, {});
      const active = !!favs[id];
      btn.setAttribute('aria-pressed', String(active));
      btn.textContent = active ? '♥' : '♡';
      btn.addEventListener('click', () => {
        const liveStory = EVERLORE_STORIES?.[activeStoryIndex];
        const key = `${liveStory?.slug || 'story'}::${chapter.id}`;
        const data = readJson(chapterKey, {});
        if (data[key]) {
          delete data[key];
          btn.setAttribute('aria-pressed','false');
          btn.textContent='♡';
          toast('Chapitre retiré des favoris.');
        } else {
          data[key] = {
            storySlug: liveStory?.slug || '', storyTitle: liveStory?.title || '',
            chapterId: chapter.id, chapterTitle: h2.childNodes[0]?.textContent?.trim() || h2.textContent.trim(),
            savedAt: Date.now()
          };
          btn.setAttribute('aria-pressed','true');
          btn.textContent='♥';
          toast('Chapitre ajouté aux favoris.');
        }
        writeJson(chapterKey, data);
      });
      h2.appendChild(btn);
    });
  }

  function selectionInChapter() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return null;
    const text = sel.toString().trim();
    if (!text) return null;
    let node = sel.anchorNode;
    if (node?.nodeType === Node.TEXT_NODE) node = node.parentElement;
    const chapter = node?.closest?.('.chapter');
    if (!chapter) return null;
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    return { text, chapter, rect };
  }

  function showSelectionToolbar() {
    const data = selectionInChapter();
    if (!data) { toolbar?.classList.remove('show'); return; }
    selectedText = data.text;
    selectedChapter = data.chapter;
    if (!toolbar) return;
    toolbar.classList.add('show');
    const r = toolbar.getBoundingClientRect();
    const x = Math.min(window.innerWidth - r.width - 8, Math.max(8, data.rect.left + data.rect.width/2 - r.width/2));
    const y = Math.max(8, data.rect.top - r.height - 10);
    toolbar.style.left = `${x}px`;
    toolbar.style.top = `${y}px`;
  }

  document.addEventListener('mouseup', () => setTimeout(showSelectionToolbar, 0));
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift' || e.key.startsWith('Arrow')) setTimeout(showSelectionToolbar,0);
  });
  document.addEventListener('mousedown', (e) => {
    if (!toolbar?.contains(e.target) && !modal?.contains(e.target)) toolbar?.classList.remove('show');
  });
  window.addEventListener('scroll', () => toolbar?.classList.remove('show'), true);

  savePassageBtn?.addEventListener('click', () => {
    if (!selectedText || !selectedChapter) return;
    const story = EVERLORE_STORIES?.[activeStoryIndex];
    const h2 = selectedChapter.querySelector(':scope > h2');
    const entries = readJson(passageKey, []);
    const duplicate = entries.some(x => x.storySlug === story?.slug && x.chapterId === selectedChapter.id && x.text === selectedText);
    if (!duplicate) entries.push({
      storySlug: story?.slug || '', storyTitle: story?.title || '',
      chapterId: selectedChapter.id,
      chapterTitle: h2?.childNodes[0]?.textContent?.trim() || h2?.textContent?.trim() || '',
      text: selectedText,
      language: document.getElementById('languageDropdownValue')?.textContent?.trim() || 'Originale',
      savedAt: Date.now()
    });
    writeJson(passageKey, entries);
    toolbar?.classList.remove('show');
    window.getSelection()?.removeAllRanges();
    toast(duplicate ? 'Ce passage est déjà dans les favoris.' : 'Passage ajouté aux favoris.');
  });

  openTranslationBtn?.addEventListener('click', () => {
    if (!selectedText) return;
    const prefs = readJson(translationKey, {});
    originalBox.textContent = selectedText;
    prefInput.value = prefs[selectedText]?.preferred || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    toolbar?.classList.remove('show');
    setTimeout(() => prefInput.focus(), 0);
  });
  function closeModal() {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden','true');
  }
  cancelPref?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  savePref?.addEventListener('click', () => {
    const preferred = prefInput.value.trim();
    if (!selectedText || !preferred) { toast('Indiquez la traduction préférée.'); return; }
    const prefs = readJson(translationKey, {});
    prefs[selectedText] = { preferred, savedAt: Date.now() };
    writeJson(translationKey, prefs);
    closeModal();
    window.getSelection()?.removeAllRanges();
    toast('Traduction préférée enregistrée.');
  });

  ensureChapterFavoriteButtons();
  const observer = new MutationObserver(() => ensureChapterFavoriteButtons());
  document.querySelectorAll('.story-content').forEach(node => observer.observe(node,{childList:true,subtree:true}));

  window.everloreReadingFavorites = {
    passages: () => readJson(passageKey, []),
    chapters: () => readJson(chapterKey, {}),
    translations: () => readJson(translationKey, {})
  };
})();
