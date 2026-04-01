function createMemeGPTWindow() {
  const win = makeWindow('MemeGPT');
  win.classList.remove('w-96', 'h-64');
  win.classList.add('w-[760px]', 'h-[520px]');
  win.dataset.app = 'memeGPT';

  const content = document.createElement('div');
  content.className = 'content flex h-full flex-col bg-gray-800 text-white font-mono';

  const header = document.createElement('div');
  header.className = 'border-b border-gray-700 bg-gray-900 p-4';
  header.innerHTML = `
    <p class="text-xs uppercase tracking-[0.35em] text-green-400">Totally Real AI</p>
    <div class="mt-2 flex items-center justify-between gap-3">
      <div>
        <h2 class="text-2xl font-black text-white">MemeGPT</h2>
        <p class="text-sm text-gray-300">Fake intelligence. Real confidence. Zero accountability.</p>
      </div>
      <select id="memegpt-mode" class="rounded border border-gray-600 bg-black px-3 py-2 text-sm text-white outline-none">
        <option value="chaos">Chaos Mode</option>
        <option value="study">Exam Panic</option>
        <option value="coder">Code Roast</option>
        <option value="motivator">Sigma Motivation</option>
      </select>
    </div>
  `;

  const chat = document.createElement('div');
  chat.id = 'memegpt-chat';
  chat.className = 'flex-1 space-y-3 overflow-y-auto bg-gray-800 p-4';

  const suggestions = document.createElement('div');
  suggestions.className = 'border-b border-gray-700 bg-gray-900/60 px-4 py-3';
  suggestions.innerHTML = `
    <div class="flex flex-wrap gap-2">
      <button class="memegpt-prompt px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded" data-prompt="how do i survive exams">survive exams</button>
      <button class="memegpt-prompt px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded" data-prompt="rate my code">rate my code</button>
      <button class="memegpt-prompt px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded" data-prompt="give me rizz advice">rizz advice</button>
      <button class="memegpt-prompt px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded" data-prompt="startup idea please">startup idea</button>
    </div>
  `;

  const composer = document.createElement('form');
  composer.className = 'border-t border-gray-700 bg-gray-900 p-4';
  composer.innerHTML = `
    <div class="flex gap-3">
      <input id="memegpt-input" class="flex-1 rounded border border-gray-600 bg-black px-4 py-3 text-white outline-none" placeholder="Ask MemeGPT something cursed..." />
      <button class="rounded border border-white bg-lime-400 px-5 py-3 font-bold text-black">Send</button>
    </div>
    <p class="mt-2 text-xs text-gray-400">Warning: replies may contain overconfidence, misinformation, and unnecessary sigma energy.</p>
  `;

  content.appendChild(header);
  content.appendChild(suggestions);
  content.appendChild(chat);
  content.appendChild(composer);
  win.appendChild(content);

  const input = composer.querySelector('#memegpt-input');
  const modeSelect = header.querySelector('#memegpt-mode');

  function appendBubble(role, text) {
    const bubble = document.createElement('div');
    bubble.className = role === 'user'
      ? 'ml-auto max-w-[78%] rounded border border-cyan-600 bg-cyan-950/40 px-4 py-3 text-sm text-cyan-50'
      : 'max-w-[82%] rounded border border-gray-600 bg-black/70 px-4 py-3 text-sm text-gray-100';
    bubble.innerHTML = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
  }

  function getReply(prompt, mode) {
    const normalized = prompt.toLowerCase();

    const modeReplies = {
      chaos: [
        `Analysis complete. Your idea has <strong>87% meme potential</strong> and <strong>13% risk of summoning a BSOD</strong>. Proceed anyway.`,
        `MemeGPT recommends the ancient strategy known as <strong>"wing it and act confident"</strong>. History shows this works alarmingly often.`,
        `I checked 14 cursed timelines. In 11 of them, you ignored this advice. In all 11, the taskbar judged you.`,
      ],
      study: [
        `Exam survival protocol: 1. Open notes. 2. Panic. 3. Convert panic into momentum. 4. Reward yourself with one deeply undeserved samosa.`,
        `MemeGPT study tip: revise the topics you hate first. Fear is a powerful productivity framework.`,
        `Current academic forecast: if you start now, you are <strong>strategically late</strong>, not doomed.`,
      ],
      coder: [
        `Code review verdict: your bug is not a bug. It is a hidden feature with aggressive side effects.`,
        `Refactor suggestion: remove three hacks, keep the funniest one, and rename the rest to "legacy stability layer".`,
        `I scanned your code aura. Strong creativity. Mild sleep deprivation. Suspicious indentation.`,
      ],
      motivator: [
        `Listen carefully. Lock in. Drink water. Touch code. Ship feature. Become legend. Repeat.`,
        `You do not need permission to build something ridiculous and excellent at the same time.`,
        `Every great meme engineer was once just a person staring at divs with unreasonable confidence.`,
      ],
    };

    if (normalized.includes('exam') || normalized.includes('study')) {
      return `Exam briefing: study the high-weightage topics, stop making aesthetic notes, and remember that panic is not a revision strategy.`;
    }
    if (normalized.includes('rizz')) {
      return `Rizz protocol loaded: be funny, be normal, and never say "are you Wi-Fi?" unless failure is the mission.`;
    }
    if (normalized.includes('bug') || normalized.includes('code')) {
      return `Debugging mantra: reproduce it, isolate it, fix it, and only then type "light work" in the group chat.`;
    }
    if (normalized.includes('startup')) {
      return `Startup idea: <strong>Rent-A-Excuse</strong>. AI-generated explanations for missed deadlines, low attendance, and emotionally unavailable group members. Unicorn by accident.`;
    }

    const pool = modeReplies[mode] || modeReplies.chaos;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  appendBubble('assistant', 'MemeGPT online. Judgment enabled. Accuracy not guaranteed.');

  composer.addEventListener('submit', (event) => {
    event.preventDefault();
    const prompt = input.value.trim();
    if (!prompt) return;

    appendBubble('user', prompt);
    input.value = '';

    const thinking = document.createElement('div');
    thinking.className = 'max-w-[60%] rounded border border-gray-600 bg-black/70 px-4 py-3 text-sm text-gray-400';
    thinking.textContent = 'MemeGPT is pretending to think...';
    chat.appendChild(thinking);
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
      thinking.remove();
      appendBubble('assistant', getReply(prompt, modeSelect.value));
    }, 450);
  });

  suggestions.querySelectorAll('.memegpt-prompt').forEach(button => {
    button.addEventListener('click', () => {
      input.value = button.dataset.prompt || '';
      input.focus();
    });
  });

  setTimeout(() => input.focus(), 0);
  return win;
}

window.apps = window.apps || {};
window.apps.memeGPT = {
  createWindow: createMemeGPTWindow,
  icon: 'js/apps/memegpt-icon.svg'
};
