(() => {
  const root = document.documentElement;
  const themeToggles = document.querySelectorAll('[data-theme-choice]');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'simple-daisy-theme';
  const isTheme = (theme) => theme === 'corporate' || theme === 'black';
  const commentHosts = document.querySelectorAll('[data-giscus]');
  const observedFrames = new WeakSet();
  let savedTheme;

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (error) {
    console.warn('Unable to read the saved color theme.', error);
  }

  const commentTheme = () => root.dataset.theme === 'black' ? 'dark' : 'light';

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

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    themeToggles.forEach((button) => {
      const selected = button.dataset.themeChoice === theme;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('btn-active', selected);
    });
    syncComments();
  };

  themeToggles.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = button.dataset.themeChoice;
      if (!isTheme(nextTheme)) return;
      savedTheme = nextTheme;
      applyTheme(nextTheme);

      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        console.warn('Unable to save the selected color theme.', error);
      }
    });
  });

  applyTheme(isTheme(savedTheme) ? savedTheme : systemTheme.matches ? 'black' : 'corporate');

  systemTheme.addEventListener('change', (event) => {
    if (!isTheme(savedTheme)) applyTheme(event.matches ? 'black' : 'corporate');
  });
  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    savedTheme = event.newValue;
    applyTheme(isTheme(savedTheme) ? savedTheme : systemTheme.matches ? 'black' : 'corporate');
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
