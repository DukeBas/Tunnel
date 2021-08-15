import p5 from 'p5';
import Ring from './ring';

const sketch = (p: p5) => {
  const rings: Ring[] = [];

  p.preload = () => { };

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.disableFriendlyErrors = true; // disable friendly errors for increased performance

    // canvas settings
    canvas.position(0, 0);  // make canvas start in top-left corner
    canvas.style('z-index', '-1');  // set canvas as background
    p.frameRate(60);  // target framerate

    // drawing settings
    p.strokeWeight(2);
    p.stroke(255);
    p.noFill();

    rings.push(new Ring(p));
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);

    rings.forEach((r) => {
      r.draw();
      r.changeSize(Math.pow(r.timesDrawn,2) /5000);
      if (!r.valid) {
        rings.splice(rings.indexOf(r), 1)
      }
    });

    if (p.frameCount % 20 === 0) {
      rings.push(new Ring(p, rings.length));
    }
  }

  // set functions as global functions
  window.saveCanvas = () => p.saveCanvas('canvas', 'png');
  window.windowResized = p.windowResized;
};

const sketchP = new p5(sketch);
