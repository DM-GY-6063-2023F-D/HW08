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

  let p = { x: 0, y: 0 };
  let moveLength = floor(samples.length / 2);

  for (let i = 0; i < moveLength; i++) {
    p.x += samples[i] - avgS;
    p.y += samples[moveLength + i] - avgS;
    pos.push({ x: p.x, y: p.y });
  }
}

function scaledPolar(p0, p1, radius) {
  return {
    x0: radius * p0.x * cos(radians(2 * STEP_SIZE * p0.y)),
    y0: radius * p0.x * sin(radians(2 * STEP_SIZE * p0.y)),
    x1: radius * p1.x * cos(radians(2 * STEP_SIZE * p1.y)),
    y1: radius * p1.x * sin(radians(2 * STEP_SIZE * p1.y)),
  };
}

function draw() {
  background(0);
  stroke(255);
  fill(255);

  let mi = frameCount % pos.length;
  let radius = (2 * STEP_SIZE) / (9 - radiusSlider.value());

  push();
  translate(width / 2, height / 2);

  for (let i = 1; i < mi; i++) {
    let p0 = pos[i];
    let p1 = pos[i - 1];

    let polar = scaledPolar(p0, p1, radius);
    line(polar.x0, polar.y0, polar.x1, polar.y1);
  }
  pop();

  noStroke();
  text("polar radius", width - 200, 30);
}
