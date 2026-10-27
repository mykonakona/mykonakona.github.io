(() => {
  const root = document.documentElement;
  const appearance = window.simpleDaisyAppearance;
  const themeToggles = document.querySelectorAll('[data-theme-choice]');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'simple-daisy-theme';
  const isMode = (mode) => mode === 'light' || mode === 'dark';
  const normalizeMode = (value) => isMode(value) ? value
    : value === appearance.light ? 'light' : value === appearance.dark ? 'dark' : null;
  const preferredMode = () => systemTheme.matches ? 'dark' : 'light';
  const commentHosts = document.querySelectorAll('[data-giscus]');
  const observedFrames = new WeakSet();
  let savedMode;

  try {
    savedMode = normalizeMode(localStorage.getItem(storageKey));
  } catch (error) {
    console.warn('Unable to read the saved color theme.', error);
  }

  const commentTheme = () => getComputedStyle(root).colorScheme === 'dark' ? 'dark' : 'light';

  const syncComments = () => {
    commentHosts.forEach((host) => {
      const theme = commentTheme();
      host.querySelector('script')?.setAttribute('data-theme', theme);
      host.querySelectorAll('iframe.giscus-frame').forEach((frame) => {
        if (!observedFrames.has(frame)) {
          observedFrames.add(frame);
          // A lazy iframe may finish loading after several theme changes.
          frame.addEventListener('load', syncComments);
        }
        frame.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
      });
    });
  };

  const applyMode = (mode) => {
    root.dataset.theme = appearance[mode];
    themeToggles.forEach((button) => {
      const selected = button.dataset.themeChoice === mode;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('btn-active', selected);
    });
    syncComments();
  };

  themeToggles.forEach((button) => {
    button.addEventListener('click', () => {
      const nextMode = button.dataset.themeChoice;
      if (!isMode(nextMode)) return;
      savedMode = nextMode;
      applyMode(nextMode);

      try {
        localStorage.setItem(storageKey, nextMode);
      } catch (error) {
        console.warn('Unable to save the selected color theme.', error);
      }
    });
  });

  applyMode(savedMode || preferredMode());

  systemTheme.addEventListener('change', (event) => {
    if (!savedMode) applyMode(event.matches ? 'dark' : 'light');
  });
  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    savedMode = normalizeMode(event.newValue);
    applyMode(savedMode || preferredMode());
  });

  commentHosts.forEach((host) => {
    const observer = new MutationObserver(syncComments);
    observer.observe(host, { childList: true, subtree: true });
    const script = document.createElement('script');
    Array.from(host.attributes).forEach(({ name, value }) => {
      if (name.startsWith('data-') && name !== 'data-giscus') script.setAttribute(name, value);
    });
    script.dataset.theme = commentTheme();
    script.src = 'https://giscus.app/client.js';
    script.crossOrigin = 'anonymous';
    script.async = true;
    host.append(script);
  });

  const menu = document.querySelector('.mobile-menu');
  const menuTrigger = menu?.querySelector('summary');
  if (menu) {
    const closeMenu = (restoreFocus = false) => {
      if (!menu.open) return;
      menu.open = false;
      if (restoreFocus) menuTrigger.focus();
    };
    menu.addEventListener('toggle', () => {
      menuTrigger.setAttribute('aria-label', menu.open ? '关闭导航菜单' : '打开导航菜单');
    });
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target)) closeMenu();
      else if (event.target.closest('a[href]')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        event.preventDefault();
        closeMenu(true);
      }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });
  }

  document.querySelectorAll('.post-content table, .post-excerpt table').forEach((table) => {
    if (table.parentElement.classList.contains('table-scroll')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', '表格，可横向滚动');
    table.before(wrapper);
    wrapper.append(table);
  });
})();
