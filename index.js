const DEFAULT_COLOR = "black";
const DEFAULT_MODE = "color";

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

const grid = document.getElementById("grid");
const clearBtn = document.getElementById("clear-btn");
const colorPicker = document.getElementById("color-picker");
const colorBtn = document.getElementById("color-btn");
const eraserBtn = document.getElementById("eraser-btn");

clearBtn.onclick = () => clearGrid();
colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentmode("color");
eraserBtn.onclick = () => setCurrentmode("eraser");

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentmode(newMode) {
  currentMode = newMode;
}

function setupGrid() {
  grid.style.gridTemplateRows = "repeat(16, 1fr)";
  grid.style.gridTemplateColumns = "repeat(16, 1fr)";

  for (let i = 0; i < 16 * 16; i++) {
    const pixel = document.createElement("div");
    pixel.addEventListener("mouseover", changeColor);
    pixel.addEventListener("mousedown", changeColor);
    grid.appendChild(pixel);
  }
}

let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};

function changeColor(e) {
  if (e.type === "mouseover" && mouseDown === false) console.log(null);
  else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "white";
  }
}

function clearGrid() {
  grid.innerHTML = "";
  setupGrid();
}

window.onload = () => {
  setupGrid();
};
