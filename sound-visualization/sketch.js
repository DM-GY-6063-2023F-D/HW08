let STEP_SIZE = 8;

let song;
let samples;
let sampleAvgRaw;

let pos = [];

let stepSlider;
let avgSlider;
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

  song.loop();

  stepSlider = createSlider(0.5, 3, 1, 0.1);
  stepSlider.position(width - 200, 40);

  avgSlider = createSlider(0, 50, 2, 0.2);
  avgSlider.position(width - 200, 90);

  radiusSlider = createSlider(1, 8, 8, 0.1);
  radiusSlider.position(width - 200, 140);

  samples = song.getPeaks();
  sampleAvgRaw = samples.reduce(sum, 0) / samples.length;

  let p = { x: 0, y: 0 };
  let moveLength = floor(samples.length / 2);

  for (let i = 0; i < moveLength; i++) {
    p.x += samples[i] - sampleAvgRaw;
    p.y += samples[moveLength + i] - sampleAvgRaw;
    pos.push({ x: p.x, y: p.y });
  }
}

function normalize(p) {
  return {
    x: (p.x - sampleAvg) * stepSize,
    y: (p.y - sampleAvg) * stepSize,
  };
}

function scaledPolar(p0, p1) {
  return {
    x0: radius * p0.x * cos(radians(p0.y)),
    y0: radius * p0.x * sin(radians(p0.y)),
    x1: radius * p1.x * cos(radians(p1.y)),
    y1: radius * p1.x * sin(radians(p1.y)),
  };
}

let stepSize;
let sampleAvg;
let radius;

function draw() {
  background(0);
  stroke(255);
  fill(255);

  let mi = frameCount % pos.length;

  stepSize = stepSlider.value() * STEP_SIZE;
  sampleAvg = avgSlider.value() * sampleAvgRaw;
  radius = 1 / (9 - radiusSlider.value());

  let normPos = pos.map(normalize);

  push();
  translate(width / 2, height / 2);

  for (let i = 1; i < mi; i++) {
    let p0 = normPos[i];
    let p1 = normPos[i - 1];

    let polar = scaledPolar(p0, p1);
    line(polar.x0, polar.y0, polar.x1, polar.y1);
  }
  pop();

  noStroke();
  text("step scale", width - 200, 40);
  text("average scale", width - 200, 90);
  text("polar radius", width - 200, 140);
}
