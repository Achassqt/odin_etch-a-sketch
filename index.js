const grid = document.getElementById("grid");

function setupGrid() {
  grid.style.gridTemplateRows = "repeat(16, 1fr)";
  grid.style.gridTemplateColumns = "repeat(16, 1fr)";

  for (let i = 0; i < 16 * 16; i++) {
    const pixel = document.createElement("div");
    // pixel.classList.add("pixel");
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
  else {
    e.target.style.backgroundColor = "red";
  }
}

window.onload = () => {
  setupGrid();
};
