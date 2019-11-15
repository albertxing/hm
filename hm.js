const canvas = document.getElementById('canvas');
canvas.width = 160;
canvas.height = 160;

let dragging = false;
let ox;
let oy;
let dx = 0;
let dy = 0;
let sx = 0;
let sy = 0;
canvas.addEventListener('mousedown', (e) => {
	if (e.button !== 0) {
		dragging = false;
		return;
	}

	dragging = true;
	ox = e.screenX;
	oy = e.screenY;
});
canvas.addEventListener('mousemove', (e) => {
	if (dragging) {
		dx = e.screenX - ox;
		dy = e.screenY - oy;
		redraw();
	}
});
canvas.addEventListener('mouseup', endDrag);
canvas.addEventListener('mouseleave', endDrag);

function endDrag() {
	dragging = false;
	sx += dx;
	sy += dy;
	dx = 0;
	dy = 0;
	redraw();
}

const ctx = canvas.getContext('2d');

const input = document.getElementById('input');
input.addEventListener('change', onInputChange);

const save = document.getElementById('save');
save.addEventListener('click', onSave);

const hand = new Image();
hand.src = 'hand.png';

let baseImg;

function onInputChange() {
	const file = input.files && input.files[0];
	if (!file) clear();

	if (baseImg) {
		URL.revokeObjectURL(baseImg.src);
	}

	dx = 0;
	dy = 0;
	sx = 0;
	sy = 0;

	const dataURL = URL.createObjectURL(file);
	baseImg = new Image();
	baseImg.addEventListener('load', redraw);
	baseImg.src = dataURL;
}

function clear() {
	ctx.clearRect(0,0,160,160);
}

function redraw() {
	if (!baseImg) return;

	clear();
	ctx.drawImage(baseImg, 0, 0, 160, 160);
	ctx.drawImage(hand, sx + dx, sy + dy, 160, 160);
}

function onSave() {
	const url = canvas.toDataURL('image/png');
	window.open(url);
}