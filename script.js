document.addEventListener("mousemove", (e) => {
  const glow = document.querySelector("header h1");
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = (e.clientY / window.innerHeight) * 2 - 1;
  glow.style.textShadow = `${x * 20}px ${y * 20}px 30px #00ffe0`;
});

// Cyber_Links expandable behaviour + copy-to-clipboard
(function(){
  const card = document.getElementById('cyberCard');
  const body = document.getElementById('cyberBody');
  const copyButtons = Array.from(document.querySelectorAll('.copy'));

  function setExpanded(on){
    card.setAttribute('aria-expanded', on ? 'true' : 'false');
    if(on){ body.hidden = false; card.classList.add('open'); }
    else { body.hidden = true; card.classList.remove('open'); }
  }

  // toggle on click / Enter / Space
  card.addEventListener('click', (e) => {
    // ignore clicks on the inner links/buttons
    if(e.target.closest('.btn') || e.target.tagName === 'A') return;
    const expanded = card.getAttribute('aria-expanded') === 'true';
    setExpanded(!expanded);
  });

  card.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const expanded = card.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    } else if(e.key === 'Escape') {
      setExpanded(false);
      card.blur();
    }
  });

  // copy to clipboard with visual feedback
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (ev) => {
      const clip = btn.getAttribute('data-clip') || '';
      try {
        await navigator.clipboard.writeText(clip);
        btn.classList.add('copied');
        btn.textContent = 'Copied';
        setTimeout(()=> { btn.classList.remove('copied'); btn.textContent = 'Copy'; }, 1500);
      } catch (err) {
        // fallback: open prompt to let user copy manually
        const fallback = prompt('Copy this link manually:', clip);
        if(fallback !== null) { /* user interacted */ }
      }
    });
  });

  // ensure initial hidden state accessible
  setExpanded(false);
})();

