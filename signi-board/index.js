const canvas = document.getElementById("canva");
const ctx = canvas.getContext('2d');
let wrm = false;
let lastx, lasty;

const clear = document.getElementById("clo");
const background = document.getElementById("leng");
const colorpicker = document.getElementById("colo");
const fontsize = document.getElementById('out0');
const save = document.getElementById("save");

// Color picker for drawing
colorpicker.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.strokeStyle = e.target.value;
});

// Mouse and touch event handlers
const startDrawing = (x, y) => {
    wrm = true;
    lastx = x;
    lasty = y;
};

const draw = (x, y) => {
    if (!wrm) return;
    ctx.beginPath();
    ctx.moveTo(lastx, lasty);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastx = x;
    lasty = y;
};

const stopDrawing = () => {
    wrm = false;
};

// Mouse events for desktop
canvas.addEventListener('mousedown', (e) => {
    startDrawing(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
    draw(e.offsetX, e.offsetY);
});

canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    startDrawing(touch.clientX, touch.clientY);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling while drawing
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// Background color change
background.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Line width adjustment
fontsize.addEventListener('change', (s) => {
    ctx.lineWidth = s.target.value;
});

// Clear canvas
clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save drawing as image
save.addEventListener("click", () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Warn before leaving the page
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = "";
});