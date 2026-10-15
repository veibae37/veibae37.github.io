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
