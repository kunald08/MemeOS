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
    '[ OK ] Mounting cursed meme partitions',
    '[ OK ] Syncing terminal sarcasm engine',
    '[ OK ] Checking taskbar emotional stability',
    '[WARN] Based meter calibration drifting toward chaos',
    '[ OK ] Loading premium nonsense drivers',
    '[ OK ] Connecting to local rizz fabric',
    '[ OK ] Boot sequence complete. Damage acceptable',
  ];

  let lineIndex = 0;
  let progress = 0;

  function finishBoot() {
    bootStatus.textContent = 'Boot complete. Handing control to user...';
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
    'Password check disabled. Confidence check enabled.',
    'Hint: literally anything works. MemeOS trusts vibes.',
    'Security level: dramatic, not practical.',
    'This login is here for cinema.',
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
