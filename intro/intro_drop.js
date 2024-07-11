const splitWords = () => {
  const textNode = document.querySelector(".intro_text");
  const text = textNode.textContent;
  const newDomElements = text.split(" ").map((text) => {
    const highlighted =
      text.startsWith(`강사님`) ||
      text.startsWith(`미래연봉은`) ||
      text.startsWith(`100만원`);
    return `<span class="word ${
      highlighted ? "highlighted" : null
    }">${text}</span>`;
  });
  textNode.innerHTML = newDomElements.join("");
};

const renderCanvas = () => {
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Bodies = Matter.Bodies;
  const Runner = Matter.Runner;
  const params = {
    isStatic: true,
    render: {
      fillStyle: "transparent",
    },
  };
  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const engine = Engine.create({});

  const render = Render.create({
    element: document.body,
    engine: engine,
    canvas: document.getElementById("matterCanvas"),
    options: {
      ...canvasSize,
      background: "transparent",
      wireframes: false,
    },
  });
  const floor = Bodies.rectangle(
    canvasSize.width / 2,
    canvasSize.height,
    canvasSize.width,
    5,
    params
  );
  const wall1 = Bodies.rectangle(
    0,
    canvasSize.height / 2,
    50,
    canvasSize.height,
    params
  );
  const wall2 = Bodies.rectangle(
    canvasSize.width,
    canvasSize.height / 2,
    50,
    canvasSize.height,
    params
  );
  const top = Bodies.rectangle(
    canvasSize.width / 2,
    0,
    canvasSize.width,
    50,
    params
  );
  const wordElements = document.querySelectorAll(".word");
  const wordBodies = [...wordElements].map((elemRef) => {
    const width = elemRef.offsetWidth;
    const height = elemRef.offsetHeight;

    const initialVelocityX = Math.random() * 2 - 1; // 범위: -1에서 1 사이의 랜덤 값
    const initialVelocityY = Math.random() * 2 + 1; // 범위: 1에서 3 사이의 랜덤 값
    const initialAngle = Math.random() * Math.PI * 0.5; // 0에서 2π(360도) 사이의 랜덤 각도

    return {
      body: Matter.Bodies.rectangle(canvasSize.width / 2, 0, width, height, {
        render: {
          fillStyle: "transparent",
        },
        velocity: {
          x: initialVelocityX,
          y: initialVelocityY,
        },
        angle: initialAngle,
      }),
      elem: elemRef,
      render() {
        const { x, y } = this.body.position;
        this.elem.style.top = `${y - 20}px`;
        this.elem.style.left = `${x - width / 2}px`;
        this.elem.style.transform = `rotate(${this.body.angle}rad)`;
      },
    };
  });


  World.add(engine.world, [
    floor,
    ...wordBodies.map((box) => box.body),
    wall1,
    wall2,
    top
  ]);
  render.mouose = null;
  Runner.run(engine);
  Render.run(render);

  (function rerender() {
    wordBodies.forEach((element) => {
      element.render();
    });
    Matter.Engine.update(engine);
    requestAnimationFrame(rerender);
  })();

  //3초 후에 intro_click 나타내기
  setTimeout(() => {
    document.querySelector(".intro_click").style.display = "block";
  }, 3000);

  document.addEventListener("click", (event) => {
    const introClick = document.querySelector(".intro_click");
    const mainSection = document.querySelector(".main");
    if (introClick.style.display === "block") {
      World.remove(engine.world, [floor, wall1, wall2]);
      wordBodies.forEach((word) => {
        Matter.Body.setStatic(word.body, false);
      });
      introClick.style.opacity = "0";
      mainSection.style.top = "0";
    }
  });
};

window.addEventListener("DOMContentLoaded", (event) => {
  splitWords();
  renderCanvas();
});
