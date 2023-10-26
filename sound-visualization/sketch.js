let STEP_SIZE = 8;

let song;
let samples;

let pos = [];

let radiusSlider;

function preload() {
  song = loadSound("./catch-it.mp3");
  // song = loadSound("./hip-hop-tango.mp3");
}

function sum(acc, v) {
  return acc + v;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textFont("sans-serif");
  textSize(14);

  radiusSlider = createSlider(1, 8, 8, 0.1);
  radiusSlider.position(width - 200, 50);

  samples = song.getPeaks();
  let avgS = samples.reduce(sum, 0) / samples.length / 1.2;

  let p = { x: width / 2, y: height / 2 };
  pos.push({ x: p.x, y: p.y });

  let moveLength = floor(samples.length / 2);

  for (let i = 0; i < moveLength; i++) {
    p.x = (p.x + STEP_SIZE * (samples[i] - avgS)) % width;
    p.y = (p.y + STEP_SIZE * (samples[moveLength + i] - avgS)) % height;
    pos.push({ x: p.x, y: p.y });
  }
}

function draw() {
  background(0);

  let mi = frameCount % pos.length;
  let rScale = 9 - radiusSlider.value();

  for (let i = 1; i < mi; i++) {
    let p0 = pos[i];
    let p1 = pos[i - 1];
    let a = map(mi - i, 0, pos.length / 8, 255, 0);
    a = 255;

    if (abs(p0.x - p1.x) <= STEP_SIZE && abs(p0.y - p1.y) <= STEP_SIZE) {
      stroke(255, a);
      fill(255, a);
      line(p0.x, p0.y, p1.x, p1.y);

      let x0 = (p0.x / rScale) * cos(radians(p0.y));
      let y0 = (p0.x / rScale) * sin(radians(p0.y));
      let x1 = (p1.x / rScale) * cos(radians(p1.y));
      let y1 = (p1.x / rScale) * sin(radians(p1.y));

      push();
      translate(width / 2, height / 2);
      stroke(255);
      fill(255);
      line(x0, y0, x1, y1);
      pop();
    }
  }
  ellipse(pos[mi].x, pos[mi].y, 8, 8);

  noStroke();
  text("radius scale", width - 200, 30);
}
