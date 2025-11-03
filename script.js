// Subtle JS for neon glow pulses and interactive button focus
(function(){
  const neon = document.querySelector('.neon');
  const buttons = Array.from(document.querySelectorAll('.btn'));

  // Slight random pulse offset for neon title
  function pulse(){
    const t = (Math.sin(Date.now()/1200)+1)/2; // 0..1
    neon.style.transform = `scale(${1 + t*0.01})`;
    neon.style.opacity = `${0.92 + t*0.08}`;
    requestAnimationFrame(pulse);
  }
  requestAnimationFrame(pulse);

  // Hover ambient glow on the document body from focused button
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', e=>{
      document.body.style.boxShadow = `inset 0 0 120px 10px rgba(0,255,198,0.02)`;
    });
    btn.addEventListener('mouseleave', e=>{
      document.body.style.boxShadow = 'none';
    });
    btn.addEventListener('click', e=>{
      // Simple feedback animation
      e.currentTarget.animate([
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-6px) scale(0.99)' },
        { transform: 'translateY(0) scale(1)' }
      ], { duration: 260, easing: 'ease-out' });
    });
  });

  // Subtle parallax based on mouse movement to move bg a bit
  const bg = document.querySelector('.bg-layer');
  window.addEventListener('mousemove', (ev)=>{
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    const dx = (ev.clientX - cx)/cx, dy = (ev.clientY - cy)/cy;
    bg.style.transform = `translate(${dx*6}px, ${dy*6}px)`;
  });
})();