export function jackpotEvent() {
    let particles = [];
    const colors = ["#fed128", "#bca83c", "#fa1c16", "#fcefc5"];
  
    function pop() {
      const numParticles = 1000;
      for (let i = 0; i < numParticles; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.x = Math.random() * window.innerWidth;
        p.y = Math.random() * (window.innerHeight * 0.5); // Adjusted to be within the top half of the screen
        p.vel = {
          x: (Math.random() - 0.5) * 20,
          y: -Math.random() * 40 - 20,
        };
        p.mass = Math.random() * 0.2 + 0.8;
        p.life = Math.random() * 100 + 100;
  
        p.style.position = "fixed"; // Position fixed to stay on top of other content
        p.style.left = `${p.x}px`;
        p.style.top = `${p.y}px`;
        p.style.width = `${Math.random() * 30 + 10}px`;
        p.style.height = `${Math.random() * 30 + 10}px`;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.zIndex = "9999"; // Set a high z-index to ensure it's on top
  
        document.body.appendChild(p);
        particles.push(p);
      }
      animateParticles();
    }
  
    function animateParticles() {
      particles.forEach((p, index) => {
        moveParticle(p, index);
      });
    }
  
    function moveParticle(p, index) {
      p.style.transform = `translate3d(${p.x}px, ${p.y}px, 1px) rotate(${p.life * 3}deg) scale(${p.life / 150})`;
      p.style.opacity = Math.max(p.life / 150, 0.1);
  
      p.x += p.vel.x;
      p.y += p.vel.y;
  
      p.vel.y += 0.5 * p.mass;
      p.life -= 0.5;
  
      if (p.life <= 0 || p.y > window.innerHeight) {
        p.remove();
        particles.splice(index, 1);
      } else {
        requestAnimationFrame(() => moveParticle(p, index));
      }
    }
  
    // 적절한 시점에 파티클을 제거하도록 수정
    function clearParticles() {
      particles.forEach((p) => {
        p.remove();
      });
      particles = [];
    }
  
    // requestAnimationFrame을 사용하여 화면에 남은 파티클을 감지
    function checkParticles() {
      if (particles.length > 0) {
        requestAnimationFrame(checkParticles);
      } else {
        clearParticles();
      }
    }
  
    requestAnimationFrame(() => setTimeout(checkParticles, 3000)); // 3초 후에 checkParticles 함수 실행
  
    pop();
  }
  