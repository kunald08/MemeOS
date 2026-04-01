function createReadmeWindow() {
  const win = makeWindow('Read me please!');
  win.style.width = '900px';
  win.style.height = '520px';
  win.dataset.app = 'readme';
  const content = document.createElement('div');
  content.className = 'p-4 text-lg text-white font-mono';
  content.style.color = 'white';
  content.style.whiteSpace = 'pre-wrap';
  content.style.wordWrap = 'break-word';
  const message = `Welcome to MemeOS.\n\nThis build is the chaos lab of Kunald08: a fake desktop packed with joke apps, cursed interactions, hidden surprises, and just enough instability to stay funny.\n\nA few things to try:\n- Open the terminal and mess with the fake commands.\n- Explore the desktop apps and see which ones fight back.\n- Type the Konami code on the desktop for a hidden unlock.\n- Do not trust anything that says "don't click me".\n\nThis project is still evolving, so if something feels weird... that might be the feature.\n\nBuilt by:\nKunald08`;
  const instagramLink = `
<br><br>
Instagram: <a href="https://www.instagram.com/kunald08" target="_blank" class="text-blue-500 hover:underline">@kunald08</a>
`;
  content.innerHTML = message + instagramLink;
  win.appendChild(content);
  return win;
}
window.apps = window.apps || {};
window.apps.readme = {
  createWindow: createReadmeWindow
};
