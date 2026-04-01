document.addEventListener('DOMContentLoaded', () => {
  const bootScreen = document.getElementById('boot-screen');
  const bootLog = document.getElementById('boot-log');
  const bootProgressBar = document.getElementById('boot-progress-bar');
  const bootStatus = document.getElementById('boot-status');
  const loginScreen = document.getElementById('login-screen');
  const loginButton = document.getElementById('login-button');
  const loginPassword = document.getElementById('login-password');
  const loginHint = document.getElementById('login-hint');

  const bootLines = [
    'Checking meme reserves.............OK',
    'Loading skibidi defense layer......OK',
    'Starting rizz calibration..........OK',
    'Warning: cringe levels unstable',
    'Loading desktop nonsense...........OK',
    'Summoning taskbar..................OK',
    'System ready. Consequences pending',
  ];

  let lineIndex = 0;
  let progress = 0;

  function finishBoot() {
    bootStatus.textContent = 'Boot complete. Preparing suspicious login screen...';
    setTimeout(() => {
      bootScreen.classList.add('hidden');
      loginScreen.classList.remove('hidden');
      loginScreen.classList.add('flex');
      loginPassword.focus();
    }, 650);
  }

  const bootInterval = setInterval(() => {
    if (lineIndex < bootLines.length) {
      bootLog.textContent += `${bootLines[lineIndex]}\n`;
      bootLog.scrollTop = bootLog.scrollHeight;
      lineIndex++;
    }

    progress = Math.min(100, progress + 16);
    bootProgressBar.style.width = `${progress}%`;
    bootStatus.textContent = progress >= 100 ? 'Finalizing meme subsystems...' : `Boot progress ${progress}%`;

    if (progress >= 100) {
      clearInterval(bootInterval);
      finishBoot();
    }
  }, 360);

  const hints = [
    'Password check disabled. Vibe check enabled.',
    'Hint: literally anything works.',
    'Security level: fake but loud.',
    'This login exists for meme reasons.',
  ];

  function enterDesktop() {
    loginScreen.classList.add('hidden');
    loginScreen.classList.remove('flex');
    loginPassword.value = '';
    document.dispatchEvent(new CustomEvent('memeos:login'));
  }

  loginButton.addEventListener('click', enterDesktop);

  loginPassword.addEventListener('input', () => {
    loginHint.textContent = hints[Math.floor(Math.random() * hints.length)];
  });

  loginPassword.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      enterDesktop();
    }
  });
});
