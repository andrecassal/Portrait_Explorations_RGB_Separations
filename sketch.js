/* eslint-disable no-undef, no-unused-vars */

let grid;
let img;
let canvas;

let dots = [];
const blk = 30;
const brush = blk * 0.95;

function preload() {
  img = loadImage("mona.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  background(255);

  img.resize(0, 50);

  grid = new Grid();
  grid.setImage(img);
  grid.blk = blk;
  grid.render();

  noLoop();
}

class Grid {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = width;
    this.h = height;
    this.blk = 40;
    this.data = [];
    this.scl = 1;
    this.z = 0.05;
    this.xl = this.w / this.blk;
    this.yl = this.h / this.blk;
  }
  setImage(data) {
    this.data = data || false;
    if (this.data) {
      this.xl = this.data.width;
      this.yl = this.data.height;
    }
  }
  getStrength(xi, yi) {
    // const n = noise(xi*this.scl,yi*this.scl, this.z);
    // return map(n, 0,1, 0,1);
    // const i = yi * this.data.width + xi;
    // console.log(yi+","+xi)
    return this.data.get(xi, yi);
  }
  render() {
    for (let yi = 0; yi < this.yl; yi++) {
      let xi = 0;
      if (yi % 2) {
        xi = 0.5;
      }
      for (; xi < this.xl; xi++) {
        new GridItem(
          xi * this.blk,
          yi * this.blk,
          this.blk,
          this.blk,
          this.getStrength(xi, yi)
        ).render();
      }
    }
  }
}

class GridItem {
  constructor(x, y, w, h, s = [200, 200, 200], clr) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.stg = 1; //map((s[0] + s[1] + s[2]) / 3, 0, 255, 1,0,true);
    this.clr = s;
    this.brush = brush;
    this.dot = dots[ceil(random(dots.length - 1))];
  }
  wiggle() {
    return random(4);
  }
  render() {
    push();
    stroke(this.clr);
    strokeWeight(3);
    noFill(this.clr[0], this.clr[1], this.clr[2], 230);
    translate(this.x, this.y);
    const length = random(10, 30) * PI;
    let r = random(5, 30);
    let x, y;
    beginShape();
    for (let i = 0; i < length; i += QUARTER_PI) {
      // circle(this.x+this.wiggle(),this.y+this.wiggle(),this.brush);
      x = r * cos(i) + random();
      y = r * sin(i) + random();
      curveVertex(x, y);
      r -= random();
      if (r < 0) {
        break;
      }
    }
    endShape();
    pop();
  }
}
