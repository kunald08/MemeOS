//* MemeOS Desktop & Window Manager */

window.MemeOS = {
    state: {
        quarantinedThreats: new Set(),
        lastWindowPosition: { top: 5, left: 20 },
        windowOffset: 30
    }
};

const desktop = document.getElementById('desktop');
const taskbar = document.getElementById('taskbar');
const taskbarApps = document.getElementById('taskbar-apps');
const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');
const startMenuApps = document.getElementById('start-menu-apps');
const startMenuClose = document.getElementById('start-menu-close');
const taskbarClock = document.getElementById('taskbar-clock');
let zIndexCounter = 10;

function openApp(app, params = {}) {
  console.log(`[Desktop] Attempting to open app: "${app}"`);
  const existing = document.querySelector(`.window[data-app="${app}"]:not(.incognito)`);
  if (existing && !params.incognito) {
    console.log(`[Desktop] App "${app}" is already open. Focusing window.`);
    focusWindow(existing);
    return;
  }

  if (window.apps && window.apps[app]) {
    console.log(`[Desktop] App "${app}" found in registry. Creating window...`);
    try {
        const win = window.apps[app].createWindow(params);
        console.log(`[Desktop] Window for "${app}" created successfully.`);

        // Add to DOM to measure dimensions, but keep it hidden while we position it
        win.style.visibility = 'hidden';
        desktop.appendChild(win);
        const winWidth = win.offsetWidth;
        const winHeight = win.offsetHeight;

        // Add cascading position logic
        const { top, left } = window.MemeOS.state.lastWindowPosition;
        const offset = window.MemeOS.state.windowOffset;
        const desktopHeight = desktop.clientHeight;
        const desktopWidth = desktop.clientWidth;

        let newTop = top + offset;
        let newLeft = left + offset;

        // Reset cascade if the new window would go off-screen
        if (newLeft + winWidth > desktopWidth || newTop + winHeight > desktopHeight) {
            newTop = 5;
            newLeft = 20;
        }

        win.style.top = `${newTop}px`;
        win.style.left = `${newLeft}px`;
        win.style.visibility = 'visible'; // Make it visible now that it's positioned

        window.MemeOS.state.lastWindowPosition = { top: newTop, left: newLeft };

        taskbarAdd(app, win);
        focusWindow(win);
        console.log(`[Desktop] App "${app}" window added to desktop and focused.`);
    } catch (e) {
        console.error(`[Desktop] Error creating window for app "${app}":`, e);
        alert(`Could not open ${app}. Check the console for errors.`);
    }
  } else {
    console.error(`[Desktop] App "${app}" not found in registry.`);
    console.log('[Desktop] Available apps:', window.apps);
    alert(`App "${app}" is not registered correctly.`);
  }
}

function taskbarAdd(app, win) {
  const btn = document.createElement('button');
  const label = window.apps?.[app]?.name || app;
  btn.textContent = label;
  btn.className = 'taskbar-app-button px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg';
  btn.onclick = () => {
    if (document.body.contains(win)) {
      focusWindow(win);
      hideStartMenu();
      return;
    }
    btn.remove();
  };
  win.addEventListener('close', () => btn.remove());
  taskbarApps.appendChild(btn);
}

function focusWindow(win) {
  zIndexCounter++;
  win.style.zIndex = zIndexCounter;
  win.classList.remove('opacity-70');
  document.querySelectorAll('.window').forEach(w => {
    if (w !== win) w.classList.add('opacity-70');
  });
}

// Basic drag implementation
let dragData = null;

desktop.addEventListener('mousedown', e => {
  const win = e.target.closest('.window');
  if (!win) return; // Exit if not clicking on a window

  // Always bring window to front on any click
  focusWindow(win);

  // Only initiate drag if the titlebar was clicked
  if (e.target.classList.contains('titlebar')) {
    dragData = {
      win,
      offsetX: e.clientX - win.offsetLeft,
      offsetY: e.clientY - win.offsetTop
    };
  }
});

desktop.addEventListener('mousemove', e => {
  if (!dragData) return;
  dragData.win.style.left = `${e.clientX - dragData.offsetX}px`;
  dragData.win.style.top  = `${e.clientY - dragData.offsetY}px`;
});

desktop.addEventListener('mouseup', () => dragData = null);

// Expose globally for other modules and add listeners for desktop icons
window.openApp = openApp;
window.focusWindow = focusWindow;

function hideStartMenu() {
  if (!startMenu || !startButton) return;
  startMenu.classList.add('hidden');
  startButton.classList.remove('active');
}

function toggleStartMenu() {
  if (!startMenu || !startButton) return;
  const shouldShow = startMenu.classList.contains('hidden');
  if (shouldShow) {
    startMenu.classList.remove('hidden');
    startButton.classList.add('active');
  } else {
    hideStartMenu();
  }
}

function buildStartMenu() {
  if (!startMenuApps) return;
  const icons = Array.from(document.querySelectorAll('.desktop-icon[data-app]'));
  const pinnedOrder = [
    'terminal',
    'barnacle-browser',
    'memeGPT',
    'taskManager',
    'passwordSpinner',
    'among-us-sus',
    'rizzAI',
    'basedMeter',
  ];
  const pinnedIcons = [
    ...pinnedOrder
      .map(app => icons.find(icon => icon.dataset.app === app))
      .filter(Boolean),
    ...icons.filter(icon => !pinnedOrder.includes(icon.dataset.app)),
  ];
  startMenuApps.innerHTML = '';

  pinnedIcons.slice(0, 10).forEach(icon => {
    const app = icon.dataset.app;
    const label = icon.querySelector('span')?.textContent?.trim() || app;
    const imgSrc = icon.querySelector('img')?.getAttribute('src') || '';
    const button = document.createElement('button');
    button.className = 'start-menu-app-item';
    button.innerHTML = `
      <img src="${imgSrc}" alt="${label}">
      <div>
        <strong>${label}</strong>
        <span>Launch into chaos</span>
      </div>
    `;
    button.addEventListener('click', () => {
      openApp(app);
      hideStartMenu();
    });
    startMenuApps.appendChild(button);
  });
}

function updateClock() {
  if (!taskbarClock) return;
  const now = new Date();
  taskbarClock.innerHTML = `
    <div>${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    <div class="text-[10px] text-slate-400">${now.toLocaleDateString()}</div>
  `;
}

function showDesktopNotification(title, body) {
  const note = document.createElement('div');
  note.className = 'fixed right-4 bottom-16 z-[1300] w-[300px] rounded-2xl border border-cyan-400/20 bg-slate-950/95 p-4 text-white shadow-2xl';
  note.innerHTML = `
    <p class="text-xs uppercase tracking-[0.3em] text-cyan-300">${title}</p>
    <p class="mt-2 text-sm text-slate-200">${body}</p>
  `;
  document.body.appendChild(note);

  setTimeout(() => {
    note.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    note.style.opacity = '0';
    note.style.transform = 'translateY(12px)';
    setTimeout(() => note.remove(), 260);
  }, 2600);
}

document.addEventListener('DOMContentLoaded', () => {
    // Desktop Icon Listeners
    document.querySelectorAll('.desktop-icon[data-app]').forEach(icon => {
        icon.onclick = () => openApp(icon.dataset.app);
    });

    buildStartMenu();
    updateClock();
    setInterval(updateClock, 1000);

    startButton?.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleStartMenu();
    });

    startMenuClose?.addEventListener('click', hideStartMenu);

    startMenu?.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    document.querySelectorAll('.start-action-btn').forEach(button => {
      button.addEventListener('click', () => {
        const action = button.dataset.startAction;
        hideStartMenu();

        if (action === 'lock') {
          const loginScreen = document.getElementById('login-screen');
          loginScreen?.classList.remove('hidden');
          loginScreen?.classList.add('flex');
          document.getElementById('login-password')?.focus();
          return;
        }

        if (action === 'reboot') {
          location.reload();
          return;
        }

        if (action === 'chaos') {
          showDesktopNotification('Chaos Activated', 'MemeOS has approved reckless productivity.');
        }
      });
    });
});

document.addEventListener('click', hideStartMenu);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideStartMenu();
  }
});

document.addEventListener('memeos:login', () => {
  showDesktopNotification('Session Ready', 'Welcome back to MemeOS. Stability remains optional.');
});
