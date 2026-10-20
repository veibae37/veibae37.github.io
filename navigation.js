// Open the appropriate nested disclosure for shared project/reference URLs.
function revealHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  const chain = [];
  for (let node = target; node; node = node.parentElement) {
    if (node.tagName === 'DETAILS') chain.push(node);
  }
  chain.reverse().forEach(node => { node.open = true; });
  if (id === 'veibaequant') target.querySelector('.quant-menu').open = true;
  requestAnimationFrame(() => target.scrollIntoView({block: 'start'}));
}
window.addEventListener('hashchange', revealHash);
document.addEventListener('click', event => {
  const anchor = event.target.closest('a[href^="#"]');
  if (anchor && anchor.hash === location.hash) revealHash();
});
revealHash();

const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
function updateThemeControl() {
  const dark = document.documentElement.dataset.theme === 'dark';
  const label = dark ? 'Switch to light mode' : 'Switch to night mode';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  themeColor.content = dark ? '#121014' : '#b91c1c';
}
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch (error) {}
  updateThemeControl();
});
updateThemeControl();

const readingProgress = document.querySelector('.reading-progress');
let progressPending = false;
function updateReadingProgress() {
  if (progressPending) return;
  progressPending = true;
  requestAnimationFrame(() => {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
    readingProgress.style.transform = `scaleX(${progress})`;
    progressPending = false;
  });
}
window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);
new ResizeObserver(updateReadingProgress).observe(document.body);
updateReadingProgress();
