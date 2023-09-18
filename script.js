const faceColor = document.querySelector('#input-color-clock-face');
const handsColor = document.querySelector('#input-color-clock-hands');
const borderColor = document.querySelector('#input-color-clock-border');
const saveImgBtn = document.querySelector('#save-image-btn');

function saveImg(e) {
	e.preventDefault();
	const canvas = document.querySelector('#canvas');
	const dataURL = canvas.toDataURL('image/png');
	const link = document.createElement('a');
	link.download = 'clock.png';
	link.href = dataURL;
	link.click();
}

saveImgBtn.addEventListener('click', saveImg);

function clock() {
	const now = new Date();
	const canvas = document.querySelector('#canvas');
	const context = canvas.getContext('2d');

	// Setup canvas
	context.save(); // save the default state
	context.clearRect(0, 0, 500, 500);
	context.translate(250, 250); // put 0,0 in the middle
	context.rotate(-Math.PI / 2); // rotate clock -90 deg

	// Set default styles
	context.strokeStyle = '#000000';
	context.fillStyle = 'grey';
	context.lineWidth = 5;
	context.lineCap = 'round';

	// Draw clock face
	context.save();
	context.beginPath();
	context.lineWidth = 14;
	context.strokeStyle = borderColor.value;
	context.fillStyle = faceColor.value;
	context.arc(0, 0, 142, 0, Math.PI * 2, true);
	context.stroke();
	context.fill();
	context.restore();

	// Draw hour lines
	context.save();
	for (let i = 0; i < 12; i++) {
		context.beginPath();
		context.rotate(Math.PI / 6);
		context.moveTo(100, 0);
		context.lineTo(120, 0);
		context.stroke();
	}
	context.restore();

	// Draw Minutes lines
	context.save();
	context.lineWidth = 3;
	for (let i = 0; i < 60; i++) {
		if (i % 5 !== 0) {
			context.beginPath();
			context.moveTo(117, 0);
			context.lineTo(120, 0);
			context.stroke();
		}
		context.rotate(Math.PI / 30);
	}
	context.restore();

	// Get current time
	const hr = now.getHours() % 12;
	const min = now.getMinutes();
	const sec = now.getSeconds();

	// Draw hour hand
	context.save();
	context.beginPath();
	context.lineWidth = 10;
	context.strokeStyle = handsColor.value;
	context.rotate((Math.PI * 2 * (hr + (min + sec / 3600) / 60)) / 12);
	context.moveTo(-20, 0);
	context.lineTo(70, 0);
	context.stroke();
	context.restore();

	// Draw minute hand
	context.save();
	context.lineWidth = 6;
	context.strokeStyle = handsColor.value;
	context.beginPath();
	context.rotate((Math.PI * 2 * (min + sec / 60)) / 60);
	context.moveTo(-20, 0);
	context.lineTo(100, 0);
	context.stroke();

	context.restore();

	// Draw second hand
	context.save();
	context.lineWidth = 2;
	context.strokeStyle = handsColor.value;
	context.beginPath();
	context.rotate(Math.PI * 2 * (sec / 60));
	context.moveTo(-20, 0);
	context.lineTo(110, 0);
	context.stroke();

	context.restore();

	// Draw middle dot
	context.save();
	context.lineWidth = 20;
	context.strokeStyle = 'brown';
	context.beginPath();
	context.lineTo(0, 0);
	context.stroke();

	context.restore(); // restore the default state

	context.restore();

	requestAnimationFrame(clock);
}

// Run the clock program
requestAnimationFrame(clock);
