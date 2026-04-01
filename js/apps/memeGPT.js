function createMemeGPTWindow() {
  const win = makeWindow('MemeGPT');
  win.classList.remove('w-96', 'h-64');
  win.classList.add('w-[820px]', 'h-[560px]');
  win.dataset.app = 'memeGPT';

  const content = document.createElement('div');
  content.className = 'content flex h-full flex-col bg-slate-950 text-white';

  const header = document.createElement('div');
  header.className = 'border-b border-cyan-500/20 bg-slate-900/80 p-4';
  header.innerHTML = `
    <p class="text-xs uppercase tracking-[0.35em] text-cyan-300">MemeOS Intelligence Layer</p>
    <div class="mt-2 flex items-center justify-between gap-3">
      <div>
        <h2 class="text-2xl font-black text-white">MemeGPT</h2>
        <p class="text-sm text-slate-300">Half oracle, half chaos goblin, fully unqualified.</p>
      </div>
      <select id="memegpt-mode" class="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none">
        <option value="chaos">Chaos Mode</option>
        <option value="study">Exam Panic</option>
        <option value="coder">Code Roast</option>
        <option value="motivator">Sigma Motivation</option>
      </select>
    </div>
  `;

  const chat = document.createElement('div');
  chat.id = 'memegpt-chat';
  chat.className = 'flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_36%)] p-4';

  const composer = document.createElement('form');
  composer.className = 'border-t border-white/10 bg-slate-900/90 p-4';
  composer.innerHTML = `
    <div class="flex gap-3">
      <input id="memegpt-input" class="flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400" placeholder="Ask MemeGPT something cursed..." />
      <button class="rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-5 py-3 font-bold text-slate-950">Send</button>
    </div>
    <p class="mt-2 text-xs text-slate-400">Try: "how to survive exams", "rate my code", "give me a startup idea", "help me rizz".</p>
  `;

  content.appendChild(header);
  content.appendChild(chat);
  content.appendChild(composer);
  win.appendChild(content);

  const input = composer.querySelector('#memegpt-input');
  const modeSelect = header.querySelector('#memegpt-mode');

  function appendBubble(role, text) {
    const bubble = document.createElement('div');
    bubble.className = role === 'user'
      ? 'ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-cyan-500/20 px-4 py-3 text-sm text-cyan-50'
      : 'max-w-[82%] rounded-2xl rounded-bl-md border border-fuchsia-400/20 bg-slate-900/95 px-4 py-3 text-sm text-slate-100 shadow-lg shadow-fuchsia-500/5';
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
      return `Emergency academic briefing: focus on the <strong>high-weightage topics</strong>, stop decorating notes, and remember that caffeine is not a substitute for revision.`;
    }
    if (normalized.includes('rizz')) {
      return `Rizz protocol loaded: be funny, be normal, and under no circumstances open with "hey queen, are you Wi-Fi?" unless your goal is failure.`;
    }
    if (normalized.includes('bug') || normalized.includes('code')) {
      return `Debugging mantra: reproduce it, isolate it, fix it, and only then post "light work" in the group chat.`;
    }
    if (normalized.includes('startup')) {
      return `Startup idea: <strong>Rent-A-Excuse</strong>. AI-generated explanations for missed deadlines, low attendance, and emotionally unavailable group members. Unicorn by accident.`;
    }

    const pool = modeReplies[mode] || modeReplies.chaos;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  appendBubble('assistant', 'MemeGPT online. Ask anything. Judgment is enabled by default.');

  composer.addEventListener('submit', (event) => {
    event.preventDefault();
    const prompt = input.value.trim();
    if (!prompt) return;

    appendBubble('user', prompt);
    input.value = '';

    const thinking = document.createElement('div');
    thinking.className = 'max-w-[60%] rounded-2xl rounded-bl-md border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-400';
    thinking.textContent = 'MemeGPT is consulting the council of chaos...';
    chat.appendChild(thinking);
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
      thinking.remove();
      appendBubble('assistant', getReply(prompt, modeSelect.value));
    }, 450);
  });

  setTimeout(() => input.focus(), 0);
  return win;
}

window.apps = window.apps || {};
window.apps.memeGPT = {
  createWindow: createMemeGPTWindow,
  icon: 'js/apps/memegpt-icon.svg'
};
