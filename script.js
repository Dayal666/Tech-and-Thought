document.addEventListener("mousemove", (e) => {
  const glow = document.querySelector("header h1");
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = (e.clientY / window.innerHeight) * 2 - 1;
  glow.style.textShadow = `${x * 20}px ${y * 20}px 30px #00ffe0`;
});
