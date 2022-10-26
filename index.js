const DEFAULT_COLOR = "black";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = "16";

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const grid = document.getElementById("grid");
const clearBtn = document.getElementById("clear-btn");
const colorPicker = document.getElementById("color-picker");
const colorBtn = document.getElementById("color-btn");
const eraserBtn = document.getElementById("eraser-btn");
const randomColorBtn = document.getElementById("random_color-btn");
const sizeRange = document.getElementById("size-range");
const sizeDisplay = document.getElementById("size-display");
const pixelPreview = document.getElementById("pixel-preview");

clearBtn.onclick = () => clearGrid();
colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => {
  setCurrentmode("color");
};
eraserBtn.onclick = () => {
  setCurrentmode("eraser");
};
randomColorBtn.onclick = () => {
  setCurrentmode("random");
};
sizeRange.onchange = (e) => updateSize(e.target.value);
sizeRange.onmousemove = (e) => updateSizeDisplay(e.target.value);
sizeRange.onclick = (e) => updateSizeDisplay(e.target.value);

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentmode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function setupGrid(size) {
  // let pixelSize = Math.floor(500 / size) + 1;

  // grid.style.gridTemplateRows = `repeat(${size}, ${pixelSize}px)`;
  // grid.style.gridTemplateColumns = `repeat(${size}, ${pixelSize}px)`;

  grid.style.gridTemplateRows = `repeat(${size}, 1fr`;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr`;

  for (let i = 0; i < `${size}` * `${size}`; i++) {
    const pixel = document.createElement("div");
    pixel.addEventListener("mouseover", changeColor);
    pixel.addEventListener("mousedown", changeColor);
    pixel.addEventListener("touchmove", changeColorTouch);
    grid.appendChild(pixel);
  }
}

function changeColorTouch(e) {
  let target = document.elementFromPoint(
    e.changedTouches[0].clientX,
    e.changedTouches[0].clientY
  );
  if (grid.contains(target) && currentMode === "color") {
    target.style.backgroundColor = currentColor;
  } else if (grid.contains(target) && currentMode === "random") {
    randomColor(e);
  } else if (grid.contains(target) && currentMode === "eraser") {
    target.style.backgroundColor = "white";
  }
}

// voir plus tard pour écran tactile
let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};

function changeColor(e) {
  if (e.type === "mouseover" && mouseDown === false) return;
  else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "white";
  } else if (currentMode === "random") {
    randomColor(e);
  }
}

function randomColor(e) {
  // lien documentation en cas d'oublie https://www.educative.io/answers/how-to-generate-a-random-color-in-javascript

  let maxVal = 0xffffff;
  let randomNumber = Math.floor(Math.random() * maxVal).toString(16);
  let randomColor = randomNumber.padStart(6, 0);
  if (e.type === "touchmove") {
    let target = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );
    target.style.backgroundColor = `#${randomColor.toUpperCase()}`;
  } else {
    e.target.style.backgroundColor = `#${randomColor.toUpperCase()}`;
  }
}

// let test = 0.9999999999999999999999 * 16777215;
// console.log(Math.floor(test).toString(16));
// console.log(Math.random());

function clearGrid() {
  grid.innerHTML = "";
  setupGrid(currentSize);
}

function updateSize(size) {
  // capture();
  setCurrentSize(size);
  clearGrid();
}

function updateSizeDisplay(size) {
  sizeDisplay.innerHTML = `${size} x ${size}`;
  // pixelPreview.style.width = `calc(500px / ${size})`;
  // pixelPreview.style.height = `calc(500px / ${size})`;
}

const captureBtn = document.getElementById("capture-btn");

captureBtn.addEventListener("click", capture);

function capture() {
  let grid = document.getElementById("grid");

  html2canvas(grid).then(function (canvas) {
    const output = document.getElementById("output");
    canvas.style.height = "100px";
    canvas.style.width = "100px";
    output.appendChild(canvas);
    output.scrollTop = output.scrollHeight;
  });
}

function activateButton(newMode) {
  if (currentMode === "random") {
    randomColorBtn.classList.remove("active-btn");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active-btn");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active-btn");
  }

  if (newMode === "random") {
    randomColorBtn.classList.add("active-btn");
  } else if (newMode === "color") {
    colorBtn.classList.add("active-btn");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active-btn");
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  // pixelPreview.style.width = `calc(500px / ${DEFAULT_SIZE})`;
  // pixelPreview.style.height = `calc(500px / ${DEFAULT_SIZE})`;
};
