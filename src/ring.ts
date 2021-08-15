import p5 from 'p5';

const maxNoise = 5;

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

  constructor(sketchRef: p5, radius = 100, centerX = innerWidth / 2, centerY = innerHeight / 2) {
    this.p = sketchRef;
    this.r = radius;
    this.x = centerX;
    this.y = centerY;
    this.offsets = this.generateOffsets(51);
  }

  draw(p: p5 = this.p) { // p is a reference to the sketch (canvas)
    // p.ellipse(this.x, this.y, this.r);
    // generate circle from points
    p.beginShape();
    const arcPerPoint = Math.PI * 2 / (this.offsets.length - 1);
    for (let i = 0; i < this.offsets.length; i++) {
      const point = calculatePoint(this.x, this.y, this.r, i * arcPerPoint, this.offsets[i]);
      p.vertex(point.x, point.y)
    }
    // for (let i = -1; i <= 11; i++) {
    //   const point = calculatePoint(this.x, this.y, this.r, i * (Math.PI / 5));
    //   p.curveVertex(point.x, point.y)
    // }
    p.endShape();
  }

  changeSize(diff = 1) {
    this.r += diff;
  }

  generateOffsets(amount: number, noiseOffset = 0): number[] {
    const offsets: number[] = [];
    const arcPerPoint = Math.PI * 2 / (amount - 1);

    for (let i = 0; i < amount; i++) {
      const xoff = this.p.map(Math.cos(i * arcPerPoint), -1, 1, 0, maxNoise) +
        this.p.map(Math.cos(noiseOffset), -1, 1, 0, maxNoise);
      const yoff = this.p.map(Math.sin(i * arcPerPoint), -1, 1, 0, maxNoise) +
        this.p.map(Math.sin(noiseOffset), -1, 1, 0, maxNoise);
      offsets.push(this.p.map(this.p.noise(xoff, yoff), 0, 1, 100, 200));
    }

    return offsets;
  }
}

function calculatePoint(centerX: number,
  centerY: number,
  radius: number,
  angle: number,
  offset = 0
): point {
  const r = radius + offset;
  return {
    x: centerX + Math.cos(angle) * r,
    y: centerY + Math.sin(angle) * r
  };
}

export default Ring;