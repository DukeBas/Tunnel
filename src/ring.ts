import p5 from 'p5';

const maxNoise = 7;
const offsetStrength = 0.2;
const noiseStepDivisor = 25;

const maxDrawLoops = 1000;

type point = {
  x: number,
  y: number,
}

class Ring {
  p: p5;  // sketch reference
  r: number;  // radius

  // coordinates for center
  x: number;
  y: number;

  offsets: number[] = [];

  timesDrawn = 0;

  constructor(sketchRef: p5,
    serial = 0, // how many rings came before, used for noise offsets
    radius = 5,
    centerX = innerWidth / 2,
    centerY = innerHeight / 2) {
    this.p = sketchRef;
    this.r = radius;
    this.x = centerX;
    this.y = centerY;
    this.offsets = this.generateOffsets(51, serial);
  }

  draw(p: p5 = this.p) { // p is a reference to the sketch (canvas)
    // p.ellipse(this.x, this.y, this.r);
    
    p.stroke(255, this.timesDrawn/3)


    // generate circle from points
    p.beginShape();
    const arcPerPoint = Math.PI * 2 / (this.offsets.length - 1);
    for (let i = 0; i < this.offsets.length; i++) {
      const point = calculatePoint(this.x, this.y, this.r, i * arcPerPoint, this.offsets[i]);
      p.vertex(point.x, point.y)
    }
    p.endShape();

    this.timesDrawn++;
  }

  changeSize(diff = 1) {
    this.r += diff;
  }

  generateOffsets(amount: number, noiseOffset = 0): number[] {
    const offsets: number[] = [];
    const arcPerPoint = Math.PI * 2 / (amount - 1);

    for (let i = 0; i < amount; i++) {
      const xoff = this.p.map(Math.cos(i * arcPerPoint), -1, 1, 0, maxNoise) +
        this.p.map(Math.cos(noiseOffset / noiseStepDivisor), -1, 1, 0, maxNoise);
      const yoff = this.p.map(Math.sin(i * arcPerPoint), -1, 1, 0, maxNoise) +
        this.p.map(Math.sin(noiseOffset / noiseStepDivisor), -1, 1, 0, maxNoise);
      offsets.push(this.p.map(this.p.noise(xoff, yoff), 0, 1, -1, 1));
    }

    return offsets;
  }

  // determines
  get valid() {
    return this.timesDrawn < maxDrawLoops;
  }
}

function calculatePoint(centerX: number,
  centerY: number,
  radius: number,
  angle: number,
  offset = 0
): point {
  const r = radius + offsetStrength * radius * offset;
  return {
    x: centerX + Math.cos(angle) * r,
    y: centerY + Math.sin(angle) * r
  };
}

export default Ring;