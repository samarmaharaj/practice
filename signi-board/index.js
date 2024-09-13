const canvas = document.getElementById("canva");
const ctx = canvas.getContext('2d');
let wrm = false;
let lastx, lasty;

// Function to resize the canvas based on screen size
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9; // 90% of the screen width
    canvas.height = window.innerHeight * 0.5; // 50% of the screen height
    ctx.fillStyle = "#FFFFFF"; // Default background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the background
}
resizeCanvas(); // Call once when the page loads

// Adjust the canvas size when the window is resized
window.addEventListener('resize', resizeCanvas);

// Elements
const clear = document.getElementById("clo");
const background = document.getElementById("leng");
const colorpicker = document.getElementById("colo");
const fontsize = document.getElementById('out0');
const save = document.getElementById("save");

// Change stroke and fill color based on color picker input
colorpicker.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.strokeStyle = e.target.value;
});

// Start drawing on mouse/touch events
const startDrawing = (x, y) => {
    wrm = true;
    lastx = x;
    lasty = y;
};

// Draw on canvas based on coordinates
const draw = (x, y) => {
    if (!wrm) return;
    ctx.beginPath();
    ctx.moveTo(lastx, lasty);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastx = x;
    lasty = y;
};

// Stop drawing when the mouse/touch is lifted
const stopDrawing = () => {
    wrm = false;
};

// Mouse events for drawing
canvas.addEventListener('mousedown', (e) => {
    startDrawing(e.offsetX, e.offsetY);
});
canvas.addEventListener('mousemove', (e) => {
    draw(e.offsetX, e.offsetY);
});
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Touch events for drawing on mobile
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
});
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling while drawing
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// Change background color of the canvas
background.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Change the line width based on the font size selector
fontsize.addEventListener('change', (s) => {
    ctx.lineWidth = s.target.value;
});

// Clear the canvas
clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save and download the canvas image
save.addEventListener("click", () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Prevent accidental navigation away from the page
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = "";
});