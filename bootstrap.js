(async () => {
  const loading = document.getElementById('everloreLoading');
  try {
    const response = await fetch('./stories/catalog.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`catalogue ${response.status}`);
    const stories = await response.json();
    window.EVERLORE_STORIES = stories;

    const mount = document.getElementById('storyMount');
    const fragments = await Promise.all(stories.map(async (story) => {
      const r = await fetch('./' + story.path);
      if (!r.ok) throw new Error(`${story.title}: ${r.status}`);
      return await r.text();
    }));
    mount.innerHTML = fragments.join('\n');
    loading?.remove();

    const app = document.createElement('script');
    app.src = './app.js';
    app.defer = false;
    document.body.appendChild(app);
  } catch (error) {
    console.error('EverLore loading error', error);
    if (loading) loading.textContent = "Impossible de charger la bibliothèque. Recharge la page quand la connexion est disponible.";
  }
})();
