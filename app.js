
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
const readingSettingsZone = document.getElementById('readingSettingsZone');
const readingSettingsToggle = document.getElementById('readingSettingsToggle');
const readingSettingsPanel = document.getElementById('readingSettingsPanel');
const floatingTextSmaller = document.getElementById('floatingTextSmaller');
const floatingTextReset = document.getElementById('floatingTextReset');
const floatingTextLarger = document.getElementById('floatingTextLarger');
const floatingTextSizeValue = document.getElementById('floatingTextSizeValue');
const floatingFontDropdown = document.querySelector('[data-dropdown="floating-font"]');
const floatingFontDropdownTrigger = document.getElementById('floatingFontDropdownTrigger');
const floatingFontDropdownValue = document.getElementById('floatingFontDropdownValue');
const floatingFontDropdownMenu = document.getElementById('floatingFontDropdownMenu');
const floatingThemeDropdown = document.querySelector('[data-dropdown="floating-theme"]');
const floatingThemeDropdownTrigger = document.getElementById('floatingThemeDropdownTrigger');
const floatingThemeDropdownValue = document.getElementById('floatingThemeDropdownValue');
const floatingThemeDropdownMenu = document.getElementById('floatingThemeDropdownMenu');
const backgroundChoice = document.getElementById('backgroundChoice');
const backgroundDropdown = document.querySelector('[data-dropdown="background"]');
const backgroundDropdownTrigger = document.getElementById('backgroundDropdownTrigger');
const backgroundDropdownValue = document.getElementById('backgroundDropdownValue');
const backgroundDropdownMenu = document.getElementById('backgroundDropdownMenu');
const floatingBackgroundDropdown = document.querySelector('[data-dropdown="floating-background"]');
const floatingBackgroundDropdownTrigger = document.getElementById('floatingBackgroundDropdownTrigger');
const floatingBackgroundDropdownValue = document.getElementById('floatingBackgroundDropdownValue');
const floatingBackgroundDropdownMenu = document.getElementById('floatingBackgroundDropdownMenu');
const floatingWeightControls = document.getElementById('floatingWeightControls');
const floatingTextToneControls = document.getElementById('floatingTextToneControls');
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
  if (floatingTextSizeValue) floatingTextSizeValue.textContent = clamped + ' px';
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
  inter: '"Inter", "Segoe UI", Arial, sans-serif',
  opensans: '"Open Sans", "Segoe UI", Arial, sans-serif',
  georgia: 'Georgia, "Times New Roman", serif',
  verdana: 'Verdana, Geneva, sans-serif'
};

function applyReadingFont(key) {
  const safeKey = FONT_MAP[key] ? key : 'lato';
  const labels = {lato:'Lato', inter:'Inter', opensans:'Open Sans', georgia:'Georgia', verdana:'Verdana'};
  root.style.setProperty('--chapter-font-family', FONT_MAP[safeKey]);
  if (fontChoice) fontChoice.value = safeKey;
  if (fontDropdownValue) fontDropdownValue.textContent = labels[safeKey];
  markSelectedOption(fontDropdownMenu, safeKey);
  if (floatingFontDropdownValue) floatingFontDropdownValue.textContent = labels[safeKey];
  markSelectedOption(floatingFontDropdownMenu, safeKey);
  try { localStorage.setItem('everloreReadingFont', safeKey); } catch (e) {}
}

function applyReadingTheme(theme) {
  const safeTheme = ['dark','light','sepia'].includes(theme) ? theme : 'dark';
  const labels = {dark:'Sombre', light:'Clair', sepia:'Sépia'};
  reader?.setAttribute('data-reading-theme', safeTheme);
  document.body.setAttribute('data-everlore-reading-mode', safeTheme);
  if (themeChoice) themeChoice.value = safeTheme;
  if (themeDropdownValue) themeDropdownValue.textContent = labels[safeTheme];
  markSelectedOption(themeDropdownMenu, safeTheme);
  if (floatingThemeDropdownValue) floatingThemeDropdownValue.textContent = labels[safeTheme];
  markSelectedOption(floatingThemeDropdownMenu, safeTheme);
  try { localStorage.setItem('everloreReadingTheme', safeTheme); } catch (e) {}
}

function applyReadingBackground(background) {
  const safeBackground = ['amethyst','wildnight'].includes(background) ? background : 'amethyst';
  const labels = {amethyst:'Améthyste Nocturne', wildnight:'Nuit Sauvage'};
  document.body.setAttribute('data-everlore-background', safeBackground === 'wildnight' ? 'wildnight' : 'default');
  if (backgroundChoice) backgroundChoice.value = safeBackground;
  if (backgroundDropdownValue) backgroundDropdownValue.textContent = labels[safeBackground];
  markSelectedOption(backgroundDropdownMenu, safeBackground);
  if (floatingBackgroundDropdownValue) floatingBackgroundDropdownValue.textContent = labels[safeBackground];
  markSelectedOption(floatingBackgroundDropdownMenu, safeBackground);
  try { localStorage.setItem('everloreReadingBackground', safeBackground); } catch (e) {}
}

function readSavedSetting(key, fallback) {
  try { return localStorage.getItem(key) || fallback; }
  catch (e) { return fallback; }
}

const READING_WEIGHTS = ['400','500','600'];

function applyReadingWeight(weight) {
  const safeWeight = READING_WEIGHTS.includes(String(weight)) ? String(weight) : '500';
  root.style.setProperty('--chapter-font-weight', safeWeight);
  floatingWeightControls?.querySelectorAll('[data-weight]').forEach(btn => {
    const active = btn.dataset.weight === safeWeight;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  try { localStorage.setItem('everloreReadingWeight', safeWeight); } catch (e) {}
}

const READING_TEXT_TONES = ['soft','normal','bright','night'];

function applyReadingTextTone(tone) {
  const safeTone = READING_TEXT_TONES.includes(String(tone)) ? String(tone) : 'normal';
  document.body.setAttribute('data-everlore-text-tone', safeTone);
  floatingTextToneControls?.querySelectorAll('[data-tone]').forEach(btn => {
    const active = btn.dataset.tone === safeTone;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  try { localStorage.setItem('everloreReadingTextTone', safeTone); } catch (e) {}
}


function setReadingSettingsOpen(open) {
  if (!readingSettingsZone || !readingSettingsToggle || !readingSettingsPanel) return;
  readingSettingsZone.classList.toggle('is-open', open);
  readingSettingsToggle.setAttribute('aria-expanded', String(open));
  readingSettingsPanel.setAttribute('aria-hidden', String(!open));
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
applyReadingWeight(readSavedSetting('everloreReadingWeight', '500'));
applyReadingTextTone(readSavedSetting('everloreReadingTextTone', 'normal'));

const legacyThemeSetting = readSavedSetting('everloreReadingTheme', 'dark');
const initialMode = ['dark','light','sepia'].includes(legacyThemeSetting) ? legacyThemeSetting : 'dark';
let initialBackground = readSavedSetting('everloreReadingBackground', '');
if (!['amethyst','wildnight'].includes(initialBackground)) {
  initialBackground = legacyThemeSetting === 'wildnight' ? 'wildnight' : 'amethyst';
}
applyReadingTheme(initialMode);
applyReadingBackground(initialBackground);

fontChoice?.addEventListener('change', () => applyReadingFont(fontChoice.value));
themeChoice?.addEventListener('change', () => applyReadingTheme(themeChoice.value));
fontDropdownTrigger?.addEventListener('click', () => toggleEverDropdown(fontDropdown));
themeDropdownTrigger?.addEventListener('click', () => toggleEverDropdown(themeDropdown));
fontDropdownMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.addEventListener('click', () => { applyReadingFont(btn.dataset.value); closeEverDropdown(fontDropdown); }));
themeDropdownMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.addEventListener('click', () => { applyReadingTheme(btn.dataset.value); closeEverDropdown(themeDropdown); }));
backgroundDropdownTrigger?.addEventListener('click', () => toggleEverDropdown(backgroundDropdown));
backgroundDropdownMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.addEventListener('click', () => { applyReadingBackground(btn.dataset.value); closeEverDropdown(backgroundDropdown); }));

floatingFontDropdownTrigger?.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleEverDropdown(floatingFontDropdown);
});
floatingFontDropdownMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.addEventListener('click', (event) => {
  event.stopPropagation();
  applyReadingFont(btn.dataset.value);
  closeEverDropdown(floatingFontDropdown);
}));

floatingThemeDropdownTrigger?.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleEverDropdown(floatingThemeDropdown);
});
floatingThemeDropdownMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.addEventListener('click', (event) => {
  event.stopPropagation();
  applyReadingTheme(btn.dataset.value);
  closeEverDropdown(floatingThemeDropdown);
}));

floatingBackgroundDropdownTrigger?.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleEverDropdown(floatingBackgroundDropdown);
});
floatingBackgroundDropdownMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.addEventListener('click', (event) => {
  event.stopPropagation();
  applyReadingBackground(btn.dataset.value);
  closeEverDropdown(floatingBackgroundDropdown);
}));


readingSettingsToggle?.addEventListener('click', (event) => {
  event.stopPropagation();
  setReadingSettingsOpen(!readingSettingsZone.classList.contains('is-open'));
});
readingSettingsPanel?.addEventListener('click', event => event.stopPropagation());

floatingTextSmaller?.addEventListener('click', () => {
  const current = parseFloat(getComputedStyle(root).getPropertyValue('--chapter-font-size')) || DEFAULT_TEXT_SIZE;
  applyTextSize(current - STEP_TEXT_SIZE);
});
floatingTextReset?.addEventListener('click', () => applyTextSize(DEFAULT_TEXT_SIZE));
floatingTextLarger?.addEventListener('click', () => {
  const current = parseFloat(getComputedStyle(root).getPropertyValue('--chapter-font-size')) || DEFAULT_TEXT_SIZE;
  applyTextSize(current + STEP_TEXT_SIZE);
});



floatingWeightControls?.querySelectorAll('[data-weight]').forEach(btn => {
  btn.addEventListener('click', () => applyReadingWeight(btn.dataset.weight));
});

floatingTextToneControls?.querySelectorAll('[data-tone]').forEach(btn => {
  btn.addEventListener('click', () => applyReadingTextTone(btn.dataset.tone));
});

document.addEventListener('click', () => setReadingSettingsOpen(false));
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
let activeStoryIndex = Number.isInteger(window.EVERLORE_INITIAL_STORY_INDEX) ? window.EVERLORE_INITIAL_STORY_INDEX : 0;

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
  const story = EVERLORE_STORIES[safeIndex];
  const loadedNode = document.querySelector(`.story-content[data-story="${story.slug}"]`);

  if (!loadedNode) {
    try { localStorage.setItem('everloreLastStoryIndex', String(safeIndex)); } catch (e) {}
    const url = new URL(window.location.href);
    url.searchParams.set('story', String(safeIndex));
    if (chapterIndex !== null) {
      url.hash = `#${story.prefix}${chapterIndex}`;
    } else {
      url.hash = '';
    }
    window.location.href = url.href;
    return;
  }

  activeStoryIndex = safeIndex;
  try { localStorage.setItem('everloreLastStoryIndex', String(safeIndex)); } catch (e) {}

  document.querySelectorAll('.story-content').forEach(el => { el.hidden = el !== loadedNode; });
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
      try { history.replaceState(null, '', `#${targetId}`); } catch (e) {}
      updateCurrentChapterHighlight();
    });
    tocList.appendChild(a);
  });

  updateCurrentChapterHighlight();

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

function updateCurrentChapterHighlight() {
  const story = EVERLORE_STORIES?.[activeStoryIndex];
  if (!story) return;
  let currentId = '';
  const hashMatch = location.hash.match(/^#(s\d+-c\d+)$/);
  if (hashMatch) currentId = hashMatch[1];

  tocList?.querySelectorAll('a').forEach(a => {
    a.classList.toggle('is-current', Boolean(currentId) && a.dataset.target === currentId);
  });
}

window.addEventListener('hashchange', updateCurrentChapterHighlight);

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
if (!activateFromHash()) renderStory(activeStoryIndex, { keepScroll: true });
window.addEventListener('pageshow', () => setTocState(true));
window.addEventListener('hashchange', activateFromHash);


/* ===== bloc suivant ===== */


/* ===== EverLore · traduction progressive optimisée V24.8 =====
   Objectif : ne jamais bloquer l'interface.
   - MutationObserver léger : il marque seulement les chapitres modifiés.
   - Analyse/sauvegarde différée et séquentielle.
   - Aucun clonage lourd dans le callback MutationObserver.
   - FR actif visible immédiatement.
*/
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
  let mutationObserver = null;
  let ignoreMutationsUntil = 0;
  let refreshTimer = 0;
  let processingDirty = false;
  let dirtyTimer = 0;

  const dirtyChapterIds = new Set();
  const originalBodies = new Map();
  const originalTexts = new Map();
  const lastSavedFingerprints = new Map();

  const FR_WORDS = new Set([
    'le','la','les','un','une','des','de','du','au','aux','et','ou','mais','donc','or','ni','car',
    'je','tu','il','elle','nous','vous','ils','elles','me','te','se','mon','ma','mes','ton','ta','tes',
    'son','sa','ses','notre','votre','leur','leurs','ce','cet','cette','ces','ça','cela','qui','que',
    'quoi','dont','où','dans','sur','sous','avec','sans','pour','par','vers','chez','entre','avant',
    'après','plus','moins','très','pas','ne','est','était','étaient','suis','sommes','sont','avait',
    'avaient','a','ai','avons','ont','comme','quand','alors','tout','tous','toute','toutes'
  ]);

  const EN_WORDS = new Set([
    'the','a','an','and','or','but','so','because','i','you','he','she','we','they','me','him','her',
    'us','them','my','your','his','our','their','this','that','these','those','who','what','where',
    'when','which','in','on','at','to','from','with','without','for','by','before','after','more',
    'less','very','not','is','was','were','am','are','be','been','had','have','has','do','did',
    'does','as','all','every','could','would','should','will','just','into','out','up','down'
  ]);

  function cleanClone(chapter) {
    const clone = chapter.cloneNode(true);
    clone.querySelectorAll('.chapter-nav, .chapter-fav-button').forEach(node => node.remove());
    return clone;
  }

  function normalizeText(text) {
    return String(text || '').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
  }

  function chapterText(chapter) {
    return normalizeText(cleanClone(chapter).textContent);
  }

  function chapterHtml(chapter) {
    return cleanClone(chapter).innerHTML;
  }

  function textFingerprint(text) {
    const t = normalizeText(text);
    let hash = 2166136261;
    for (let i = 0; i < t.length; i += Math.max(1, Math.floor(t.length / 600))) {
      hash ^= t.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `${t.length}:${hash >>> 0}`;
  }

  document.querySelectorAll('.chapter').forEach(chapter => {
    const clone = cleanClone(chapter);
    const text = normalizeText(clone.textContent);
    originalBodies.set(chapter.id, clone.innerHTML);
    originalTexts.set(chapter.id, text);
  });

  function languageSignals(text) {
    const words = normalizeText(text).toLowerCase().match(/[a-zàâçéèêëîïôûùüÿñæœ'-]+/g) || [];
    let fr = 0, en = 0;
    for (const word of words) {
      if (FR_WORDS.has(word)) fr++;
      if (EN_WORDS.has(word)) en++;
    }
    return {words:words.length, fr, en};
  }

  function looksFrench(text) {
    const {words,fr,en} = languageSignals(text);
    if (words < 20) return fr >= 3 && fr > en;
    return fr >= 5 && fr >= en * 1.18;
  }

  function isTranslatedFrench(chapterId, text) {
    const current = normalizeText(text);
    const original = originalTexts.get(chapterId) || '';
    return Boolean(current && current !== original && looksFrench(current));
  }

  function textFromHtml(html) {
    const holder = document.createElement('div');
    holder.innerHTML = String(html || '');
    holder.querySelectorAll('.chapter-nav, .chapter-fav-button').forEach(node => node.remove());
    return normalizeText(holder.textContent);
  }

  function isValidFrenchRecord(record) {
    return Boolean(record?.chapterId && record?.html &&
      isTranslatedFrench(record.chapterId, textFromHtml(record.html)));
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function openDb() {
    return new Promise((resolve,reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE,{keyPath:'key'});
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function keyFor(storySlug, chapterId) {
    return `${storySlug}::${chapterId}`;
  }

  function storyData() {
    const story = EVERLORE_STORIES?.[activeStoryIndex];
    const container = document.querySelector(`.story-content[data-story="${story?.slug}"]`);
    return {story, container, chapters: container ? [...container.querySelectorAll('.chapter')] : []};
  }

  async function getAllRecords() {
    const db = await openDb();
    return new Promise((resolve,reject) => {
      const tx = db.transaction(STORE,'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
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

  async function putRecord(record) {
    const db = await openDb();
    await new Promise((resolve,reject) => {
      const tx = db.transaction(STORE,'readwrite');
      tx.objectStore(STORE).put(record);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
    db.close();
  }

  async function validRecordsForCurrentStory() {
    const {story} = storyData();
    if (!story) return new Map();
    const records = await getAllRecords();
    const valid = new Map();
    for (const record of records) {
      if (record.storySlug === story.slug && isValidFrenchRecord(record)) {
        valid.set(record.chapterId, record);
        lastSavedFingerprints.set(record.chapterId, textFingerprint(textFromHtml(record.html)));
      }
    }
    return valid;
  }

  async function refreshCount() {
    try {
      const {story,chapters} = storyData();
      if (!story) return;
      const valid = await validRecordsForCurrentStory();
      const count = chapters.filter(ch => valid.has(ch.id)).length;
      const total = chapters.length;

      if (translationCount) {
        translationCount.textContent = `${count}/${total}`;
        translationCount.classList.toggle('is-complete', total > 0 && count === total);
        translationCount.classList.toggle('is-partial', count > 0 && count < total);
      }

      if (saveButton) {
        const active = languageMode === 'fr';
        saveButton.classList.toggle('is-fr-active', active);
        saveButton.classList.toggle('is-fr-complete', active && total > 0 && count === total);
        saveButton.setAttribute('aria-pressed', String(active));
        saveButton.textContent = active ? (count === total && total > 0 ? 'FR ✓' : 'FR ●') : '↧ FR';
      }
    } catch (_) {
      if (translationCount) translationCount.textContent = '—';
    }
  }

  function scheduleRefresh() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refreshCount, 600);
  }

  async function saveChapterIfFrench(chapter) {
    const {story} = storyData();
    if (!story || !chapter?.id) return false;

    const text = chapterText(chapter);
    if (!isTranslatedFrench(chapter.id, text)) return false;

    const fingerprint = textFingerprint(text);
    if (lastSavedFingerprints.get(chapter.id) === fingerprint) return false;

    const html = chapterHtml(chapter);
    await putRecord({
      key:keyFor(story.slug, chapter.id),
      storySlug:story.slug,
      chapterId:chapter.id,
      html,
      detectedLanguage:'fr',
      detectionVersion:2,
      savedAt:Date.now()
    });

    lastSavedFingerprints.set(chapter.id, fingerprint);
    scheduleRefresh();
    return true;
  }

  function markChapterDirty(chapterId) {
    if (!chapterId || languageMode !== 'fr') return;
    dirtyChapterIds.add(chapterId);
    scheduleDirtyProcessing();
  }

  function scheduleDirtyProcessing() {
    if (processingDirty) return;
    clearTimeout(dirtyTimer);
    dirtyTimer = setTimeout(processDirtyQueue, 1200);
  }

  async function processDirtyQueue() {
    if (processingDirty || languageMode !== 'fr') return;
    processingDirty = true;

    try {
      while (dirtyChapterIds.size && languageMode === 'fr') {
        const chapterId = dirtyChapterIds.values().next().value;
        dirtyChapterIds.delete(chapterId);
        const chapter = document.getElementById(chapterId);
        if (chapter) {
          try { await saveChapterIfFrench(chapter); } catch (_) {}
        }
        // Rend la main au navigateur entre deux chapitres.
        await new Promise(resolve => setTimeout(resolve, 80));
      }
    } finally {
      processingDirty = false;
      if (dirtyChapterIds.size) scheduleDirtyProcessing();
    }
  }

  function chapterIdFromMutation(mutation) {
    let node = mutation.target;
    if (node?.nodeType === Node.TEXT_NODE) node = node.parentElement;
    const direct = node?.closest?.('.chapter');
    if (direct?.id) return direct.id;

    for (const added of mutation.addedNodes || []) {
      const el = added.nodeType === Node.ELEMENT_NODE ? added : added.parentElement;
      const chapter = el?.closest?.('.chapter');
      if (chapter?.id) return chapter.id;
    }
    return '';
  }

  function startProgressiveObserver() {
    mutationObserver?.disconnect();
    const {container} = storyData();
    if (!container) return;

    mutationObserver = new MutationObserver(mutations => {
      if (languageMode !== 'fr' || Date.now() < ignoreMutationsUntil) return;
      for (const mutation of mutations) {
        const chapterId = chapterIdFromMutation(mutation);
        if (chapterId) dirtyChapterIds.add(chapterId);
      }
      if (dirtyChapterIds.size) scheduleDirtyProcessing();
    });

    mutationObserver.observe(container,{
      subtree:true,
      childList:true,
      characterData:true
    });
  }

  function replaceBody(chapter, html) {
    if (!chapter || typeof html !== 'string') return;
    const nav = chapter.querySelector('.chapter-nav')?.cloneNode(true);
    ignoreMutationsUntil = Date.now() + 900;
    chapter.innerHTML = html;
    if (nav) chapter.appendChild(nav);
  }

  async function restoreOriginal() {
    const {chapters} = storyData();
    dirtyChapterIds.clear();
    ignoreMutationsUntil = Date.now() + 900;
    for (const chapter of chapters) {
      const html = originalBodies.get(chapter.id);
      if (html) replaceBody(chapter,html);
    }
  }

  async function applyCachedFrench({silent=false}={}) {
    const {story,chapters} = storyData();
    if (!story) return;

    const valid = await validRecordsForCurrentStory();
    let found = 0;
    ignoreMutationsUntil = Date.now() + 900;

    for (const chapter of chapters) {
      const record = valid.get(chapter.id);
      if (record?.html) {
        replaceBody(chapter,record.html);
        found++;
      } else {
        const original = originalBodies.get(chapter.id);
        if (original) replaceBody(chapter,original);
      }
    }

    if (!silent) {
      if (!found) showToast("Aucune traduction française valide mémorisée pour l'instant.");
      else if (found < chapters.length) showToast(`${found}/${chapters.length} chapitres français chargés.`);
      else showToast("Traduction française complète chargée.");
    }
  }

  async function manualRescan() {
    const {chapters} = storyData();
    let saved = 0;
    for (const chapter of chapters) {
      try {
        if (await saveChapterIfFrench(chapter)) saved++;
      } catch (_) {}
      await new Promise(resolve => setTimeout(resolve, 60));
    }
    await refreshCount();
    showToast(saved ? `${saved} chapitre${saved > 1 ? 's' : ''} français mis à jour.` : "Aucune nouvelle traduction française détectée.");
  }

  function syncLanguageUi(mode) {
    languageMode = mode === 'fr' ? 'fr' : 'original';
    if (languageValue) languageValue.textContent = languageMode === 'fr' ? 'Français' : 'Originale';
    languageMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn =>
      btn.setAttribute('aria-selected', String(btn.dataset.value === languageMode))
    );
    if (saveButton) {
      const active = languageMode === 'fr';
      saveButton.classList.toggle('is-fr-active',active);
      saveButton.setAttribute('aria-pressed',String(active));
      saveButton.textContent = active ? 'FR ●' : '↧ FR';
    }
    try { localStorage.setItem('everloreLanguageMode',languageMode); } catch (_) {}
  }

  async function applyLanguage(mode,{silent=false}={}) {
    syncLanguageUi(mode);
    if (languageMode === 'fr') await applyCachedFrench({silent});
    else await restoreOriginal();
    await refreshCount();
    startProgressiveObserver();
  }

  languageTrigger?.addEventListener('click', () => toggleEverDropdown(languageDropdown));
  languageMenu?.querySelectorAll('.ever-dropdown-option').forEach(btn => btn.addEventListener('click', async () => {
    closeEverDropdown(languageDropdown);
    await applyLanguage(btn.dataset.value);
  }));

  saveButton?.addEventListener('click', manualRescan);

  const baseRenderStory = renderStory;
  renderStory = function(...args) {
    const result = baseRenderStory(...args);
    setTimeout(async () => {
      await applyLanguage(languageMode,{silent:true});
      startProgressiveObserver();
    },0);
    return result;
  };

  let savedMode = 'original';
  try { savedMode = localStorage.getItem('everloreLanguageMode') || 'original'; } catch (_) {}
  syncLanguageUi(savedMode);
  applyLanguage(savedMode,{silent:true});

  window.everloreTranslationCache = {
    applyLanguage,
    refreshCount,
    rescan:manualRescan
  };
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
