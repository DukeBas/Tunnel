import p5 from 'p5';

class Ring {
  r: number;  // radius
  // coordinates for center
  x: number;
  y: number;
  
  constructor(radius= 110, centerX = innerWidth/2, centerY = innerHeight/2){
    this.r = radius;
    this.x = centerX;
    this.y = centerY;
  }

  draw(p: p5){ // p is a reference to the sketch (canvas)
    p.ellipse(this.x, this.y, this.r);
  }

  changeSize(diff = 1){
    this.r += diff;
  }
}

export default Ring;