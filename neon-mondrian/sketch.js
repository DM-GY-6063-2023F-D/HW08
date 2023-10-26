let img;
let oImg;

let similarValue;
let similarSlider;

let mColorPicker;

let MONDRIAN_RED;
let MONDRIAN_BLUE;
let MONDRIAN_YELLOW;
let MONDRIAN_BLACK;
let MONDRIAN_WHITE;

function preload() {
  img = loadImage("./red-yellow-blue-black.jpg");
  oImg = loadImage("./red-yellow-blue-black.jpg");
}

function isSimilar(colorA, redB, greenB, blueB) {
  let similarR = abs(red(colorA) - redB) < similarValue;
  let similarG = abs(green(colorA) - greenB) < similarValue;
  let similarB = abs(blue(colorA) - blueB) < similarValue;
  return similarR && similarG && similarB;
}

function updateImage() {
  similarValue = similarSlider.value();
  let pickerColor = mColorPicker.color();
  let newBlue = {
    r: red(pickerColor),
    g: green(pickerColor),
    b: blue(pickerColor),
  };

  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let pixelIndex = 4 * (y * img.width + x);

      let rVal = oImg.pixels[pixelIndex + 0];
      let gVal = oImg.pixels[pixelIndex + 1];
      let bVal = oImg.pixels[pixelIndex + 2];

      if (isSimilar(MONDRIAN_BLUE, rVal, gVal, bVal)) {
        img.pixels[pixelIndex + 0] = newBlue.r;
        img.pixels[pixelIndex + 1] = newBlue.g;
        img.pixels[pixelIndex + 2] = newBlue.b;
      } else if (isSimilar(MONDRIAN_RED, rVal, gVal, bVal)) {
        img.pixels[pixelIndex + 0] = 255;
        img.pixels[pixelIndex + 1] = 0;
        img.pixels[pixelIndex + 2] = 255;
      } else if (isSimilar(MONDRIAN_YELLOW, rVal, gVal, bVal)) {
        img.pixels[pixelIndex + 0] = 0;
        img.pixels[pixelIndex + 1] = 255;
        img.pixels[pixelIndex + 2] = 0;
      } else if (isSimilar(MONDRIAN_BLACK, rVal, gVal, bVal)) {
        img.pixels[pixelIndex + 0] = 255;
        img.pixels[pixelIndex + 1] = 255;
        img.pixels[pixelIndex + 2] = 0;
      } else if (isSimilar(MONDRIAN_WHITE, rVal, gVal, bVal)) {
        let pv = (x / 20) % 2 < 1 ? 255 : 0;
        img.pixels[pixelIndex + 0] = pv;
        img.pixels[pixelIndex + 1] = 255 - pv;
        img.pixels[pixelIndex + 2] = 255 - pv;
      } else {
        img.pixels[pixelIndex + 0] = oImg.pixels[pixelIndex + 0];
        img.pixels[pixelIndex + 1] = oImg.pixels[pixelIndex + 1];
        img.pixels[pixelIndex + 2] = oImg.pixels[pixelIndex + 2];
        img.pixels[pixelIndex + 3] = oImg.pixels[pixelIndex + 3];
      }
    }
  }
  img.updatePixels();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  MONDRIAN_RED = color(220, 64, 40);
  MONDRIAN_BLUE = color(1, 59, 105);
  MONDRIAN_YELLOW = color(239, 193, 81);
  MONDRIAN_BLACK = color(36, 37, 28);
  MONDRIAN_WHITE = color(212, 213, 211);

  img.resize(0, height / 2);
  oImg.resize(0, height / 2);
  oImg.loadPixels();

  similarSlider = createSlider(5, 64, 5);
  similarSlider.position(2 * oImg.width + 10, 25);
  similarSlider.changed(updateImage);

  mColorPicker = createColorPicker(color(0, 30, 255));
  mColorPicker.position(2 * oImg.width + 10, 80);
  mColorPicker.style("width", "120px");
  mColorPicker.changed(updateImage);

  updateImage();
}

function drawLabels() {
  push();
  fill(255);
  textSize(20);
  textFont("monospace");

  text("threshold:", 2 * oImg.width + 10, 20);
  text("new blue:", 2 * oImg.width + 10, 75);
  pop();
}

function draw() {
  background(0);
  image(img, 0, 0, 2 * img.width, 2 * img.height);
  drawLabels();
}
