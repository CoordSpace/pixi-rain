PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  autoResize: true,
  resolution: devicePixelRatio,
});
document.body.appendChild(app.view);

let numframes, numdrops, speed, scale;
let frames = [];

fetch("./assets/anim.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Work with JSON data here
    numframes = data.numframes;
    numdrops = data.numdrops;
    speed = data.speed;
    scale = data.scale;

    for (let i = 1; i <= numframes; i++) {
      frames.push("assets/" + i + ".png");
    }
    app.loader.add(frames).load(onAssetsLoaded);
  })
  .catch((err) => {
    console.log("FETCH ERROR!");
  });

function onAssetsLoaded() {
  // this is where we create the raindrops
  for (let i = 0; i < numdrops; i++) {
    const anim = new PIXI.AnimatedSprite.fromFrames(frames);
    // darken it so it's not so bright
    anim.tint = 0x808080;
    // move the anchor to the middle of the sprite
    anim.anchor.set(0.6, 0.3);
    // start the rain scattered all around
    anim.x = Math.random() * app.screen.width;
    anim.y = Math.random() * app.screen.height;
    // embiggen thusly
    anim.scale.set(scale);
    // slow those drops down
    anim.animationSpeed = speed;
    // offset the starting frame
    anim.gotoAndPlay(Math.random() * 27);
    // when the loop ends, move it somewhere else randomly then let it loop once there
    anim.onLoop = function () {
      anim.x = Math.random() * app.screen.width;
      anim.y = Math.random() * app.screen.height;
    };
    app.stage.addChild(anim);
  }

  // Listen for window resize events
  window.addEventListener("resize", resize);
  // Resize function window
  function resize() {
    // Resize the renderer
    app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  resize();
}
