(() => {
  const loading = document.getElementById('everloreLoading');
  const stories = window.EVERLORE_STORIES || [];

  function fail(message, error) {
    console.error('EverLore loading error', error || message);
    if (loading) {
      loading.textContent = message;
      loading.style.color = "#e0a6b3";
    }
  }

  if (!stories.length) {
    fail("Impossible de charger le catalogue.");
    return;
  }

  function clampIndex(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(stories.length - 1, Math.trunc(n)));
  }

  function requestedIndex() {
    try {
      const hashMatch = location.hash.match(/^#s(\d+)-c\d+$/);
      if (hashMatch) return clampIndex(Number(hashMatch[1]) - 1);

      const params = new URLSearchParams(location.search);
      if (params.has('story')) return clampIndex(params.get('story'));

      const saved = localStorage.getItem('everloreLastStoryIndex');
      if (saved !== null) return clampIndex(saved);
    } catch (e) {}
    return 0;
  }

  const index = requestedIndex();
  const story = stories[index];
  window.EVERLORE_INITIAL_STORY_INDEX = index;
  window.EVERLORE_LOADED_STORY_SLUG = story.slug;
  window.EVERLORE_STORY_HTML = window.EVERLORE_STORY_HTML || {};

  function startApp() {
    const fragment = window.EVERLORE_STORY_HTML[story.slug];
    if (!fragment) {
      fail("Impossible de charger cette histoire.");
      return;
    }

    const mount = document.getElementById('storyMount');
    mount.innerHTML = fragment;
    loading?.remove();

    const app = document.createElement('script');
    app.src = './app.js';
    app.defer = false;
    app.onerror = () => fail("Impossible de démarrer EverLore.");
    document.body.appendChild(app);
  }

  const storyScript = document.createElement('script');
  storyScript.src = './' + story.scriptPath;
  storyScript.onload = startApp;
  storyScript.onerror = () => fail("Impossible de charger l’histoire sélectionnée.");
  document.body.appendChild(storyScript);
})();
