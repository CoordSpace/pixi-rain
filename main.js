PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    autoResize: true,
    resolution: devicePixelRatio
});
document.body.appendChild(app.view);

app.loader
    .add("assets/rain.json")
    .load(onAssetsLoaded);

function onAssetsLoaded() {
    // create an array of textures from an image path
    let sheet = app.loader.resources["assets/rain.json"].spritesheet;

    // this is where we create the raindrops
    let numdrops = 25;
    for (let i = 0; i < numdrops; i++) {
        const anim = new PIXI.AnimatedSprite(sheet.animations["rain"]);
        // darken it so it's not so bright
        anim.tint = 0x808080;
        // move the anchor to the middle of the sprite
        anim.anchor.set(0.6,0.3);
        // start the rain scattered all around
        anim.x = Math.random() * app.screen.width;
        anim.y = Math.random() * app.screen.height;
        // embiggen thusly
        anim.scale.set(4);
        // slow those drops down
        anim.animationSpeed = 0.6;
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
    window.addEventListener('resize', resize);
    // Resize function window
    function resize() {
        // Resize the renderer
        app.renderer.resize(window.innerWidth, window.innerHeight);

        // You can use the 'screen' property as the renderer visible
        // area, this is more useful than view.width/height because
        // it handles resolution
        rect.position.set(app.screen.width, app.screen.height);
    }

    resize();
}
