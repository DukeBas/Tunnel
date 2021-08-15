import p5 from 'p5';

type point = {
  x: number,
  y: number,
}

class Ring {
  r: number;  // radius
  // coordinates for center
  x: number;
  y: number;

  constructor(radius = 100, centerX = innerWidth / 2, centerY = innerHeight / 2) {
    this.r = radius;
    this.x = centerX;
    this.y = centerY;
  }

  draw(p: p5) { // p is a reference to the sketch (canvas)
    // p.ellipse(this.x, this.y, this.r);

    // generate circle from points
    p.beginShape();
    for (let i = -1; i <= 11; i++) {
      const point = calculatePoint(this.x, this.y, this.r, i * (Math.PI / 5));
      p.curveVertex(point.x, point.y)
    }
    p.endShape();
  }

  changeSize(diff = 1) {
    this.r += diff;
  }
}

function calculatePoint(centerX: number,
  centerY: number,
  radius: number,
  angle: number,
  // offset = 0
): point {
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius
  };
}

export default Ring;