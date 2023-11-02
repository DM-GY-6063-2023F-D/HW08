let img;
let oImg;

let similarValue;
let similarSlider;

let mColorPicker;

let MONDRIAN_RED;
let MONDRIAN_BLUE;
let MONDRIAN_YELLOW;

function preload() {
  img = loadImage("./red-yellow-blue-black.jpg");
  oImg = loadImage("./red-yellow-blue-black.jpg");
}

function isSimilar(colorA, redB, greenB, blueB) {
  let similarR = abs(colorA.r - redB) < similarValue;
  let similarG = abs(colorA.g - greenB) < similarValue;
  let similarB = abs(colorA.b - blueB) < similarValue;
  return similarR && similarG && similarB;
}

function updateImage() {
  similarValue = similarSlider.value();
  let pickerColor = mColorPicker.color();
  let newYellow = {
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
        let ix = floor(x / 20);
        let iy = floor(y / 20);
        let pv = ix % 2 != iy % 2 ? 255 : 0;
        img.pixels[pixelIndex + 0] = pv;
        img.pixels[pixelIndex + 1] = 255 - pv;
        img.pixels[pixelIndex + 2] = 255;
      } else if (isSimilar(MONDRIAN_RED, rVal, gVal, bVal)) {
        img.pixels[pixelIndex + 0] = 255;
        img.pixels[pixelIndex + 1] = 0;
        img.pixels[pixelIndex + 2] = 255;
      } else if (isSimilar(MONDRIAN_YELLOW, rVal, gVal, bVal)) {
        img.pixels[pixelIndex + 0] = newYellow.r;
        img.pixels[pixelIndex + 1] = newYellow.g;
        img.pixels[pixelIndex + 2] = newYellow.b;
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

  MONDRIAN_RED = { r: 220, g: 64, b: 40 };
  MONDRIAN_BLUE = { r: 1, g: 59, b: 105 };
  MONDRIAN_YELLOW = { r: 239, g: 193, b: 81 };

  img.resize(0, height);
  oImg.resize(0, height);
  oImg.loadPixels();

  similarSlider = createSlider(5, 64, 5);
  similarSlider.position(oImg.width + 10, 25);
  similarSlider.changed(updateImage);

  mColorPicker = createColorPicker(color(255, 255, 0));
  mColorPicker.position(oImg.width + 10, 80);
  mColorPicker.style("width", "120px");
  mColorPicker.changed(updateImage);

  updateImage();
}

function drawLabels() {
  push();
  fill(255);
  textSize(20);
  textFont("monospace");

  text("threshold:", oImg.width + 10, 20);
  text("new color:", oImg.width + 10, 75);
  pop();
}

function draw() {
  background(0);
  image(img, 0, 0);
  drawLabels();
}
